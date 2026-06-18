/**
 * VYRDON RootPass - escrow enforcement test suite
 *
 * Exercises the 5-action enforcement model implemented by RootPassEscrow:
 *
 *   PASS     -> RELEASED   (after timelock; funds to beneficiary)
 *   NO_PASS  -> RETURNED   (funds to depositor; anomaly counted)
 *   HOLD     -> HELD       (escrow stays held; no transfer)
 *   EXPIRED  -> (timeout path; not exercised here - no expiry function on-chain yet)
 *   ESCALATED-> (escalation path; not exercised here - no escalation function on-chain yet)
 *
 * The current production RootPassVerifier returns valid=false (placeholder),
 * so submitProof would always revert against it. To exercise the decision
 * branches honestly, these tests drive the escrow with a MockVerifier whose
 * (valid, decision) return value is set per test. A separate test verifies
 * the real production verifier path reverts as expected.
 */

import { expect } from "chai";
import { ethers } from "hardhat";
import { DECISION } from "./_helpers";

const ZERO_BYTES32 = "0x" + "00".repeat(32);
const ONE_GWEI = 1_000_000_000n;
const DEPOSIT_AMOUNT = ONE_GWEI * 1_000_000n; // 0.001 ETH

describe("RootPassEscrow: enforcement flow", function () {
  async function deployWithMockVerifier() {
    const [, depositor, beneficiary] = await ethers.getSigners();
    const Mock = await ethers.getContractFactory("MockVerifier");
    const mock = await Mock.deploy();
    await mock.waitForDeployment();

    const Escrow = await ethers.getContractFactory("RootPassEscrow");
    const escrow = await Escrow.deploy(await mock.getAddress());
    await escrow.waitForDeployment();

    return { mock, escrow, depositor, beneficiary };
  }

  async function deposit(escrow: any, depositor: any, beneficiary: any, timelock: bigint) {
    const tx = await escrow
      .connect(depositor)
      .deposit(await beneficiary.getAddress(), ZERO_BYTES32, timelock, {
        value: DEPOSIT_AMOUNT,
      });
    await tx.wait();
    return 0n; // first escrowId in this fresh contract
  }

  it("creates an escrow on deposit and records depositor + beneficiary + amount", async function () {
    const { escrow, depositor, beneficiary } = await deployWithMockVerifier();
    const id = await deposit(escrow, depositor, beneficiary, 0n);
    const e = await escrow.escrows(id);
    expect(e.depositor).to.equal(await depositor.getAddress());
    expect(e.beneficiary).to.equal(await beneficiary.getAddress());
    expect(e.amount).to.equal(DEPOSIT_AMOUNT);
    expect(e.state).to.equal(0n); // ACTIVE
  });

  it("PASS releases the escrow to the beneficiary (after timelock)", async function () {
    const { mock, escrow, depositor, beneficiary } = await deployWithMockVerifier();
    const id = await deposit(escrow, depositor, beneficiary, 0n);

    await (await mock.setNext(true, BigInt(DECISION.PASS))).wait();

    const balanceBefore = await ethers.provider.getBalance(await beneficiary.getAddress());
    const tx = await escrow.connect(depositor).submitProof(id, "0x", [BigInt(DECISION.PASS)]);
    await tx.wait();
    const balanceAfter = await ethers.provider.getBalance(await beneficiary.getAddress());

    const e = await escrow.escrows(id);
    expect(e.state).to.equal(1n); // RELEASED
    expect(balanceAfter - balanceBefore).to.equal(DEPOSIT_AMOUNT);
  });

  it("NO_PASS returns the escrow to the depositor and records an anomaly", async function () {
    const { mock, escrow, depositor, beneficiary } = await deployWithMockVerifier();
    const id = await deposit(escrow, depositor, beneficiary, 0n);

    await (await mock.setNext(true, BigInt(DECISION.NO_PASS))).wait();

    expect(await escrow.anomalyCount()).to.equal(0n);
    const tx = await escrow.connect(depositor).submitProof(id, "0x", [BigInt(DECISION.NO_PASS)]);
    await tx.wait();

    const e = await escrow.escrows(id);
    expect(e.state).to.equal(2n); // RETURNED
    expect(await escrow.anomalyCount()).to.equal(1n);
    expect(await escrow.circuitBreakerTripped()).to.equal(false);
  });

  it("HOLD keeps the escrow held and does not move funds", async function () {
    const { mock, escrow, depositor, beneficiary } = await deployWithMockVerifier();
    const id = await deposit(escrow, depositor, beneficiary, 0n);

    await (await mock.setNext(true, BigInt(DECISION.HOLD))).wait();

    const beneficiaryBefore = await ethers.provider.getBalance(await beneficiary.getAddress());
    const tx = await escrow.connect(depositor).submitProof(id, "0x", [BigInt(DECISION.HOLD)]);
    await tx.wait();
    const beneficiaryAfter = await ethers.provider.getBalance(await beneficiary.getAddress());

    const e = await escrow.escrows(id);
    expect(e.state).to.equal(3n); // HELD
    expect(beneficiaryAfter).to.equal(beneficiaryBefore);
  });

  it("rejects submitProof when the verifier reports valid=false (production-verifier path)", async function () {
    // Use the real production RootPassVerifier whose _verifyZKProof returns false today.
    const Verifier = await ethers.getContractFactory("RootPassVerifier");
    const verifier = await Verifier.deploy();
    await verifier.waitForDeployment();

    const Escrow = await ethers.getContractFactory("RootPassEscrow");
    const escrow = await Escrow.deploy(await verifier.getAddress());
    await escrow.waitForDeployment();

    const [, depositor, beneficiary] = await ethers.getSigners();
    await (
      await escrow
        .connect(depositor)
        .deposit(await beneficiary.getAddress(), ZERO_BYTES32, 0n, { value: DEPOSIT_AMOUNT })
    ).wait();

    await expect(escrow.connect(depositor).submitProof(0n, "0x", [1n])).to.be.revertedWith(
      "Proof verification failed",
    );
  });

  it("rejects PASS when the timelock has not elapsed", async function () {
    const { mock, escrow, depositor, beneficiary } = await deployWithMockVerifier();
    const futureLock = 60n * 60n; // 1 hour
    const id = await deposit(escrow, depositor, beneficiary, futureLock);

    await (await mock.setNext(true, BigInt(DECISION.PASS))).wait();
    await expect(
      escrow.connect(depositor).submitProof(id, "0x", [BigInt(DECISION.PASS)]),
    ).to.be.revertedWith("Timelock not elapsed");
  });

  it("circuit breaker trips after the anomaly threshold is reached", async function () {
    const { mock, escrow, depositor, beneficiary } = await deployWithMockVerifier();
    const ANOMALY_THRESHOLD = 10n;

    await (await mock.setNext(true, BigInt(DECISION.NO_PASS))).wait();
    for (let i = 0n; i < ANOMALY_THRESHOLD; i++) {
      await deposit(escrow, depositor, beneficiary, 0n);
      await (await escrow.connect(depositor).submitProof(i, "0x", [BigInt(DECISION.NO_PASS)])).wait();
    }

    expect(await escrow.circuitBreakerTripped()).to.equal(true);

    // Any further deposit reverts because the breaker is tripped.
    await expect(
      escrow.connect(depositor).deposit(await beneficiary.getAddress(), ZERO_BYTES32, 0n, {
        value: DEPOSIT_AMOUNT,
      }),
    ).to.be.reverted;
  });
});

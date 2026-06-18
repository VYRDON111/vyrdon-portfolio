/**
 * VYRDON RootPass - TRUE ROOT = PASS test suite
 *
 * Verifies that PASS is issued only when every pillar is TRUE and no
 * contradiction is present. The four-pillar law in the canonical form:
 *
 *   ROOT.TRUE AND GATE.TRUE AND VALID.TRUE AND CERTIFIED.TRUE
 *     AND NOT contradiction  ->  PASS.TRUE
 *
 * Tests target RootPassDecisionLib via the TestDecisionLib wrapper.
 */

import { expect } from "chai";
import { ethers } from "hardhat";
import { PILLAR, DECISION } from "./_helpers";

describe("RootPass: TRUE ROOT = PASS", function () {
  async function deploy() {
    const factory = await ethers.getContractFactory("TestDecisionLib");
    const lib = await factory.deploy();
    await lib.waitForDeployment();
    return lib;
  }

  it("returns PASS when all four pillars are TRUE and no contradiction", async function () {
    const lib = await deploy();
    const decision = await lib.decide(
      PILLAR.TRUE,
      PILLAR.TRUE,
      PILLAR.TRUE,
      PILLAR.TRUE,
      false,
    );
    expect(decision).to.equal(DECISION.PASS);
  });

  it("does NOT return PASS when any single pillar is FALSE", async function () {
    const lib = await deploy();
    const inputs: [number, number, number, number][] = [
      [PILLAR.FALSE, PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE],
      [PILLAR.TRUE, PILLAR.FALSE, PILLAR.TRUE, PILLAR.TRUE],
      [PILLAR.TRUE, PILLAR.TRUE, PILLAR.FALSE, PILLAR.TRUE],
      [PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE, PILLAR.FALSE],
    ];
    for (const [r, g, v, c] of inputs) {
      const decision = await lib.decide(r, g, v, c, false);
      expect(decision).to.equal(DECISION.NO_PASS);
    }
  });

  it("does NOT return PASS when any single pillar is MISSING", async function () {
    const lib = await deploy();
    const inputs: [number, number, number, number][] = [
      [PILLAR.MISSING, PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE],
      [PILLAR.TRUE, PILLAR.MISSING, PILLAR.TRUE, PILLAR.TRUE],
      [PILLAR.TRUE, PILLAR.TRUE, PILLAR.MISSING, PILLAR.TRUE],
      [PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE, PILLAR.MISSING],
    ];
    for (const [r, g, v, c] of inputs) {
      const decision = await lib.decide(r, g, v, c, false);
      expect(decision).to.equal(DECISION.HOLD);
    }
  });

  it("does NOT return PASS when all pillars are TRUE but a contradiction is flagged", async function () {
    const lib = await deploy();
    const decision = await lib.decide(
      PILLAR.TRUE,
      PILLAR.TRUE,
      PILLAR.TRUE,
      PILLAR.TRUE,
      true,
    );
    expect(decision).to.equal(DECISION.NO_PASS);
  });

  it("exposes the canonical pillar and decision constants", async function () {
    const lib = await deploy();
    expect(await lib.PILLAR_FALSE()).to.equal(0);
    expect(await lib.PILLAR_TRUE()).to.equal(1);
    expect(await lib.PILLAR_MISSING()).to.equal(2);
    expect(await lib.DECISION_NO_PASS()).to.equal(0);
    expect(await lib.DECISION_PASS()).to.equal(1);
    expect(await lib.DECISION_HOLD()).to.equal(2);
  });
});

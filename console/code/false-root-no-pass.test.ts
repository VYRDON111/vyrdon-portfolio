/**
 * VYRDON RootPass - FALSE ROOT = NO_PASS test suite
 *
 *   Any pillar FALSE (and no missing pillar shadowing it, no contradiction)
 *     -> NO_PASS
 *
 * Covers every distinct combination where at least one pillar is FALSE,
 * the rest are TRUE or FALSE (no MISSING), and contradiction is false.
 */

import { expect } from "chai";
import { ethers } from "hardhat";
import { PILLAR, DECISION } from "./_helpers";

describe("RootPass: FALSE ROOT = NO_PASS", function () {
  async function deploy() {
    const factory = await ethers.getContractFactory("TestDecisionLib");
    const lib = await factory.deploy();
    await lib.waitForDeployment();
    return lib;
  }

  it("returns NO_PASS when ROOT.FALSE and others TRUE", async function () {
    const lib = await deploy();
    const d = await lib.decide(PILLAR.FALSE, PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE, false);
    expect(d).to.equal(DECISION.NO_PASS);
  });

  it("returns NO_PASS when GATE.FALSE and others TRUE", async function () {
    const lib = await deploy();
    const d = await lib.decide(PILLAR.TRUE, PILLAR.FALSE, PILLAR.TRUE, PILLAR.TRUE, false);
    expect(d).to.equal(DECISION.NO_PASS);
  });

  it("returns NO_PASS when VALID.FALSE and others TRUE", async function () {
    const lib = await deploy();
    const d = await lib.decide(PILLAR.TRUE, PILLAR.TRUE, PILLAR.FALSE, PILLAR.TRUE, false);
    expect(d).to.equal(DECISION.NO_PASS);
  });

  it("returns NO_PASS when CERTIFIED.FALSE and others TRUE", async function () {
    const lib = await deploy();
    const d = await lib.decide(PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE, PILLAR.FALSE, false);
    expect(d).to.equal(DECISION.NO_PASS);
  });

  it("returns NO_PASS when multiple pillars are FALSE", async function () {
    const lib = await deploy();
    const d1 = await lib.decide(PILLAR.FALSE, PILLAR.FALSE, PILLAR.TRUE, PILLAR.TRUE, false);
    const d2 = await lib.decide(PILLAR.FALSE, PILLAR.FALSE, PILLAR.FALSE, PILLAR.FALSE, false);
    expect(d1).to.equal(DECISION.NO_PASS);
    expect(d2).to.equal(DECISION.NO_PASS);
  });

  it("returns NO_PASS when ROOT.FALSE even with contradiction flagged", async function () {
    // contradiction would already cause NO_PASS, but the law remains NO_PASS
    const lib = await deploy();
    const d = await lib.decide(PILLAR.FALSE, PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE, true);
    expect(d).to.equal(DECISION.NO_PASS);
  });

  it("does not silently coerce FALSE to MISSING (no HOLD when pillar is FALSE)", async function () {
    const lib = await deploy();
    const d = await lib.decide(PILLAR.FALSE, PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE, false);
    expect(d).to.not.equal(DECISION.HOLD);
    expect(d).to.equal(DECISION.NO_PASS);
  });
});

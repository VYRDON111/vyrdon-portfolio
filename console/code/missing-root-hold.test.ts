/**
 * VYRDON RootPass - MISSING ROOT = HOLD test suite
 *
 *   Any pillar MISSING (with no contradiction)
 *     -> HOLD
 *
 * MISSING outranks FALSE only because a missing pillar means evidence has
 * not yet been gathered. The fail-closed default is still NO_PASS, but the
 * decision must be HOLD whenever evidence is incomplete and not contradicted.
 */

import { expect } from "chai";
import { ethers } from "hardhat";
import { PILLAR, DECISION } from "./_helpers";

describe("RootPass: MISSING ROOT = HOLD", function () {
  async function deploy() {
    const factory = await ethers.getContractFactory("TestDecisionLib");
    const lib = await factory.deploy();
    await lib.waitForDeployment();
    return lib;
  }

  it("returns HOLD when ROOT is MISSING and others TRUE", async function () {
    const lib = await deploy();
    const d = await lib.decide(PILLAR.MISSING, PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE, false);
    expect(d).to.equal(DECISION.HOLD);
  });

  it("returns HOLD when any single pillar is MISSING", async function () {
    const lib = await deploy();
    const cases: [number, number, number, number][] = [
      [PILLAR.MISSING, PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE],
      [PILLAR.TRUE, PILLAR.MISSING, PILLAR.TRUE, PILLAR.TRUE],
      [PILLAR.TRUE, PILLAR.TRUE, PILLAR.MISSING, PILLAR.TRUE],
      [PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE, PILLAR.MISSING],
    ];
    for (const [r, g, v, c] of cases) {
      const d = await lib.decide(r, g, v, c, false);
      expect(d).to.equal(DECISION.HOLD);
    }
  });

  it("returns HOLD when MISSING is mixed with FALSE (MISSING outranks FALSE)", async function () {
    // ROOT.MISSING + VALID.FALSE: HOLD wins because the missing pillar
    // means we cannot yet conclude the FALSE pillar is the real story.
    const lib = await deploy();
    const d = await lib.decide(PILLAR.MISSING, PILLAR.TRUE, PILLAR.FALSE, PILLAR.TRUE, false);
    expect(d).to.equal(DECISION.HOLD);
  });

  it("returns HOLD when all four pillars are MISSING (and no contradiction)", async function () {
    const lib = await deploy();
    const d = await lib.decide(
      PILLAR.MISSING,
      PILLAR.MISSING,
      PILLAR.MISSING,
      PILLAR.MISSING,
      false,
    );
    expect(d).to.equal(DECISION.HOLD);
  });

  it("does NOT return HOLD when a contradiction is flagged, regardless of MISSING pillars", async function () {
    // Contradiction is highest priority and forces NO_PASS even with MISSING.
    const lib = await deploy();
    const d = await lib.decide(
      PILLAR.MISSING,
      PILLAR.MISSING,
      PILLAR.MISSING,
      PILLAR.MISSING,
      true,
    );
    expect(d).to.equal(DECISION.NO_PASS);
  });
});

/**
 * VYRDON RootPass - contradiction priority test suite
 *
 * Contradiction is the highest-priority rule in the four-pillar law:
 *
 *   contradiction == true  ->  NO_PASS,  no matter what the pillars say.
 *
 * This must hold even when all four pillars are TRUE (no evidence gap)
 * and even when pillars are MISSING (no HOLD if contradiction is set).
 */

import { expect } from "chai";
import { ethers } from "hardhat";
import { PILLAR, DECISION } from "./_helpers";

describe("RootPass: contradiction blocks PASS", function () {
  async function deploy() {
    const factory = await ethers.getContractFactory("TestDecisionLib");
    const lib = await factory.deploy();
    await lib.waitForDeployment();
    return lib;
  }

  it("blocks PASS even when all pillars are TRUE", async function () {
    const lib = await deploy();
    const d = await lib.decide(PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE, PILLAR.TRUE, true);
    expect(d).to.equal(DECISION.NO_PASS);
  });

  it("overrides MISSING (would otherwise be HOLD) -> NO_PASS", async function () {
    const lib = await deploy();
    const d = await lib.decide(
      PILLAR.MISSING,
      PILLAR.TRUE,
      PILLAR.TRUE,
      PILLAR.TRUE,
      true,
    );
    expect(d).to.equal(DECISION.NO_PASS);
  });

  it("overrides FALSE+MISSING combinations -> NO_PASS", async function () {
    const lib = await deploy();
    const d = await lib.decide(
      PILLAR.MISSING,
      PILLAR.FALSE,
      PILLAR.TRUE,
      PILLAR.MISSING,
      true,
    );
    expect(d).to.equal(DECISION.NO_PASS);
  });

  it("yields NO_PASS for every pillar combination when contradiction=true", async function () {
    const lib = await deploy();
    for (let r = 0; r < 3; r++) {
      for (let g = 0; g < 3; g++) {
        for (let v = 0; v < 3; v++) {
          for (let c = 0; c < 3; c++) {
            const d = await lib.decide(r, g, v, c, true);
            expect(d, `pillars (${r},${g},${v},${c}) with contradiction=true`).to.equal(
              DECISION.NO_PASS,
            );
          }
        }
      }
    }
  });
});

/**
 * VYRDON RootPass - exhaustive enumeration of the four-pillar law
 *
 * Each pillar has 3 states (FALSE, TRUE, MISSING).
 * Contradiction has 2 states (false, true).
 * Total: 3^4 * 2 = 162 input combinations.
 *
 * The Solidity decision must match the TypeScript reference for every
 * combination. The TS reference is in tests/_helpers.ts and follows the
 * same priority order as RootPassDecisionLib.sol:
 *
 *   1. contradiction         -> NO_PASS
 *   2. any pillar MISSING    -> HOLD
 *   3. any pillar FALSE      -> NO_PASS
 *   4. all pillars TRUE      -> PASS
 *
 * If this test fails, either the Solidity diverged from the doctrine
 * or the doctrine itself must be re-stated. Both are loud failures.
 */

import { expect } from "chai";
import { ethers } from "hardhat";
import {
  PILLAR,
  DECISION,
  expectedDecision,
  pillarLabel,
  decisionLabel,
  type PillarState,
} from "./_helpers";

describe("RootPass: all 162 input combinations match the doctrine", function () {
  it("Solidity decide() matches the TS reference for every input", async function () {
    const factory = await ethers.getContractFactory("TestDecisionLib");
    const lib = await factory.deploy();
    await lib.waitForDeployment();

    const pillarStates: PillarState[] = [PILLAR.FALSE, PILLAR.TRUE, PILLAR.MISSING];

    let counted = 0;
    let passCount = 0;
    let noPassCount = 0;
    let holdCount = 0;

    for (const r of pillarStates) {
      for (const g of pillarStates) {
        for (const v of pillarStates) {
          for (const c of pillarStates) {
            for (const contradiction of [false, true]) {
              const expected = expectedDecision(r, g, v, c, contradiction);
              const actual = Number(await lib.decide(r, g, v, c, contradiction));
              expect(
                actual,
                `inputs root=${pillarLabel(r)} gate=${pillarLabel(g)} ` +
                  `valid=${pillarLabel(v)} certified=${pillarLabel(c)} ` +
                  `contradiction=${contradiction} ` +
                  `expected ${decisionLabel(expected)} got ${actual}`,
              ).to.equal(expected);

              counted++;
              if (expected === DECISION.PASS) passCount++;
              else if (expected === DECISION.NO_PASS) noPassCount++;
              else holdCount++;
            }
          }
        }
      }
    }

    expect(counted).to.equal(162);

    // Doctrinal accounting: exactly one input yields PASS
    // (all four pillars TRUE + no contradiction).
    expect(passCount, "exactly one input combination should yield PASS").to.equal(1);

    // The remaining 161 combinations split between HOLD and NO_PASS.
    expect(holdCount + noPassCount).to.equal(161);
  });
});

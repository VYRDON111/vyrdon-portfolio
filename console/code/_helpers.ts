/**
 * Shared helpers for the RootPass contract test suite.
 *
 * The frozen pillar/decision encoding (must match RootPassDecisionLib.sol):
 *   PILLAR_FALSE   = 0
 *   PILLAR_TRUE    = 1
 *   PILLAR_MISSING = 2
 *
 *   DECISION_NO_PASS = 0
 *   DECISION_PASS    = 1
 *   DECISION_HOLD    = 2
 */

export const PILLAR = {
  FALSE: 0,
  TRUE: 1,
  MISSING: 2,
} as const;

export const DECISION = {
  NO_PASS: 0,
  PASS: 1,
  HOLD: 2,
} as const;

export type PillarState = 0 | 1 | 2;
export type DecisionValue = 0 | 1 | 2;

/**
 * Reference implementation of the four-pillar law, mirrored in TypeScript
 * for cross-checking against the Solidity library.
 *
 * Order of evaluation (must match the Solidity source):
 *   1. contradiction         -> NO_PASS
 *   2. any pillar MISSING    -> HOLD
 *   3. any pillar FALSE      -> NO_PASS
 *   4. all pillars TRUE      -> PASS
 *   5. fail-closed default   -> NO_PASS
 */
export function expectedDecision(
  root: PillarState,
  gate: PillarState,
  valid: PillarState,
  certified: PillarState,
  hasContradiction: boolean,
): DecisionValue {
  if (hasContradiction) return DECISION.NO_PASS;
  if (
    root === PILLAR.MISSING ||
    gate === PILLAR.MISSING ||
    valid === PILLAR.MISSING ||
    certified === PILLAR.MISSING
  ) {
    return DECISION.HOLD;
  }
  if (
    root === PILLAR.FALSE ||
    gate === PILLAR.FALSE ||
    valid === PILLAR.FALSE ||
    certified === PILLAR.FALSE
  ) {
    return DECISION.NO_PASS;
  }
  return DECISION.PASS;
}

export function pillarLabel(s: PillarState): string {
  return s === PILLAR.TRUE ? "TRUE" : s === PILLAR.FALSE ? "FALSE" : "MISSING";
}

export function decisionLabel(d: DecisionValue): string {
  return d === DECISION.PASS ? "PASS" : d === DECISION.NO_PASS ? "NO_PASS" : "HOLD";
}

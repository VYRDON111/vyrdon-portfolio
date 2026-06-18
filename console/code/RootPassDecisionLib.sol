// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

/**
 * @title RootPassDecisionLib
 * @notice Shared decision logic library for RootPass contracts.
 * @dev Encodes the four-pillar law as pure functions.
 *
 * TRUE ROOT = PASS | FALSE ROOT = NO_PASS | MISSING ROOT = HOLD
 */
library RootPassDecisionLib {

    uint8 public constant PILLAR_FALSE = 0;
    uint8 public constant PILLAR_TRUE = 1;
    uint8 public constant PILLAR_MISSING = 2;

    uint8 public constant DECISION_NO_PASS = 0;
    uint8 public constant DECISION_PASS = 1;
    uint8 public constant DECISION_HOLD = 2;

    /**
     * @notice Compute the RootPass decision from four pillar states
     * @param root ROOT pillar (0=FALSE, 1=TRUE, 2=MISSING)
     * @param gate GATE pillar (0=FALSE, 1=TRUE, 2=MISSING)
     * @param valid VALID pillar (0=FALSE, 1=TRUE, 2=MISSING)
     * @param certified CERTIFIED pillar (0=FALSE, 1=TRUE, 2=MISSING)
     * @param hasContradiction Whether a contradiction was detected
     * @return decision The decision (0=NO_PASS, 1=PASS, 2=HOLD)
     */
    function decide(
        uint8 root,
        uint8 gate,
        uint8 valid,
        uint8 certified,
        bool hasContradiction
    ) internal pure returns (uint8 decision) {
        // Rule 1: Contradiction blocks PASS
        if (hasContradiction) {
            return DECISION_NO_PASS;
        }

        // Rule 2: Missing root produces HOLD
        if (root == PILLAR_MISSING || gate == PILLAR_MISSING ||
            valid == PILLAR_MISSING || certified == PILLAR_MISSING) {
            return DECISION_HOLD;
        }

        // Rule 3: Any FALSE produces NO_PASS
        if (root == PILLAR_FALSE || gate == PILLAR_FALSE ||
            valid == PILLAR_FALSE || certified == PILLAR_FALSE) {
            return DECISION_NO_PASS;
        }

        // Rule 4: All TRUE produces PASS
        if (root == PILLAR_TRUE && gate == PILLAR_TRUE &&
            valid == PILLAR_TRUE && certified == PILLAR_TRUE) {
            return DECISION_PASS;
        }

        // Default: NO_PASS (fail-closed)
        return DECISION_NO_PASS;
    }
}

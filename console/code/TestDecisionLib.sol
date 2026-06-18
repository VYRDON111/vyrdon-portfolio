// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "../RootPassDecisionLib.sol";

/**
 * @title TestDecisionLib
 * @notice External wrapper around RootPassDecisionLib.decide().
 * @dev Exists only to expose the internal pure library function to tests.
 *      Not deployed in production paths.
 */
contract TestDecisionLib {
    function decide(
        uint8 root,
        uint8 gate,
        uint8 valid,
        uint8 certified,
        bool hasContradiction
    ) external pure returns (uint8) {
        return RootPassDecisionLib.decide(root, gate, valid, certified, hasContradiction);
    }

    function PILLAR_FALSE() external pure returns (uint8) {
        return RootPassDecisionLib.PILLAR_FALSE;
    }

    function PILLAR_TRUE() external pure returns (uint8) {
        return RootPassDecisionLib.PILLAR_TRUE;
    }

    function PILLAR_MISSING() external pure returns (uint8) {
        return RootPassDecisionLib.PILLAR_MISSING;
    }

    function DECISION_NO_PASS() external pure returns (uint8) {
        return RootPassDecisionLib.DECISION_NO_PASS;
    }

    function DECISION_PASS() external pure returns (uint8) {
        return RootPassDecisionLib.DECISION_PASS;
    }

    function DECISION_HOLD() external pure returns (uint8) {
        return RootPassDecisionLib.DECISION_HOLD;
    }
}

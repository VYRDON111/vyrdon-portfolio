// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "../interfaces/IRootPassVerifier.sol";

/**
 * @title MockVerifier
 * @notice Test-only verifier that returns a configurable (valid, decision).
 * @dev Used by escrow flow tests to drive PASS / NO_PASS / HOLD paths
 *      without depending on a real ZK proof. Never deployed in production.
 */
contract MockVerifier is IRootPassVerifier {
    bool public nextValid;
    uint256 public nextDecision;

    function setNext(bool _valid, uint256 _decision) external {
        nextValid = _valid;
        nextDecision = _decision;
    }

    function verifyProof(
        bytes calldata /* proof */,
        uint256[] calldata /* publicSignals */
    ) external view override returns (bool valid, uint256 decision) {
        return (nextValid, nextDecision);
    }
}

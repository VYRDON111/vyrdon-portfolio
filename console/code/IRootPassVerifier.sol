// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

/**
 * @title IRootPassVerifier
 * @notice Interface for RootPass proof verification.
 * @dev Implement this interface to create custom verifiers.
 */
interface IRootPassVerifier {

    /**
     * @notice Verify a RootPass proof
     * @param proof The proof data
     * @param publicSignals The public signals
     * @return valid Whether the proof is valid
     * @return decision The decision value (0=NO_PASS, 1=PASS, 2=HOLD)
     */
    function verifyProof(
        bytes calldata proof,
        uint256[] calldata publicSignals
    ) external returns (bool valid, uint256 decision);
}

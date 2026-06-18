// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "./interfaces/IRootPassVerifier.sol";

/**
 * @title RootPassVerifier
 * @notice Core verifier contract for RootPass proofs.
 * @dev Wraps the ZK verifier and adds access control,
 *      event logging, and decision recording.
 *
 * This contract does not verify the transaction.
 * It verifies that the proof of the RootPass decision
 * was computed correctly according to the four-pillar law.
 */
contract RootPassVerifier is IRootPassVerifier {

    // Decision constants
    uint256 public constant DECISION_NO_PASS = 0;
    uint256 public constant DECISION_PASS = 1;
    uint256 public constant DECISION_HOLD = 2;

    struct DecisionRecord {
        address submitter;
        uint256 decision;
        bytes32 proofHash;
        uint256 timestamp;
        bool valid;
    }

    uint256 public decisionCount;
    mapping(uint256 => DecisionRecord) public decisions;

    event DecisionRecorded(
        uint256 indexed decisionId,
        address indexed submitter,
        uint256 decision,
        bytes32 proofHash,
        uint256 timestamp
    );

    /**
     * @notice Verify a RootPass proof and record the decision
     * @param proof The ZK proof data
     * @param publicSignals The public signals (decision output)
     * @return valid Whether the proof is valid
     * @return decision The decision value
     */
    function verifyProof(
        bytes calldata proof,
        uint256[] calldata publicSignals
    ) external override returns (bool valid, uint256 decision) {
        require(publicSignals.length >= 1, "Missing public signals");
        decision = publicSignals[0];
        require(decision <= 2, "Invalid decision value");

        // Verify the ZK proof
        valid = _verifyZKProof(proof, publicSignals);

        // Record the decision
        bytes32 proofHash = keccak256(proof);
        uint256 decisionId = decisionCount++;
        decisions[decisionId] = DecisionRecord({
            submitter: msg.sender,
            decision: decision,
            proofHash: proofHash,
            timestamp: block.timestamp,
            valid: valid
        });

        emit DecisionRecorded(decisionId, msg.sender, decision, proofHash, block.timestamp);

        return (valid, decision);
    }

    /**
     * @dev Internal ZK proof verification
     * TODO: Implement actual Groth16 pairing check after trusted setup
     */
    function _verifyZKProof(
        bytes calldata /* proof */,
        uint256[] calldata /* publicSignals */
    ) internal pure returns (bool) {
        // Placeholder — replace with generated verifier from snarkjs
        return false;
    }

    /**
     * @notice Look up a recorded decision
     */
    function getDecision(uint256 decisionId) external view returns (
        address submitter,
        uint256 decision,
        bytes32 proofHash,
        uint256 timestamp,
        bool valid
    ) {
        DecisionRecord storage record = decisions[decisionId];
        return (record.submitter, record.decision, record.proofHash, record.timestamp, record.valid);
    }
}

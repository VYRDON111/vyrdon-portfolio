// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "./interfaces/IRootPassVerifier.sol";

/**
 * @title RootPassEscrow
 * @notice Holds funds until a valid RootPass PASS is proved.
 * @dev Funds are released only when:
 *      1. A valid ZK proof is submitted
 *      2. The proof decision is PASS (1)
 *      3. The timelock delay has elapsed
 *      4. The circuit breaker is not tripped
 *
 * No root, no pass. No pass, no release.
 */
contract RootPassEscrow {

    struct Escrow {
        address depositor;
        address beneficiary;
        uint256 amount;
        bytes32 claimId;
        uint256 depositTime;
        uint256 timelockDuration;
        EscrowState state;
    }

    enum EscrowState {
        ACTIVE,      // Funds deposited, awaiting proof
        RELEASED,    // PASS proved, funds released to beneficiary
        RETURNED,    // NO_PASS proved, funds returned to depositor
        HELD,        // HOLD — waiting for missing root
        EXPIRED      // Timeout reached without resolution
    }

    IRootPassVerifier public verifier;
    uint256 public escrowCount;
    mapping(uint256 => Escrow) public escrows;

    // Circuit breaker
    bool public circuitBreakerTripped;
    uint256 public anomalyCount;
    uint256 public constant ANOMALY_THRESHOLD = 10;

    event EscrowCreated(uint256 indexed escrowId, address depositor, address beneficiary, uint256 amount);
    event EscrowReleased(uint256 indexed escrowId, uint256 amount);
    event EscrowReturned(uint256 indexed escrowId, uint256 amount);
    event EscrowHeld(uint256 indexed escrowId, string reason);
    event CircuitBreakerTripped(uint256 anomalyCount);

    modifier notTripped() {
        require(!circuitBreakerTripped, unicode"Circuit breaker is tripped — operations halted");
        _;
    }

    constructor(address _verifier) {
        verifier = IRootPassVerifier(_verifier);
    }

    /**
     * @notice Deposit funds into escrow
     */
    function deposit(
        address beneficiary,
        bytes32 claimId,
        uint256 timelockDuration
    ) external payable notTripped returns (uint256 escrowId) {
        require(msg.value > 0, "No funds deposited");
        require(beneficiary != address(0), "Invalid beneficiary");

        escrowId = escrowCount++;
        escrows[escrowId] = Escrow({
            depositor: msg.sender,
            beneficiary: beneficiary,
            amount: msg.value,
            claimId: claimId,
            depositTime: block.timestamp,
            timelockDuration: timelockDuration,
            state: EscrowState.ACTIVE
        });

        emit EscrowCreated(escrowId, msg.sender, beneficiary, msg.value);
    }

    /**
     * @notice Submit a RootPass proof to release or return escrow
     */
    function submitProof(
        uint256 escrowId,
        bytes calldata proof,
        uint256[] calldata publicSignals
    ) external notTripped {
        Escrow storage escrow = escrows[escrowId];
        require(escrow.state == EscrowState.ACTIVE || escrow.state == EscrowState.HELD, "Escrow not active");

        (bool valid, uint256 decision) = verifier.verifyProof(proof, publicSignals);
        require(valid, "Proof verification failed");

        if (decision == 1) {
            // PASS — check timelock
            require(
                block.timestamp >= escrow.depositTime + escrow.timelockDuration,
                "Timelock not elapsed"
            );
            escrow.state = EscrowState.RELEASED;
            payable(escrow.beneficiary).transfer(escrow.amount);
            emit EscrowReleased(escrowId, escrow.amount);

        } else if (decision == 0) {
            // NO_PASS — return to depositor
            escrow.state = EscrowState.RETURNED;
            payable(escrow.depositor).transfer(escrow.amount);
            emit EscrowReturned(escrowId, escrow.amount);
            _recordAnomaly();

        } else if (decision == 2) {
            // HOLD — waiting for missing root
            escrow.state = EscrowState.HELD;
            emit EscrowHeld(escrowId, unicode"Missing root — awaiting evidence");
        }
    }

    function _recordAnomaly() internal {
        anomalyCount++;
        if (anomalyCount >= ANOMALY_THRESHOLD) {
            circuitBreakerTripped = true;
            emit CircuitBreakerTripped(anomalyCount);
        }
    }
}

// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

/**
 * @title RootPassTimelock
 * @notice Enforces minimum delay before critical operations.
 * @dev Operations are queued with a timelock and can only be
 *      executed after the delay period. This prevents premature
 *      action and allows time for review.
 *
 * No rush releases. Evidence first, then time, then action.
 */
contract RootPassTimelock {

    struct TimelockEntry {
        bytes32 operationHash;
        uint256 queuedAt;
        uint256 delay;
        bool executed;
        bool cancelled;
    }

    uint256 public entryCount;
    mapping(uint256 => TimelockEntry) public entries;
    mapping(bytes32 => uint256) public operationToEntry;

    uint256 public minimumDelay;
    uint256 public maximumDelay;
    address public guardian;

    event OperationQueued(uint256 indexed entryId, bytes32 operationHash, uint256 executeAfter);
    event OperationExecuted(uint256 indexed entryId, bytes32 operationHash);
    event OperationCancelled(uint256 indexed entryId, bytes32 operationHash);

    modifier onlyGuardian() {
        require(msg.sender == guardian, "Only guardian");
        _;
    }

    constructor(uint256 _minimumDelay, uint256 _maximumDelay, address _guardian) {
        require(_minimumDelay <= _maximumDelay, "Invalid delay range");
        minimumDelay = _minimumDelay;
        maximumDelay = _maximumDelay;
        guardian = _guardian;
    }

    /**
     * @notice Queue an operation with a timelock
     */
    function queue(bytes32 operationHash, uint256 delay) external onlyGuardian returns (uint256 entryId) {
        require(delay >= minimumDelay, "Delay below minimum");
        require(delay <= maximumDelay, "Delay above maximum");
        require(operationToEntry[operationHash] == 0, "Operation already queued");

        entryId = ++entryCount;
        entries[entryId] = TimelockEntry({
            operationHash: operationHash,
            queuedAt: block.timestamp,
            delay: delay,
            executed: false,
            cancelled: false
        });
        operationToEntry[operationHash] = entryId;

        emit OperationQueued(entryId, operationHash, block.timestamp + delay);
    }

    /**
     * @notice Execute a queued operation after the delay
     */
    function execute(uint256 entryId) external onlyGuardian {
        TimelockEntry storage entry = entries[entryId];
        require(!entry.executed, "Already executed");
        require(!entry.cancelled, "Cancelled");
        require(block.timestamp >= entry.queuedAt + entry.delay, "Timelock not elapsed");

        entry.executed = true;
        emit OperationExecuted(entryId, entry.operationHash);
    }

    /**
     * @notice Cancel a queued operation
     */
    function cancel(uint256 entryId) external onlyGuardian {
        TimelockEntry storage entry = entries[entryId];
        require(!entry.executed, "Already executed");
        require(!entry.cancelled, "Already cancelled");

        entry.cancelled = true;
        emit OperationCancelled(entryId, entry.operationHash);
    }

    /**
     * @notice Check if an operation is ready to execute
     */
    function isReady(uint256 entryId) external view returns (bool) {
        TimelockEntry storage entry = entries[entryId];
        return !entry.executed && !entry.cancelled && block.timestamp >= entry.queuedAt + entry.delay;
    }
}

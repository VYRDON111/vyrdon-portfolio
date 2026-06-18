# Timelock Mechanism

## Purpose

Prevent premature action by enforcing a minimum delay between decision and execution.

## How It Works

1. Decision produced by RootPass evaluation
2. Decision queued with a timelock delay
3. During the delay: parties can review, challenge, or provide additional evidence
4. After the delay: action can be executed
5. Action cannot be executed before the delay expires

## Configuration

- Minimum delay: set per claim type
- Maximum delay: set per claim type
- Delay can be extended by escalation
- Delay cannot be shortened (no fast-track)

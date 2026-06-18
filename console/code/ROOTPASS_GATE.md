# RootPass Gate

## The Gate

The RootPass gate sits between decision and action. No action passes through without a proved decision.

## Gate Logic

```
function enforceGate(decision, proof, preconditions):
    if not verifyProof(proof):
        return REJECT("invalid proof")
    if decision == PASS:
        if not timelockElapsed():
            return REJECT("timelock not elapsed")
        if circuitBreakerTripped():
            return REJECT("circuit breaker active")
        if not multiSigMet():
            return REJECT("multi-sig threshold not met")
        return RELEASE()
    if decision == NO_PASS:
        return RETURN()
    if decision == HOLD:
        return WAIT()
    return REJECT("unknown decision")
```

## Gate Properties

- The gate is stateless — it evaluates each request independently
- The gate is deterministic — same input, same output
- The gate is fail-closed — any error results in rejection, not release

# Proof Stack

| Level | Method | Tool | What It Proves | Maturity |
|---|---|---|---|---|
| 1 | Formal verification | TLA+ | Decision logic is correct for all inputs | AUDIT-READY (486 states, 0 violations) |
| 2 | Zero-knowledge proof | Circom | Intended: decision verifiable without revealing evidence | REFERENCE — present as a reference artifact but not operationally complete; production ZK capability remains planned |
| 3 | Smart contract enforcement | Solidity | Decision has financial consequences | REVIEW-READY (DecisionLib + Timelock + IVerifier, with 162-combination + escrow flow tests in CI); REFERENCE (Verifier, Escrow) |
| 4 | Evidence ledger | Append-only log | Every decision is recorded immutably | REFERENCE (schema landed; runtime ledger not public) |
| 5 | Open review | Public repos | Anyone can challenge the system | REVIEW-READY (templates + queues open) |

See [`vyrdon-portfolio/docs/AUDIT_READINESS.md`](../docs/AUDIT_READINESS.md) for the per-artifact matrix and [`vyrdon-rootpass-proof/docs/PROOF_LIMITS.md`](https://github.com/VYRDON111/vyrdon-rootpass-proof/blob/initial-build/docs/PROOF_LIMITS.md) for the exact gaps.

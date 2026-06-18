# Payout Path

## When Payout Is Triggered

A payout occurs when:
1. RootPass decision is PASS
2. Timelock delay has elapsed
3. Circuit breaker is clear
4. Multi-signature threshold met (if applicable)

## Payout Process

1. PASS decision and proof verified
2. Pre-conditions checked (timelock, circuit breaker, multi-sig)
3. Escrow state changed to RELEASED
4. Funds transferred to beneficiary
5. Certificate issued
6. Payout event logged with decision and proof references
7. Evidence record finalized

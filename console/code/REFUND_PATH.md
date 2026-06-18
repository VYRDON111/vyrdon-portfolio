# Refund Path

## When Refund Is Triggered

A refund occurs when:
1. RootPass decision is NO_PASS
2. Escrow is in ACTIVE or HELD state
3. No valid PASS proof has been submitted

## Refund Process

1. NO_PASS decision verified
2. Escrow state changed to RETURNED
3. Funds transferred to depositor
4. Refund event logged with decision reference
5. Evidence record finalized

## Refund Is Not Punishment

A refund means the proof chain did not support PASS. It is a measurement outcome, not a judgment.

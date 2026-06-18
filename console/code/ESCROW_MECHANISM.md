# Escrow Mechanism

## How Escrow Works

1. Depositor sends funds to the escrow contract
2. Funds are locked until a RootPass decision is proved
3. PASS → funds released to beneficiary
4. NO_PASS → funds returned to depositor
5. HOLD → funds remain until resolution or timeout

## Escrow States

| State | Meaning |
|---|---|
| ACTIVE | Funds deposited, awaiting proof |
| RELEASED | PASS proved, funds sent to beneficiary |
| RETURNED | NO_PASS proved, funds returned to depositor |
| HELD | HOLD — waiting for missing root |
| EXPIRED | Timeout reached, funds returned |

## Escrow Security

- Only the escrow contract can move funds
- No party can unilaterally withdraw
- Release requires a verified proof
- All state transitions are logged

# Release Path

## Release vs. Payout

Release is the general mechanism for moving funds out of escrow. Payout is a specific type of release to a beneficiary. Other release types include refund (to depositor) and settlement (to multiple parties).

## Release Pre-Conditions

All releases require:
1. A verified RootPass decision
2. Timelock elapsed (for PASS releases)
3. Circuit breaker clear
4. Evidence record written atomically

## Release Is Final

Once funds leave escrow, the release cannot be reversed by the mechanism. The release record is immutable.

# Use Cases

## 1. Payment Dispute Resolution
A customer claims they didn't receive a refund. The merchant claims it was sent. RootPass evaluates the evidence chain and identifies whether the proof chain supports the claim.

## 2. Exchange Deposit Verification
A user deposits crypto but the exchange balance doesn't update. RootPass identifies the state contradiction between the on-chain deposit and the exchange records.

## 3. Wire Transfer Confirmation
A bank wire is sent but the receiver bank hasn't confirmed. RootPass detects the missing root and issues HOLD until both sides confirm.

## 4. Escrow Release Control
Funds in escrow should only release on PASS. The smart contract enforces this with ZK proof verification and timelock delays.

## 5. Settlement Reconciliation
End-of-day settlement amounts must match processed transactions. RootPass evaluates the proof chain for completeness and consistency.

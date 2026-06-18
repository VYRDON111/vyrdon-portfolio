# RootPass Invariants

Invariants that the TLA+ model checker verifies hold in all reachable states.

## Invariant 1: Mutual Exclusion

PASS and NO_PASS are never both true in any reachable state.

```
MutualExclusion == ~(decision = "PASS" /\ decision = "NO_PASS")
```

## Invariant 2: Contradiction Safety

If a contradiction is detected, PASS is unreachable.

```
ContradictionSafety == contradiction = TRUE => decision ≠ "PASS"
```

## Invariant 3: Missing Root Safety

If any required root is missing, PASS is unreachable.

```
MissingRootSafety == (root = "MISSING" ∨ gate = "MISSING" ∨ valid = "MISSING" ∨ certified = "MISSING") => decision ≠ "PASS"
```

## Invariant 4: Completeness (PASS)

If all pillars are TRUE and no contradiction exists, the decision must be PASS.

```
CompletenessPass == (all_pillars_true ∧ ¬contradiction) => decision = "PASS"
```

## Invariant 5: Termination

Every evaluation that reaches the DECIDED phase has a decision in {PASS, NO_PASS, HOLD}.

```
Termination == phase = "DECIDED" => decision ∈ {"PASS", "NO_PASS", "HOLD"}
```

## How to Verify

Run the TLC model checker against `rootpass.tla` with all five invariants. The checker will explore every reachable state and confirm that no invariant is violated.

# Formal Model Assumptions

The TLA+ specification makes the following assumptions. Each is open to challenge.

## Assumption 1: Pillars Are Independent

The model assumes each pillar (ROOT, GATE, VALID, CERTIFIED) can be evaluated independently. In practice, there may be dependencies between pillars.

## Assumption 2: Contradiction Is Binary

The model assumes contradiction is either present or absent. It does not model degrees of contradiction or partial conflicts.

## Assumption 3: Missing Is Distinct From False

The model treats MISSING as a third state distinct from FALSE. MISSING produces HOLD, not NO_PASS. This is a design choice, not a logical necessity.

## Assumption 4: Evaluation Is Atomic

The model assumes the evaluation happens in a single step. In practice, evidence may arrive incrementally.

## Assumption 5: No External State Changes During Evaluation

The model assumes the pillar states do not change during evaluation. In a real system, evidence could be revoked or updated during the evaluation window.

## How to Challenge

If any assumption does not hold for your use case, open an issue referencing the assumption number and describe the scenario.

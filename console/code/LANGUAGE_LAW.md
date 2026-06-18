# VYRDON Language Law

## Locked Form

```
Surface   := LEET
Inner     := GEMATRIA
Canonical := ROOT_ABC
Build     := PYTHON
Verify    := PYTHON
Deploy    := AUDITABLE_ONLY
JSFUCK    := FORBIDDEN
```

---

## Architecture

### 1. Surface Layer — What is written

The authoring language uses symbolic notation for human-readable rules.

- Symbolic naming
- Sentence-law
- Root-native symbols
- Operator tokens (+, :=, ->, NOT)

### 2. Inner Layer — What gives symbolic structure

Interpretation support layer. Provides classification, grouping, and symbolic equivalence.

This layer is interpretation support, not deployment truth.

Inner layer may:
- Classify
- Map
- Weight
- Group
- Symbolize

Inner layer may not:
- Override ROOT truth
- Override PASS truth
- Invent execution permission

### 3. Canonical Layer — What the system enforces

The true control layer.

- Normalized tokens
- Normalized predicates
- One PASS law
- One NOPASS inverse
- One HARD_STOP rule

### 4. Build Layer

Python shall:
- Parse
- Normalize
- Map surface tokens to canonical tokens
- Validate symbol dictionary
- Reject ambiguity
- Generate runtime forms

### 5. Verify Layer

Python shall:
- Confirm no token drift
- Confirm truth-table consistency
- Confirm PASS is defined once
- Confirm NOPASS := NOT PASS
- Confirm forbidden constructs are absent

### 6. Deploy Layer

Auditable only:
- No opaque runtime
- No hidden codegen
- No silent mutation
- No unaudited wrapper promotion

### 7. Forbidden Layer

No obfuscated constructs in source, transform, or deploy path.

---

## Canonical Normalization

Every surface token normalizes to exactly one canonical token.

No surface token may map to two meanings. If ambiguity exists, reject the token.

If symbolic weight disagrees with canonical law, canonical law wins.

If build output changes law meaning, reject build.

---

## Verification Tests

### Test 1: Determinism
The same source twice shall normalize to identical canonical output.

### Test 2: Hard Stop
ROOT.FALSE shall always produce PASS.FALSE and HARD_STOP.TRUE.

### Test 3: Forbidden Syntax
Any build output containing forbidden syntax class shall fail.

### Test 4: Audit Requirement
Any runtime artifact without audit record shall fail deploy.

### Test 5: Obfuscation Ban
Any attempt to use obfuscated constructs in source, transform, or deploy path shall fail immediately.

---

## Control Law

```
ROOT.FALSE  -> PASS.FALSE
GATE.FALSE  -> PASS.FALSE
VALID.FALSE -> PASS.FALSE
CERTIFIED.FALSE -> PASS.FALSE

ROOT.TRUE + GATE.TRUE + VALID.TRUE + CERTIFIED.TRUE -> PASS.TRUE

NOPASS    := NOT PASS
HARD_STOP := ROOT.FALSE
```

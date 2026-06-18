# Four-Pillar Law

## The Law

```
ROOT.FALSE   -> PASS.FALSE
GATE.FALSE   -> PASS.FALSE
VALID.FALSE  -> PASS.FALSE
CERTIFIED.FALSE -> PASS.FALSE

ROOT.TRUE + GATE.TRUE + VALID.TRUE + CERTIFIED.TRUE -> PASS.TRUE

NOPASS    := NOT PASS
HARD_STOP := ROOT.FALSE
```

This is the fail-closed enforcement rule.

No pillar may be bypassed. No pillar may be overridden. No pillar may be ignored.

---

## Four Pillars

| Pillar | What it proves | If FALSE |
|--------|---------------|----------|
| **ROOT** | The root condition exists and is TRUE | PASS.FALSE — hard stop |
| **GATE** | The gate is certified and open | PASS.FALSE |
| **VALID** | The claim is valid against evidence | PASS.FALSE |
| **CERTIFIED** | The certification chain is complete | PASS.FALSE |

---

## Fail-Closed Behavior

The system is fail-closed by design:

- If **any** pillar is FALSE → PASS.FALSE
- If **any** pillar is MISSING → HOLD (cannot evaluate)
- PASS.TRUE requires **all four** pillars TRUE simultaneously
- Contradiction detected at **any** stage → PASS.FALSE regardless of pillar states

There is no "mostly true" state. There is no "close enough" state.

```
TRUE ROOT  = PASS
FALSE ROOT = NO_PASS
MISSING ROOT = HOLD
```

---

## Hard Rule

The most important single rule in the system:

```
ROOT.FALSE -> PASS.FALSE
```

If ROOT is FALSE, nothing else is evaluated. PASS is FALSE. This is the hard stop.

ROOT is the anchor for all other truth. GATE depends on ROOT. VALID depends on ROOT. CERTIFIED depends on ROOT.

---

## Color Is Not Truth

```
COLOR_ZONE := FALSE
RED        := NOPASS
YELLOW     := NOPASS
GREEN      := NOPASS
```

Traffic-light status indicators (red, yellow, green) do not determine truth.

A transaction with a "green" status can still be NOPASS if ROOT is FALSE.
A transaction with a "red" status is NOPASS — but so is yellow, and so is green without root.

Only the four pillars determine PASS. Status colors are display artifacts, not truth signals.

---

## Complement Law

```
PASS.FALSE := NOT PASS.TRUE
NOPASS     := PASS.FALSE
```

PASS and NOPASS are exact complements. There is no state where both are true. There is no state where neither is defined.

---

## Model-Checked Properties

These properties are proved by exhaustive state-space model checking, not assumed:

1. **Mutual Exclusion** — PASS and NO_PASS are never both true for the same input
2. **Contradiction Safety** — If contradiction exists, PASS is impossible
3. **Missing Root Safety** — If any required root is missing, PASS is impossible
4. **Completeness** — If all pillars TRUE and no contradiction, decision is PASS
5. **Termination** — Every evaluation produces exactly one decision

---

## Frozen Lexicon

The following 12 tokens are canonical and frozen:

```
ROOT.TRUE
ROOT.FALSE
GATE.TRUE
GATE.FALSE
VALID.TRUE
VALID.FALSE
CERTIFIED.TRUE
CERTIFIED.FALSE
PASS.TRUE
PASS.FALSE
NOPASS
HARD_STOP
```

No new tokens may be introduced that alter the meaning of these 12.
No existing token may be redefined.

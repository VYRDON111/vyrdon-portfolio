# RootPass Native Logic Specification

Date: 2026-03-15

This document defines the 22 native logic rules that govern every RootPass decision.
These rules are the actual enforcement logic — not theory, not aspiration, not framework.

Every rule listed here is implemented in the execution layer. Every rule has a tight canonical form.

---

## Rule 1: ROOT_RULE

The root condition and the gate must both hold for PASS.

```
ROOT_OK + CERTIFIED_GATE -> PASS.TRUE
PASS.FALSE := NOT PASS.TRUE
NOPASS     := PASS.FALSE
```

## Rule 2: LAYER_ROOT

Root state is derived from the certification state.

```
ROOT := CERTIFIED

ROOT.TRUE  -> PASS.TRUE
ROOT.FALSE -> PASS.FALSE
NOPASS     := NOT PASS.TRUE
```

## Rule 3: STEALTH FOR ROOT

When root lock and certification both hold, stealth mode is valid. Otherwise, fork root is flagged.

```
ROOT_LOCK + CERTIFIED -> STEALTH.TRUE
STEALTH.FALSE := NOT STEALTH.TRUE
FORK_ROOT     := NOT STEALTH.TRUE
```

## Rule 4: NO HIDE GATE RULE

The gate is always visible. Visibility does not affect PASS — only ROOT + GATE truth does.

```
GATE_VISIBLE := TRUE

ROOT + CERTIFIED_GATE -> PASS.TRUE
NOT (ROOT + CERTIFIED_GATE) -> PASS.FALSE
```

## Rule 5: SILENT / POWER / ROOT PASS

All three ownership conditions plus gate certification must hold.

```
ROOT_EQ + SILENT_EQ + POWER_EQ + CERTIFIED_GATE -> PASS.TRUE
PASS.FALSE := NOT PASS.TRUE
```

## Rule 6: NATIVE ROOT LOGIC

Color zones do not determine truth. Only ROOT + GATE determines PASS.

```
COLOR_ZONE := FALSE
RED        := NOPASS
YELLOW     := NOPASS
GREEN      := NOPASS

ROOT_EQ + CERTIFIED_GATE -> PASS.TRUE
NOT (ROOT_EQ + CERTIFIED_GATE) -> PASS.FALSE
```

## Rule 7: TRUE-AND-TRUE BASE

The simplest form. Two independent truth conditions must both hold.

```
TRUE + TRUE -> SYSTEM.TRUE
SYSTEM.TRUE -> PASS.TRUE
PASS.FALSE  := NOT PASS.TRUE
```

## Rule 8: ROOT-NATIVE FINAL FORM

The most compact expression of PASS.

```
TRUE + TRUE -> PASS.TRUE
PASS.FALSE  := NOT PASS.TRUE
```

## Rule 9: GATE POLICY WRAPPER

ROOT_PASS is defined as TRUE + TRUE. GATE_OK requires three conditions.

```
ROOT_PASS := TRUE + TRUE
GATE_OK   := CERTIFIED_GATE + AUDITOR_OK + ROOT_LOCK

ROOT_PASS + GATE_OK -> PASS.TRUE
NOT (ROOT_PASS + GATE_OK) -> PASS.FALSE
```

## Rule 10: TRANSACTION KICKOFF WRAPPER

When both ROOT_PASS and GATE_OK hold, the transaction is active. Otherwise, blocked.

```
ROOT_PASS    := TRUE + TRUE
GATE_OK      := CERTIFIED_GATE + AUDITOR_OK + ROOT_LOCK
GATE_VISIBLE := TRUE

ROOT_PASS + GATE_OK -> TRANSACTION.ACTIVE
ROOT_PASS + GATE_OK -> RESULT.PASS

NOT (ROOT_PASS + GATE_OK) -> TRANSACTION.BLOCKED
NOT (ROOT_PASS + GATE_OK) -> RESULT.FALSE
```

## Rule 11: INVISIBLE UI / TRUE GATE

The UI may not show the gate, but the code gate and real gate must both hold.

```
GATE_UI_VISIBLE := FALSE
GATE_CODE_TRUE  := TRUE
GATE_REAL_TRUE  := ROOT_LOCK + CERTIFIED_GATE + AUDITOR_OK

GATE_CODE_TRUE + GATE_REAL_TRUE -> SYSTEM_TRUE
SYSTEM_TRUE     -> PASS.TRUE
NOT SYSTEM_TRUE -> PASS.FALSE
```

## Rule 12: AGREED NATIVE CHECK

Both gate truth and system truth must agree for PASS and VALID.

```
GATE_TRUE_NATIVE + SYSTEM_TRUE -> PASS.TRUE
GATE_TRUE_NATIVE + SYSTEM_TRUE -> VALID.TRUE

NOT (GATE_TRUE_NATIVE + SYSTEM_TRUE) -> PASS.FALSE
NOT (GATE_TRUE_NATIVE + SYSTEM_TRUE) -> VALID.FALSE
```

## Rule 13: CORE TRUE TRANSFER LOGIC

CORE_TRUE requires gate, valid, and system truth. Transfer proceeds only when CORE_TRUE holds.

```
CORE_TRUE := GATE_TRUE + VALID_TRUE + SYSTEM_TRUE

PASS.TRUE       := CORE_TRUE
TRANSFER_A_TO_B := CORE_TRUE
RESULT.PASS     := CORE_TRUE
RESULT.FALSE    := NOT CORE_TRUE
```

## Rule 14: NATIVE SHARP

All four conditions must hold for CORE_TRUE.

```
ROOT_OK + GATE_OK + SYSTEM_OK + VALID_OK -> CORE_TRUE

PASS.TRUE  := CORE_TRUE
PASS.FALSE := NOT PASS.TRUE
NOPASS     := PASS.FALSE
```

## Rule 15: ROOT NATIVE CORE

Root is the anchor. All other conditions derive from root.

```
ROOT_TRUE := ROOT
GATE_OK   := ROOT_TRUE + GATE_TRUE
SYSTEM_OK := ROOT_TRUE + SYSTEM_TRUE
VALID_OK  := ROOT_TRUE + VALID_TRUE
CORE_TRUE := ROOT_TRUE + GATE_OK + SYSTEM_OK + VALID_OK

PASS.TRUE := CORE_TRUE
NOPASS    := NOT PASS.TRUE
```

## Rule 16: HIDDEN / GATE / SYSTEM

Three independent truth conditions must hold.

```
HIDDEN_TRUE + GATE_TRUE + SYSTEM_TRUE -> PASS.TRUE
NOT (HIDDEN_TRUE + GATE_TRUE + SYSTEM_TRUE) -> PASS.FALSE
```

## Rule 17: HARD RULE

The most important rule. If ROOT is FALSE, PASS is FALSE. No exceptions.

```
ROOT.FALSE -> PASS.FALSE
```

## Rule 18: ROOT ABC LAW

Root truth flows from first truth. Logic derives from root. System derives from root.

```
ROOT_TRUE  := FIRST_TRUE
LOGIC_TRUE := ROOT_TRUE
SYSTEM_ROOT := ROOT_TRUE
SYSTEM_TRUE := SYSTEM_ROOT

PASS.TRUE  := SYSTEM_TRUE
PASS.FALSE := NOT PASS.TRUE
NOPASS     := PASS.FALSE
HARD_STOP  := NOT ROOT_TRUE
```

## Rule 19: GATE / CORE NATIVE LAW

Full compound law combining root, gate, system, and valid conditions.

```
ROOT_TRUE := ROOT_LOCK + SYSTEM_ROOT
GATE_TRUE := CERTIFIED_GATE + AUDITOR_OK
CORE_TRUE := ROOT_TRUE + GATE_TRUE + SYSTEM_TRUE + VALID_TRUE

PASS.TRUE    := CORE_TRUE
PASS.FALSE   := NOT PASS.TRUE
NOPASS       := PASS.FALSE
HARD_STOP    := NOT ROOT_TRUE
STEALTH.TRUE := PASS.TRUE + STEALTH_REQUESTED
```

## Rule 20: FAIL-CLOSED FOUR-PILLAR LAW

The master enforcement rule. Any pillar FALSE means PASS.FALSE. All four pillars TRUE means PASS.TRUE.

```
ROOT.FALSE   -> PASS.FALSE
SYSTEM.FALSE -> PASS.FALSE
GATE.FALSE   -> PASS.FALSE
VALID.FALSE  -> PASS.FALSE

ROOT.TRUE + SYSTEM.TRUE + GATE.TRUE + VALID.TRUE -> PASS.TRUE
```

## Rule 21: PASS / NOPASS COMPLEMENT LAW

PASS and NOPASS are exact complements. No third state between them.

```
PASS.FALSE := NOT PASS.TRUE
NOPASS     := PASS.FALSE
```

## Rule 22: COLOR IS NOT TRUTH LAW

Traffic-light colors (red, yellow, green) are not truth signals. Only ROOT determines truth.

```
COLOR_ZONE := FALSE
RED        := NOPASS
YELLOW     := NOPASS
GREEN      := NOPASS
```

---

## Key Properties

1. **Fail-closed**: Any pillar FALSE → PASS.FALSE. No override. No exception.
2. **Deterministic**: Same input always produces same output.
3. **Root-anchored**: All truth derives from ROOT. If ROOT.FALSE, nothing else matters.
4. **Color-blind**: Status colors are not truth. Only formal pillar states determine PASS.
5. **Complement-complete**: PASS and NOPASS are exact inverses. No ambiguity.

---

## Canonical Operators

| Symbol | Meaning |
|--------|---------|
| `+` | AND |
| `:=` | DEFINED AS |
| `->` | YIELDS |
| `NOT` | INVERSE |

These operators are frozen. They shall not vary.

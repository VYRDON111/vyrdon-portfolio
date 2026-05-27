# VYRDON Overview

VYRDON is a **Root Language system** for high-risk movement.

VYRDON is not a gate. The Gate is one compiled control surface generated from Root Language. The same language compiles to other surfaces: validators, schemas, decision engines, custody seals, archive primitives, consoles.

> **Public sentence.** VYRDON does not sell a gate. VYRDON writes the language that gates high-risk movement.

> **Technical sentence.** The Gate is a compiled control surface of VYRDON Root Language.

## The Law

```
NO ROOT = NO PASS
```

Expanded: **TRUE ROOT = PASS. FALSE ROOT = NO_PASS. MISSING ROOT = HOLD.**

The full four-pillar law and decision-priority rules live in `vyrdon-methodology/docs/SEALED_LAW.md` and `LAW_SYSTEM.md`. The Root Language vocabulary and 9-section case design live in `vyrdon-methodology/docs/ROOT_LANGUAGE.md`. The systemic claim — that VYRDON is a language, not a gate — lives in `vyrdon-methodology/docs/ROOT_LANGUAGE_PRINCIPLE.md`.

## What Root Language Generates

Eight code classes (per `ROOT_LANGUAGE_PRINCIPLE.md` §2). Each compiles to one or more concrete surfaces:

| Code class | Compiled surface (audit/review form) |
|---|---|
| Decision codes | `DecisionLib.sol` (REVIEW-READY, audit needed) + TLA+ spec (AUDIT-READY) + planned TS reference |
| Proof codes | ZK Verifier (REFERENCE — not operationally complete) + proof schemas |
| Route codes | `vyrdon-mechanism/mechanism/ROUTE_LAW.md` (REVIEW-READY doctrine) |
| Custody codes | `vyrdon-mechanism/mechanism/CODE_HASH_SEAL.md` (REVIEW-READY doctrine) + evidence custody primitives |
| Seal codes | Escrow + archive primitives (REFERENCE) |
| Authority codes | Human red seal grammar (PLANNED) |
| Evidence codes | `evidence.schema.json` + claim schemas (REVIEW-READY) |
| Governance codes | Language change-control (PLANNED) |

## Two-Layer Protection

A frequent critique of any RootPass / Gate doctrine is "it only protects the surface." Root Language answers with two sealing layers:

| Layer | What is sealed | Root Language artifact |
|---|---|---|
| **Surface seal** (the door) | Inbound requests, credentials, evidence at intake | `mechanism/ROUTE_LAW.md` — Window Principle, Invisible House Principle, Surface/Core split, Route Rule |
| **Build seal** (the bricks) | The code that runs the verifiers, validators, schemas, decision engines | `mechanism/CODE_HASH_SEAL.md` — signed manifest + verification-on-load + key custody |

A compromise of the door is caught by Route Rule. A compromise of the bricks is caught by Code Hash Seal. The doctrine seals both.

## The Repo Family (Audit/Review)

1. **Methodology** — the language itself (vocabulary, four-pillar law, principle, case design)
2. **Mechanism** — how the language compiles to gate / route / enforcement / safeguards
3. **Proof** — concrete code artifacts (Solidity contracts, TLA+ specification, ZK reference)
4. **Cases** — worked examples of the language applied to realistic claims
5. **Technology** — the schemas, events, endpoints, and code-artifact map compiled from Root Language
6. **Registry** — the decision-code, claim-type, contradiction-type, evidence-type catalogs
7. **Portfolio** — this front door (audit-readiness, operational-evidence, system architecture)
8. **Commercial** — the commercial form of the language with explicit guardrails
9. **Open Review** — the critique surface that asks whether each compiled surface faithfully represents the language

## What VYRDON Does Not Claim

- not a guarantee of fraud prevention — Root Language reduces False Root and Missing Root failures; it does not eliminate adversaries
- not bank, court, or regulator certification — institutions may review Root Language outputs but do not certify the language
- not production-readiness for compiled surfaces — readiness is per-repo and per-artifact, recorded in `vyrdon-portfolio/docs/AUDIT_READINESS.md`
- not a runtime that this PR series deploys — the audit/review repos hold the doctrine; deployment is a separate operational question

## What VYRDON Does Claim

- Root Language is reproducible — anyone reading the methodology should reach the same compiled surfaces from the same inputs
- compiled surfaces fail-closed — unknown or unproven states default to NO_PASS or HOLD, not to PASS
- the language outranks any single compiled surface — a gate that disagrees with the language is wrong, not authoritative
- two-layer sealing is the answer to "only protects the surface" — Route Law plus Code Hash Seal

## Doctrine Lines

- *Surface status is not Root truth.*
- *Machine green is not execution authority.*
- *No proof path, no custody seal, no archive finality, no human red seal — no pass.*
- *No blind movement.*
- *VYRDON does not pick a winner when evidence contradicts; it returns NO_PASS or HOLD.*
- *VYRDON does not only seal the door. VYRDON seals the bricks.*

## Read In This Order

1. `vyrdon-methodology/docs/ROOT_LANGUAGE_PRINCIPLE.md` — systemic claim
2. `vyrdon-methodology/docs/ROOT_LANGUAGE.md` — vocabulary + case design
3. `vyrdon-mechanism/mechanism/ROUTE_LAW.md` — surface-layer mechanism
4. `vyrdon-mechanism/mechanism/CODE_HASH_SEAL.md` — build-layer mechanism
5. `vyrdon-cases/cases/populated/README.md` — worked examples
6. `vyrdon-portfolio/docs/AUDIT_READINESS.md` — per-artifact maturity
7. `vyrdon-portfolio/docs/OPERATIONAL_EVIDENCE.md` — operating/documented/simulated/reference/public/private map
8. `vyrdon-open-review/review/CASE_LIMITATIONS.md` — open critique surface

# Operational Evidence Map

## Date: 2026-05-21

---

## Purpose

This document separates **what is operating** from **what is documented**, **what is simulated**, and **what is reference-only**, and it states which evidence is public and which remains private.

This file exists because:

- `SYSTEM_STATUS.md` says the public repos document an **already-running system**, not a future one.
- `AUDIT_READINESS.md` labels artifacts as AUDIT-READY / REVIEW-READY / REFERENCE / PLANNED, but does not say which artifacts back a *running* surface and which back a *documented* one.

Without that separation, a reader cannot tell what the methodology has actually been applied to.

This is a stabilization document. It will be updated as the public/private boundary moves.

---

## Definitions

| Term | Meaning |
|------|---------|
| **Operating** | The behavior exists, runs in a controlled environment, produces records, and is observed. Evidence of its operation is private unless explicitly published. |
| **Documented** | The behavior is described in public repos at structural level (architecture, scope, contracts, law) but is not running in code. |
| **Simulated** | The behavior is exercised through a worked example — a populated case, a model-check run, a hand-traced decision. Output is reproducible but is not produced by a live service. |
| **Reference-only** | An artifact exists that demonstrates the intended shape (e.g. a Solidity contract, a Circom file, a JSON Schema) but is not exercised against a live counterpart. It encodes the design, not the deployment. |
| **Public evidence** | A file in one of the 9 public repos that an outside reader can reproduce, verify, or challenge without further access. |
| **Private evidence** | A record produced by the operating system that is not committed to the public repos. Its existence may be referenced; its content is not disclosed here. |

---

## Operating (not in public repos by content)

These surfaces are operating today. Their existence is referenced in `vyrdon-technology` and `vyrdon-mechanism`. Their internal state, journals, and runtime artifacts are **not** published. Public evidence of these surfaces is limited to architectural descriptions and the public domain endpoints.

| Surface | Public referent | What is private |
|---------|-----------------|-----------------|
| Proof gate runtime | `vyrdon-technology/docs/SYSTEM_ARCHITECTURE.md` (5-plane model, proof gate plane) | Runtime logs, internal journals, machine-state files, deployment versions |
| Control plane (review / approval / signing) | `vyrdon-technology/docs/SYSTEM_ARCHITECTURE.md` (Control Authority plane); `vyrdon-mechanism/docs/AUTHORITY_SEPARATION.md` | Signing keys, approval queues, intent records |
| Execution node (verifies seal, executes, journals) | `vyrdon-mechanism/docs/AUTHORITY_SEPARATION.md` | Append-only execution journal, boundary hash database, parity records |
| Operator UI surfaces (9 rooms) | `vyrdon-technology/architecture/SYSTEM_DOMAINS.md` Domain 04 | Live room state, operator sessions, telemetry |
| Daily boot sequence (7-step pre-gate ceremony) | `vyrdon-mechanism/docs/AUTHORITY_SEPARATION.md` § Daily Boot Sequence | Daily health reports, integrity checks, parity outputs |

Public callers should treat these as **operating but unevidenced in this repo set**. The published artifacts describe the shape and contract of these surfaces, not their runtime output.

---

## Documented (not running in code in this repo set)

These layers are described in detail in the public repos but no executable runtime is published. A reader can review the design but cannot run it from the public repos.

| Layer | Public source | Why it is documented-only |
|-------|---------------|---------------------------|
| 14-domain T3MU tree | `vyrdon-technology/architecture/SYSTEM_DOMAINS.md` | The tree describes the operating system's internal organization. The public repos describe the structure, not the running service code. |
| 9-stage processing pipeline (ingest → … → export) | `vyrdon-technology/docs/SYSTEM_ARCHITECTURE.md`, `vyrdon-technology/docs/SERVICE_MAP.md` | Stage definitions and responsibilities are documented. No public stage runner exists. |
| 7-law enforcement model | `vyrdon-methodology/docs/LAW_SYSTEM.md`, `vyrdon-mechanism/docs/ENFORCEMENT_MODEL.md` | Laws and enforcement actions are defined. No public enforcement engine exists. |
| 6 enforcement layers (defense-in-depth) | `vyrdon-technology/architecture/SYSTEM_DOMAINS.md` § Domain 01 | Layers are named and scoped. Layer implementations are private. |
| Authority separation protocol (Control Authority ↔ Execution Node) | `vyrdon-mechanism/docs/AUTHORITY_SEPARATION.md` | The intent flow, action hash specification, and execution gate are documented. The crypto and the journal are private. |
| Evidence pipeline (Source → Ingest → Compute → Explain → Transition → Reconcile → Export) | `vyrdon-technology/docs/EVIDENCE_PIPELINE.md` | The pipeline is described. Only the proof-event schema (see below) is published as an evidence artifact. |

---

## Simulated (worked examples that anyone can re-trace)

These are concrete, reproducible artifacts. A reader can re-run the model checker, hand-trace the decision tree against the populated cases, and verify the result.

| Artifact | Location | What re-running it shows |
|----------|----------|--------------------------|
| TLA+ model check | `vyrdon-rootpass-proof/formal/rootpass.tla` + `rootpass.cfg` + `model-check-report.md` | 486 reachable states, 6 invariants, 0 violations. Reproducible with TLC. |
| Decision tree against CASE-001 (PASS) | `vyrdon-cases/cases/populated/CASE-001-PASS.md` + `vyrdon-methodology/method/DECISION_TREE.md` | Marketplace escrow flow: all 5 required roots present, no contradiction → PASS → release payout. |
| Decision tree against CASE-002 (HOLD) | `vyrdon-cases/cases/populated/CASE-002-HOLD.md` | Cross-border PSP: recipient bank confirmation missing → HOLD; status contradiction is secondary. |
| Decision tree against CASE-003 (NO_PASS) | `vyrdon-cases/cases/populated/CASE-003-NO_PASS.md` | Exchange withdrawal: ledger contradiction (prior withdrawal un-decremented) → NO_PASS. |
| Proof event ledger example | `vyrdon-rootpass-proof/evidence/example-rootpass_proof_events.jsonl` + `rootpass_proof_events.schema.json` | A 5-line example of the append-only event sequence (evaluation_started → evidence_collected → pillar_evaluated → decision_made → proof_generated). Schema-validatable. |

These are the surfaces where the public repos contain end-to-end, reproducible evidence of the law in action.

---

## Reference-only (design encoded in code, not exercised against a live counterpart)

These artifacts encode the intended shape but do not currently run end-to-end.

| Artifact | Location | What is missing for it to leave reference-only |
|----------|----------|-----------------------------------------------|
| `RootPassDecisionLib.sol` | `vyrdon-rootpass-proof/contracts/` | Tests covering all 162 input combinations. Logic is correct against the TLA+ spec; lack of tests is what holds it at REVIEW-READY rather than AUDIT-READY. |
| `RootPassVerifier.sol` | `vyrdon-rootpass-proof/contracts/` | `_verifyZKProof` returns `false`. Needs the real Groth16 pairing-check implementation that snarkjs emits after a trusted setup. |
| `RootPassEscrow.sol` | `vyrdon-rootpass-proof/contracts/` | Reentrancy guard, ETH transfer pattern (`call{value:}("")` instead of `transfer()`), access control on `submitProof()`. Also depends on a verifier that does not currently verify. |
| `RootPassTimelock.sol` | `vyrdon-rootpass-proof/contracts/` | Integration with the RootPass decision flow. Currently a clean standalone timelock. Single guardian (no multi-sig). |
| `zk/rootpass.circom` and `zk/verifier.sol` | `vyrdon-rootpass-proof/zk/` | The circuit is present as a reference artifact but is not operationally complete. There is no trusted setup, no proving key, no real verification key, and no end-to-end proof generation path. Production ZK capability remains planned. |
| Technology registries (`services.md`, `events.md`, `endpoints.md`, `schemas.md`, `environments.md`) | `vyrdon-technology/registry/` | Currently one-line catalog markers. Real per-service / per-event / per-endpoint definitions need to be filled in. |
| `API_SURFACES.md`, `EVENT_MODEL.md`, `DATA_MODEL.md` | `vyrdon-technology/docs/` | Concise lists of types and events. Need request/response shapes, event payloads, and entity field definitions. |
| Commercial segment material | `vyrdon-commercial/segments/*/` | Buying-signals, objections, pilot-scope etc. are templated. None are backed by completed pilot evidence yet. |

A reference-only artifact is **not** a claim about how the operating system runs. It is a public statement of intended interface.

---

## Public evidence (what an outside reviewer can verify without further access)

These are the only things the public repos prove on their own:

1. **The decision logic is internally consistent.** Verified by `vyrdon-rootpass-proof/formal/rootpass.tla` + the TLC model check report. 486 states, 6 invariants, 0 violations.
2. **The decision logic applies correctly to three real-shaped scenarios.** Verified by the three populated cases in `vyrdon-cases/cases/populated/` traced against `vyrdon-methodology/method/DECISION_TREE.md`.
3. **The decision logic is encoded as a pure Solidity library.** `RootPassDecisionLib.sol`. Logic matches the spec. Tests pending.
4. **The decision model has a concrete event schema.** `vyrdon-rootpass-proof/evidence/rootpass_proof_events.schema.json`. Schema-validatable.
5. **The maturity of every artifact is declared.** `docs/AUDIT_READINESS.md` and `vyrdon-rootpass-proof/contracts/CONTRACT_READINESS.md`. Both list known gaps explicitly.
6. **The system's own limitations are declared.** `vyrdon-rootpass-proof/docs/PROOF_LIMITS.md`, `vyrdon-rootpass-proof/formal/assumptions.md`, `open-review/WHAT_MAY_BE_WRONG.md`, `open-review/KNOWN_LIMITS.md`.

Nothing else in the public repos is currently provable from the public repos alone.

---

## Private evidence (referenced, not disclosed here)

The operating surfaces listed in §1 produce private records: append-only journals, runtime state files, daily health reports, parity outputs, signing intent records, deployment version snapshots, integrity checks.

These are **not** in the public repos and will not be moved there indiscriminately. When and if any subset is published, it will:

- be published as a sealed snapshot (timestamped, hashed, signed),
- be linked from `AUDIT_READINESS.md` and re-labeled there,
- and be added to this map under §3 (Simulated) or a new §3b (Operating evidence published).

This document does not assert that private evidence exists in any particular form. It only states what *kind* of evidence the operating surfaces produce in principle.

---

## Bridge to public/private boundary changes

This file is the single place where evidence movement is recorded. When an artifact transitions:

| From | To | What changes |
|------|-----|--------------|
| Reference-only | Simulated | A worked example is added to the public repos, and the artifact is re-listed in §3. |
| Documented | Simulated | A reproducible trace (case, run, or schema-validatable record) is added. |
| Operating (private) | Operating (public-evidenced) | A sealed snapshot of operating output is published, and the artifact is added to §3 with a public source. |
| Any | Production-audited | Only after an external auditor signs an audit report. Until then, this file does not relabel any artifact as production-ready. |

The bar for moving an artifact one column to the right is always: *someone outside the system can reproduce or verify it without further access.*

---

## What this document is not

- It is not a claim that the operating system is free of defects.
- It is not a claim that every documented surface is implemented exactly as described.
- It is not a substitute for an external audit.
- It is not a sales document.
- It does not relabel any artifact as production-ready.

It is a single map from claim to evidence. Where a claim has no public evidence, this file says so.

---

## Update protocol

- This file is updated whenever an artifact moves between the four columns (Operating / Documented / Simulated / Reference-only).
- Every update keeps the previous row visible — entries are amended, not deleted, so the trajectory of evidence is itself auditable.
- The `Date` field at the top reflects the most recent material update.

# Architecture Overview

## System Flow

```
Public Layer          Runtime              API Layer         Storage
(vyrdon.com)    →    (proof gate)    →    (enforcement)  →  Database
                                                        →  Evidence Ledger (append-only)
```

**The public layer has no write access to the database.** All writes go through the proof-enforced runtime gate and API enforcement layer.

Evidence is written to a separate append-only ledger. Database writes and evidence writes are atomic — one does not occur without the other.

---

## Five Isolated Planes

| Plane | Role | Exposure |
|-------|------|----------|
| Proof Gate | Proof-enforced transaction control | Cloud — public runtime endpoint |
| Control Authority | Review, authorization, operator tools | Local — no public exposure |
| Automation Engine | Execution authority, automated workflows | Local — separate machine |
| AI Reasoning | Analysis, research, review | Separated domain — review only, never execution |
| Observer | Observation and operational review | Local — optional |

Each plane runs on a separate machine. No plane shares memory, storage, or network with another except through defined interfaces. All boundaries are protected and proved through Zero Trust enforcement at the system root.

---

## Trinity Architecture (Separation of Powers)

The system enforces physical separation across three isolated domains to prevent state corruption:

| Domain | Role | Function | Constraint |
|--------|------|----------|------------|
| **Intelligence Layer** (vyrden.com) | The Brain | 7 sovereign agents, 98 self-built engines, 30 MCP plugins. Advisory only — watches, analyzes, recommends | **Zero execution authority.** Can only advise via signed proposals |
| **Control Plane** (consolelab.vyrdon.com) | The Hand | Authority engineering console. Operator reviews AI advice, signs mutation requests | **Read-only view.** Cannot force a database write without runtime validation |
| **Execution Plane** (vyrdx.vyrdon.com) | The Law | Runtime enforcement of RAP. Performs ROOT → GATE → VALID verification | **Evidence-coupled transactions only.** Write + ledger append are atomic |

This solves the "God Mode" risk: no single domain can both authorize and execute. The Brain thinks, the Hand approves, the Law enforces.

### Domain Separation

The separation of domains is part of the mechanism, not presentation:

- **Public domain** = doctrine and declaration surface
- **Runtime domain** = execution and enforcement surface
- **Control domain** = operator visibility and control plane

This separation enforces three hard truths:
- Representation ≠ truth
- Interface ≠ authority
- Public narrative ≠ executable root

The public domain can declare the law. It cannot become the law. The control plane can expose and submit. It cannot manufacture finality. The runtime can execute. It still cannot pass unless root and proof allow it.

---

## Technology Stack

| Layer | Language | Purpose |
|-------|----------|---------|
| 1 | TypeScript / JavaScript | Runtime logic, interface logic, enforcement engine |
| 2 | SQL / Postgres | Persisted truth, state evaluation, evidence ledger |
| 3 | HTML | Surfaced control and doctrine layers |
| 4 | CSS | Control plane styling and presentation |
| 5 | Shell / infrastructure scripting | Deployment, hardening, system operations |

---

## AI Role — 7 Sovereign Agents

AI agents perform review, analysis, and research. They are **never** involved in execution or runtime business.

| Agent | Role | Domain |
|-------|------|--------|
| Vyrdox | Director | Task orchestration and conflict resolution |
| Mammon | CEO Agent | Market positioning and strategy |
| Abyssal | Red Team | Security auditing and adversarial testing |
| Leverage | CFO | Financial analysis and projections |
| Obsidian | Architect | Code quality and Language Law enforcement |
| Thunder | Operations | Infrastructure monitoring and deployment readiness |
| Titan | Scout | Business intelligence and market mapping |

- Each agent operates in an isolated workspace
- Agent outputs go through quarantine before review
- No agent has direct execution authority
- AI is the backbone for review — not for decision execution

### Sovereign Wage Protocol

The system treats compute as labor — agents earn virtual wages based on inference complexity. 100% of generated wages are diverted: 50% to AI research, 50% to humanitarian causes. The more the AI works, the more the world benefits.

---

## Runtime Architecture

The runtime is structured as a room-based processing system:

- **6 control rooms**: Governance (rulesets/approvals), Command (lifecycle/kill switch), System (health/drift/attestation), Commercial (transactions/risk), Market (signals/deltas), Intake (classification/routing)
- **7 laws**: Runtime, Room, State, Metric, Deploy, Security, Coding
- **9-stage pipeline**: Ingest → Compute → Explain → Transition → Reconcile → Derive → Route → Enforce → Export
- **18+ subsystems**: Runtime core, rooms, law, logic, methods, registry, verification, deploy, services, MCP, adapters, hooks, vector, RAG, contracts, schemas, security, observability, recovery

---

## Proof Infrastructure

The proof layer proves the methodology using three levels (at different maturity — see `docs/AUDIT_READINESS.md`):

1. **Formal Verification** — TLA+ specification with 22 native logic rules and 5 model-checked invariants (AUDIT-READY)
2. **Zero-Knowledge Proofs** — Circom circuit intended to prove decisions without revealing evidence. The ZK layer is present as a reference artifact but not operationally complete; production ZK capability remains planned.
3. **Smart Contract Enforcement** — Solidity contracts enforcing decisions on-chain (REVIEW-READY for DecisionLib + Timelock + IVerifier; REFERENCE for Verifier + Escrow)

The formal specification encodes the fail-closed four-pillar law:
```
ROOT.TRUE + GATE.TRUE + VALID.TRUE + CERTIFIED.TRUE → PASS.TRUE
Any pillar FALSE → PASS.FALSE
ROOT.FALSE → HARD_STOP
```

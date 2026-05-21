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

## AI Role

AI agents perform review, analysis, and research. They are **never** involved in execution or runtime business.

- 6 AI agent roles: analyst, business, CFO, engineer, operations, red team
- Each agent operates in an isolated workspace
- Agent outputs go through quarantine before review
- No agent has direct execution authority
- AI is the backbone for review — not for decision execution

---

## Runtime Architecture

The runtime is structured as a room-based processing system:

- **5 rooms**: Commercial, Evidence, Market, Operations, Campaign
- **7 laws**: Runtime, Room, State, Metric, Deploy, Security, Coding
- **9-stage pipeline**: Ingest → Compute → Explain → Transition → Reconcile → Derive → Route → Enforce → Export
- **18+ subsystems**: Runtime core, rooms, law, logic, methods, registry, verification, deploy, services, MCP, adapters, hooks, vector, RAG, contracts, schemas, security, observability, recovery

---

## Proof Infrastructure

The proof layer proves the methodology using three levels:

1. **Formal Verification** — TLA+ specification with 22 native logic rules and 5 model-checked invariants
2. **Zero-Knowledge Proofs** — Circom circuits proving decisions without revealing evidence
3. **Smart Contract Enforcement** — Solidity contracts enforcing decisions on-chain

The formal specification encodes the fail-closed four-pillar law:
```
ROOT.TRUE + GATE.TRUE + VALID.TRUE + CERTIFIED.TRUE → PASS.TRUE
Any pillar FALSE → PASS.FALSE
ROOT.FALSE → HARD_STOP
```

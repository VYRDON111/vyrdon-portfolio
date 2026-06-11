# vyrdon-portfolio

Front door for the VYRDON public repos. Contains the system map, audit-readiness matrix, operational-evidence map, positioning, and architecture overview. **Read this repo first.**

VYRDON is a proof-enforced transaction decision system. Its central law is:

```
TRUE ROOT    = PASS
FALSE ROOT   = NO_PASS
MISSING ROOT = HOLD
```

Full doctrine: [vyrdon-methodology](https://github.com/VYRDON111/vyrdon-methodology).

---

## What is in this repo

- **`portfolio/`** — short, high-level views of the system: `OVERVIEW.md`, `SYSTEM_MAP.md`, `PRODUCT_STACK.md`, `PROOF_STACK.md`, `USE_CASES.md`
- **`docs/`** — the load-bearing reference docs:
  - `SEALED_LAW.md` — the sealed constraints on the public repos
  - `SYSTEM_STATUS.md` — operating status of the underlying system
  - `AUDIT_READINESS.md` — maturity matrix by repo and artifact (AUDIT-READY / REVIEW-READY / REFERENCE / PLANNED)
  - `OPERATIONAL_EVIDENCE.md` — what is running, documented, simulated, reference-only, public, private
  - `ARCHITECTURE_OVERVIEW.md` — 5 isolated planes, control rooms, enforcement model
  - `ORG_REPO_MAP.md` — build order and dependency map
  - `POSITIONING.md`, `INSTITUTIONAL_PITCH.md`, `CUSTOMER_PITCH.md`, `PARTNER_PITCH.md` — audience-specific framing
  - `PUBLIC_VS_INTERNAL_NAMING.md`, `PUBLIC_LANGUAGE_POLICY.md`, `LANGUAGE_RULES.md` — naming discipline
- **`applications/`** — one-page applications by market (banks, escrow, exchanges, marketplaces, payments, remittance, treasury)
- **`diagrams/`** — flow diagrams (proof flow, enforcement flow)
- **`open-review/`** — known limits, what may be wrong, contribution paths
- **`contribute/`** — how to challenge, how to populate cases, how to submit improvements
- **`links/`** — pointers to the other repos
- **`sources/`** — source list

---

## Read in this order

If you have 30 minutes:

1. [`portfolio/OVERVIEW.md`](portfolio/OVERVIEW.md) — 1-page system summary
2. [`docs/SEALED_LAW.md`](docs/SEALED_LAW.md) — the constraints
3. [`docs/SYSTEM_STATUS.md`](docs/SYSTEM_STATUS.md) — operating status
4. [`docs/AUDIT_READINESS.md`](docs/AUDIT_READINESS.md) — what is ready for audit / review / reference / planned
5. [`docs/OPERATIONAL_EVIDENCE.md`](docs/OPERATIONAL_EVIDENCE.md) — what backs each claim publicly vs privately
6. [`docs/ARCHITECTURE_OVERVIEW.md`](docs/ARCHITECTURE_OVERVIEW.md) — 5-plane architecture

---

## Maturity

This repo contains documentation only. No executable code. Maturity of described artifacts lives in [`docs/AUDIT_READINESS.md`](docs/AUDIT_READINESS.md) and [`docs/OPERATIONAL_EVIDENCE.md`](docs/OPERATIONAL_EVIDENCE.md). Nothing here is labeled production-ready.

---

## How to challenge

See [`contribute/HOW_TO_CHALLENGE.md`](contribute/HOW_TO_CHALLENGE.md). Cross-repo challenges go to [vyrdon-open-review](https://github.com/VYRDON111/vyrdon-open-review).

---

## Family of repos

| Repo | Role |
|------|------|
| **vyrdon-portfolio** (this repo) | Front door — system map, audit-readiness, positioning |
| [vyrdon-methodology](https://github.com/VYRDON111/vyrdon-methodology) | Doctrine — four-pillar law, decision model, frozen lexicon |
| [vyrdon-rootpass-proof](https://github.com/VYRDON111/vyrdon-rootpass-proof) | Proof — TLA+, Circom, Solidity |
| [vyrdon-mechanism](https://github.com/VYRDON111/vyrdon-mechanism) | Enforcement — escrow, timelock, authority separation |
| [vyrdon-cases](https://github.com/VYRDON111/vyrdon-cases) | Applied evidence — populated cases, market patterns |
| [vyrdon-technology](https://github.com/VYRDON111/vyrdon-technology) | How the system is built — domains, planes, services |
| [vyrdon-registry](https://github.com/VYRDON111/vyrdon-registry) | Taxonomy — decision codes, claim types, schemas |
| [vyrdon-commercial](https://github.com/VYRDON111/vyrdon-commercial) | Buyer language — segments, pilot model, comparisons |
| [vyrdon-open-review](https://github.com/VYRDON111/vyrdon-open-review) | Challenge — help-wanted, submissions, AI room |

Dependency order (per `docs/ORG_REPO_MAP.md`): methodology → rootpass-proof → mechanism → portfolio → cases → technology → registry → open-review (commercial sits alongside).

---

## License

[Apache 2.0](LICENSE). Commercial licensing available separately.

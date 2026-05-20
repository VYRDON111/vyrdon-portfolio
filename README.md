# VYRDON Portfolio

This repository defines the VYRDON organizational portfolio.

It exists to make the full system — methodology, mechanism, proof, cases, technology, registry, and review — visible and navigable from one location.

RootPass asks not whether a transaction was said to be verified, but whether the verification itself can pass.

---

## What VYRDON Builds

VYRDON builds proof-enforced transaction infrastructure.

The system evaluates whether the required root chain exists, whether contradictions are present, and whether PASS is legally and logically allowed under the model.

```
TRUE ROOT  = PASS
FALSE ROOT = NO_PASS
MISSING ROOT = HOLD
```

No root, no pass.

---

## System Status

Operating and under active structured development.

These repositories document and harden the public methodology, mechanism, proof surfaces, case applications, and review paths around an already-running system.

They do not imply that the operating system begins here.
They expose and organize its logic here.

---

## Repository Map

| Repository | Layer | What it makes visible |
|---|---|---|
| [vyrdon-methodology](https://github.com/VYRDON111/vyrdon-methodology) | Doctrine | Decision model, four-pillar law, contradiction handling |
| [vyrdon-rootpass-proof](https://github.com/VYRDON111/vyrdon-rootpass-proof) | Proof | Formal verification, ZK proofs, smart contracts |
| [vyrdon-mechanism](https://github.com/VYRDON111/vyrdon-mechanism) | Enforcement | Escrow, timelock, circuit breaker, dispute paths |
| **vyrdon-portfolio** | **Front door** | **System overview, repo map, commercial context** |
| [vyrdon-cases](https://github.com/VYRDON111/vyrdon-cases) | Evidence | Market-specific case studies, patterns, failure analysis |
| [vyrdon-technology](https://github.com/VYRDON111/vyrdon-technology) | Architecture | Service map, API surfaces, evidence pipeline |
| [vyrdon-registry](https://github.com/VYRDON111/vyrdon-registry) | Taxonomy | Decision codes, claim types, schemas, catalogs |
| [vyrdon-open-review](https://github.com/VYRDON111/vyrdon-open-review) | Review | Public audit, challenge framework, submissions |

---

## What VYRDON Does Not Claim

VYRDON does not claim to be a certifier, badge issuer, or trust authority.

VYRDON publishes methodology, mechanism, proof artifacts, case applications, test records, and failure records for transaction-state control.

The system is designed to be inspected, challenged, and improved.

---

## Markets

VYRDON's methodology applies to any market where transaction verification must be proved, not assumed:

- Banking and wire transfers
- Payment service providers
- Exchanges and credit systems
- Marketplaces and escrow
- Treasury and settlement
- Remittance

See [applications/](applications/) for market-specific overviews.

---

## The Proof Stack

```
┌──────────────────────────┐
│      METHODOLOGY          │  How decisions are made
├──────────────────────────┤
│      FORMAL PROOF         │  That the logic is correct
├──────────────────────────┤
│      ZK PROOF             │  That decisions are verifiable
├──────────────────────────┤
│      ENFORCEMENT          │  That decisions have consequences
├──────────────────────────┤
│      CASES                │  That the system works on real data
├──────────────────────────┤
│      OPEN REVIEW          │  That anyone can challenge
└──────────────────────────┘
```

---

## License

Apache 2.0 — see [LICENSE](LICENSE)

---

## Trademark

VYRDON™ is a trademark of Thaer Bataineh. All rights reserved.

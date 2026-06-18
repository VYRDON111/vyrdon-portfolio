# VYRDON Root Attestation Protocol (RAP) v1.0

## Abstract

The VYRDON Root Attestation Protocol (RAP) defines a deterministic, verifiable process for establishing trusted system authority (ROOT) prior to enabling execution or mutation within a controlled runtime environment.

RAP enforces that no system operation — particularly those with side effects, persistence, or certification impact — may proceed unless the system's root state has been measured, verified, and attested against an approved baseline.

```
ROOT.UNVERIFIED → GATE.CLOSED
ROOT.FALSE      → PASS.FALSE
```

The system does not trust ROOT by assertion. It forces ROOT through a pre-gate trust ceremony before it is allowed to authorize anything.

---

## 1. Motivation

`ROOT.FALSE → PASS.FALSE` is necessary but not sufficient.

The system also enforces:

```
ROOT.UNVERIFIED  → GATE.CLOSED
ROOT.DEGRADED    → GATE.CLOSED
ROOT.COMPROMISED → SYSTEM.HALT
```

The first rule is: **No gate opens on declared root. Only on attested root.**

Modern distributed systems commonly assume implicit trust in runtime environments, configuration state, identity providers, and execution infrastructure. This results in unverifiable execution paths, mutable system truth, silent configuration drift, and compromised authority chains.

RAP addresses this gap by requiring pre-execution root verification, ensuring that system authority is provably valid, execution is bounded by policy, and outcomes are certifiable and final.

---

## 2. Terminology

| Term | Definition |
|------|-----------|
| **ROOT** | The complete authority basis of a system, including identity, keys, runtime, and state |
| **Attestation** | Cryptographic or procedural verification of system integrity against a baseline |
| **Baseline** | A sealed reference set of approved measurements |
| **Gate** | Policy-controlled execution boundary |
| **Measurement** | A deterministic hash or fingerprint of a system component |
| **Activation** | Transition from attested state to execution-enabled state |
| **RMS** | Root Measurement Set — the collected measurements of all root layers |

---

## 3. Root Composition Model

RAP defines ROOT as a composite of four independent layers. If any one layer is unverified, root is not valid.

### 3.1 Identity Root
- Authority identities
- Role mappings
- Trust anchors

### 3.2 Key Root
- Public key fingerprints
- Signing certificates
- Key lineage and rotation history

### 3.3 Runtime Root
- Binary or container image digests
- Dependency lockfiles
- Execution environment configuration

### 3.4 State Root
- Database schema version
- Governance state (timelock, guardian, ownership)
- Evidence ledger continuity
- Policy configuration hashes

---

## 4. Root Measurement Set (RMS)

Prior to activation, the system MUST compute a Root Measurement Set:

```
RMS = {
  identity_fingerprint,
  key_fingerprint_set,
  runtime_digest,
  policy_hash,
  config_hash,
  topology_hash,
  schema_version,
  boundary_state_hash,
  evidence_chain_head
}
```

Each measurement MUST be:
- Deterministic
- Reproducible
- Cryptographically verifiable

---

## 5. Attestation Process

### 5.1 Measurement Phase

The system collects RMS from runtime environment, configuration sources, infrastructure metadata, and cryptographic key stores.

### 5.2 Verification Phase

RMS is compared against a sealed baseline:

```
if RMS != BASELINE:
    ROOT_STATUS = DRIFTED
    GATE = CLOSED
```

### 5.3 External Attestation

At least one independent verifier MUST validate the RMS:

- Hardware-backed key source
- External authority node
- Offline verification process
- Quorum-based approval

**Self-attestation is insufficient.** ROOT must be confirmed by a verifier outside the mutable runtime.

```
self-assertion != root proof
```

---

## 6. Root State Machine

RAP defines a strict state progression:

```
[*] → DECLARED → MEASURED → ATTESTED → ACTIVATED
                     ↓           ↓
                   FAILED      FAILED
```

### State Definitions

| State | Description | Authority Level |
|-------|-------------|----------------|
| **DECLARED** | Root is defined but not verified | No authority |
| **MEASURED** | RMS collected | No authority |
| **ATTESTED** | RMS verified against baseline + external validator | Limited authority |
| **ACTIVATED** | Gates opened; execution permitted | Gate-open authority |
| **FAILED** | Verification failure or mismatch | No authority — system halt or read-only |

### Hard Rule

```
ROOT.DECLARED    → no authority
ROOT.MEASURED    → no authority
ROOT.ATTESTED    → limited authority
ROOT.ACTIVATED   → gate-open authority
```

Only `ROOT.ACTIVATED` may open mutation gates.

---

## 7. Two-Phase Root Activation

### Phase A — Root Attestation

Prove:
- Correct keys
- Correct config
- Correct runtime image
- Correct policy bundle
- Correct boundary ownership
- No drift from baseline

### Phase B — Gate Activation

Only after Phase A passes:
- Issue activation token
- Open policy gates
- Allow mutations
- Allow certificates
- Allow commercial actions

**No attestation token → no gate.**

---

## 8. Gate Control Logic

Execution gates MUST enforce:

```
IF ROOT_STATUS != ACTIVATED:
    BLOCK ALL MUTATIONS
```

### Gate Conditions

| Condition | Result |
|-----------|--------|
| ROOT.UNVERIFIED | Gate closed |
| ROOT.DRIFTED | Gate closed |
| ROOT.COMPROMISED | System halt |
| ROOT.ATTESTED | Eligible for activation |
| ROOT.ACTIVATED | Execution allowed |

---

## 9. Failure Modes

### 9.1 Drift Detection

Any mismatch between RMS and baseline:

```
ROOT_STATUS = DRIFTED
GATE = CLOSED
```

### 9.2 Compromise Detection

Indicators: key mismatch, unauthorized signer, runtime digest deviation, evidence chain discontinuity.

```
ROOT_STATUS = COMPROMISED
SYSTEM = HALT
```

### 9.3 Incomplete Verification

If any RMS component is missing:

```
ROOT_STATUS = UNVERIFIED
GATE = CLOSED
```

---

## 10. Activation Requirements

Before activation, ALL of the following MUST be true:

- RMS matches baseline
- External attestation successful
- Runtime integrity verified
- Policy bundle validated
- Boundary ownership confirmed
- Evidence chain continuity intact
- Database state consistent
- No synthesized or fallback state active

---

## 11. Practical Verification Controls

### A. Cryptographic Root Verification

At boot: load expected root public key fingerprints, verify signer set, verify policy bundle signature, verify config manifest signature.

If mismatch:
```
ROOT_STATUS = COMPROMISED
GATE = CLOSED
```

### B. Runtime Measurement

Verify: container image digest, binary checksum, dependency lock hash, environment manifest hash, mounted secret IDs.

If runtime digest differs from approved baseline:
```
ROOT_STATUS = DRIFTED
GATE = CLOSED
```

### C. State Verification

Before opening writes: verify DB migration version, verify boundary owner state, verify timelock/guardian presence, verify evidence chain head continuity, verify no synthetic mode active.

If state proof fails:
```
ROOT_STATUS = UNVERIFIED
GATE = CLOSED
```

### D. Quorum or Dual Control

For first activation, require signer A + verifier B + optional human approval quorum. This prevents one compromised actor from declaring root valid.

---

## 12. Security Properties

| Property | Guarantee |
|----------|-----------|
| **Pre-execution Integrity** | No execution occurs without verified authority |
| **Deterministic Trust** | Trust is derived from measurable state, not assumptions |
| **Tamper Detection** | Any modification results in gate closure |
| **Non-bypassability** | Root verification cannot be skipped or deferred |
| **Explicit Failure** | Unverified or unknown states are treated as failure, not degraded success |

---

## 13. Design Principles

1. **Deny by Default** — No root → no execution
2. **Evidence over Assertion** — Trust requires measurable proof
3. **External Verification** — Root cannot self-authorize
4. **Deterministic Evaluation** — Same inputs produce same trust outcome
5. **Fail Closed** — Ambiguity results in denial

---

## 14. Reference Rule Set

```
ROOT.UNVERIFIED → PASS.FALSE
ROOT.DRIFTED    → PASS.FALSE
ROOT.FALSE      → PASS.FALSE
ROOT.ATTESTED   → GATE.ELIGIBLE
ROOT.ACTIVATED  → PASS.EVALUABLE
```

And the fundamental principle:

```
unknown root == failed root
```

Not:

```
unknown root == maybe okay
```

---

## 15. Revalidation Triggers

Root MUST be revalidated on:
- Restart
- Deployment
- Configuration change
- Key rotation
- Evidence chain anomaly
- Boundary ownership change

---

## 16. Relationship to Four-Pillar Law

RAP operates as a pre-condition to the Four-Pillar Law:

```
1. RAP verifies ROOT → ROOT.ACTIVATED
2. Four-Pillar Law evaluates: ROOT.TRUE + GATE.TRUE + VALID.TRUE + CERTIFIED.TRUE → PASS.TRUE
```

RAP ensures ROOT.TRUE is not declared — it is proven. The Four-Pillar Law then evaluates whether the proven root, combined with gate, validity, and certification, allows passage.

Without RAP, ROOT.TRUE is an assertion. With RAP, ROOT.TRUE is an attestation.

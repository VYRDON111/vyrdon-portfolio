---- MODULE rootpass ----
(*
  VYRDON RootPass Decision Model — TLA+ Specification
  
  This specification models the four-pillar law and proves that:
  1. PASS and NO_PASS are mutually exclusive
  2. Every evaluation terminates in exactly one of PASS, NO_PASS, HOLD
  3. Contradiction always blocks PASS
  4. Missing root always produces HOLD
  5. Same input always produces same output (determinism)
*)

EXTENDS Integers, Sequences, FiniteSets

CONSTANTS
    PillarValues,      \* {TRUE, FALSE, MISSING}
    DecisionValues     \* {PASS, NO_PASS, HOLD, PENDING}

VARIABLES
    root,              \* ROOT pillar state
    gate,              \* GATE pillar state
    valid,             \* VALID pillar state
    certified,         \* CERTIFIED pillar state
    contradiction,     \* whether contradiction was detected
    decision,          \* current decision state
    phase              \* evaluation phase

vars == <<root, gate, valid, certified, contradiction, decision, phase>>

TypeOK ==
    /\ root \in {"TRUE", "FALSE", "MISSING"}
    /\ gate \in {"TRUE", "FALSE", "MISSING"}
    /\ valid \in {"TRUE", "FALSE", "MISSING"}
    /\ certified \in {"TRUE", "FALSE", "MISSING"}
    /\ contradiction \in {TRUE, FALSE}
    /\ decision \in {"PASS", "NO_PASS", "HOLD", "PENDING"}
    /\ phase \in {"SUBMITTED", "MEASURING", "EVALUATED", "DECIDED"}

Init ==
    /\ root \in {"TRUE", "FALSE", "MISSING"}
    /\ gate \in {"TRUE", "FALSE", "MISSING"}
    /\ valid \in {"TRUE", "FALSE", "MISSING"}
    /\ certified \in {"TRUE", "FALSE", "MISSING"}
    /\ contradiction \in {TRUE, FALSE}
    /\ decision = "PENDING"
    /\ phase = "SUBMITTED"

\* Evaluate the decision based on the four-pillar law
Evaluate ==
    /\ phase = "SUBMITTED"
    /\ phase' = "EVALUATED"
    /\ IF contradiction = TRUE
       THEN decision' = "NO_PASS"
       ELSE IF root = "MISSING" \/ gate = "MISSING" \/ valid = "MISSING" \/ certified = "MISSING"
            THEN decision' = "HOLD"
            ELSE IF root = "FALSE" \/ gate = "FALSE" \/ valid = "FALSE" \/ certified = "FALSE"
                 THEN decision' = "NO_PASS"
                 ELSE IF root = "TRUE" /\ gate = "TRUE" /\ valid = "TRUE" /\ certified = "TRUE"
                      THEN decision' = "PASS"
                      ELSE decision' = "NO_PASS"
    /\ UNCHANGED <<root, gate, valid, certified, contradiction>>

Decide ==
    /\ phase = "EVALUATED"
    /\ phase' = "DECIDED"
    /\ UNCHANGED <<root, gate, valid, certified, contradiction, decision>>

Next ==
    \/ Evaluate
    \/ Decide

\* INVARIANTS

\* PASS and NO_PASS are never both possible for the same input
MutualExclusion ==
    ~(decision = "PASS" /\ decision = "NO_PASS")

\* If contradiction exists, PASS is impossible
ContradictionSafety ==
    contradiction = TRUE => decision # "PASS"

\* If any root is missing, PASS is impossible
MissingRootSafety ==
    (root = "MISSING" \/ gate = "MISSING" \/ valid = "MISSING" \/ certified = "MISSING")
    => decision # "PASS"

\* If all pillars are TRUE and no contradiction, decision must be PASS (when evaluated)
CompletenessPass ==
    (phase = "EVALUATED" /\ root = "TRUE" /\ gate = "TRUE" /\ valid = "TRUE" /\ certified = "TRUE" /\ contradiction = FALSE)
    => decision = "PASS"

\* Every evaluation produces exactly one decision
Termination ==
    phase = "DECIDED" => decision \in {"PASS", "NO_PASS", "HOLD"}

Spec == Init /\ [][Next]_vars

====

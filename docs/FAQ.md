# Frequently Asked Questions

## What does VYRDON do?

VYRDON builds proof-enforced transaction infrastructure. The system evaluates whether a claimed verification state can pass based on evidence, not claims.

## Is VYRDON a certifier?

No. VYRDON does not issue certificates, badges, or trust marks. It publishes a methodology and proof system that anyone can inspect, test, and challenge.

## What is RootPass?

RootPass is the proof gate. It evaluates a proof chain against the four-pillar law (ROOT, GATE, VALID, CERTIFIED) and produces one of three outcomes: PASS, NO_PASS, or HOLD.

## How is the decision made?

The decision follows the four-pillar law: all four pillars must be TRUE and no contradictions can exist for PASS. Any FALSE pillar produces NO_PASS. Any MISSING root produces HOLD.

## Can the methodology be wrong?

Yes. That is why it is published openly and accompanied by formal proofs, test cases, failure records, and open review paths. The system is designed to be challenged and improved.

## Is the code open source?

Yes. Apache 2.0 license. All methodology, proof specifications, smart contracts, and documentation are public.

## How do I challenge something?

See `vyrdon-open-review` for submission paths. You can challenge methodology, proof, mechanism, cases, or language.

# VYRDON Review Forum

Public review, talk, and writing surface for VYRDON methodology, VYRDX code, cases, and evidence. Anyone can read; submissions go to VYRDX Team for moderation.

**Status:** Prototype / build in progress. Under active prelaunch verification. Truth-safe: no fake engagement, no fake claims, no unauthorized access.

**All rights reserved.** Founder: Thaer Saleh Bataineh With gratitude to my mother and father.

## What this is

- `vyrdon-forum/index.html` — forum home: boundary statement, reference threads (proof-stack audit-readiness, 10 headaches, Pre-MIRAGE 20 Pilots), submit form (inert until approved), contact/follow links
- `vyrdon-forum/assets/styles.css` — shared static stylesheet (no build step, no CDN)

The forum is the public review/talk/write surface referenced by the console. Submission forms are intentionally inert until 3 approvals enable the backend routing (Cloudflare → Zoho CRM).

## Install / Run

Requirements: Node 18+ (for the local static server). No build step.

```bash
# from repo root
npm run serve:forum
# opens http://localhost:5175
```

Or open the file directly:

```bash
xdg-open vyrdon-forum/index.html
```

## Boundary

This is a public review surface. It does not grant AI runtime access, MCP access, private token access, production access, or internal system control.

## Truth-safe rules

- No fake likes, followers, replies, or reviews
- No fake compliance/regulatory claims
- "Under active prelaunch verification" on all public copy
- Security researchers may submit responsible disclosure notes — no unauthorized access, data exfiltration, credential attacks, DoS, or destructive testing

## Related

- Console: `../console/index.html`
- Codebase ENV: `../console/codebase-env.html`
- Console scope: `../docs/PUBLIC_REVIEW_CONSOLE_SCOPE.md`

## Deploy

No deploy yet. 3 explicit approvals required before any public deploy. GitHub Pages is available on the VYRDON111 enterprise account once approved.
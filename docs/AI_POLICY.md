# AI Policy

## Role

AI agents are the backbone for review, analysis, and research. They are never involved in execution or runtime business.

## Six Agent Roles

| Agent | Responsibility |
|-------|---------------|
| **Analyst** | Data analysis, pattern detection, anomaly identification |
| **Business** | Market analysis, opportunity assessment, competitive positioning |
| **CFO** | Financial review, metric validation, budget analysis |
| **Engineer** | Technical review, code analysis, architecture evaluation |
| **Operations** | System health monitoring, operational review |
| **Red Team** | Adversarial testing, boundary probing, failure scenario modeling |

## Isolation

Each agent operates in an isolated workspace:
- Separate prompts defining scope and constraints
- Separate tool access (only tools relevant to the agent's role)
- Separate output directories
- All outputs go through quarantine before acceptance

## Hard Rules

1. **No execution authority** — AI agents do not execute transactions, deploy code, or modify live state
2. **Review only** — AI outputs are inputs to human review, not direct system actions
3. **Quarantine first** — All AI outputs are quarantined and reviewed before use
4. **Isolated workspace** — No agent can access another agent's workspace
5. **Defined tools only** — Each agent can only use tools registered for its role

## Social Law

7 AI agents in a wages structure. Their wage share goes to:
- AI research and development
- Donation to children's hospitals

This law is sealed and will show in taxes.

# State Machine

## Evaluation State Machine

```
┌──────────┐
│ SUBMITTED│
│          │
│ Input:   │
│ - pillars│
│ - contra.│
└────┬─────┘
     │
     │ Evaluate
     ▼
┌──────────┐
│ EVALUATED│
│          │
│ Decision │
│ computed │
└────┬─────┘
     │
     │ Decide
     ▼
┌──────────┐
│ DECIDED  │
│          │
│ Decision │
│ recorded │
└──────────┘
```

## Decision State Machine

```
Input: (root, gate, valid, certified, contradiction)

                    ┌─────────────────┐
                    │ Check            │
                    │ contradiction    │
                    └───────┬─────────┘
                            │
                   ┌────────┴────────┐
                   │                 │
              contradiction     no contradiction
                   │                 │
                   ▼                 ▼
              ┌─────────┐    ┌──────────────┐
              │ NO_PASS  │    │ Check missing│
              └─────────┘    │ roots        │
                              └──────┬───────┘
                                     │
                            ┌────────┴────────┐
                            │                 │
                       any missing        none missing
                            │                 │
                            ▼                 ▼
                       ┌────────┐     ┌──────────────┐
                       │ HOLD   │     │ Check pillars│
                       └────────┘     └──────┬───────┘
                                             │
                                    ┌────────┴────────┐
                                    │                 │
                               any FALSE         all TRUE
                                    │                 │
                                    ▼                 ▼
                               ┌─────────┐     ┌────────┐
                               │ NO_PASS  │     │ PASS   │
                               └─────────┘     └────────┘
```

## State Space

| Variable | Values | Count |
|---|---|---|
| root | TRUE, FALSE, MISSING | 3 |
| gate | TRUE, FALSE, MISSING | 3 |
| valid | TRUE, FALSE, MISSING | 3 |
| certified | TRUE, FALSE, MISSING | 3 |
| contradiction | true, false | 2 |
| **Total initial states** | | **162** |

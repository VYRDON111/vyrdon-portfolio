# Organization Repository Map

## Build Order and Dependencies

```
1. vyrdon-methodology     ← Foundation (no dependencies)
2. vyrdon-rootpass-proof   ← Depends on methodology
3. vyrdon-mechanism        ← Depends on methodology + proof
4. vyrdon-portfolio        ← Depends on all above (front door)
5. vyrdon-cases            ← Depends on methodology + mechanism
6. vyrdon-technology       ← Depends on methodology + mechanism + proof
7. vyrdon-registry         ← Depends on all above (taxonomy)
8. vyrdon-open-review      ← Depends on all above (review surface)
```

## Dependency Map

| Repo | Depends On |
|---|---|
| methodology | none |
| rootpass-proof | methodology |
| mechanism | methodology, rootpass-proof |
| portfolio | methodology, rootpass-proof, mechanism |
| cases | methodology, mechanism |
| technology | methodology, mechanism, rootpass-proof |
| registry | all above |
| open-review | all above |

---
name: macro-narrative-design
description: Design dynamic, non-redundant narrative paths for the Macro Planner "Easy Mode". Use when creating or refactoring narrative scenarios to ensure they are replayable, educational, and grounded in specific economic theories.
---

# Macro Narrative Design

## The Problem: Redundancy
Traditional linear decision trees often lead to "generic" nodes (e.g., "Tax Policy", "Infrastructure") that appear in every scenario, making the game feel repetitive and less educational.

## The Solution: Dynamic Parallel Arcs
Instead of one long list of nodes, scenarios should be structured into **Parallel Arcs** themed around specific economic thinkers or schools of thought.

### Structure
1. **Foundation Arc (Phase 1)**: 1-3 nodes that establish the crisis and force the player to choose a theoretical framework or strategy.
2. **Thematic Arcs (Phase 2-4)**: Multiple parallel sequences of 3-5 nodes each. Once a player enters an arc, they stay in it.
3. **Climax & Endings (Phase 5)**: The arcs converge or lead to specific endings based on the chosen path.

## Implementation Pattern

### 1. Define Arcs in `long-form-tree.ts`
Use `ScenarioArc` and `createArcBasedTree` to define distinct paths.

```typescript
const introArc: ScenarioArc = {
  id: 'start',
  blocks: [
    {
      phase: 1,
      title: 'Initial Choice',
      narrative: '...',
      choices: [
        { id: 'path_a', ..., nextArc: 'arc_a' },
        { id: 'path_b', ..., nextArc: 'arc_b' },
      ]
    }
  ]
};
```

### 2. Map Arcs to Economic Thinkers
Each arc should explicitly teach the theories of 1-2 thinkers from the `economic-thinkers` skill.

| Arc Theme | Thinkers | Key Concepts |
|-----------|----------|--------------|
| Debt/Finance | Hudson, Tooze | Debt jubilee, polycrisis, FIRE sector |
| Sovereignty | Amin, Kadri | Delinking, comprador bourgeoisie, deindustrialization |
| Inequality | Piketty, Polanyi | r > g, double movement, fictitious commodities |
| Labor | Marini, Shivji | Super-exploitation, working people |

### 3. Narrative Conventions
- **Explicit Naming**: Mention the thinker in the narrative (e.g., "Michael Hudson argues that...").
- **Consequence Linking**: Choices should feel like a direct application of the theory.
- **Stat Gating**: Use `minStats` to reward players who have successfully followed a specific path (e.g., "Nationalization" requires high Sovereignty).

## Best Practices for Replayability
- **Distinct Outcomes**: Ensure that Path A feels fundamentally different from Path B.
- **Educational Value**: The player should learn *why* a specific thinker would recommend a certain choice.
- **Avoid Convergence**: Don't loop back to generic nodes. Keep the paths parallel until the very end.

## Key Files
- `frontend/src/narrative/long-form-tree.ts` — Engine for arc-based trees.
- `frontend/src/narrative/scenario-trees/` — Scenario-specific content.
- `frontend/src/narrative/registry.ts` — Scenario configuration.

---
name: south-american-socialism-design
description: Integrates Vijay Prashad's analysis of imperialism, CIA coups, and World Bank predation into narrative game design for South American scenarios. Use when creating or updating the Plurinational Path narrative mode, adding nodes about coups, sanctions, Indigenous rights, labor unions, or uneven development.
---

# South American Socialism Narrative Design

## Purpose

Guide narrative design for the "Plurinational Path" scenario: a newly-elected leader of a South American country building socialism while balancing a plurinational, complex economy. Draw on Vijay Prashad, recent history of Bolivia, Brazil, Venezuela, and Chile.

## Key References

### Vijay Prashad
- **Washington Bullets** (2020): CIA coups, assassinations, regime change. Bolivia 2019, Chile 1973, Brazil 1964. "Washington Bullets" as metaphor for imperial discipline.
- **The Darker Nations**: Third World solidarity, Bandung spirit, postcolonial resistance.
- **Tricontinental**: Institute for Social Research — documents people's movements and imperial counter-revolution.

### Historical Touchstones
- **Bolivia**: Evo Morales, plurinational state, resource nationalism (gas), Indigenous sovereignty, 2019 coup.
- **Brazil**: Lula, PT, World Bank conditionalities, land reform vs. agribusiness, 2016 impeachment.
- **Venezuela**: Chávez, oil sovereignty, sanctions, economic warfare, opposition funding.
- **Chile**: Allende, Pinochet coup 1973, copper nationalization, neoliberal laboratory.

## Integration Rules

1. **Plain language**: Explain concepts for a general audience. No jargon dumps.
2. **Pattern**: `Prashad's analysis of [topic] shows [insight].` or `As in Bolivia under Morales...`
3. **One reference per paragraph max** — integrate, don't name-drop.
4. **Match theme to node**:
   - Coups/CIA → Washington Bullets, Chile 1973, Bolivia 2019
   - World Bank/IMF → structural adjustment, conditionalities, debt traps
   - Sanctions → Venezuela, economic warfare
   - Indigenous/plurinational → Bolivia, constitutional recognition, territorial rights
   - Labor unions → Brazil PT, worker-peasant alliance
   - Uneven development → extractivism, regional inequality, commodity dependence

## Stat Mapping

| Stat | Use |
|------|-----|
| sovereignty | Independence from IMF, World Bank, U.S. pressure |
| publicSupport | Popular mandate, legitimacy |
| economicStrength | Diversification, industrialization |
| plurinationalUnity | Indigenous rights, territorial recognition, social cohesion |
| laborUnity | Union support, worker power |
| debtBurden | World Bank/IMF leverage |

## Node Structure

Use `DecisionBlock[]` with `createLongFormTree` (see `gulf-migrant.ts`). Support branching via `nextBlock` and `endingIndex`.

## Anti-Patterns

- Don't reduce complex histories to good vs. evil; show trade-offs.
- Avoid presentism — reference historical patterns, not current events as verdicts.
- Indigenous nations are sovereign actors, not objects of policy.

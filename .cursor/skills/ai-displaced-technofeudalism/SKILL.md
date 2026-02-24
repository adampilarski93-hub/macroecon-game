---
name: ai-displaced-technofeudalism
description: Integrate AI displacement and technofeudalism scholarship into Macro Planner narrative scenarios. Use when creating or updating the AI Displaced scenario, writing displaced tech worker decision trees, or incorporating Citrini Research, Varoufakis, or Jodi Dean into narrative choices and consequences.
---

# AI Displaced & Technofeudalism Narrative

## Core Sources

### Citrini Research — "2028 Global Intelligence Crisis" (Substack)

- **Intelligence premium**: Human cognitive work was the economy's scarcest resource; agentic AI reprices it to zero
- **Ghost GDP**: Output that shows in national accounts but never circulates — machines don't buy coffee or rent apartments
- **Intelligence displacement spiral**: AI improves → companies cut headcount → savings fund more AI → more cuts → displaced workers spend less → consumer economy withers
- **White-collar concentration**: Job losses concentrated in upper deciles; top 10% drive 50%+ of consumer spending — lagged but deep consumption hit
- **Downshift**: Displaced PMs/engineers flood gig economy; overqualified labor compresses wages everywhere
- **Mortgage question**: Prime mortgages (780 FICO) underwritten on income assumptions that no longer hold
- **Use**: Severance, COBRA, job search, salary compression, gig economy, mortgage stress, mutual aid

### Yanis Varoufakis — Technofeudalism

- **Cloud capital**: Networked machines, servers, algorithms, AI — not "produced means of production" but "produced means of behavioural modification"
- **Cloud fiefdoms**: Big tech replaces markets with platform-controlled ecosystems
- **Cloud serfs**: Users provide unpaid labor (reviews, content, ratings); workers face intensified exploitation via wrist-worn devices, real-time monitoring
- **Platform capitalism**: Uber, DoorDash, Mechanical Turk — sweatshop-like conditions, precarious remote work
- **Use**: Gig economy as new feudalism, platform extraction, "bridging" roles for humans, collective action as counter

### Jodi Dean — Neo-feudalism & Communicative Capitalism

- **Neo-feudalism**: Capitalism evolving toward something worse; parcelization of sovereignty — fragmented legal regimes, corporations suing states
- **Communicative capitalism**: Digital communication and data extraction transform economic relations
- **Without organized struggle**: System could evolve toward neo-feudalism rather than socialism
- **Use**: Policy lag, political engagement, solidarity as counter-movement, cooperative alternatives

## Narrative Conventions

- Use generic phrasing: "Some analysts argue…", "The Citrini memo noted…", "Varoufakis calls it…"
- Avoid explicitly naming sources in player-facing text except where it fits naturally (e.g. "the Citrini memo")
- Stats for AI-displaced scenario: savings, health, solidarity, dignity, employability

## Key Files

- `frontend/src/narrative/scenario-trees/ai-displaced.ts` — Decision tree
- `frontend/src/narrative/registry.ts` — Scenario config, stat colors, evaluateEnding
- `frontend/src/pages/ScenarioSelect.tsx` — Narrative card (narrative-featured section)

## Decision Tree Structure

- **Phase 1**: Layoff, first week, downshift, interview (immediate crisis)
- **Phase 2**: Mutual aid, rent, recruiter, mortgage, organizing (survival & solidarity)
- **Phase 3**: Offer, side project, mental health, policy (adaptation & agency)
- **Phase 4–5**: Reckoning, next chapter, legacy (endings)

## Branching Patterns

- Use `nextBlock` for path-specific nodes (e.g. gig vs. search branches)
- Use `minStats` for gated choices (e.g. high dignity required to refuse)
- Endings: victory (dignity + solidarity), partial (survived), defeat (spiral)

## Integration Rules

1. **Trade-offs**: Every choice has costs — savings vs. dignity, employability vs. solidarity
2. **No easy wins**: The system has no natural brake; policy lags; individual agency is limited
3. **Solidarity as counter**: Mutual aid, organizing, cooperatives as alternative to platform feudalism
4. **Avoid tech solutionism**: AI is not "fixable" within the scenario; focus on human response

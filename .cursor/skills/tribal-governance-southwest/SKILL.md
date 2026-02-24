---
name: tribal-governance-southwest
description: Integrates Indigenous scholars (Majerle Lister, Andrew Curley, Kendrick Many Goats, George Manuel) into narrative design for tribal governance scenarios. Use when creating or updating the Reservation Governor narrative mode, adding nodes about sovereignty, economic development, energy, land, or self-determination in Indian Country.
---

# Tribal Governance Southwest

## Purpose

Guide narrative design for the "Reservation Governor" scenario: a tribal governor in the Southwest U.S. developing the economy and lifting people out of poverty while maintaining Indigenous sovereignty. Each decision impacts the next.

## Thinker Catalog

### Majerle Lister (Diné/Navajo, contemporary)
- **Context**: PhD candidate, University of Arizona; Wósdéé Podcast; Navajo Nation
- **Insight**: Native desires for development are grounded in land histories and shaped by self-determination goals — not monolithic. Forced livestock reduction, grazing regimes, and uneven development have marginalised Navajo self-determination since 1868. Development must be understood within settler-colonial structures.
- **Use for**: Development vs. sovereignty trade-offs, land and grazing, community desires, self-determination

### Andrew Curley (Diné/Navajo, contemporary)
- **Key work**: *Carbon Sovereignty: Coal, Development, and Energy Transition in the Navajo Nation* (2023)
- **Insight**: "Carbon sovereignty" — tribal leaders work within colonial structures to assert sovereignty through fossil fuel development. Coal was a strategic mechanism; its closure (e.g. 2019) forces reckoning. Tribal economic survival and sovereignty are entangled with extractive industries.
- **Use for**: Energy development, coal/renewables transition, sovereignty within colonial limits, water politics

### Kendrick Many Goats (Diné/Navajo)
- **Context**: Scholar/activist on Indigenous economy and governance (sources limited; user-provided reference).
- **Insight**: Include when discussing community-based economic models, traditional livelihoods, or Diné perspectives on development.
- **Use for**: Community economy, traditional practices, governance from the ground up

### George Manuel (Secwépemc, 1921–1989)
- **Key work**: *The Fourth World: An Indian Reality* (1974, with Michael Posluns)
- **Context**: President, National Indian Brotherhood (1970–76); founded World Council of Indigenous Peoples; opposed Trudeau's 1969 White Paper; pioneered UNDRIP
- **Insight**: Fourth World — Indigenous peoples as nations within colonial states. "We own those places. They are ours. You are squatters." Treaties, title, compensation. Indigenous survival as nations and cultures.
- **Use for**: Sovereignty, treaty rights, land title, assimilation vs. self-determination, international Indigenous solidarity

## Integration Rules

1. **Plain language**: One thinker per paragraph max; explain the insight.
2. **Pattern**: `Curley argues that coal development was a form of sovereignty...` or `Manuel's Fourth World...`
3. **Match theme to thinker**:
   - Energy/coal/renewables → Curley
   - Development desires, land → Lister
   - Sovereignty, treaties, Fourth World → Manuel
   - Community economy → Many Goats (when applicable)

## Stat Mapping

| Stat | Use |
|------|-----|
| sovereignty | Tribal self-determination, treaty rights, jurisdictional authority |
| economicStrength | Jobs, revenue, tribal enterprises |
| publicSupport | Community buy-in, council support |
| culturalIntegrity | Language, traditions, land-based practices |
| fiscalHealth | Tribal budget, debt, federal funding dependence |

## Node Structure

Use `DecisionBlock[]` with `createLongFormTree`. Support branching via `nextBlock` and `endingIndex`. See `plurinational-path.ts` and `gulf-migrant.ts`.

## Southwest Context

- Gaming (IGRA), energy (coal, renewables), federal contracts, tourism, agriculture
- BIA, federal trust relationship, PL-280, self-determination contracts
- Water rights, land tenure, grazing, mineral leases
- Urban relocation, poverty, health disparities, language revitalisation

## Anti-Patterns

- Don't treat tribes as monolithic; show internal debate.
- Sovereignty is ongoing negotiation, not fixed status.
- Development and sovereignty can align or conflict — show the tension.

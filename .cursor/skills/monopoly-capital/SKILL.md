---
name: monopoly-capital
description: Integrate Paul Sweezy and Paul A. Baran's Monopoly Capital framework into Macro Planner narrative scenarios. Use when creating or updating scenarios involving corporate concentration, stagnation, surplus absorption, or monopoly power. Provides narrative templates, decision structures, and economic concepts from the Monthly Review tradition.
---

# Monopoly Capital (Sweezy & Baran) Integration

## Key Concepts

### Economic Surplus
The gap between total output and essential consumption costs (wages, raw materials, depreciation). Under monopoly, surplus grows faster than wages because monopolies restrict output to maintain high prices.

### Surplus Absorption Problem
Monopoly capitalism generates more surplus than can be absorbed through productive investment. The system needs "sinks" to absorb excess capital:
- **Sales effort**: Advertising, marketing, planned obsolescence
- **Military spending**: Permanent arms economy
- **Financialization**: Speculation, M&A activity
- **Luxury consumption**: Wealthy consumption of unproductive services

### Stagnation Thesis
Without external stimuli (wars, imperial expansion, major innovations), monopoly capitalism tends toward chronic unemployment and underutilized capacity because monopolies have no incentive to expand.

## Narrative Template

```typescript
{
  phase: 2,
  title: 'The Concentration of Capital',
  narrative: `**Sweezy & Baran's Monopoly Capital**: As industries consolidate, competition gives way to oligopoly. The giants don't compete on price—they compete on marketing and acquisition.

**The Surplus Grows**: Calmwater's tech sector now has three firms controlling 85% of the market. Their profit margins are 35%, but they aren't building factories. They're buying back stock and acquiring startups just to shut them down.

**The Absorption Problem**: When competition was fierce, profits were reinvested. Now, with monopoly power, the surplus has nowhere productive to go. It piles up in offshore accounts or gets burned on marketing campaigns.`,
  choices: [
    {
      id: 'absorb_military',
      text: 'Expand military contracts with tech firms',
      consequence: 'Classic surplus absorption. Tech firms get guaranteed revenue without market risk.',
      effects: { economicStrength: 8, publicSupport: -12, debtBurden: 15 }
    },
    {
      id: 'break_monopolies',
      text: 'Aggressive antitrust enforcement',
      consequence: 'Restore competition. Forces reinvestment to survive. Risk of capital flight.',
      effects: { economicStrength: -5, wageShare: 15, publicSupport: 10 }
    }
  ]
}
```

## Integration Points

- **AI Displaced Scenario**: Surplus of labor, UBI as surplus absorption
- **Stagflation Scenario**: Stagnation under monopoly, military Keynesianism
- **Tutorial Marxian Path**: Add "From Competition to Monopoly" block

## Key Thinkers

- **Paul Sweezy**: Monopoly Capital, stagnation thesis
- **Paul A. Baran**: Economic surplus, backwardness of underdevelopment
- **Harry Magdoff**: Financialization, late capitalism
- **John Bellamy Foster**: Ecological Marxism, monopoly-finance capital
import { createStubTree } from './index';

const { nodes, getNode } = createStubTree({
  startTitle: 'Commodity Shock & Development Squeeze',
  startNarrative: `You lead the Republic of Kemet — a developing economy that depends on commodity exports and key imports. World prices are volatile. The exchange rate is under pressure. You must manage inflation, debt, and the current account while keeping growth and stability.

Emmanuel's theory of unequal exchange explains why your exports don't generate the wealth you'd expect — the terms of trade are stacked against low-wage economies. Amin showed that trade between center and periphery systematically transfers value to the center. Kadri argues that what looks like a "resource curse" is often designed extraction — your commodity wealth flows outward by structural design. Ajl emphasizes food sovereignty: dependence on volatile world markets for food leaves you exposed.

Do you intervene in the currency? Subsidize key imports? Diversify exports? The commodity rollercoaster demands quick decisions.`,
  choices: [
    {
      id: 'fx_intervention',
      text: 'Intervene heavily in the currency market to stabilize the exchange rate',
      consequence: 'You commit reserves to defending the currency.',
      effects: { priceStability: 10, externalBalance: -15, debtBurden: 5 },
      nextNode: 'outcome_fx',
    },
    {
      id: 'subsidies',
      text: 'Subsidize food and fuel imports to protect living standards',
      consequence: 'You spend to cushion the shock.',
      effects: { publicSupport: 12, debtBurden: 15, priceStability: 5 },
      nextNode: 'outcome_subsidies',
    },
    {
      id: 'diversify',
      text: 'Accelerate export diversification and accept short-term pain',
      consequence: 'You invest in new export sectors.',
      effects: { economicStrength: 5, externalBalance: 8, publicSupport: -8 },
      nextNode: 'outcome_diversify',
    },
  ],
  outcomes: [
    {
      id: 'outcome_fx',
      title: 'Currency Defense',
      narrative: 'You defended the currency. Reserves fell, but stability held. The cost was high.',
      endingType: 'partial_victory',
      endingNarrative: 'You stabilized the exchange rate. Reserves are depleted. The next shock will be harder.',
    },
    {
      id: 'outcome_subsidies',
      title: 'Social Cushion',
      narrative: 'Your subsidies protected the poor. But debt has risen. The IMF is knocking.',
      endingType: 'partial_victory',
      endingNarrative: 'You chose people over numbers. Debt is the price.',
    },
    {
      id: 'outcome_diversify',
      title: 'Structural Shift',
      narrative: 'Your diversification push is bearing fruit. New exports are growing. The economy is less dependent.',
      endingType: 'victory',
      endingNarrative: 'You broke the commodity trap. Diversification has paid off.',
    },
  ],
});

export const commodityPressureNodes = nodes;
export { getNode };

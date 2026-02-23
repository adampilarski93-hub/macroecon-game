import { createStubTree } from './index';

const { nodes, getNode } = createStubTree({
  startTitle: 'Independence & Underdevelopment',
  startNarrative: `Your country, the Republic of Uhuru, has just won independence. The economy is still dominated by agriculture. Industry is small. The tax base is weak. You must build industry, raise revenue, and meet people's expectations without breaking the budget.

Samir Amin argued that peripheral countries must partially "delink" from the world market to develop — not autarky, but subordinating external relations to internal priorities. Arghiri Emmanuel showed that "free trade" between unequal partners transfers value from South to North through wage differentials. Ruy Mauro Marini called the low-wage trap "super-exploitation" — workers paid below subsistence boost exports but destroy domestic demand. Max Ajl advocates food sovereignty: no country has built a strong economy without first feeding its own people. Ali Kadri documents how developmental states were dismantled through structural adjustment.

Will you follow state-led industrialisation? A mixed economy? Or market-led growth? The path you choose will define your nation.`,
  choices: [
    {
      id: 'state_led',
      text: 'State-led industrialisation: invest heavily in industry and planning',
      consequence: 'You commit to a developmental state model.',
      effects: { economicStrength: 12, sovereignty: 10, debtBurden: 15 },
      nextNode: 'outcome_state',
    },
    {
      id: 'mixed',
      text: 'Mixed economy: balance state investment with private enterprise',
      consequence: 'You pursue a middle path.',
      effects: { economicStrength: 8, publicSupport: 8, debtBurden: 8 },
      nextNode: 'outcome_mixed',
    },
    {
      id: 'market_led',
      text: 'Market-led growth: open up, attract foreign investment',
      consequence: 'You bet on openness and markets.',
      effects: { economicStrength: 10, sovereignty: -10, publicSupport: -5 },
      nextNode: 'outcome_market',
    },
  ],
  outcomes: [
    {
      id: 'outcome_state',
      title: 'Developmental State',
      narrative: 'Your state-led push has built new industries. The economy is transforming. Debt has risen, but so has capacity.',
      endingType: 'victory',
      endingNarrative: 'You built industry through state action. The developmental state model has delivered.',
    },
    {
      id: 'outcome_mixed',
      title: 'Balanced Development',
      narrative: 'Your mixed approach has yielded steady progress. Neither radical nor passive.',
      endingType: 'victory',
      endingNarrative: 'You found a balance between state and market. Steady progress.',
    },
    {
      id: 'outcome_market',
      title: 'Open Economy',
      narrative: 'Foreign investment has flowed in. Growth has accelerated. But sovereignty has been traded for capital.',
      endingType: 'partial_victory',
      endingNarrative: 'Growth came, but at the cost of policy space. The market-led path has trade-offs.',
    },
  ],
});

export const independenceNodes = nodes;
export { getNode };

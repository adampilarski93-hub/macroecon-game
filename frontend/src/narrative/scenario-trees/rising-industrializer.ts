import { createStubTree } from './index';

const { nodes, getNode } = createStubTree({
  startTitle: 'Rising Industrializer',
  startNarrative: `You lead the People's Republic of Donghai — an economy shifting from farm to factory. Growth is strong but uneven. Inflation can spike. Debt can build. The exchange rate is sensitive. You must balance industrialisation with stability and shared gains.

Marini theorized "dependent development" — peripheral economies grow in ways that serve the center's needs, not their own. Amin warned that opening to free trade without industrial capacity causes deindustrialization. Lenin analyzed how monopoly capital exports itself to the periphery to extract super-profits. Radhika Desai's "geopolitical economy" framework explains why your options are shaped by power politics, not just markets — and why South-South cooperation can reduce dependence on Western institutions.

Will you push growth harder? Or apply the brakes to control inflation and debt?`,
  choices: [
    {
      id: 'full_speed',
      text: 'Full speed ahead: maximize growth, manage inflation later',
      consequence: 'You prioritize industrialisation.',
      effects: { economicStrength: 15, priceStability: -10, debtBurden: 10 },
      nextNode: 'outcome_full',
    },
    {
      id: 'managed_growth',
      text: 'Managed growth: moderate investment, control inflation',
      consequence: 'You balance growth and stability.',
      effects: { economicStrength: 8, priceStability: 5, publicSupport: 5 },
      nextNode: 'outcome_managed',
    },
    {
      id: 'shared_gains',
      text: 'Shared gains: invest in rural development and worker welfare',
      consequence: 'You spread the benefits of growth.',
      effects: { publicSupport: 15, economicStrength: 5, debtBurden: 5 },
      nextNode: 'outcome_shared',
    },
  ],
  outcomes: [
    {
      id: 'outcome_full',
      title: 'Industrial Boom',
      narrative: 'Growth has surged. Factories have multiplied. But inflation and debt have risen. The boom has costs.',
      endingType: 'partial_victory',
      endingNarrative: 'You industrialised fast. The question is whether it was too fast.',
    },
    {
      id: 'outcome_managed',
      title: 'Steady Industrialisation',
      narrative: 'Your balanced approach has delivered growth without crisis. Inflation is under control.',
      endingType: 'victory',
      endingNarrative: 'You industrialised without overheating. Steady wins the race.',
    },
    {
      id: 'outcome_shared',
      title: 'Inclusive Growth',
      narrative: 'You spread the gains. Rural areas have benefited. Workers have seen real wage growth.',
      endingType: 'victory',
      endingNarrative: 'You proved that growth can be shared. Industrialisation with a human face.',
    },
  ],
});

export const risingIndustrializerNodes = nodes;
export { getNode };

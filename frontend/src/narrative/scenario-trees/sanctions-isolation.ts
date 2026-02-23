import { createStubTree } from './index';

const { nodes, getNode } = createStubTree({
  startTitle: 'Under Sanctions',
  startNarrative: `You lead the Republic of Persea — a country facing international sanctions. Trade and finance are restricted. The risk premium is high. You must find ways to stabilize the economy and protect living standards with limited external options.

Lenin and Bukharin understood imperialism as a system: sanctions are a form of discipline, not neutral "international law." Bukharin's work on "transition economics" — building a new economic structure under hostile conditions — applies directly. Kadri documents how sanctions and war have deliberately deindustrialized states across the Arab world. Radhika Desai argues the multipolar world offers alternatives: South-South cooperation, new payment systems, and regional trade blocs can reduce dependence on sanctioning powers.

Do you seek alternative trade partners? Build domestic self-reliance? Or try to negotiate your way out?`,
  choices: [
    {
      id: 'alternative_trade',
      text: 'Pivot to alternative trade partners and payment systems',
      consequence: 'You seek new markets and bypass sanctions.',
      effects: { economicStrength: 8, sovereignty: 5, internationalStanding: -5 },
      nextNode: 'outcome_alternative',
    },
    {
      id: 'self_reliance',
      text: 'Build domestic self-reliance: import substitution and local production',
      consequence: 'You turn inward.',
      effects: { sovereignty: 15, economicStrength: 5, publicSupport: 8 },
      nextNode: 'outcome_self_reliance',
    },
    {
      id: 'negotiate',
      text: 'Pursue diplomatic negotiations to ease or lift sanctions',
      consequence: 'You open channels with the sanctioning powers.',
      effects: { internationalStanding: 5, publicSupport: 3, sovereignty: -5 },
      nextNode: 'outcome_negotiate',
    },
  ],
  outcomes: [
    {
      id: 'outcome_alternative',
      title: 'New Partners',
      narrative: 'You found alternative trade routes and partners. The economy has adapted. Sanctions hurt, but they did not strangle.',
      endingType: 'victory',
      endingNarrative: 'You diversified away from sanctioning powers. The economy has found new paths.',
    },
    {
      id: 'outcome_self_reliance',
      title: 'Sovereign Economy',
      narrative: 'Your import substitution has built domestic capacity. You are less dependent on the global system.',
      endingType: 'victory',
      endingNarrative: 'You built self-reliance under pressure. Sovereignty through necessity.',
    },
    {
      id: 'outcome_negotiate',
      title: 'Diplomatic Path',
      narrative: 'Negotiations have yielded partial relief. Some sanctions have been eased. The path was long.',
      endingType: 'partial_victory',
      endingNarrative: 'You negotiated your way to some relief. Diplomacy has limits, but it helped.',
    },
  ],
});

export const sanctionsNodes = nodes;
export { getNode };

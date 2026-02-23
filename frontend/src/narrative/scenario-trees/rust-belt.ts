import { createStubTree } from './index';

const { nodes, getNode } = createStubTree({
  startTitle: 'The Rust Belt Challenge',
  startNarrative: `You lead the Federal Republic of Nordmark — a once-industrial powerhouse where factories have closed and jobs have moved away. Services dominate now, but unemployment is high and growth is weak. The old manufacturing towns are hollowed out.

Torkil Lauesen argues that Northern prosperity rests on value transferred from the South through global supply chains — your cheap imports aren't just market outcomes, they reflect global wage hierarchies. When those factories left, Polanyi's "double movement" was violated: labor was treated as a commodity to be discarded. Thomas Piketty's work shows that when returns on capital outpace growth, wealth concentrates and inequality rises — and your rust belt regions have felt that squeeze.

Do you try to revive industry through green investment and industrial policy? Or lean into services and retraining? And how do you manage inflation from energy and imports?

Your first major decision will set the tone.`,
  choices: [
    {
      id: 'industrial_policy',
      text: 'Launch industrial policy: subsidies for green manufacturing and reshoring',
      consequence: 'You bet on bringing factories back.',
      effects: { economicStrength: 8, employment: 10, debtBurden: 5 },
      nextNode: 'outcome_industrial',
    },
    {
      id: 'services_retrain',
      text: 'Invest in services and retraining: prepare workers for the new economy',
      consequence: 'You focus on human capital and the service sector.',
      effects: { employment: 5, publicSupport: 8, economicStrength: 5 },
      nextNode: 'outcome_services',
    },
    {
      id: 'austerity',
      text: 'Cut spending and wait for the market to adjust',
      consequence: 'You take a hands-off approach.',
      effects: { debtBurden: -10, publicSupport: -15, employment: -5 },
      nextNode: 'outcome_austerity',
    },
  ],
  outcomes: [
    {
      id: 'outcome_industrial',
      title: 'Industrial Revival',
      narrative: 'Your industrial policy has attracted new investment. Factories are reopening. Jobs are returning. The bet on green manufacturing is paying off.',
      endingType: 'victory',
      endingNarrative: 'You revived industry through targeted policy. The rust belt is showing signs of life again.',
    },
    {
      id: 'outcome_services',
      title: 'Services Transition',
      narrative: 'Retraining programs have helped workers find new roles. The service sector has grown. The transition has been gradual but real.',
      endingType: 'partial_victory',
      endingNarrative: 'You eased the transition to a service economy. Not everyone was saved, but many found new paths.',
    },
    {
      id: 'outcome_austerity',
      title: 'Market Adjustment',
      narrative: 'You cut spending and waited. The market adjusted — slowly. Some towns recovered. Others did not.',
      endingType: 'defeat',
      endingNarrative: 'The hands-off approach left many communities behind. Debt fell, but so did hope.',
    },
  ],
});

export const rustBeltNodes = nodes;
export { getNode };

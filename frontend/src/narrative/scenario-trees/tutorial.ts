import { createStubTree } from './index';

const { nodes, getNode } = createStubTree({
  startTitle: 'Learning the Basics',
  startNarrative: `Welcome to the Republic of Calmwater — a stable economy with no crisis. This scenario lets you learn how economic policy works through choices rather than sliders.

Karl Polanyi taught that markets left unregulated can destroy society — and that society fights back through protective counter-movements like regulation and welfare. Thomas Piketty showed that when returns on capital exceed growth, wealth concentrates at the top unless we actively redistribute. These ideas shape the trade-offs you'll face.

You'll make decisions about taxes, spending, and trade. Each choice affects economic strength, public support, and debt. Pay attention to the trade-offs.

Ready to begin?`,
  choices: [
    {
      id: 'balanced',
      text: 'Take a balanced approach: modest spending with moderate taxes',
      consequence: 'You choose the middle path.',
      effects: { economicStrength: 5, publicSupport: 5, debtBurden: 0 },
      nextNode: 'outcome_balanced',
    },
    {
      id: 'expansionary',
      text: 'Stimulate the economy: increase spending and cut taxes',
      consequence: 'You bet on growth.',
      effects: { economicStrength: 10, publicSupport: 10, debtBurden: 15 },
      nextNode: 'outcome_expansionary',
    },
    {
      id: 'conservative',
      text: 'Be conservative: cut spending and raise taxes to reduce debt',
      consequence: 'You prioritize fiscal discipline.',
      effects: { economicStrength: -3, publicSupport: -5, debtBurden: -15 },
      nextNode: 'outcome_conservative',
    },
  ],
  outcomes: [
    {
      id: 'outcome_balanced',
      title: 'Steady Growth',
      narrative: 'Your balanced approach kept the economy stable. Growth was modest but sustainable.',
      endingType: 'victory',
      endingNarrative: 'You learned that balance matters. Try the full policy-control mode to explore the simulation in more depth.',
    },
    {
      id: 'outcome_expansionary',
      title: 'Growth with Risk',
      narrative: 'Your stimulus boosted growth and approval. But debt has risen. In the full simulation, that could matter.',
      endingType: 'partial_victory',
      endingNarrative: 'You saw how stimulus works. Debt is the trade-off. Switch to policy mode to experiment further.',
    },
    {
      id: 'outcome_conservative',
      title: 'Fiscal Discipline',
      narrative: 'You cut debt. But growth slowed and approval fell. Austerity has costs.',
      endingType: 'partial_victory',
      endingNarrative: 'You learned the cost of austerity. Try policy mode to find the right balance.',
    },
  ],
});

export const tutorialNodes = nodes;
export { getNode };

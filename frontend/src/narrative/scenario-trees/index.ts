/**
 * Creates a minimal decision tree stub for scenarios that don't yet have full content.
 * Each stub has a start node with choices leading to outcome nodes and endings.
 */
import type { GenericNarrativeNode } from '../scenario-types';

export function createStubTree(config: {
  startTitle: string;
  startNarrative: string;
  choices: Array<{
    id: string;
    text: string;
    consequence: string;
    effects: Record<string, number>;
    nextNode: string;
  }>;
  outcomes: Array<{
    id: string;
    title: string;
    narrative: string;
    endingType: 'victory' | 'partial_victory' | 'defeat';
    endingNarrative: string;
  }>;
}): { nodes: GenericNarrativeNode[]; getNode: (id: string) => GenericNarrativeNode | undefined } {
  const nodes: GenericNarrativeNode[] = [
    {
      id: 'start',
      phase: 1,
      title: config.startTitle,
      narrative: config.startNarrative,
      choices: config.choices.map((c) => ({
        ...c,
        minStats: undefined,
      })),
    },
    ...config.outcomes.map((o) => ({
      id: o.id,
      phase: 2,
      title: o.title,
      narrative: o.narrative,
      choices: [
        {
          id: `end_${o.id}`,
          text: 'Continue',
          consequence: '',
          effects: {},
          nextNode: `ending_${o.id}`,
        },
      ],
    })),
    ...config.outcomes.map((o) => ({
      id: `ending_${o.id}`,
      phase: 3,
      title: o.title,
      narrative: '',
      choices: [],
      isEnding: true,
      endingType: o.endingType,
      endingTitle: o.title,
      endingNarrative: o.endingNarrative,
    })),
  ];

  const getNode = (id: string) => nodes.find((n) => n.id === id);
  return { nodes, getNode };
}

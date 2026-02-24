/**
 * Creates a decision tree for scenarios. Supports one or two layers of decisions.
 * With midNodes: start (1 decision) → mid (1 decision) → outcome → ending = 2 decisions
 * Without midNodes: start (1 decision) → outcome → ending = 1 decision
 */
import type { GenericNarrativeNode } from '../scenario-types';

export interface StubOutcome {
  id: string;
  title: string;
  narrative: string;
  endingType: 'victory' | 'partial_victory' | 'defeat';
  endingNarrative: string;
}

export interface StubMidNode {
  id: string;
  title: string;
  narrative: string;
  phase: number;
  choices: Array<{
    id: string;
    text: string;
    consequence: string;
    effects: Record<string, number>;
    nextNode: string;
  }>;
}

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
  midNodes?: StubMidNode[];
  outcomes: StubOutcome[];
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
    ...(config.midNodes ?? []).map((m) => ({
      id: m.id,
      phase: m.phase,
      title: m.title,
      narrative: m.narrative,
      choices: m.choices.map((c) => ({
        ...c,
        minStats: undefined as Partial<Record<string, number>> | undefined,
      })),
    })),
    ...config.outcomes.map((o) => ({
      id: o.id,
      phase: (config.midNodes?.length ? 4 : 2),
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
      phase: (config.midNodes?.length ? 5 : 3),
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

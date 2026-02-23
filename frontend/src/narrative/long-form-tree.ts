/**
 * Creates a long-form decision tree with exactly N decision points.
 * Each decision leads to the next; the final decision routes to endings.
 */
import type { GenericNarrativeNode, GenericNarrativeChoice } from './scenario-types';

export interface DecisionBlock {
  phase: number;
  title: string;
  narrative: string;
  choices: Array<{
    id: string;
    text: string;
    consequence: string;
    effects: Record<string, number>;
  }>;
}

export interface LongFormEnding {
  id: string;
  endingType: 'victory' | 'partial_victory' | 'defeat';
  title: string;
  endingNarrative: string;
}

export function createLongFormTree(
  blocks: DecisionBlock[],
  endings: LongFormEnding[],
  routeLastToEndings: (choiceIndex: number) => number, // maps choice index to ending index
): { nodes: GenericNarrativeNode[]; getNode: (id: string) => GenericNarrativeNode | undefined } {
  const nodes: GenericNarrativeNode[] = [];
  const numDecisions = blocks.length;

  for (let i = 0; i < numDecisions; i++) {
    const block = blocks[i];
    const nodeId = i === 0 ? 'start' : `dec_${i}`;
    const isLast = i === numDecisions - 1;

    const choices: GenericNarrativeChoice[] = block.choices.map((c, choiceIdx) => {
      let nextNode: string;
      if (isLast) {
        const endingIdx = routeLastToEndings(choiceIdx);
        const ending = endings[endingIdx];
        nextNode = `outcome_${ending.id}`;
      } else {
        nextNode = i === 0 ? `dec_1` : `dec_${i + 1}`;
      }
      return {
        id: `${nodeId}_${c.id}`,
        text: c.text,
        consequence: c.consequence,
        effects: c.effects,
        nextNode,
        minStats: undefined,
      };
    });

    nodes.push({
      id: nodeId,
      phase: block.phase,
      title: block.title,
      narrative: block.narrative,
      choices,
    });
  }

  // Outcome nodes (narrative + Continue button)
  for (const ending of endings) {
    nodes.push({
      id: `outcome_${ending.id}`,
      phase: Math.ceil(numDecisions / 4) + 1,
      title: ending.title,
      narrative: ending.endingNarrative,
      choices: [
        {
          id: `end_${ending.id}`,
          text: 'Continue',
          consequence: '',
          effects: {},
          nextNode: `ending_${ending.id}`,
          minStats: undefined,
        },
      ],
    });
  }

  // Ending nodes
  for (const ending of endings) {
    nodes.push({
      id: `ending_${ending.id}`,
      phase: Math.ceil(numDecisions / 4) + 2,
      title: ending.title,
      narrative: '',
      choices: [],
      isEnding: true,
      endingType: ending.endingType,
      endingTitle: ending.title,
      endingNarrative: ending.endingNarrative,
    });
  }

  const getNode = (id: string) => nodes.find((n) => n.id === id);
  return { nodes, getNode };
}

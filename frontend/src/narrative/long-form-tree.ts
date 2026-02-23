/**
 * Creates a long-form decision tree. Supports both linear chains and branching.
 * - Linear: each decision leads to the next; final decision routes to endings.
 * - Branching: choices can specify nextBlock or endingIndex to create different paths.
 */
import type { GenericNarrativeNode, GenericNarrativeChoice } from './scenario-types';

export interface DecisionChoice {
  id: string;
  text: string;
  consequence: string;
  effects: Record<string, number>;
  /** If set, go to this block index instead of the next. Enables branching. */
  nextBlock?: number;
  /** If set, go directly to this ending. For terminal blocks. */
  endingIndex?: number;
}

export interface DecisionBlock {
  phase: number;
  title: string;
  narrative: string;
  choices: DecisionChoice[];
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

  const blockId = (idx: number) => (idx === 0 ? 'start' : `dec_${idx}`);

  for (let i = 0; i < numDecisions; i++) {
    const block = blocks[i];
    const nodeId = blockId(i);
    const isLast = i === numDecisions - 1;

    const choices: GenericNarrativeChoice[] = block.choices.map((c, choiceIdx) => {
      let nextNode: string;
      if (c.endingIndex !== undefined) {
        const ending = endings[c.endingIndex];
        nextNode = `outcome_${ending.id}`;
      } else if (c.nextBlock !== undefined) {
        nextNode = blockId(c.nextBlock);
      } else if (isLast) {
        const endingIdx = routeLastToEndings(choiceIdx);
        const ending = endings[endingIdx];
        nextNode = `outcome_${ending.id}`;
      } else {
        nextNode = blockId(i + 1);
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

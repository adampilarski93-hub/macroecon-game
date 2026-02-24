/**
 * Creates a long-form decision tree. Supports both linear chains and branching.
 * - Linear: each decision leads to the next; final decision routes to endings.
 * - Branching: choices can specify nextBlock, nextArc, or endingIndex to create different paths.
 */
import type { GenericNarrativeNode, GenericNarrativeChoice } from './scenario-types';

export interface DecisionChoice {
  id: string;
  text: string;
  consequence: string;
  effects: Record<string, number>;
  /** If set, go to this block index instead of the next. Enables branching. */
  nextBlock?: number;
  /** If set, switch to this arc. */
  nextArc?: string;
  /** If set, go directly to this ending. For terminal blocks. */
  endingIndex?: number;
  /** Optional requirements to see this choice */
  minStats?: Record<string, number>;
}

export interface DecisionBlock {
  phase: number;
  title: string;
  narrative: string;
  choices: DecisionChoice[];
}

export interface ScenarioArc {
  id: string;
  blocks: DecisionBlock[];
}

export interface LongFormEnding {
  id: string;
  endingType: 'victory' | 'partial_victory' | 'defeat';
  title: string;
  endingNarrative: string;
}

export function createArcBasedTree(
  arcs: ScenarioArc[],
  endings: LongFormEnding[],
  routeLastToEndings: (choiceIndex: number) => number,
): { nodes: GenericNarrativeNode[]; getNode: (id: string) => GenericNarrativeNode | undefined } {
  const nodes: GenericNarrativeNode[] = [];

  const blockId = (arcId: string, idx: number) => (arcId === 'start' && idx === 0 ? 'start' : `${arcId}_${idx}`);

  for (const arc of arcs) {
    const numBlocks = arc.blocks.length;
    for (let i = 0; i < numBlocks; i++) {
      const block = arc.blocks[i];
      const nodeId = blockId(arc.id, i);
      const isLastInArc = i === numBlocks - 1;

      const choices: GenericNarrativeChoice[] = block.choices.map((c, choiceIdx) => {
        let nextNode: string;
        if (c.endingIndex !== undefined) {
          const ending = endings[c.endingIndex];
          nextNode = `outcome_${ending.id}`;
        } else if (c.nextArc !== undefined) {
          nextNode = blockId(c.nextArc, 0);
        } else if (c.nextBlock !== undefined) {
          nextNode = blockId(arc.id, c.nextBlock);
        } else if (isLastInArc) {
          // If it's the last block in the last arc, route to endings
          const isLastArc = arcs.indexOf(arc) === arcs.length - 1;
          if (isLastArc) {
            const endingIdx = routeLastToEndings(choiceIdx);
            const ending = endings[endingIdx];
            nextNode = `outcome_${ending.id}`;
          } else {
            // Default to next arc in list if exists
            const nextArcIdx = arcs.indexOf(arc) + 1;
            nextNode = blockId(arcs[nextArcIdx].id, 0);
          }
        } else {
          nextNode = blockId(arc.id, i + 1);
        }

        return {
          id: `${nodeId}_${c.id}`,
          text: c.text,
          consequence: c.consequence,
          effects: c.effects,
          nextNode,
          minStats: c.minStats,
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
  }

  // Outcome nodes (narrative + Continue button)
  for (const ending of endings) {
    nodes.push({
      id: `outcome_${ending.id}`,
      phase: 6,
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

    nodes.push({
      id: `ending_${ending.id}`,
      phase: 7,
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

export function createLongFormTree(
  blocks: DecisionBlock[],
  endings: LongFormEnding[],
  routeLastToEndings: (choiceIndex: number) => number,
) {
  return createArcBasedTree([{ id: 'start', blocks }], endings, routeLastToEndings);
}

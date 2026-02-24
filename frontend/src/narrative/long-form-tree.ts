/**
 * Creates a long-form decision tree. Supports both linear chains and branching.
 * - Linear: each decision leads to the next; final decision routes to endings.
 * - Branching: choices can specify nextBlock, nextArc, or endingIndex to create different paths.
 * - shuffleBlocks: phase-aware shuffle — randomize only within the same phase to preserve
 *   macroeconomic causality and heterodox theoretical progression (e.g., Hudson's debt jubilee
 *   → public banking → resisting deflation; Phillips curve before turning point).
 * - blockPool: show a random subset of blocks per playthrough (e.g., 3 of 5).
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
  /** Optional: indices of blocks to randomly sample. E.g. [1,2,3,4,5] = pick 3 of these 5. */
  blockPool?: number[];
  /** If blockPool set, how many blocks to pick from the pool. Default 1 less than pool size. */
  blockPoolCount?: number;
}

export interface LongFormEnding {
  id: string;
  endingType: 'victory' | 'partial_victory' | 'defeat';
  title: string;
  endingNarrative: string;
}

/** Fisher-Yates shuffle. Mutates array. */
function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface CreateTreeOptions {
  /** Shuffle block order within each arc (except first/last) for replay variety */
  shuffleBlocks?: boolean;
  /** Random seed for reproducible shuffling (0 = use Math.random) */
  seed?: number;
}

/** Simple seeded RNG for reproducible shuffles */
function createSeededRng(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export function createArcBasedTree(
  arcs: ScenarioArc[],
  endings: LongFormEnding[],
  routeLastToEndings: (choiceIndex: number) => number,
  options?: CreateTreeOptions,
): { nodes: GenericNarrativeNode[]; getNode: (id: string) => GenericNarrativeNode | undefined } {
  const nodes: GenericNarrativeNode[] = [];
  const rng = options?.seed !== undefined && options.seed !== 0
    ? createSeededRng(options.seed)
    : Math.random;

  const blockId = (arcId: string, idx: number) => (arcId === 'start' && idx === 0 ? 'start' : `${arcId}_${idx}`);

  for (const arc of arcs) {
    let blocks = arc.blocks;

    // Block pool: pick a random subset of blocks (e.g., 3 of 5 middle blocks)
    if (arc.blockPool && arc.blockPool.length > 0) {
      const poolIndices = shuffle(arc.blockPool, rng);
      const count = arc.blockPoolCount ?? Math.max(1, poolIndices.length - 1);
      const picked = poolIndices.slice(0, count).sort((a, b) => a - b);
      const first = arc.blocks[0];
      const last = arc.blocks[arc.blocks.length - 1];
      const middle = picked.map((i) => arc.blocks[i]).filter(Boolean);
      if (first && last && arc.blocks.length > 2) {
        blocks = [first, ...middle, last];
      } else {
        blocks = middle.length > 0 ? [first ?? middle[0], ...middle.slice(1), last ?? middle[middle.length - 1]] : arc.blocks;
      }
    }
    // Phase-aware shuffle: preserve macroeconomic causality and heterodox theoretical progression.
    // Blocks are grouped by phase; phases stay in ascending order (crisis → stabilization → turning point → legacy).
    // Only blocks within the same phase are shuffled, so e.g. Phillips-curve content stays before "declare victory."
    else if (options?.shuffleBlocks && blocks.length > 2) {
      const [first, ...rest] = blocks;
      const last = rest.pop()!;
      const middle = rest as DecisionBlock[];

      // Group middle blocks by phase
      const byPhase = new Map<number, DecisionBlock[]>();
      for (const b of middle) {
        const p = b.phase;
        if (!byPhase.has(p)) byPhase.set(p, []);
        byPhase.get(p)!.push(b);
      }

      // Process phases in ascending order; shuffle only within each phase
      const sortedPhases = [...byPhase.keys()].sort((a, b) => a - b);
      const shuffledMiddle: DecisionBlock[] = [];
      for (const p of sortedPhases) {
        shuffledMiddle.push(...shuffle(byPhase.get(p)!, rng));
      }
      blocks = [first, ...shuffledMiddle, last];
    }

    const numBlocks = blocks.length;
    for (let i = 0; i < numBlocks; i++) {
      const block = blocks[i];
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
  options?: CreateTreeOptions,
) {
  return createArcBasedTree([{ id: 'start', blocks }], endings, routeLastToEndings, options);
}

import { narrativeNodes } from '../decisions';
import type { GenericNarrativeNode } from '../long-form-tree';

/**
 * Sovereignty Path — adapter that wraps the legacy decision tree
 * into the GenericNarrativeNode system used by the narrative registry.
 */
export function createNarrativeTree(_options?: { shuffle?: boolean; seed?: number }) {
  const nodes: GenericNarrativeNode[] = narrativeNodes.map((n) => ({
    id: n.id,
    phase: n.phase,
    title: n.title,
    narrative: n.narrative,
    choices: n.choices.map((c) => ({
      id: c.id,
      text: c.text,
      consequence: c.consequence,
      effects: c.effects,
      nextNode: c.nextNode,
      minStats: c.minStats,
    })),
    isEnding: n.isEnding,
    endingType: n.endingType,
    endingTitle: n.endingTitle,
    endingNarrative: n.endingNarrative,
  }));

  return {
    nodes,
    getNode: (id: string) => nodes.find((n) => n.id === id),
  };
}

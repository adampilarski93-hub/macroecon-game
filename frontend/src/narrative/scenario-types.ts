/**
 * Generic types for scenario-specific decision tree modes.
 * Each scenario can define its own stats, labels, and decision tree.
 */

export type GenericStats = Record<string, number>;

export interface GenericNarrativeChoice {
  id: string;
  text: string;
  consequence: string;
  effects: Partial<GenericStats>;
  nextNode: string;
  minStats?: Partial<GenericStats>;
}

export interface GenericNarrativeNode {
  id: string;
  phase: number;
  title: string;
  narrative: string;
  choices: GenericNarrativeChoice[];
  isEnding?: boolean;
  endingType?: 'victory' | 'partial_victory' | 'defeat';
  endingTitle?: string;
  endingNarrative?: string;
}

export interface GenericNarrativeGameState {
  currentNodeId: string;
  stats: GenericStats;
  history: { nodeId: string; choiceId: string; title: string }[];
  turn: number;
  finished: boolean;
}

export interface ScenarioEnding {
  id: string;
  endingType: 'victory' | 'partial_victory' | 'defeat';
  title: string;
  endingNarrative: string;
}

export interface ScenarioNarrativeConfig {
  scenarioId: string;
  scenarioName: string;
  countryName: string;
  /** Ordered list of stat keys for display */
  statOrder: string[];
  statLabels: Record<string, string>;
  statColors: Record<string, string>;
  initialStats: GenericStats;
  /** Node IDs that trigger early collapse */
  earlyEndNodeIds: string[];
  /** Custom early-end text for collapse nodes */
  earlyEndText: Record<string, { title: string; text: string }>;
  getNode: (id: string) => GenericNarrativeNode | undefined;
  /** Check if stats trigger early collapse */
  checkEarlyEnd: (stats: GenericStats) => string | null;
  /** Evaluate win/loss and score at ending */
  evaluateEnding: (stats: GenericStats) => { won: boolean; score: number; summary: string };
  /** Endings for stat-based selection when reaching the partial node */
  endings?: ScenarioEnding[];
}

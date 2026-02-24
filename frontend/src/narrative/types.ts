export interface NarrativeStats {
  sovereignty: number;
  economicStrength: number;
  publicSupport: number;
  debtBurden: number;
  infrastructure: number;
  humanDevelopment: number;
  internationalStanding: number;
}

export interface NarrativeChoice {
  id: string;
  text: string;
  consequence: string;
  effects: Partial<NarrativeStats>;
  nextNode: string;
  minStats?: Partial<NarrativeStats>;
}

export interface NarrativeNode {
  id: string;
  phase: number;
  title: string;
  narrative: string;
  choices: NarrativeChoice[];
  isEnding?: boolean;
  endingType?: 'victory' | 'partial_victory' | 'defeat';
  endingTitle?: string;
  endingNarrative?: string;
}

export interface NarrativeGameState {
  currentNodeId: string;
  stats: NarrativeStats;
  history: { nodeId: string; choiceId: string; title: string }[];
  turn: number;
  finished: boolean;
}

export const INITIAL_STATS: NarrativeStats = {
  sovereignty: 40,
  economicStrength: 25,
  publicSupport: 65,
  debtBurden: 30,
  infrastructure: 15,
  humanDevelopment: 30,
  internationalStanding: 40,
};

export const STAT_LABELS: Record<keyof NarrativeStats, string> = {
  sovereignty: 'Sovereignty',
  economicStrength: 'Economic Strength',
  publicSupport: 'Public Support',
  debtBurden: 'Debt Burden',
  infrastructure: 'Infrastructure',
  humanDevelopment: 'Human Development',
  internationalStanding: 'International Standing',
};

export const STAT_COLORS: Record<keyof NarrativeStats, string> = {
  sovereignty: '#f59e0b',
  economicStrength: '#22c55e',
  publicSupport: '#ec4899',
  debtBurden: '#ef4444',
  infrastructure: '#3b82f6',
  humanDevelopment: '#a855f7',
  internationalStanding: '#14b8a6',
};

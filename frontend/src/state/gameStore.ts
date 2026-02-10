import { create } from 'zustand';
import type {
  SimulationState,
  PolicyActions,
  ScenarioSummary,
  GameMode,
  EasyConfig,
  AdvisoryItem,
} from '../types';
import { scenarios as localScenarios, createInitialState } from '../scenarios';
import { step as engineStep } from '../engine/step';
import { getAdvisory } from '../engine/advisor';

interface GameState {
  sessionId: string | null;
  state: SimulationState | null;
  scenarios: ScenarioSummary[];
  history: SimulationState[];
  advisory: AdvisoryItem[];
  loading: boolean;
  error: string | null;
  serverConnected: boolean | null;
  mode: GameMode;
  easyConfig: EasyConfig;
  fetchScenarios: () => Promise<void>;
  startSimulation: (scenarioId: string) => Promise<void>;
  step: (actions: PolicyActions) => Promise<void>;
  setError: (err: string | null) => void;
  setMode: (mode: GameMode) => void;
  setEasyConfig: (config: EasyConfig) => void;
}

const API = '/api';

const FALLBACK_SCENARIOS: ScenarioSummary[] = [
  { id: 'tutorial', name: 'Learning the Basics', description: 'A calm economy with no crisis. Use this scenario to learn how the economy works: what GDP, inflation, unemployment, and debt mean, and how your policy choices affect them. Try different tools and click Advance turn to see what happens.', difficulty: 'easy' },
  { id: 'emerging-debt-crisis', name: 'Emerging Debt Crisis', description: 'You lead a middle-income country with high public debt and a current account deficit. Global interest rates are rising. Balance fiscal consolidation with growth.', difficulty: 'hard' },
  { id: 'stagflation', name: 'Stagflation', description: 'A developed economy faces rising inflation and slowing growth. You must tighten policy without tipping the economy into recession.', difficulty: 'medium' },
  { id: 'rust-belt', name: 'Rust Belt Revival', description: 'A once-industrial powerhouse has seen factories close and jobs move away. Services dominate now, but unemployment is high and growth is weak. Revive industry or lean into services—and manage inflation from energy and imports.', difficulty: 'medium' },
  { id: 'independence-underdevelopment', name: 'Independence & Underdevelopment', description: 'Your country has just won independence. The economy is still dominated by agriculture; industry is small and the tax base is weak. Build industry, raise revenue, and meet people\'s expectations without breaking the budget.', difficulty: 'hard' },
  { id: 'commodity-pressure', name: 'Commodity Shock & Development Squeeze', description: 'Your developing economy depends on commodity exports or key imports. World prices are volatile and the exchange rate is under pressure. Manage inflation, debt, and the current account while keeping growth and stability.', difficulty: 'hard' },
  { id: 'rising-industrializer', name: 'Rising Industrializer', description: 'Your economy is shifting from farm to factory. Growth is strong but uneven: inflation can spike, debt can build, and the exchange rate is sensitive. Balance industrialisation with stability and shared gains.', difficulty: 'medium' },
  { id: 'sanctions-isolation', name: 'Under Sanctions', description: 'Your country faces international sanctions. Trade and finance are restricted, the risk premium is high, and you must stabilise the economy and protect living standards with limited external options.', difficulty: 'hard' },
];

export const useGameStore = create<GameState>((set, get) => ({
  sessionId: null,
  state: null,
  scenarios: [],
  history: [],
  advisory: [],
  loading: false,
  error: null,
  serverConnected: null,
  mode: 'easy',
  easyConfig: {
    ideology: 'mixed',
    tradePosture: 'balanced',
    alliance: 'non_aligned',
  },

  fetchScenarios: async () => {
    set({ loading: true, error: null });
    try {
      const r = await fetch(`${API}/scenarios`);
      if (!r.ok) {
        const msg = r.status === 502 || r.status === 503 ? 'Backend not running.' : 'Failed to load scenarios.';
        throw new Error(msg);
      }
      const data = await r.json();
      set({ scenarios: data.scenarios, loading: false, serverConnected: true });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      const localList: ScenarioSummary[] = localScenarios.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        difficulty: s.difficulty,
      }));
      set({
        scenarios: localList,
        loading: false,
        serverConnected: false,
        error: null,
      });
    }
  },

  startSimulation: async (scenarioId: string) => {
    if (get().serverConnected === false) {
      set({ loading: true, error: null });
      const state = createInitialState(scenarioId);
      if (!state) {
        set({ error: 'Unknown scenario', loading: false });
        return;
      }
      set({
        sessionId: 'local',
        state,
        history: [state],
        advisory: [],
        loading: false,
      });
      return;
    }
    set({ loading: true, error: null });
    try {
      const { mode, easyConfig } = get();
      const r = await fetch(`${API}/start-simulation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId, mode, easyConfig }),
      });
      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${r.status}`);
      }
      const data = await r.json();
      set({
        sessionId: data.sessionId,
        state: data.state,
        history: [data.state],
        advisory: [],
        loading: false,
      });
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Unknown error',
        loading: false,
      });
    }
  },

  step: async (actions: PolicyActions) => {
    const { sessionId, state: s, serverConnected } = get();
    if (!sessionId || !s) return;
    set({ loading: true, error: null });
    if (serverConnected === false && sessionId === 'local') {
      const next = engineStep(s as import('../engine/state').SimulationState, actions as import('../engine/state').PolicyActions);
      const advisory = getAdvisory(next);
      set((prev) => ({
        state: next as SimulationState,
        history: [...prev.history, next as SimulationState],
        advisory,
        loading: false,
      }));
      return;
    }
    try {
      const r = await fetch(`${API}/step`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, turnIndex: s.turn, actions }),
      });
      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${r.status}`);
      }
      const data = await r.json();
      const next = data.state as SimulationState;
      const advisory = Array.isArray(data.advisory) ? data.advisory : [];
      set((prev) => ({
        state: next,
        history: [...prev.history, next],
        advisory,
        loading: false,
      }));
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Unknown error',
        loading: false,
      });
    }
  },

  setError: (err) => set({ error: err }),

  setMode: (mode) => set({ mode }),

  setEasyConfig: (config) => set({ easyConfig: config }),
}));

import { create } from 'zustand';
import type {
  SimulationState,
  PolicyActions,
  ScenarioSummary,
  GameMode,
  EasyConfig,
  AdvisoryItem,
  GameResult,
  ObjectiveGoal,
  LLMConfig,
  ChatMessage,
} from '../types';
import { scenarios as localScenarios, createInitialState, getScenarioObjectives } from '../scenarios';
import { step as engineStep } from '../engine/step';
import { getAdvisory } from '../engine/advisor';
import {
  loadLLMConfig,
  saveLLMConfig,
  generateTurnBriefing,
  generateAdvisory as llmAdvisory,
  chatWithAdvisor,
  generatePostGameAnalysis,
  generateAutoPlayActions,
} from '../services/llm';

/* ── helpers ── */

function getMetric(state: SimulationState, metric: string): number {
  const c = state.country as unknown as Record<string, unknown>;
  return (c[metric] as number) ?? 0;
}

function checkGoal(state: SimulationState, goal: ObjectiveGoal): boolean {
  const val = getMetric(state, goal.metric);
  return goal.compare === 'above' ? val >= goal.target : val <= goal.target;
}

function computeScore(history: SimulationState[], goals: ObjectiveGoal[]): number {
  if (history.length === 0) return 0;
  const last = history[history.length - 1];
  const goalsMet = goals.filter((g) => checkGoal(last, g)).length;
  const goalScore = goals.length > 0 ? (goalsMet / goals.length) * 60 : 30;
  const approvalScore = last.country.approval * 20;
  const growthScore = Math.min(20, Math.max(0, (last.country.gdpGrowth + 0.05) * 200));
  return Math.round(goalScore + approvalScore + growthScore);
}

/* ── types ── */

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
  customMaxTurns: number;

  /* new state */
  turnBriefing: string | null;
  briefingLoading: boolean;
  llmAdvisoryText: string | null;
  gameResult: GameResult | null;
  llmConfig: LLMConfig;
  chatHistory: ChatMessage[];
  chatLoading: boolean;
  postGameAnalysis: string | null;
  autoPlaying: boolean;
  autoPlayLog: string[];

  /* actions */
  fetchScenarios: () => Promise<void>;
  startSimulation: (scenarioId: string) => Promise<void>;
  step: (actions: PolicyActions) => Promise<void>;
  undo: () => void;
  sendChat: (message: string) => Promise<void>;
  setError: (err: string | null) => void;
  setMode: (mode: GameMode) => void;
  setEasyConfig: (config: EasyConfig) => void;
  setCustomMaxTurns: (turns: number) => void;
  setLLMConfig: (config: LLMConfig) => void;
  resetGame: () => void;
  startAutoPlay: () => Promise<void>;
  stopAutoPlay: () => void;
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
  customMaxTurns: 0, // 0 = use scenario default

  /* new state defaults */
  turnBriefing: null,
  briefingLoading: false,
  llmAdvisoryText: null,
  gameResult: null,
  llmConfig: loadLLMConfig(),
  chatHistory: [],
  chatLoading: false,
  postGameAnalysis: null,
  autoPlaying: false,
  autoPlayLog: [],

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
    } catch {
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
    const { mode, easyConfig } = get();
    if (get().serverConnected === false) {
      set({ loading: true, error: null });
      const state = createInitialState(scenarioId, mode === 'easy' ? easyConfig : undefined);
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
        turnBriefing: null,
        llmAdvisoryText: null,
        gameResult: null,
        chatHistory: [],
        postGameAnalysis: null,
      });
      return;
    }
    set({ loading: true, error: null });
    try {
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
        turnBriefing: null,
        llmAdvisoryText: null,
        gameResult: null,
        chatHistory: [],
        postGameAnalysis: null,
      });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : 'Unknown error', loading: false });
    }
  },

  step: async (actions: PolicyActions) => {
    const { sessionId, state: s, serverConnected, llmConfig } = get();
    if (!sessionId || !s) return;

    // Don't allow advancing past game over
    if (get().gameResult) return;

    set({ loading: true, error: null, briefingLoading: true });

    let next: SimulationState;

    if (serverConnected === false && sessionId === 'local') {
      next = engineStep(
        s as import('../engine/state').SimulationState,
        actions as import('../engine/state').PolicyActions,
      ) as unknown as SimulationState;
    } else {
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
        next = data.state as SimulationState;
      } catch (e) {
        set({ error: e instanceof Error ? e.message : 'Unknown error', loading: false, briefingLoading: false });
        return;
      }
    }

    const advisory = getAdvisory(next as import('../engine/state').SimulationState);
    const newHistory = [...get().history, next];

    set({
      state: next,
      history: newHistory,
      advisory,
      loading: false,
    });

    // Generate turn briefing (async, doesn't block)
    generateTurnBriefing(llmConfig, s, next, actions).then((briefing) => {
      set({ turnBriefing: briefing, briefingLoading: false });
    }).catch(() => set({ briefingLoading: false }));

    // Generate LLM advisory (async)
    llmAdvisory(llmConfig, next).then((text) => {
      set({ llmAdvisoryText: text || null });
    }).catch(() => {});

    // Check game over
    const objectives = getScenarioObjectives(next.scenario.scenarioId);
    const effectiveMaxTurns = get().customMaxTurns > 0 ? get().customMaxTurns : (objectives?.maxTurns ?? 20);
    if (objectives && next.turn >= effectiveMaxTurns) {
      const allMet = objectives.goals.every((g) => checkGoal(next, g));
      const score = computeScore(newHistory, objectives.goals);
      const result: GameResult = {
        won: allMet,
        score,
        turnsSurvived: next.turn,
        maxTurns: effectiveMaxTurns,
        objectives: objectives.goals.map((g) => ({
          label: g.label,
          met: checkGoal(next, g),
          description: g.description,
        })),
        finalState: next,
      };
      set({ gameResult: result });

      // Generate post-game analysis (async)
      generatePostGameAnalysis(llmConfig, newHistory, allMet, score).then((analysis) => {
        if (analysis) set({ postGameAnalysis: analysis });
      }).catch(() => {});
    }

    // Check for early failure (approval hits 0)
    if (next.country.approval <= 0.05 && !get().gameResult) {
      const score = computeScore(newHistory, objectives?.goals ?? []);
      const result: GameResult = {
        won: false,
        score: Math.max(0, score - 20),
        turnsSurvived: next.turn,
        maxTurns: effectiveMaxTurns,
        objectives: (objectives?.goals ?? []).map((g) => ({
          label: g.label,
          met: checkGoal(next, g),
          description: g.description,
        })),
        finalState: next,
      };
      set({ gameResult: result });

      generatePostGameAnalysis(llmConfig, newHistory, false, result.score).then((analysis) => {
        if (analysis) set({ postGameAnalysis: analysis });
      }).catch(() => {});
    }
  },

  undo: () => {
    const { history, gameResult } = get();
    if (history.length <= 1 || gameResult) return;
    const newHistory = history.slice(0, -1);
    const prev = newHistory[newHistory.length - 1];
    const advisory = getAdvisory(prev as import('../engine/state').SimulationState);
    set({
      state: prev,
      history: newHistory,
      advisory,
      turnBriefing: null,
      llmAdvisoryText: null,
    });
  },

  sendChat: async (message: string) => {
    const { state: s, llmConfig, chatHistory } = get();
    if (!s) return;
    const userMsg: ChatMessage = { role: 'user', content: message };
    set({ chatHistory: [...chatHistory, userMsg], chatLoading: true });
    try {
      const reply = await chatWithAdvisor(llmConfig, s, chatHistory, message);
      const assistantMsg: ChatMessage = { role: 'assistant', content: reply };
      set((prev) => ({
        chatHistory: [...prev.chatHistory, assistantMsg],
        chatLoading: false,
      }));
    } catch {
      const errMsg: ChatMessage = { role: 'assistant', content: 'Sorry, something went wrong generating a response. Please try rephrasing your question.' };
      set((prev) => ({
        chatHistory: [...prev.chatHistory, errMsg],
        chatLoading: false,
      }));
    }
  },

  setError: (err) => set({ error: err }),
  setMode: (mode) => set({ mode }),
  setEasyConfig: (config) => set({ easyConfig: config }),
  setCustomMaxTurns: (turns) => set({ customMaxTurns: turns }),

  setLLMConfig: (config) => {
    saveLLMConfig(config);
    set({ llmConfig: config });
  },

  startAutoPlay: async () => {
    const { llmConfig, state: s } = get();
    if (!s || !llmConfig.enabled || !llmConfig.apiKey) {
      set({ error: 'Configure an LLM API key in Settings to use auto-play.' });
      return;
    }
    set({ autoPlaying: true, autoPlayLog: ['Auto-play started. The AI will run the simulation...'] });

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    while (get().autoPlaying && !get().gameResult) {
      const currentState = get().state;
      if (!currentState) break;

      // Generate policy actions from LLM
      set((prev) => ({
        autoPlayLog: [...prev.autoPlayLog, `Turn ${currentState.turn + 1}: AI is deciding policies...`],
      }));

      const actions = await generateAutoPlayActions(llmConfig, currentState);
      if (!actions) {
        set((prev) => ({
          autoPlayLog: [...prev.autoPlayLog, 'AI failed to generate actions. Stopping.'],
          autoPlaying: false,
        }));
        break;
      }

      // Check if still auto-playing (user may have stopped)
      if (!get().autoPlaying) break;

      set((prev) => ({
        autoPlayLog: [...prev.autoPlayLog, `Turn ${currentState.turn + 1}: Advancing...`],
      }));

      // Step the simulation
      await get().step(actions);

      // Small delay for readability
      await delay(1500);
    }

    set((prev) => ({
      autoPlaying: false,
      autoPlayLog: [...prev.autoPlayLog, get().gameResult ? 'Game over! Auto-play complete.' : 'Auto-play stopped.'],
    }));
  },

  stopAutoPlay: () => {
    set({ autoPlaying: false });
  },

  resetGame: () => {
    set({
      sessionId: null,
      state: null,
      history: [],
      advisory: [],
      turnBriefing: null,
      briefingLoading: false,
      llmAdvisoryText: null,
      gameResult: null,
      chatHistory: [],
      postGameAnalysis: null,
      error: null,
      autoPlaying: false,
      autoPlayLog: [],
    });
  },
}));

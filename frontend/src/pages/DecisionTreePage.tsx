import { useState, useRef, useEffect, useMemo } from 'react';
import { parseMarkdown } from '../utils/parseMarkdown';
import { useNavigate, useParams } from 'react-router-dom';
import type { GenericStats, GenericNarrativeChoice, GenericNarrativeNode } from '../narrative/scenario-types';
import type { SimulationState } from '../engine/state';
import { getScenarioNarrativeConfig } from '../narrative/registry';
import { initSimulationForNarrative, narrativeSimStep } from '../narrative/narrative-simulation-bridge';

function clampStats(stats: GenericStats): GenericStats {
  const clamped = { ...stats };
  for (const key of Object.keys(clamped)) {
    const v = clamped[key];
    if (typeof v === 'number') {
      clamped[key] = Math.max(0, Math.min(100, v));
    }
  }
  return clamped;
}

function applyEffects(stats: GenericStats, effects: Partial<GenericStats>): GenericStats {
  const next = { ...stats };
  for (const [key, delta] of Object.entries(effects)) {
    if (typeof delta === 'number') {
      next[key] = (next[key] ?? 0) + delta;
    }
  }
  return clampStats(next);
}

function choiceAvailable(choice: GenericNarrativeChoice, stats: GenericStats): boolean {
  if (!choice.minStats) return true;
  for (const [key, min] of Object.entries(choice.minStats)) {
    if (typeof min === 'number' && (stats[key] ?? 0) < min) return false;
  }
  return true;
}

function StatBar({
  stat,
  value,
  label,
  color,
}: {
  stat: string;
  value: number;
  label: string;
  color: string;
}) {
  const isDanger = stat === 'debtBurden';
  const barColor = isDanger && value > 60 ? '#ef4444' : color;
  return (
    <div className="narr-stat">
      <div className="narr-stat-header">
        <span className="narr-stat-label">{label}</span>
        <span className="narr-stat-value" style={{ color: barColor }}>
          {Math.round(value)}
        </span>
      </div>
      <div className="narr-stat-track">
        <div
          className="narr-stat-fill"
          style={{ width: `${value}%`, background: barColor }}
        />
      </div>
    </div>
  );
}

function StatDelta({
  effects,
  statLabels,
}: {
  effects: Partial<GenericStats>;
  statLabels: Record<string, string>;
}) {
  const entries = Object.entries(effects).filter(
    (e): e is [string, number] => typeof e[1] === 'number',
  );
  if (entries.length === 0) return null;
  return (
    <div className="narr-choice-effects">
      {entries.map(([key, delta]) => (
        <span
          key={key}
          className={`narr-effect ${
            delta > 0 ? (key === 'debtBurden' ? 'neg' : 'pos') : key === 'debtBurden' ? 'pos' : 'neg'
          }`}
        >
          {statLabels[key] ?? key} {delta > 0 ? '+' : ''}
          {delta}
        </span>
      ))}
    </div>
  );
}

function renderNarrative(text: string) {
  return text.split('\n\n').map((para, i) => (
    <p key={i}>{parseMarkdown(para)}</p>
  ));
}

const STORAGE_KEY_PREFIX = 'macro-planner-narrative-';
function getStorageKey(scenarioId: string) {
  return `${STORAGE_KEY_PREFIX}${scenarioId}`;
}

type SavedGame = {
  currentNodeId: string;
  stats: Record<string, number>;
  history: { nodeId: string; choiceId: string; title: string; choiceLabel: string; effects: Partial<Record<string, number>> }[];
  turn: number;
};

function loadSavedGame(scenarioId: string): SavedGame | null {
  try {
    const raw = localStorage.getItem(getStorageKey(scenarioId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedGame;
    if (
      parsed &&
      typeof parsed.currentNodeId === 'string' &&
      parsed.stats &&
      typeof parsed.turn === 'number' &&
      Array.isArray(parsed.history)
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function saveGame(scenarioId: string, data: SavedGame): void {
  try {
    localStorage.setItem(getStorageKey(scenarioId), JSON.stringify(data));
  } catch {
    // Ignore quota/parse errors
  }
}

function clearSavedGame(scenarioId: string): void {
  try {
    localStorage.removeItem(getStorageKey(scenarioId));
  } catch {
    // Ignore
  }
}

export function DecisionTreePage() {
  const navigate = useNavigate();
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const narrativeRef = useRef<HTMLDivElement>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Memoize config so we get a stable tree for the session (fresh shuffle each time scenarioId changes)
  const config = useMemo(
    () => (scenarioId ? getScenarioNarrativeConfig(scenarioId) : null),
    [scenarioId],
  );

  const [game, setGame] = useState<{
    currentNodeId: string;
    stats: GenericStats;
    history: {
      nodeId: string;
      choiceId: string;
      title: string;
      choiceLabel: string;
      effects: Partial<GenericStats>;
      simState: SimulationState | null;
    }[];
    turn: number;
    finished: boolean;
    simState: SimulationState | null;
    initialSimState: SimulationState | null;
  } | null>(null);

  const [savedGame, setSavedGame] = useState<SavedGame | null | 'loading'>('loading');

  useEffect(() => {
    if (!config || !scenarioId) return;
    const saved = loadSavedGame(scenarioId);
    setSavedGame(saved);
    if (!saved) {
      const simState = scenarioId ? initSimulationForNarrative(scenarioId) : null;
      setGame({
        currentNodeId: 'start',
        stats: { ...config.initialStats },
        history: [],
        turn: 1,
        finished: false,
        simState,
        initialSimState: simState,
      });
    }
  }, [config, scenarioId]);

  useEffect(() => {
    if (scenarioId && game && !game.finished) {
      const earlyEndNode = config?.earlyEndNodeIds?.includes(game.currentNodeId);
      const node = earlyEndNode ? null : config?.getNode?.(game.currentNodeId);
      if (!earlyEndNode && !node?.isEnding) {
        saveGame(scenarioId, {
          currentNodeId: game.currentNodeId,
          stats: game.stats,
          history: game.history.map((h) => ({
            nodeId: h.nodeId,
            choiceId: h.choiceId,
            title: h.title,
            choiceLabel: h.choiceLabel,
            effects: h.effects,
          })),
          turn: game.turn,
        });
      }
    }
  }, [scenarioId, game, config]);

  useEffect(() => {
    if (scenarioId && config && game) {
      const earlyEndNode = config.earlyEndNodeIds.includes(game.currentNodeId);
      const node = earlyEndNode ? null : config.getNode(game.currentNodeId);
      if (earlyEndNode || node?.isEnding) {
        clearSavedGame(scenarioId);
      }
    }
  }, [scenarioId, config, game?.currentNodeId]);

  const handleResume = () => {
    if (!config || !scenarioId || !savedGame || savedGame === 'loading') return;
    const initialSimState = scenarioId ? initSimulationForNarrative(scenarioId) : null;
    let simState: SimulationState | null = initialSimState;
    let accumulatedStats = { ...config.initialStats };
    const historyWithSim: {
      nodeId: string;
      choiceId: string;
      title: string;
      choiceLabel: string;
      effects: Partial<GenericStats>;
      simState: SimulationState | null;
    }[] = [];
    for (const h of savedGame.history) {
      accumulatedStats = applyEffects(accumulatedStats, h.effects);
      if (simState) {
        try {
          simState = narrativeSimStep(simState, accumulatedStats);
        } catch {
          simState = null;
        }
      }
      historyWithSim.push({
        nodeId: h.nodeId,
        choiceId: h.choiceId,
        title: h.title,
        choiceLabel: h.choiceLabel,
        effects: h.effects,
        simState,
      });
    }
    setGame({
      currentNodeId: savedGame.currentNodeId,
      stats: savedGame.stats,
      history: historyWithSim,
      turn: savedGame.turn,
      finished: false,
      simState,
      initialSimState,
    });
    setSavedGame(null);
  };

  const handleStartFresh = () => {
    if (scenarioId) clearSavedGame(scenarioId);
    setSavedGame(null);
    if (config && scenarioId) {
      const simState = initSimulationForNarrative(scenarioId);
      setGame({
        currentNodeId: 'start',
        stats: { ...config.initialStats },
        history: [],
        turn: 1,
        finished: false,
        simState,
        initialSimState: simState,
      });
    }
  };

  const handleBack = () => {
    if (scenarioId) clearSavedGame(scenarioId);
    navigate('/');
  };

  useEffect(() => {
    if (!config || !scenarioId) {
      navigate('/');
      return;
    }
  }, [config, scenarioId, navigate]);

  useEffect(() => {
    if (narrativeRef.current && game) {
      narrativeRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [game?.currentNodeId]);

  if (!config) {
    return null;
  }

  if (savedGame && savedGame !== 'loading' && !game) {
    return (
      <div className="page narr-page">
        <div className="narr-resume-overlay">
          <div className="narr-resume-modal">
            <h2>Resume your previous game?</h2>
            <p>You left off at Decision {savedGame.turn}</p>
            <div className="narr-resume-buttons">
              <button className="narr-btn-primary" onClick={handleResume}>
                Resume
              </button>
              <button className="narr-btn-secondary" onClick={handleStartFresh}>
                Start Fresh
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="page narr-page">
        <div className="loading-scenarios">
          <div className="spinner" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const { statOrder, statLabels, statColors, earlyEndNodeIds, getNode } = config;
  const earlyEndNode = earlyEndNodeIds.includes(game.currentNodeId);
  const node = earlyEndNode ? null : getNode(game.currentNodeId);

  const handleChoice = (choice: GenericNarrativeChoice) => {
    if (transitioning || game.finished) return;
    setTransitioning(true);

    const newStats = applyEffects(game.stats, choice.effects);
    const earlyEnd = config.checkEarlyEnd(newStats);

    // Step the simulation engine alongside the narrative
    let nextSimState = game.simState;
    if (nextSimState) {
      try {
        nextSimState = narrativeSimStep(nextSimState, newStats);
      } catch {
        // If sim fails, continue without it
      }
    }

    setTimeout(() => {
      setGame((prev) => {
        if (!prev) return prev;
        return {
          currentNodeId: earlyEnd ?? choice.nextNode,
          stats: newStats,
          history: [
            ...prev.history,
            {
              nodeId: prev.currentNodeId,
              choiceId: choice.id,
              title: node?.title ?? 'Unknown',
              choiceLabel: choice.text,
              effects: choice.effects,
              simState: nextSimState,
            },
          ],
          turn: prev.turn + 1,
          finished: false,
          simState: nextSimState,
          initialSimState: prev.initialSimState,
        };
      });
      setTransitioning(false);
    }, 400);
  };

  const isEnding = node?.isEnding ?? false;
  const evaluation = isEnding || earlyEndNode ? config.evaluateEnding(game.stats) : null;
  const earlyEndText = config.earlyEndText[game.currentNodeId];

  // When we reached the partial ending (stat-based routing), pick ending text from evaluateEnding.
  // Victory/defeat nodes are reached via explicit endingIndex, so use node content.
  const endings = config.endings;
  const useStatBasedEnding =
    isEnding &&
    node?.endingType === 'partial_victory' &&
    endings &&
    endings.length >= 3;
  const statBasedEnding = useStatBasedEnding && evaluation
    ? (evaluation.won ? endings![0] : evaluation.score >= 45 ? endings![1] : endings![2])
    : null;

  if (!node && !earlyEndNode) {
    return (
      <div className="page narr-page">
        <p>Error: node not found ({game.currentNodeId})</p>
        <button className="play-again-btn" onClick={handleBack}>
          Back to menu
        </button>
      </div>
    );
  }

  return (
    <div className={`page narr-page ${transitioning ? 'narr-transitioning' : ''}`}>
      <header className="narr-header">
        <div className="narr-header-left">
          <button className="back-btn" onClick={handleBack} title="Back to scenarios">
            &larr;
          </button>
          <div>
            <h1>{config.scenarioName}</h1>
            <span className="narr-country">{config.countryName}</span>
          </div>
        </div>
        <div className="narr-header-right">
          <span className="narr-mode-badge">Decision Tree</span>
          <span className="turn-badge">Decision {game.turn}</span>
          {node?.phase && <span className="narr-phase-badge">Phase {node.phase}</span>}
        </div>
      </header>

      <div className="narr-layout">
        <aside className="narr-sidebar">
          <div className="narr-stats-panel">
            <h3>National Indicators</h3>
            {statOrder.map((stat) => (
              <StatBar
                key={stat}
                stat={stat}
                value={game.stats[stat] ?? 0}
                label={statLabels[stat] ?? stat}
                color={statColors[stat] ?? '#94a3b8'}
              />
            ))}
          </div>

          {game.simState && (
            <div className="narr-sim-panel">
              <h3>Simulated Economy</h3>
              <div className="narr-sim-grid">
                <div className="narr-sim-item">
                  <span className="narr-sim-label">GDP</span>
                  <span className="narr-sim-value">{game.simState.country.gdp.toFixed(0)}</span>
                  <span className={`narr-sim-delta ${game.simState.country.gdpGrowth >= 0 ? 'pos' : 'neg'}`}>
                    {(game.simState.country.gdpGrowth * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="narr-sim-item">
                  <span className="narr-sim-label">Inflation</span>
                  <span className="narr-sim-value">{(game.simState.country.inflationRate * 100).toFixed(1)}%</span>
                </div>
                <div className="narr-sim-item">
                  <span className="narr-sim-label">Unemployment</span>
                  <span className="narr-sim-value">{(game.simState.country.unemploymentRate * 100).toFixed(1)}%</span>
                </div>
                <div className="narr-sim-item">
                  <span className="narr-sim-label">Debt/GDP</span>
                  <span className="narr-sim-value">{(game.simState.country.debtToGdp * 100).toFixed(0)}%</span>
                </div>
                <div className="narr-sim-item">
                  <span className="narr-sim-label">Wage share</span>
                  <span className="narr-sim-value">{((game.simState.country.wageShare ?? 0.5) * 100).toFixed(0)}%</span>
                </div>
                <div className="narr-sim-item">
                  <span className="narr-sim-label">Approval</span>
                  <span className="narr-sim-value">{(game.simState.country.approval * 100).toFixed(0)}%</span>
                </div>
              </div>
              <p className="narr-sim-hint">Your narrative choices drive simulated economic outcomes</p>
            </div>
          )}

          {game.history.length > 0 && (
            <div className="narr-history-panel">
              <h3>Decisions Made</h3>
              <ol className="narr-history-list">
                {game.history.map((h, i) => (
                  <li key={i}>{h.title}</li>
                ))}
              </ol>
            </div>
          )}
        </aside>

        <main className="narr-main" ref={narrativeRef}>
          {earlyEndNode ? (
            <div className="narr-ending">
              <h2 className="narr-ending-title outcome-lose">
                {earlyEndText?.title ?? 'Collapse'}
              </h2>
              <div className="narr-narrative-text">
                {renderNarrative(earlyEndText?.text ?? 'Your government has fallen.')}
              </div>
              <div className="narr-ending-score">
                <div className="narr-score-ring-wrap">
                  <svg className="score-ring" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="var(--color-inflation)"
                      strokeWidth="8"
                      strokeDasharray={`${((evaluation?.score ?? 0) / 100) * 327} 327`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <span className="score-number">{evaluation?.score ?? 0}</span>
                  <span className="score-label">/ 100</span>
                </div>
              </div>

              <button className="play-again-btn" onClick={handleBack}>
                Try again
              </button>
            </div>
          ) : isEnding && node ? (
            <div className="narr-ending">
              <h2
                className={`narr-ending-title ${
                  evaluation?.won ? 'outcome-win' : 'outcome-lose'
                }`}
              >
                {statBasedEnding ? statBasedEnding.title : node.endingTitle}
              </h2>
              <div className="narr-narrative-text">
                {renderNarrative(statBasedEnding ? statBasedEnding.endingNarrative : (node.endingNarrative ?? ''))}
              </div>
              <div className="narr-ending-score">
                <div className="narr-score-ring-wrap">
                  <svg className="score-ring" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={
                        evaluation?.won ? 'var(--color-gdp)' : 'var(--color-inflation)'
                      }
                      strokeWidth="8"
                      strokeDasharray={`${((evaluation?.score ?? 0) / 100) * 327} 327`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <span className="score-number">{evaluation?.score ?? 0}</span>
                  <span className="score-label">/ 100</span>
                </div>
                <p className="narr-ending-summary">{evaluation?.summary}</p>
              </div>
              <div className="narr-ending-stats">
                <h3>Final National Indicators</h3>
                <div className="narr-ending-stats-grid">
                  {statOrder.map((stat) => (
                    <div key={stat} className="narr-ending-stat">
                      <span className="narr-ending-stat-label">{statLabels[stat]}</span>
                      <span
                        className="narr-ending-stat-value"
                        style={{ color: statColors[stat] }}
                      >
                        {Math.round(game.stats[stat] ?? 0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="play-again-btn" onClick={handleBack}>
                Play again
              </button>
            </div>
          ) : node ? (
            <>
              <h2 className="narr-title">{node.title}</h2>
              <div className="narr-narrative-text">{renderNarrative(node.narrative)}</div>
              <div className="narr-choices">
                {node.choices.map((choice) => {
                  const available = choiceAvailable(choice, game.stats);
                  return (
                    <button
                      key={choice.id}
                      className={`narr-choice-card ${!available ? 'narr-choice-locked' : ''}`}
                      disabled={!available || transitioning}
                      onClick={() => handleChoice(choice)}
                    >
                      <span className="narr-choice-text">{parseMarkdown(choice.text)}</span>
                      <span className="narr-choice-consequence">{parseMarkdown(choice.consequence)}</span>
                      <StatDelta effects={choice.effects} statLabels={statLabels} />
                    </button>
                  );
                })}
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}

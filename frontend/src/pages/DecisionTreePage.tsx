import { useState, useRef, useEffect } from 'react';
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
  return text.split('\n\n').map((para, i) => <p key={i}>{para}</p>);
}

export function DecisionTreePage() {
  const navigate = useNavigate();
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const narrativeRef = useRef<HTMLDivElement>(null);
  const [transitioning, setTransitioning] = useState(false);

  const config = scenarioId ? getScenarioNarrativeConfig(scenarioId) : null;

  const [game, setGame] = useState<{
    currentNodeId: string;
    stats: GenericStats;
    history: { nodeId: string; choiceId: string; title: string }[];
    turn: number;
    finished: boolean;
    simState: SimulationState | null;
  } | null>(null);

  useEffect(() => {
    if (config && !game) {
      const simState = scenarioId ? initSimulationForNarrative(scenarioId) : null;
      setGame({
        currentNodeId: 'start',
        stats: { ...config.initialStats },
        history: [],
        turn: 1,
        finished: false,
        simState,
      });
    }
  }, [config, game, scenarioId]);

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

  if (!config || !game) {
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
            },
          ],
          turn: prev.turn + 1,
          finished: false,
          simState: nextSimState,
        };
      });
      setTransitioning(false);
    }, 400);
  };

  const isEnding = node?.isEnding ?? false;
  const evaluation = isEnding || earlyEndNode ? config.evaluateEnding(game.stats) : null;
  const earlyEndText = config.earlyEndText[game.currentNodeId];

  if (!node && !earlyEndNode) {
    return (
      <div className="page narr-page">
        <p>Error: node not found ({game.currentNodeId})</p>
        <button className="play-again-btn" onClick={() => navigate('/')}>
          Back to menu
        </button>
      </div>
    );
  }

  return (
    <div className={`page narr-page ${transitioning ? 'narr-transitioning' : ''}`}>
      <header className="narr-header">
        <div className="narr-header-left">
          <button className="back-btn" onClick={() => navigate('/')} title="Back to scenarios">
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
              <button className="play-again-btn" onClick={() => navigate('/')}>
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
                {node.endingTitle}
              </h2>
              <div className="narr-narrative-text">
                {renderNarrative(node.endingNarrative ?? '')}
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
              <button className="play-again-btn" onClick={() => navigate('/')}>
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
                      <span className="narr-choice-text">{choice.text}</span>
                      <span className="narr-choice-consequence">{choice.consequence}</span>
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

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NarrativeGameState, NarrativeStats, NarrativeChoice } from '../narrative/types';
import { INITIAL_STATS, STAT_LABELS, STAT_COLORS } from '../narrative/types';
import { getNode } from '../narrative/decisions';

function clampStats(stats: NarrativeStats): NarrativeStats {
  const clamped = { ...stats };
  for (const key of Object.keys(clamped) as (keyof NarrativeStats)[]) {
    clamped[key] = Math.max(0, Math.min(100, clamped[key]));
  }
  return clamped;
}

function applyEffects(
  stats: NarrativeStats,
  effects: Partial<NarrativeStats>,
): NarrativeStats {
  const next = { ...stats };
  for (const [key, delta] of Object.entries(effects) as [keyof NarrativeStats, number][]) {
    next[key] += delta;
  }
  return clampStats(next);
}

function choiceAvailable(choice: NarrativeChoice, stats: NarrativeStats): boolean {
  if (!choice.minStats) return true;
  for (const [key, min] of Object.entries(choice.minStats) as [keyof NarrativeStats, number][]) {
    if (stats[key] < min) return false;
  }
  return true;
}

function checkEarlyEnd(stats: NarrativeStats): string | null {
  if (stats.publicSupport <= 5) return 'collapse_support';
  if (stats.debtBurden >= 95) return 'collapse_debt';
  if (stats.sovereignty <= 5) return 'collapse_sovereignty';
  return null;
}

function evaluateEnding(stats: NarrativeStats): { won: boolean; score: number; summary: string } {
  const sovereignty = stats.sovereignty >= 65;
  const economic = stats.economicStrength >= 50;
  const support = stats.publicSupport >= 45;
  const debt = stats.debtBurden <= 50;
  const goals = [sovereignty, economic, support, debt].filter(Boolean).length;
  const score = Math.round(
    (stats.sovereignty * 0.25 +
      stats.economicStrength * 0.2 +
      stats.publicSupport * 0.15 +
      (100 - stats.debtBurden) * 0.15 +
      stats.infrastructure * 0.1 +
      stats.humanDevelopment * 0.1 +
      stats.internationalStanding * 0.05),
  );
  const won = goals >= 3;
  const summary = won
    ? `You achieved ${goals} of 4 sovereignty objectives. Azania stands on solid ground.`
    : `You achieved ${goals} of 4 sovereignty objectives. The struggle continues.`;
  return { won, score, summary };
}

const STAT_ORDER: (keyof NarrativeStats)[] = [
  'sovereignty',
  'economicStrength',
  'publicSupport',
  'debtBurden',
  'infrastructure',
  'humanDevelopment',
  'internationalStanding',
];

function StatBar({ stat, value }: { stat: keyof NarrativeStats; value: number }) {
  const isDanger = stat === 'debtBurden';
  const color = STAT_COLORS[stat];
  const barColor = isDanger && value > 60 ? '#ef4444' : color;
  return (
    <div className="narr-stat">
      <div className="narr-stat-header">
        <span className="narr-stat-label">{STAT_LABELS[stat]}</span>
        <span className="narr-stat-value" style={{ color: barColor }}>{Math.round(value)}</span>
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

function StatDelta({ effects }: { effects: Partial<NarrativeStats> }) {
  const entries = Object.entries(effects) as [keyof NarrativeStats, number][];
  if (entries.length === 0) return null;
  return (
    <div className="narr-choice-effects">
      {entries.map(([key, delta]) => (
        <span
          key={key}
          className={`narr-effect ${delta > 0 ? (key === 'debtBurden' ? 'neg' : 'pos') : key === 'debtBurden' ? 'pos' : 'neg'}`}
        >
          {STAT_LABELS[key]} {delta > 0 ? '+' : ''}{delta}
        </span>
      ))}
    </div>
  );
}

export function SovereigntyPath() {
  const navigate = useNavigate();
  const narrativeRef = useRef<HTMLDivElement>(null);
  const [transitioning, setTransitioning] = useState(false);

  const [game, setGame] = useState<NarrativeGameState>({
    currentNodeId: 'start',
    stats: { ...INITIAL_STATS },
    history: [],
    turn: 1,
    finished: false,
  });

  const node = getNode(game.currentNodeId);

  useEffect(() => {
    if (narrativeRef.current) {
      narrativeRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [game.currentNodeId]);

  if (!node) {
    return (
      <div className="page narr-page">
        <p>Error: node not found ({game.currentNodeId})</p>
        <button className="play-again-btn" onClick={() => navigate('/')}>Back to menu</button>
      </div>
    );
  }

  const handleChoice = (choice: NarrativeChoice) => {
    if (transitioning || game.finished) return;
    setTransitioning(true);

    const newStats = applyEffects(game.stats, choice.effects);
    const earlyEnd = checkEarlyEnd(newStats);

    setTimeout(() => {
      setGame((prev) => ({
        currentNodeId: earlyEnd ? earlyEnd : choice.nextNode,
        stats: newStats,
        history: [
          ...prev.history,
          { nodeId: prev.currentNodeId, choiceId: choice.id, title: node.title },
        ],
        turn: prev.turn + 1,
        finished: false,
      }));
      setTransitioning(false);
    }, 400);
  };

  const isEnding = node.isEnding || false;
  const evaluation = isEnding ? evaluateEnding(game.stats) : null;

  const earlyEndNode =
    game.currentNodeId === 'collapse_support' ||
    game.currentNodeId === 'collapse_debt' ||
    game.currentNodeId === 'collapse_sovereignty';

  const earlyEndText: Record<string, { title: string; text: string }> = {
    collapse_support: {
      title: 'Revolution',
      text: `Public support has collapsed. The streets erupt. Your government falls to a popular uprising — not because your ideas were wrong, but because the people lost faith in your ability to deliver. The military steps in, promising "stability." The development programs you built are dismantled. Foreign creditors and investors return, offering "help" to the new regime on the same old terms.\n\nThe cycle begins again.`,
    },
    collapse_debt: {
      title: 'Debt Default & Foreign Takeover',
      text: `The debt burden has become unsustainable. Unable to service your obligations, you default. The IMF imposes an emergency program with no room for negotiation. Your assets are seized. Your sovereignty is reduced to a legal fiction.\n\nAs Michael Hudson warned: "Debts that can't be paid, won't be paid." But the question was always who bears the cost of that reality — and in this case, it is the people of Azania.`,
    },
    collapse_sovereignty: {
      title: 'Neo-Colonial Capture',
      text: `Your sovereignty has been eroded to the point of irrelevance. Foreign actors — whether creditors, corporations, or geopolitical powers — now effectively control your economic policy. Elections continue, but the range of choices available to any government is so narrow as to be meaningless.\n\nNkrumah's warning has been fulfilled: "The essence of neo-colonialism is that the state which is subject to it is, in theory, independent and has all the outward trappings of international sovereignty. In reality its economic system and thus its political policy is directed from outside."`,
    },
  };

  const renderNarrative = (text: string) => {
    return text.split('\n\n').map((para, i) => <p key={i}>{para}</p>);
  };

  return (
    <div className={`page narr-page ${transitioning ? 'narr-transitioning' : ''}`}>
      <header className="narr-header">
        <div className="narr-header-left">
          <button className="back-btn" onClick={() => navigate('/')} title="Back to scenarios">
            &larr;
          </button>
          <div>
            <h1>Sovereignty Path</h1>
            <span className="narr-country">Republic of Azania</span>
          </div>
        </div>
        <div className="narr-header-right">
          <span className="turn-badge">Decision {game.turn}</span>
          {node.phase && <span className="narr-phase-badge">Phase {node.phase}</span>}
        </div>
      </header>

      <div className="narr-layout">
        {/* Stats sidebar */}
        <aside className="narr-sidebar">
          <div className="narr-stats-panel">
            <h3>National Indicators</h3>
            {STAT_ORDER.map((stat) => (
              <StatBar key={stat} stat={stat} value={game.stats[stat]} />
            ))}
          </div>

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

        {/* Main narrative area */}
        <main className="narr-main" ref={narrativeRef}>
          {earlyEndNode ? (
            <div className="narr-ending">
              <h2 className="narr-ending-title outcome-lose">
                {earlyEndText[game.currentNodeId]?.title ?? 'Collapse'}
              </h2>
              <div className="narr-narrative-text">
                {renderNarrative(earlyEndText[game.currentNodeId]?.text ?? 'Your government has fallen.')}
              </div>
              <div className="narr-ending-score">
                <div className="narr-score-ring-wrap">
                  <svg className="score-ring" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke="var(--color-inflation)"
                      strokeWidth="8"
                      strokeDasharray={`${(evaluateEnding(game.stats).score / 100) * 327} 327`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <span className="score-number">{evaluateEnding(game.stats).score}</span>
                  <span className="score-label">/ 100</span>
                </div>
              </div>
              <button className="play-again-btn" onClick={() => navigate('/')}>
                Try again
              </button>
            </div>
          ) : isEnding ? (
            <div className="narr-ending">
              <h2 className={`narr-ending-title ${evaluation?.won ? 'outcome-win' : 'outcome-lose'}`}>
                {node.endingTitle}
              </h2>
              <div className="narr-narrative-text">
                {renderNarrative(node.endingNarrative ?? '')}
              </div>
              <div className="narr-ending-score">
                <div className="narr-score-ring-wrap">
                  <svg className="score-ring" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke={evaluation?.won ? 'var(--color-gdp)' : 'var(--color-inflation)'}
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
                  {STAT_ORDER.map((stat) => (
                    <div key={stat} className="narr-ending-stat">
                      <span className="narr-ending-stat-label">{STAT_LABELS[stat]}</span>
                      <span className="narr-ending-stat-value" style={{ color: STAT_COLORS[stat] }}>
                        {Math.round(game.stats[stat])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="play-again-btn" onClick={() => navigate('/')}>
                Play again
              </button>
            </div>
          ) : (
            <>
              <h2 className="narr-title">{node.title}</h2>
              <div className="narr-narrative-text">
                {renderNarrative(node.narrative)}
              </div>
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
                      <StatDelta effects={choice.effects} />
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

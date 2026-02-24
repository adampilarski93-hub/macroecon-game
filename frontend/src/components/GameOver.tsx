import { useGameStore } from '../state/gameStore';
import type { GameResult } from '../types';

interface GameOverProps {
  result: GameResult;
  postGameAnalysis: string | null;
  onPlayAgain: () => void;
}

export function GameOver({ result, postGameAnalysis, onPlayAgain }: GameOverProps) {
  const pct = Math.min(100, Math.max(0, result.score));
  const { history, getDebriefInsights } = useGameStore();
  const insights = getDebriefInsights ? getDebriefInsights() : generateDefaultInsights(result, history);

  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <h2 className={result.won ? 'outcome-win' : 'outcome-lose'}>
          {result.won ? '🏆 Victory!' : '📉 Game Over'}
        </h2>
        <p className="game-over-subtitle">
          {result.won
            ? `You led ${result.finalState.scenario.countryName} through ${result.turnsSurvived} turns and met your objectives.`
            : `After ${result.turnsSurvived} turns, ${result.finalState.scenario.countryName} could not meet all its goals.`}
        </p>

        {/* Score ring */}
        <div className="score-ring-wrap">
          <svg className="score-ring" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={result.won ? 'var(--color-gdp)' : 'var(--color-inflation)'}
              strokeWidth="8"
              strokeDasharray={`${(pct / 100) * 327} 327`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <span className="score-number">{result.score}</span>
          <span className="score-label">/ 100</span>
        </div>

        {/* Objectives checklist */}
        <div className="objectives-checklist">
          <h3>📋 Objectives</h3>
          <ul>
            {result.objectives.map((obj, i) => (
              <li key={i} className={obj.met ? 'obj-met' : 'obj-missed'}>
                <span className="obj-icon">{obj.met ? '\u2713' : '\u2717'}</span>
                <span className="obj-label">{obj.label}</span>
                <span className="obj-desc">{obj.description}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Final stats */}
        <div className="final-stats">
          <div className="stat">
            <span className="stat-label">Final GDP</span>
            <span className="stat-value">{result.finalState.country.gdp.toFixed(0)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Inflation</span>
            <span className="stat-value">{(result.finalState.country.inflationRate * 100).toFixed(1)}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Unemployment</span>
            <span className="stat-value">{(result.finalState.country.unemploymentRate * 100).toFixed(1)}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Approval</span>
            <span className="stat-value">{(result.finalState.country.approval * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Post-Game Debrief Section */}
        <PostGameDebrief insights={insights} result={result} />

        {/* LLM analysis */}
        {postGameAnalysis && (
          <div className="post-game-analysis">
            <h3>🤖 AI Analysis</h3>
            <p>{postGameAnalysis}</p>
          </div>
        )}

        <button className="play-again-btn" onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  );
}

/** Post-Game Debrief Component showing learning insights */
function PostGameDebrief({
  insights,
  result,
}: {
  insights: DebriefInsights;
  result: GameResult;
}) {
  return (
    <div className="post-game-debrief">
      <h3>📊 Performance Debrief</h3>

      {/* Key Metrics Trend */}
      <div className="debrief-section">
        <h4>Your Economic Journey</h4>
        <div className="metric-trends">
          {insights.metricTrends.map((trend, i) => (
            <div key={i} className={`trend-item trend-${trend.trend}`}>
              <span className="trend-indicator">{trend.label}</span>
              <span className="trend-value">
                {trend.start.toFixed(1)}% → {trend.end.toFixed(1)}%
              </span>
              <span className={`trend-badge trend-${trend.trend}`}>
                {trend.trend === 'up' ? '📈' : trend.trend === 'down' ? '📉' : '➡️'}
                {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Decisions Made */}
      {insights.keyDecisions.length > 0 && (
        <div className="debrief-section">
          <h4>Key Decisions You Made</h4>
          <ul className="decisions-list">
            {insights.keyDecisions.map((decision, i) => (
              <li key={i} className={`decision-item ${decision.impact}`}>
                <span className="decision-turn">Turn {decision.turn}</span>
                <span className="decision-action">{decision.action}</span>
                <span className="decision-impact">{decision.explanation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Learning Takeaways */}
      <div className="debrief-section">
        <h4>💡 Learning Takeaways</h4>
        <ul className="takeaways-list">
          {insights.takeaways.map((takeaway, i) => (
            <li key={i} className="takeaway-item">
              <span className="takeaway-icon">
                {takeaway.type === 'success' ? '✅' : takeaway.type === 'lesson' ? '📚' : '💡'}
              </span>
              <div className="takeaway-content">
                <strong>{takeaway.title}</strong>
                <p>{takeaway.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Strategy Suggestions */}
      <div className="debrief-section">
        <h4>🎯 Try Next Time</h4>
        <div className="strategy-suggestions">
          {insights.suggestions.map((suggestion, i) => (
            <div key={i} className="suggestion-card">
              <span className="suggestion-emoji">{suggestion.emoji}</span>
              <div className="suggestion-content">
                <strong>{suggestion.strategy}</strong>
                <p>{suggestion.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Stats */}
      <div className="debrief-section comparison-section">
        <h4>📊 How You Compare</h4>
        <div className="comparison-stats">
          <div className="comparison-item">
            <span className="comparison-label">Economic Stability</span>
            <div className="comparison-bar">
              <div
                className="comparison-fill"
                style={{ width: `${insights.comparisons.stability}%` }}
              />
            </div>
            <span className="comparison-value">{insights.comparisons.stability}%</span>
          </div>
          <div className="comparison-item">
            <span className="comparison-label">Policy Consistency</span>
            <div className="comparison-bar">
              <div
                className="comparison-fill"
                style={{ width: `${insights.comparisons.consistency}%` }}
              />
            </div>
            <span className="comparison-value">{insights.comparisons.consistency}%</span>
          </div>
          <div className="comparison-item">
            <span className="comparison-label">Balanced Approach</span>
            <div className="comparison-bar">
              <div
                className="comparison-fill"
                style={{ width: `${insights.comparisons.balance}%` }}
              />
            </div>
            <span className="comparison-value">{insights.comparisons.balance}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Generate default insights when store doesn't provide them */
function generateDefaultInsights(
  result: GameResult,
  history: unknown[]
): DebriefInsights {
  const c = result.finalState.country;
  const initial: Record<string, number> =
    history && history.length > 0
      ? (history[0] as { country: Record<string, number> }).country
      : c;

  return {
    metricTrends: [
      {
        label: 'GDP Growth',
        start: initial.gdpGrowth ? initial.gdpGrowth * 100 : 0,
        end: c.gdpGrowth * 100,
        change: c.gdpGrowth * 100 - (initial.gdpGrowth ? initial.gdpGrowth * 100 : 0),
        trend: c.gdpGrowth > (initial.gdpGrowth || 0) ? 'up' : 'down',
      },
      {
        label: 'Inflation',
        start: initial.inflationRate ? initial.inflationRate * 100 : 0,
        end: c.inflationRate * 100,
        change: c.inflationRate * 100 - (initial.inflationRate ? initial.inflationRate * 100 : 0),
        trend: c.inflationRate < (initial.inflationRate || 0.05) ? 'down' : 'up',
      },
      {
        label: 'Approval',
        start: initial.approval ? initial.approval * 100 : 50,
        end: c.approval * 100,
        change: c.approval * 100 - (initial.approval ? initial.approval * 100 : 50),
        trend: c.approval > (initial.approval || 0.5) ? 'up' : 'down',
      },
    ],
    keyDecisions: [],
    takeaways: [
      {
        type: result.won ? 'success' : 'lesson',
        title: result.won ? 'Balanced Policy Works' : 'Find Your Balance',
        description: result.won
          ? 'You demonstrated that managing multiple economic indicators simultaneously leads to success.'
          : 'Economic management requires balancing growth, inflation, and public support.',
      },
      {
        type: 'lesson',
        title: 'Policy Interconnections',
        description:
          'Remember: spending boosts growth but may raise inflation. Rate hikes curb inflation but can slow growth.',
      },
    ],
    suggestions: [
      {
        emoji: '🎯',
        strategy: 'Monitor Leading Indicators',
        why: 'Watch inflation and approval early—they predict future challenges.',
      },
      {
        emoji: '⚖️',
        strategy: 'Gradual Policy Changes',
        why: 'Big swings create uncertainty. Small, consistent adjustments work better.',
      },
      {
        emoji: '📈',
        strategy: 'Invest in Infrastructure',
        why: 'Long-term productivity gains from infrastructure boost GDP sustainably.',
      },
    ],
    comparisons: {
      stability: Math.round(c.approval * 50 + (1 - c.inflationRate) * 30 + (1 - c.unemploymentRate) * 20),
      consistency: Math.round(result.won ? 80 : 50),
      balance: Math.round(
        50 -
          Math.abs(c.gdpGrowth) * 10 -
          Math.abs(c.inflationRate - 0.02) * 20 -
          Math.abs(c.unemploymentRate - 0.05) * 20
      ),
    },
  };
}

/** Types for debrief insights */
interface DebriefInsights {
  metricTrends: {
    label: string;
    start: number;
    end: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  keyDecisions: {
    turn: number;
    action: string;
    impact: 'positive' | 'negative' | 'mixed';
    explanation: string;
  }[];
  takeaways: {
    type: 'success' | 'lesson' | 'insight';
    title: string;
    description: string;
  }[];
  suggestions: {
    emoji: string;
    strategy: string;
    why: string;
  }[];
  comparisons: {
    stability: number;
    consistency: number;
    balance: number;
  };
}

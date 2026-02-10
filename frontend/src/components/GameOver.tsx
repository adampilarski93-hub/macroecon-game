import type { GameResult } from '../types';

interface GameOverProps {
  result: GameResult;
  postGameAnalysis: string | null;
  onPlayAgain: () => void;
}

export function GameOver({ result, postGameAnalysis, onPlayAgain }: GameOverProps) {
  const pct = Math.min(100, Math.max(0, result.score));

  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <h2 className={result.won ? 'outcome-win' : 'outcome-lose'}>
          {result.won ? 'Victory!' : 'Game Over'}
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
          <h3>Objectives</h3>
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

        {/* LLM analysis */}
        {postGameAnalysis && (
          <div className="post-game-analysis">
            <h3>Analysis</h3>
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

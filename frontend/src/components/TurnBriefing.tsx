interface CausalExplanation {
  headline: string;
  details: string[];
}

interface TurnBriefingProps {
  text: string | null;
  loading: boolean;
  causalExplanation?: CausalExplanation | null;
}

export function TurnBriefing({ text, loading, causalExplanation }: TurnBriefingProps) {
  const hasContent = text || loading || causalExplanation;
  if (!hasContent) return null;

  return (
    <div className="turn-briefing">
      <h3>Quarterly briefing</h3>

      {causalExplanation && (
        <div className="causal-explanation">
          <p className="causal-headline"><strong>{causalExplanation.headline}</strong></p>
          {causalExplanation.details.length > 0 && (
            <details open>
              <summary>What happened and why</summary>
              <ul className="causal-details">
                {causalExplanation.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {loading ? (
        <p className="briefing-loading">Analysing the economy...</p>
      ) : text ? (
        <div className="briefing-llm">
          <span className="briefing-llm-badge">AI analysis</span>
          <p className="briefing-text">{text}</p>
        </div>
      ) : null}
    </div>
  );
}

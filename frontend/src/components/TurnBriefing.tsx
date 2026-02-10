interface TurnBriefingProps {
  text: string | null;
  loading: boolean;
}

export function TurnBriefing({ text, loading }: TurnBriefingProps) {
  if (!text && !loading) return null;

  return (
    <div className="turn-briefing">
      <h3>Quarterly briefing</h3>
      {loading ? (
        <p className="briefing-loading">Analysing the economy...</p>
      ) : (
        <p className="briefing-text">{text}</p>
      )}
    </div>
  );
}

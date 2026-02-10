import type { AdvisoryItem } from '../types';
import { IconAdvisory } from './Icons';

interface AdvisoryPanelProps {
  items: AdvisoryItem[];
  llmAdvisoryText?: string | null;
}

const SCHOOL_COLORS: Record<string, string> = {
  Mainstream: 'var(--color-debt)',
  Keynesian: 'var(--color-gdp)',
  Marxian: 'var(--color-inflation)',
  'Post-Keynesian': 'var(--color-unemployment)',
  Structuralist: 'var(--color-trade)',
};

export function AdvisoryPanel({ items, llmAdvisoryText }: AdvisoryPanelProps) {
  const hasContent = items.length > 0 || !!llmAdvisoryText;

  if (!hasContent) {
    return (
      <div className="advisory-panel">
        <h2>
          <span className="icon" aria-hidden><IconAdvisory /></span>
          Policy advice
        </h2>
        <p className="muted">
          No advice this turn. When inflation or debt gets too high, advice from different economic traditions will appear here.
        </p>
      </div>
    );
  }

  const byTopic = {
    inflation: items.filter((a) => a.topic === 'inflation'),
    debt: items.filter((a) => a.topic === 'debt'),
  };

  return (
    <div className="advisory-panel">
      <h2>
        <span className="icon" aria-hidden><IconAdvisory /></span>
        Policy advice
      </h2>

      {/* LLM personalised advice (shown first if available) */}
      {llmAdvisoryText && (
        <div className="llm-advisory">
          <span className="llm-advisory-badge">AI analysis</span>
          <p>{llmAdvisoryText}</p>
        </div>
      )}

      {items.length > 0 && (
        <p className="advisory-intro">
          Advice from different economic schools of thought:
        </p>
      )}

      {byTopic.inflation.length > 0 && (
        <section className="advisory-topic">
          <h3>Tackling inflation</h3>
          <ul className="advisory-list">
            {byTopic.inflation.map((a, i) => (
              <li key={`inf-${a.school}-${i}`} className="advisory-card">
                <span className="advisory-school" style={{ color: SCHOOL_COLORS[a.school] ?? 'var(--accent)' }}>
                  {a.school}
                </span>
                <h4>{a.title}</h4>
                <details>
                  <summary>What to do & why</summary>
                  <p className="advisory-instruction"><strong>What to do:</strong> {a.instruction}</p>
                  <p className="advisory-explanation"><strong>Why it helps:</strong> {a.explanation}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}
      {byTopic.debt.length > 0 && (
        <section className="advisory-topic">
          <h3>Addressing public debt</h3>
          <ul className="advisory-list">
            {byTopic.debt.map((a, i) => (
              <li key={`debt-${a.school}-${i}`} className="advisory-card">
                <span className="advisory-school" style={{ color: SCHOOL_COLORS[a.school] ?? 'var(--accent)' }}>
                  {a.school}
                </span>
                <h4>{a.title}</h4>
                <details>
                  <summary>What to do & why</summary>
                  <p className="advisory-instruction"><strong>What to do:</strong> {a.instruction}</p>
                  <p className="advisory-explanation"><strong>Why it helps:</strong> {a.explanation}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

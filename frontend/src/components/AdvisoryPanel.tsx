import type { AdvisoryItem } from '../types';
import { IconAdvisory } from './Icons';

interface AdvisoryPanelProps {
  items: AdvisoryItem[];
}

const SCHOOL_COLORS: Record<string, string> = {
  Mainstream: 'var(--color-debt)',
  Keynesian: 'var(--color-gdp)',
  Marxian: 'var(--color-inflation)',
  'Post-Keynesian': 'var(--color-unemployment)',
  Structuralist: 'var(--color-trade)',
};

export function AdvisoryPanel({ items }: AdvisoryPanelProps) {
  if (items.length === 0) {
    return (
      <div className="advisory-panel">
        <h2>
          <span className="icon" aria-hidden><IconAdvisory /></span>
          Policy advice
        </h2>
        <p className="muted">
          No advice this turn. When inflation or debt gets too high, we’ll show simple options from different economic traditions here.
        </p>
      </div>
    );
  }

  const byTopic = { inflation: items.filter((a) => a.topic === 'inflation'), debt: items.filter((a) => a.topic === 'debt') };

  return (
    <div className="advisory-panel">
      <h2>
        <span className="icon" aria-hidden><IconAdvisory /></span>
        Policy advice
      </h2>
      <p className="advisory-intro">
        Each option is in plain language. Pick the mix that fits your goals.
      </p>
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
                <p className="advisory-instruction"><strong>What to do:</strong> {a.instruction}</p>
                <p className="advisory-explanation"><strong>Why it helps:</strong> {a.explanation}</p>
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
                <p className="advisory-instruction"><strong>What to do:</strong> {a.instruction}</p>
                <p className="advisory-explanation"><strong>Why it helps:</strong> {a.explanation}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

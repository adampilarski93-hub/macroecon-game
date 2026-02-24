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
  General: 'var(--accent)',
};

const TOPIC_LABELS: Record<string, string> = {
  outlook: 'Economic outlook',
  growth: 'Growth',
  unemployment: 'Employment',
  trade: 'Trade & external',
  inflation: 'Tackling inflation',
  debt: 'Addressing public debt',
};

const TOPIC_ORDER = ['outlook', 'growth', 'unemployment', 'trade', 'inflation', 'debt'];

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
          No advice available yet. Advance a turn to see analysis from different economic traditions.
        </p>
      </div>
    );
  }

  const byTopic: Record<string, AdvisoryItem[]> = {};
  for (const item of items) {
    if (!byTopic[item.topic]) byTopic[item.topic] = [];
    byTopic[item.topic].push(item);
  }

  return (
    <div className="advisory-panel">
      <h2>
        <span className="icon" aria-hidden><IconAdvisory /></span>
        Policy advice
      </h2>

      {llmAdvisoryText && (
        <div className="llm-advisory">
          <span className="llm-advisory-badge">AI analysis</span>
          <p>{llmAdvisoryText}</p>
        </div>
      )}

      {items.length > 0 && (
        <p className="advisory-intro">
          Analysis from different economic schools of thought:
        </p>
      )}

      {TOPIC_ORDER.map((topic) => {
        const topicItems = byTopic[topic];
        if (!topicItems || topicItems.length === 0) return null;
        return (
          <section key={topic} className="advisory-topic">
            <h3>{TOPIC_LABELS[topic] ?? topic}</h3>
            <ul className="advisory-list">
              {topicItems.map((a, i) => (
                <li key={`${topic}-${a.school}-${i}`} className="advisory-card">
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
        );
      })}
    </div>
  );
}

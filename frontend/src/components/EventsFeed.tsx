import type { SimulationEvent } from '../types';
import { IconNews } from './Icons';

interface EventsFeedProps {
  events: SimulationEvent[];
}

export function EventsFeed({ events }: EventsFeedProps) {
  const recent = [...events].reverse().slice(0, 10);
  return (
    <div className="events-feed">
      <h2>
        <span className="icon" aria-hidden><IconNews /></span>
        Events & reports
      </h2>
      {recent.length === 0 ? (
        <p className="muted">No events this turn.</p>
      ) : (
        <ul>
          {recent.map((e) => (
            <li key={e.id} className={`event type-${e.type}`}>
              <strong>{e.title}</strong>
              <span className="event-desc">{e.description}</span>
              <span className="event-meta">Turn {e.turn}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

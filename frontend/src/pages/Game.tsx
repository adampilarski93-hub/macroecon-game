import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../state/gameStore';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { PolicyControls } from '../components/PolicyControls/PolicyControls';
import { EventsFeed } from '../components/EventsFeed';
import { AdvisoryPanel } from '../components/AdvisoryPanel';

export function Game() {
  const navigate = useNavigate();
  const { state, history, loading, error, step, mode, advisory } = useGameStore();

  useEffect(() => {
    if (state === null && !loading) navigate('/');
  }, [state, loading, navigate]);

  if (state === null) {
    return (
      <div className="page">
        <div className="loading-scenarios">
          <div className="spinner" />
          <span>Loading simulation…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page game">
      <header className="game-header">
        <h1>{state.scenario.countryName}</h1>
        <span className="turn-badge">Turn {state.turn}</span>
      </header>
      {error && <div className="error">{error}</div>}
      <main className="game-main">
        <section className="dashboard-section">
          <Dashboard state={state} history={history} />
        </section>
        <section className="advisory-section">
          <AdvisoryPanel items={advisory} />
        </section>
        <section className="policy-section">
          <PolicyControls
            state={state}
            onStep={step}
            loading={loading}
            mode={mode}
          />
        </section>
        <section className="events-section">
          <EventsFeed events={state.events} />
        </section>
      </main>
    </div>
  );
}

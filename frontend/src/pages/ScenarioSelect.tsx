import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../state/gameStore';
import { IconScenarioEconomy, IconScenarioStagflation, IconLoading } from '../components/Icons';

const scenarioIcons: Record<string, () => JSX.Element> = {
  'tutorial': IconScenarioEconomy,
  'emerging-debt-crisis': IconScenarioEconomy,
  'stagflation': IconScenarioStagflation,
  'rust-belt': IconScenarioStagflation,
  'independence-underdevelopment': IconScenarioEconomy,
  'commodity-pressure': IconScenarioEconomy,
  'rising-industrializer': IconScenarioEconomy,
  'sanctions-isolation': IconScenarioStagflation,
};

export function ScenarioSelect() {
  const navigate = useNavigate();
  const {
    scenarios,
    loading,
    error,
    mode,
    easyConfig,
    fetchScenarios,
    startSimulation,
    setMode,
    setEasyConfig,
  } = useGameStore();

  useEffect(() => {
    fetchScenarios();
  }, [fetchScenarios]);

  const handleSelect = async (id: string) => {
    await startSimulation(id);
    if (useGameStore.getState().state) navigate('/game');
  };

  const handleIdeologyClick = (value: typeof easyConfig.ideology) => {
    setEasyConfig({ ...easyConfig, ideology: value });
  };

  const handleTradeClick = (value: typeof easyConfig.tradePosture) => {
    setEasyConfig({ ...easyConfig, tradePosture: value });
  };

  const handleAllianceClick = (value: typeof easyConfig.alliance) => {
    setEasyConfig({ ...easyConfig, alliance: value });
  };

  return (
    <div className="page scenario-select">
      <header>
        <h1>Macro Planner</h1>
        <p>Choose a scenario and lead your country’s economy.</p>
      </header>
      {error && <div className="error">{error}</div>}
      <section className="mode-toggle">
        <span>Mode:</span>
        <button
          type="button"
          className={mode === 'easy' ? 'mode-btn active' : 'mode-btn'}
          onClick={() => setMode('easy')}
        >
          Easy
        </button>
        <button
          type="button"
          className={mode === 'advanced' ? 'mode-btn active' : 'mode-btn'}
          onClick={() => setMode('advanced')}
        >
          Advanced
        </button>
      </section>
      {mode === 'easy' && (
        <section className="easy-presets">
          <div className="preset-group">
            <h3>Economic model</h3>
            <div className="pill-row">
              <button
                type="button"
                className={easyConfig.ideology === 'socialist' ? 'pill active' : 'pill'}
                onClick={() => handleIdeologyClick('socialist')}
              >
                Socialist / egalitarian
              </button>
              <button
                type="button"
                className={easyConfig.ideology === 'mixed' ? 'pill active' : 'pill'}
                onClick={() => handleIdeologyClick('mixed')}
              >
                Mixed economy
              </button>
              <button
                type="button"
                className={easyConfig.ideology === 'capitalist' ? 'pill active' : 'pill'}
                onClick={() => handleIdeologyClick('capitalist')}
              >
                Market‑driven
              </button>
            </div>
          </div>
          <div className="preset-group">
            <h3>Trade posture</h3>
            <div className="pill-row">
              <button
                type="button"
                className={easyConfig.tradePosture === 'closed' ? 'pill active' : 'pill'}
                onClick={() => handleTradeClick('closed')}
              >
                More protectionist
              </button>
              <button
                type="button"
                className={easyConfig.tradePosture === 'balanced' ? 'pill active' : 'pill'}
                onClick={() => handleTradeClick('balanced')}
              >
                Balanced
              </button>
              <button
                type="button"
                className={easyConfig.tradePosture === 'open' ? 'pill active' : 'pill'}
                onClick={() => handleTradeClick('open')}
              >
                Very open
              </button>
            </div>
          </div>
          <div className="preset-group">
            <h3>Geopolitical alignment</h3>
            <div className="pill-row">
              <button
                type="button"
                className={easyConfig.alliance === 'non_aligned' ? 'pill active' : 'pill'}
                onClick={() => handleAllianceClick('non_aligned')}
              >
                Non‑aligned
              </button>
              <button
                type="button"
                className={easyConfig.alliance === 'bloc' ? 'pill active' : 'pill'}
                onClick={() => handleAllianceClick('bloc')}
              >
                Major bloc
              </button>
              <button
                type="button"
                className={easyConfig.alliance === 'sanctioned' ? 'pill active' : 'pill'}
                onClick={() => handleAllianceClick('sanctioned')}
              >
                Under sanctions
              </button>
            </div>
          </div>
        </section>
      )}
      {loading && !scenarios.length ? (
        <div className="loading-scenarios">
          <IconLoading />
          <span>Loading scenarios…</span>
        </div>
      ) : (
        <div className="scenario-grid">
          {scenarios.map((s, i) => {
            const Icon = scenarioIcons[s.id] ?? IconScenarioEconomy;
            return (
              <article key={s.id} className="scenario-card">
                <div className="card-icon" aria-hidden>
                  <Icon />
                </div>
                <h2>{s.name}</h2>
                <span className={`difficulty ${s.difficulty}`}>{s.difficulty}</span>
                <p>{s.description}</p>
                <button
                  type="button"
                  onClick={() => handleSelect(s.id)}
                  disabled={loading}
                >
                  Start scenario
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

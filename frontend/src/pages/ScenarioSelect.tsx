import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../state/gameStore';
import { IconScenarioEconomy, IconScenarioStagflation, IconLoading } from '../components/Icons';
import { getScenarioObjectives } from '../scenarios';
import { hasDecisionTreeMode } from '../narrative/registry';

function IconSovereignty() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2.5" />
      <path d="M28 8v40M8 28h40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M28 16l6 8h-4v8h4l-6 8-6-8h4v-8h-4l6-8z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

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
    customMaxTurns,
    fetchScenarios,
    startSimulation,
    setMode,
    setEasyConfig,
    setCustomMaxTurns,
  } = useGameStore();

  const [useCustomTurns, setUseCustomTurns] = useState(customMaxTurns > 0);
  const [sliderValue, setSliderValue] = useState(customMaxTurns > 0 ? customMaxTurns : 40);

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
        <p>Choose a scenario and lead your country's economy.</p>
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
              <button type="button" className={easyConfig.ideology === 'socialist' ? 'pill active' : 'pill'} onClick={() => handleIdeologyClick('socialist')}>
                Socialist / egalitarian
              </button>
              <button type="button" className={easyConfig.ideology === 'mixed' ? 'pill active' : 'pill'} onClick={() => handleIdeologyClick('mixed')}>
                Mixed economy
              </button>
              <button type="button" className={easyConfig.ideology === 'capitalist' ? 'pill active' : 'pill'} onClick={() => handleIdeologyClick('capitalist')}>
                Market-driven
              </button>
            </div>
          </div>
          <div className="preset-group">
            <h3>Trade posture</h3>
            <div className="pill-row">
              <button type="button" className={easyConfig.tradePosture === 'closed' ? 'pill active' : 'pill'} onClick={() => handleTradeClick('closed')}>
                More protectionist
              </button>
              <button type="button" className={easyConfig.tradePosture === 'balanced' ? 'pill active' : 'pill'} onClick={() => handleTradeClick('balanced')}>
                Balanced
              </button>
              <button type="button" className={easyConfig.tradePosture === 'open' ? 'pill active' : 'pill'} onClick={() => handleTradeClick('open')}>
                Very open
              </button>
            </div>
          </div>
          <div className="preset-group">
            <h3>Geopolitical alignment</h3>
            <div className="pill-row">
              <button type="button" className={easyConfig.alliance === 'non_aligned' ? 'pill active' : 'pill'} onClick={() => handleAllianceClick('non_aligned')}>
                Non-aligned
              </button>
              <button type="button" className={easyConfig.alliance === 'bloc' ? 'pill active' : 'pill'} onClick={() => handleAllianceClick('bloc')}>
                Major bloc
              </button>
              <button type="button" className={easyConfig.alliance === 'sanctioned' ? 'pill active' : 'pill'} onClick={() => handleAllianceClick('sanctioned')}>
                Under sanctions
              </button>
            </div>
          </div>
        </section>
      )}
      {/* Turn count selector */}
      <section className="turn-selector">
        <div className="turn-selector-header">
          <label className="turn-toggle">
            <input
              type="checkbox"
              checked={useCustomTurns}
              onChange={(e) => {
                setUseCustomTurns(e.target.checked);
                setCustomMaxTurns(e.target.checked ? sliderValue : 0);
              }}
            />
            Custom game length
          </label>
          {useCustomTurns && (
            <span className="turn-value">{sliderValue} turns</span>
          )}
        </div>
        {useCustomTurns && (
          <div className="turn-slider-row">
            <span className="turn-label-min">20</span>
            <input
              type="range"
              min={20}
              max={200}
              step={5}
              value={sliderValue}
              onChange={(e) => {
                const v = Number(e.target.value);
                setSliderValue(v);
                setCustomMaxTurns(v);
              }}
              className="turn-slider"
            />
            <span className="turn-label-max">200</span>
          </div>
        )}
        {!useCustomTurns && (
          <p className="turn-selector-hint">Each scenario has a default turn count. Enable this to override it.</p>
        )}
      </section>

      {/* Narrative mode — featured card */}
      <section className="narrative-featured">
        <article className="scenario-card narrative-card">
          <div className="card-icon narrative-card-icon" aria-hidden>
            <IconSovereignty />
          </div>
          <div className="narrative-card-badge">Narrative Mode</div>
          <h2>Sovereignty Path</h2>
          <div className="card-meta">
            <span className="difficulty hard">hard</span>
            <span className="turns-badge">branching decisions</span>
          </div>
          <p>
            Lead a Global South nation through a series of consequential decisions. Accept a loan
            from China or the IMF — or chart your own course. Each choice reshapes the next.
            Build your country into a politically and economically sovereign state.
          </p>
          <ul className="card-objectives">
            <li>Achieve political sovereignty</li>
            <li>Build economic strength</li>
            <li>Maintain public support</li>
            <li>Control debt burden</li>
          </ul>
          <button type="button" onClick={() => navigate('/sovereignty')}>
            Begin the Sovereignty Path
          </button>
        </article>
      </section>

      {loading && !scenarios.length ? (
        <div className="loading-scenarios">
          <IconLoading />
          <span>Loading scenarios...</span>
        </div>
      ) : (
        <div className="scenario-grid">
          {scenarios.map((s) => {
            const Icon = scenarioIcons[s.id] ?? IconScenarioEconomy;
            const obj = getScenarioObjectives(s.id);
            return (
              <article key={s.id} className="scenario-card">
                <div className="card-icon" aria-hidden>
                  <Icon />
                </div>
                <h2>{s.name}</h2>
                <div className="card-meta">
                  <span className={`difficulty ${s.difficulty}`}>{s.difficulty}</span>
                  {obj && (
                    <span className="turns-badge">
                      {useCustomTurns ? sliderValue : obj.maxTurns} turns
                    </span>
                  )}
                </div>
                <p>{s.description}</p>
                {obj && (
                  <ul className="card-objectives">
                    {obj.goals.map((g, i) => (
                      <li key={i}>{g.label}</li>
                    ))}
                  </ul>
                )}
                <div className="scenario-card-actions">
                  <button
                    type="button"
                    className="scenario-btn-primary"
                    onClick={() => handleSelect(s.id)}
                    disabled={loading}
                  >
                    Policy Controls
                  </button>
                  {hasDecisionTreeMode(s.id) && (
                    <button
                      type="button"
                      className="scenario-btn-narrative"
                      onClick={() => navigate(`/narrative/${s.id}`)}
                    >
                      Decision Tree
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

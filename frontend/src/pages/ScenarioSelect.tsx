import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../state/gameStore';
import { IconScenarioEconomy, IconScenarioStagflation, IconLoading, IconInfo } from '../components/Icons';
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

/** Guided Path Welcome Modal for New Players */
function GuidedPathModal({
  isOpen,
  onClose,
  onSelectMode,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'easy' | 'hard') => void;
}) {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleModeSelect = (mode: 'easy' | 'hard') => {
    onSelectMode(mode);
    onClose();
  };

  return (
    <div className="guided-path-overlay">
      <div className="guided-path-modal">
        <button className="guided-path-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {step === 1 && (
          <>
            <div className="guided-path-header">
              <span className="guided-path-emoji">🎓</span>
              <h2>Welcome to Macro Planner</h2>
            </div>
            <p className="guided-path-intro">
              You're about to step into the role of an economic policymaker. Your decisions will shape 
              the future of a nation. But first, let's find the right experience for you.
            </p>
            <div className="guided-path-question">
              <h3>How would you describe your economics background?</h3>
            </div>
            <div className="guided-path-options">
              <button
                className="guided-option guided-option-beginner"
                onClick={() => setStep(2)}
              >
                <span className="option-emoji">🌱</span>
                <div className="option-content">
                  <strong>Just Starting Out</strong>
                  <span>I'm new to economics and want to learn the basics</span>
                </div>
              </button>
              <button
                className="guided-option guided-option-experienced"
                onClick={() => setStep(3)}
              >
                <span className="option-emoji">📊</span>
                <div className="option-content">
                  <strong>Comfortable with Economics</strong>
                  <span>I understand concepts like inflation, GDP, and monetary policy</span>
                </div>
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="guided-path-header">
              <span className="guided-path-emoji">🌱</span>
              <h2>Perfect! Let's Start Your Journey</h2>
            </div>
            <p className="guided-path-intro">
              As a beginner, we recommend starting with <strong>Easy Mode</strong>. 
              This guided experience will teach you core economic concepts through 
              narrative choices rather than complex policy controls.
            </p>
            <div className="mode-comparison">
              <div className="mode-card mode-easy">
                <h4>Easy Mode: Decision Tree</h4>
                <ul>
                  <li>📝 Story-driven narrative choices</li>
                  <li>📚 Learn as you play</li>
                  <li>🎯 Clear explanations of consequences</li>
                  <li>✅ 20 guided decisions per scenario</li>
                </ul>
              </div>
              <div className="mode-card mode-hard">
                <h4>Hard Mode: Full Simulation</h4>
                <ul>
                  <li>⚙️ 15+ detailed policy levers</li>
                  <li>📈 Complex economic modeling</li>
                  <li>🧠 Requires economics knowledge</li>
                  <li>⏱️ 20-200 turn scenarios</li>
                </ul>
              </div>
            </div>
            <div className="guided-path-actions">
              <button className="guided-btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button className="guided-btn-primary" onClick={() => handleModeSelect('easy')}>
                Start Easy Mode 🌱
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="guided-path-header">
              <span className="guided-path-emoji">📊</span>
              <h2>Choose Your Challenge</h2>
            </div>
            <p className="guided-path-intro">
              With your economics background, you're ready for either mode. Choose based on 
              your preferred learning style:
            </p>
            <div className="mode-comparison">
              <div className="mode-card mode-easy">
                <h4>Easy Mode: Learn Through Stories</h4>
                <ul>
                  <li>📝 Narrative-driven choices</li>
                  <li>🎓 Focus on economic concepts</li>
                  <li>📖 Historical context included</li>
                  <li>✨ Great for understanding trade-offs</li>
                </ul>
                <button className="mode-select-btn" onClick={() => handleModeSelect('easy')}>
                  Choose Easy Mode
                </button>
              </div>
              <div className="mode-card mode-hard mode-recommended">
                <span className="recommended-badge">Recommended for You</span>
                <h4>Hard Mode: Full Control</h4>
                <ul>
                  <li>⚙️ Fine-tune every policy lever</li>
                  <li>🔬 Realistic economic simulation</li>
                  <li>🎯 Test advanced strategies</li>
                  <li>🏆 Challenge yourself</li>
                </ul>
                <button className="mode-select-btn mode-select-btn-primary" onClick={() => handleModeSelect('hard')}>
                  Choose Hard Mode
                </button>
              </div>
            </div>
            <div className="guided-path-actions">
              <button className="guided-btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
            </div>
          </>
        )}

        <div className="guided-path-footer">
          <p>💡 <strong>Tip:</strong> You can always switch modes later. Start with what feels right!</p>
        </div>
      </div>
    </div>
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

  // Guided Path modal state
  const [showGuidedPath, setShowGuidedPath] = useState(() => {
    // Only show if user hasn't seen it before
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('macroplanner_guided_seen');
    }
    return false;
  });

  useEffect(() => {
    fetchScenarios();
  }, [fetchScenarios]);

  const handleGuidedModeSelect = (selectedMode: 'easy' | 'hard') => {
    setMode(selectedMode === 'easy' ? 'easy' : 'advanced');
    localStorage.setItem('macroplanner_guided_seen', 'true');
    setShowGuidedPath(false);
  };

  const handleCloseGuidedPath = () => {
    localStorage.setItem('macroplanner_guided_seen', 'true');
    setShowGuidedPath(false);
  };

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
      {/* Guided Path Welcome Modal */}
      <GuidedPathModal
        isOpen={showGuidedPath}
        onClose={handleCloseGuidedPath}
        onSelectMode={handleGuidedModeSelect}
      />

      <header>
        <h1>Macro Planner</h1>
        <p>Choose a scenario and lead your country's economy.</p>
        <button
          className="guided-reopen-btn"
          onClick={() => setShowGuidedPath(true)}
          title="Reopen welcome guide"
        >
          <IconInfo />
          First time here?
        </button>
      </header>
      {error && <div className="error">{error}</div>}

      {/* Featured Tutorial — First thing players see */}
      {!loading && scenarios.length > 0 && (
        <section className="tutorial-featured">
          {(() => {
            const tutorial = scenarios.find(s => s.id === 'tutorial');
            if (!tutorial) return null;
            const TutorialIcon = scenarioIcons['tutorial'] ?? IconScenarioEconomy;
            return (
              <article className="scenario-card tutorial-card">
                <div className="tutorial-badge">Start Here</div>
                <div className="card-icon tutorial-icon" aria-hidden>
                  <TutorialIcon />
                </div>
                <h2>Learn to Play</h2>
                <div className="card-meta">
                  <span className="difficulty easy">beginner</span>
                  <span className="turns-badge">20 decisions</span>
                </div>
                <p>
                  New to Macro Planner? Start with the interactive tutorial. You'll learn how the
                  indicators work, how choices affect your economy, and how to balance growth, debt,
                  and public support. This is the best way to understand the game before taking on
                  harder scenarios.
                </p>
                <ul className="card-objectives">
                  <li>Learn the core mechanics</li>
                  <li>Understand national indicators</li>
                  <li>Practice balancing trade-offs</li>
                  <li>Prepare for harder modes</li>
                </ul>
                <div className="scenario-card-actions tutorial-actions">
                  <button
                    type="button"
                    className="scenario-btn-narrative"
                    onClick={() => navigate('/narrative/tutorial')}
                  >
                    Easy Mode — Learn the Basics
                  </button>
                  <button
                    type="button"
                    className="scenario-btn-primary"
                    onClick={() => handleSelect('tutorial')}
                    disabled={loading}
                  >
                    Hard Mode — Full Simulation
                  </button>
                </div>
              </article>
            );
          })()}
        </section>
      )}

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

      {/* Narrative mode — featured cards */}
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
        <article className="scenario-card narrative-card">
          <div className="card-icon narrative-card-icon" aria-hidden>
            <IconSovereignty />
          </div>
          <div className="narrative-card-badge">Narrative Mode</div>
          <h2>Gulf Migrant</h2>
          <div className="card-meta">
            <span className="difficulty hard">hard</span>
            <span className="turns-badge">branching decisions</span>
          </div>
          <p>
            You are a migrant construction worker in a wealthy Gulf state, building a megacity for
            the world. Economic forces beyond your control pull you in different directions. Each
            decision — work, debt, solidarity, survival — has ramifications.
          </p>
          <ul className="card-objectives">
            <li>Send remittances home</li>
            <li>Protect your health</li>
            <li>Build solidarity</li>
            <li>Keep your dignity</li>
          </ul>
          <button type="button" onClick={() => navigate('/narrative/gulf-migrant')}>
            Begin Gulf Migrant
          </button>
        </article>
        <article className="scenario-card narrative-card">
          <div className="card-icon narrative-card-icon" aria-hidden>
            <IconSovereignty />
          </div>
          <div className="narrative-card-badge">Narrative Mode</div>
          <h2>Plurinational Path</h2>
          <div className="card-meta">
            <span className="difficulty hard">hard</span>
            <span className="turns-badge">branching decisions</span>
          </div>
          <p>
            You are the newly-elected leader of a South American country. Your mandate: build
            socialism in a plurinational state — where Indigenous nations, labor unions, and the
            urban poor each hold urgent claims. Balance U.S. sanctions and CIA pressure against
            predatory World Bank loans, uneven development, and the constant threat of coups.
          </p>
          <ul className="card-objectives">
            <li>Build sovereignty</li>
            <li>Strengthen plurinational unity</li>
            <li>Support labor and Indigenous rights</li>
            <li>Resist coups and economic warfare</li>
          </ul>
          <button type="button" onClick={() => navigate('/narrative/plurinational-path')}>
            Begin Plurinational Path
          </button>
        </article>
        <article className="scenario-card narrative-card">
          <div className="card-icon narrative-card-icon" aria-hidden>
            <IconSovereignty />
          </div>
          <div className="narrative-card-badge">Narrative Mode</div>
          <h2>Reservation Governor</h2>
          <div className="card-meta">
            <span className="difficulty hard">hard</span>
            <span className="turns-badge">branching decisions</span>
          </div>
          <p>
            You are the tribal governor of an Indian Reservation in the Southwest United States.
            Develop your economy and lift your people out of poverty while maintaining sovereignty
            as an Indigenous nation. Each decision you make impacts the next.
          </p>
          <ul className="card-objectives">
            <li>Strengthen tribal sovereignty</li>
            <li>Build economic self-sufficiency</li>
            <li>Protect cultural integrity</li>
            <li>Balance development and tradition</li>
          </ul>
          <button type="button" onClick={() => navigate('/narrative/reservation-governor')}>
            Begin Reservation Governor
          </button>
        </article>
        <article className="scenario-card narrative-card">
          <div className="card-icon narrative-card-icon" aria-hidden>
            <IconSovereignty />
          </div>
          <div className="narrative-card-badge">Narrative Mode</div>
          <h2>AI Displaced</h2>
          <div className="card-meta">
            <span className="difficulty hard">hard</span>
            <span className="turns-badge">branching decisions</span>
          </div>
          <p>
            You were a tech worker at a major company — replaced by AI. Years of loyalty and hard
            work are now irrelevant as firms cut overhead and integrate cheaper solutions. Navigate
            unemployment, a contracting labor market, price increases, and the erosion of the
            &quot;intelligence premium&quot; that once paid your mortgage.
          </p>
          <ul className="card-objectives">
            <li>Protect your financial runway</li>
            <li>Maintain health and dignity</li>
            <li>Build solidarity with other displaced workers</li>
            <li>Navigate the new labor market</li>
          </ul>
          <button type="button" onClick={() => navigate('/narrative/ai-displaced')}>
            Begin AI Displaced
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
          {scenarios.filter(s => s.id !== 'tutorial').map((s) => {
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
                  {hasDecisionTreeMode(s.id) && (
                    <span className="turns-badge">branching decisions</span>
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
                  {hasDecisionTreeMode(s.id) && (
                    <button
                      type="button"
                      className="scenario-btn-narrative"
                      onClick={() => navigate(`/narrative/${s.id}`)}
                    >
                      Easy Mode
                    </button>
                  )}
                  <button
                    type="button"
                    className="scenario-btn-primary"
                    onClick={() => handleSelect(s.id)}
                    disabled={loading}
                  >
                    Hard Mode
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

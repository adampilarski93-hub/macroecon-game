import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../state/gameStore';
import { IconScenarioEconomy, IconScenarioStagflation, IconLoading, IconInfo } from '../components/Icons';
import { getScenarioObjectives } from '../scenarios';
import { hasDecisionTreeMode } from '../narrative/registry';

// Category header icons
function IconGraduation() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2.5" />
      <path d="M28 12l14 8-14 8-14-8 14-8z" fill="currentColor" opacity="0.85" />
      <path d="M14 28v8l14 8 14-8v-8" stroke="currentColor" strokeWidth="2" />
      <path d="M28 36v8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconStories() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 20h24M16 28h20M16 36h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="28" r="4" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="28" cy="22" r="6" fill="currentColor" opacity="0.85" />
      <path d="M18 40c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconChallenge() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2.5" />
      <path d="M28 12v24M20 28l8-8 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 44h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSovereignty() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2.5" />
      <path d="M28 8v40M8 28h40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M28 16l6 8h-4v8h4l-6 8-6-8h4v-8h-4l6-8z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export function ScenarioSelect() {
  const navigate = useNavigate();
  const {
    scenarios,
    loading,
    error,
    customMaxTurns,
    fetchScenarios,
    startSimulation,
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

  // Category definitions
  const categoryConfigs = {
    startHere: {
      id: 'start-here',
      title: 'Start Here: Your First Economy',
      subtitle: 'Essential starting points for learning the fundamentals',
      icon: IconGraduation,
      scenarioIds: ['tutorial', 'emerging-debt-crisis', 'stagflation', 'rising-industrializer'],
    },
    storiesStrategy: {
      id: 'stories-strategy',
      title: 'Stories & Strategy: Where Politics Meets Policy',
      subtitle: 'Narrative-driven scenarios with deep geopolitical stakes',
      icon: IconStories,
      scenarioIds: ['sovereignty-path', 'plurinational-path', 'sanctions-isolation', 'independence-underdevelopment'],
    },
    peoplePlaces: {
      id: 'people-places',
      title: 'People & Places: Economies Up Close',
      subtitle: 'Human-scale stories of navigating economic forces',
      icon: IconPeople,
      scenarioIds: ['gulf-migrant', 'reservation-governor', 'ai-displaced'],
    },
    tackleChallenge: {
      id: 'tackle-challenge',
      title: 'Tackle a Challenge: Put Your Skills to the Test',
      subtitle: 'Complex scenarios for experienced players',
      icon: IconChallenge,
      scenarioIds: ['rust-belt', 'commodity-pressure', 'chokepoint-closure'],
    },
  };

  // Narrative-only scenario data
  const narrativeData: Record<string, { name: string; difficulty: string; description: string; objectives: string[] }> = {
    'sovereignty-path': {
      name: 'Sovereignty Path',
      difficulty: 'hard',
      description: 'Lead a Global South nation through consequential decisions.',
      objectives: ['Achieve sovereignty', 'Build strength', 'Maintain support'],
    },
    'plurinational-path': {
      name: 'Plurinational Path',
      difficulty: 'hard',
      description: 'Lead through socialism, plurinationalism, and resistance.',
      objectives: ['Build sovereignty', 'Strengthen unity', 'Resist coups'],
    },
    'gulf-migrant': {
      name: 'Gulf Migrant',
      difficulty: 'hard',
      description: 'Navigate as a migrant worker in a wealthy Gulf state.',
      objectives: ['Send remittances', 'Protect health', 'Build solidarity'],
    },
    'reservation-governor': {
      name: 'Reservation Governor',
      difficulty: 'hard',
      description: 'Lead an Indian Reservation with sovereignty and development.',
      objectives: ['Strengthen sovereignty', 'Build self-sufficiency'],
    },
    'ai-displaced': {
      name: 'AI Displaced',
      difficulty: 'hard',
      description: 'Navigate unemployment after being replaced by AI.',
      objectives: ['Protect savings', 'Maintain dignity', 'Build solidarity'],
    },
    'sanctions-isolation': {
      name: 'Under Sanctions',
      difficulty: 'hard',
      description: 'Navigate geopolitical pressure and economic warfare.',
      objectives: ['Maintain stability', 'Find partners', 'Preserve sovereignty'],
    },
  };

  const scenarioIcons: Record<string, () => JSX.Element> = {
    'tutorial': IconScenarioEconomy,
    'emerging-debt-crisis': IconScenarioEconomy,
    'stagflation': IconScenarioStagflation,
    'rust-belt': IconScenarioStagflation,
    'independence-underdevelopment': IconScenarioEconomy,
    'commodity-pressure': IconScenarioEconomy,
    'rising-industrializer': IconScenarioEconomy,
    'sanctions-isolation': IconScenarioStagflation,
    'chokepoint-closure': IconScenarioStagflation,
  };

  const renderScenarioCard = (scenarioId: string, isNarrativeOnly = false) => {
    const backendScenario = scenarios.find(s => s.id === scenarioId);
    const narrative = narrativeData[scenarioId];
    const scenario = backendScenario || narrative;
    if (!scenario) return null;

    const Icon = scenarioIcons[scenarioId] ?? IconScenarioEconomy;
    const hasNarrative = hasDecisionTreeMode(scenarioId) || isNarrativeOnly;
    const obj = backendScenario ? getScenarioObjectives(scenarioId) : null;
    const maxTurns = useCustomTurns ? sliderValue : (obj?.maxTurns || 40);

    return (
      <article key={scenarioId} className={`scenario-card ${isNarrativeOnly ? 'narrative-card' : ''}`}>
        <div className={`card-icon ${isNarrativeOnly ? 'narrative-card-icon' : ''}`} aria-hidden>
          <Icon />
        </div>
        {isNarrativeOnly && <div className="narrative-card-badge">Narrative Mode</div>}
        <h2>{scenario.name}</h2>
        <div className="card-meta">
          <span className={`difficulty ${scenario.difficulty}`}>{scenario.difficulty}</span>
          <span className="turns-badge">{hasNarrative ? 'branching decisions' : `${maxTurns} turns`}</span>
        </div>
        <p>{scenario.description}</p>
        <ul className="card-objectives">
          {(narrative?.objectives || obj?.goals.map(g => g.label) || []).map((goal, i) => (
            <li key={i}>{goal}</li>
          ))}
        </ul>
        <div className="scenario-card-actions">
          {hasNarrative && (
            <button type="button" className="scenario-btn-narrative" onClick={() => navigate(scenarioId === 'sovereignty-path' ? '/sovereignty' : `/narrative/${scenarioId}`)}>
              Story Mode
            </button>
          )}
          {!isNarrativeOnly && (
            <>
              <button
                type="button"
                className="scenario-btn-guided"
                onClick={() => {
                  useGameStore.getState().setMode('guided');
                  handleSelect(scenarioId);
                }}
                disabled={loading}
              >
                Guided Simulation
              </button>
              <button
                type="button"
                className="scenario-btn-primary"
                onClick={() => {
                  useGameStore.getState().setMode('simulator');
                  handleSelect(scenarioId);
                }}
                disabled={loading}
              >
                Full Simulation
              </button>
            </>
          )}
        </div>
      </article>
    );
  };

  const renderCategory = (config: typeof categoryConfigs.startHere) => {
    const CategoryIcon = config.icon;
    const categoryScenarios = config.scenarioIds.map(id => {
      const backend = scenarios.find(s => s.id === id);
      const isNarrativeOnly = !backend && !!narrativeData[id];
      return { id, isNarrativeOnly };
    }).filter(s => s.isNarrativeOnly || scenarios.some(bs => bs.id === s.id));

    if (categoryScenarios.length === 0) return null;

    return (
      <section key={config.id} className="scenario-category">
        <div className="category-header">
          <div className="category-icon"><CategoryIcon /></div>
          <div className="category-title">
            <h2>{config.title}</h2>
            <p>{config.subtitle}</p>
          </div>
        </div>
        <div className="scenario-grid">
          {categoryScenarios.map(({ id, isNarrativeOnly }) => renderScenarioCard(id, isNarrativeOnly))}
        </div>
      </section>
    );
  };

  return (
    <div className="page scenario-select">
      <header>
        <h1>Macro Planner</h1>
        <p>Choose your path. Each scenario teaches different lessons about economics, policy, and power.</p>
      </header>
      {error && <div className="error">{error}</div>}

      <section className="turn-selector">
        <div className="turn-selector-header">
          <label className="turn-toggle">
            <input type="checkbox" checked={useCustomTurns} onChange={(e) => { setUseCustomTurns(e.target.checked); setCustomMaxTurns(e.target.checked ? sliderValue : 0); }} />
            Custom game length
          </label>
          {useCustomTurns && <span className="turn-value">{sliderValue} turns</span>}
        </div>
        {useCustomTurns && (
          <div className="turn-slider-row">
            <span className="turn-label-min">20</span>
            <input type="range" min={20} max={200} step={5} value={sliderValue} onChange={(e) => { const v = Number(e.target.value); setSliderValue(v); setCustomMaxTurns(v); }} className="turn-slider" />
            <span className="turn-label-max">200</span>
          </div>
        )}
      </section>

      {loading && !scenarios.length ? (
        <div className="loading-scenarios"><IconLoading /><span>Loading scenarios...</span></div>
      ) : (
        <div className="scenario-categories">
          {renderCategory(categoryConfigs.startHere)}
          {renderCategory(categoryConfigs.storiesStrategy)}
          {renderCategory(categoryConfigs.peoplePlaces)}
          {renderCategory(categoryConfigs.tackleChallenge)}
        </div>
      )}
    </div>
  );
}


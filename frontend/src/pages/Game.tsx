import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../state/gameStore';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { PolicyControls } from '../components/PolicyControls/PolicyControls';
import { EventsFeed } from '../components/EventsFeed';
import { AdvisoryPanel } from '../components/AdvisoryPanel';
import { TurnBriefing } from '../components/TurnBriefing';
import { AdvisorChat } from '../components/AdvisorChat';
import { GameOver } from '../components/GameOver';
import { LLMSettings } from '../components/LLMSettings';
import { SimulatorDiagnostics } from '../components/SimulatorDiagnostics';
import { SimulatorModelPanel } from '../components/SimulatorModelPanel';
import { getScenarioObjectives } from '../scenarios';

export function Game() {
  const navigate = useNavigate();
  const {
    state,
    history,
    loading,
    error,
    step,
    undo,
    mode,
    advisory,
    turnBriefing,
    briefingLoading,
    llmAdvisoryText,
    gameResult,
    llmConfig,
    chatHistory,
    chatLoading,
    sendChat,
    setLLMConfig,
    resetGame,
    postGameAnalysis,
    autoPlaying,
    autoPlayLog,
    causalExplanation,
    simulatorDiagnostics,
    startAutoPlay,
    stopAutoPlay,
  } = useGameStore();

  const [showSettings, setShowSettings] = useState(false);
  const [showAutoPlay, setShowAutoPlay] = useState(false);
  const autoPlayLogRef = useRef<HTMLDivElement>(null);

  // Scroll auto-play log to bottom
  useEffect(() => {
    if (autoPlayLogRef.current) {
      autoPlayLogRef.current.scrollTop = autoPlayLogRef.current.scrollHeight;
    }
  }, [autoPlayLog]);

  useEffect(() => {
    if (state === null && !loading) navigate('/');
  }, [state, loading, navigate]);

  if (state === null) {
    return (
      <div className="page">
        <div className="loading-scenarios">
          <div className="spinner" />
          <span>Loading simulation...</span>
        </div>
      </div>
    );
  }

  const objectives = getScenarioObjectives(state.scenario.scenarioId);
  const { customMaxTurns } = useGameStore();
  const effectiveMaxTurns = customMaxTurns > 0 ? customMaxTurns : (objectives?.maxTurns ?? 20);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="page game">
      {/* Header */}
      <header className="game-header">
        <div className="game-header-left">
          <button className="back-btn" onClick={handlePlayAgain} title="Back to scenarios">
            &larr;
          </button>
          <h1>{state.scenario.countryName}</h1>
          <span className="turn-badge" style={{ marginLeft: 10 }}>
            {mode === 'simulator'
              ? 'Full Simulation'
              : mode === 'advanced'
                ? 'Guided Simulation'
                : mode === 'guided'
                  ? 'Guided (Legacy)'
                  : 'Easy Mode'}
          </span>
        </div>
        <div className="game-header-right">
          <span className="turn-badge">
            Turn {state.turn} / {effectiveMaxTurns}
          </span>
          {llmConfig.enabled && !gameResult && (
            <button
              className="autoplay-btn"
              onClick={() => setShowAutoPlay(true)}
              title="Let the AI run the simulation for you"
            >
              AI Auto-Play
            </button>
          )}
          <button className="settings-btn" onClick={() => setShowSettings(true)} title="AI Settings">
            Settings
          </button>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      {/* Objectives bar */}
      {objectives && (
        <div className="objectives-bar">
          {objectives.goals.map((g, i) => {
            const val = (state.country as unknown as Record<string, unknown>)[g.metric] as number;
            const met = g.compare === 'above' ? val >= g.target : val <= g.target;
            return (
              <span key={i} className={`obj-pill ${met ? 'obj-pill-met' : 'obj-pill-unmet'}`} title={g.description}>
                {met ? '\u2713' : '\u2022'} {g.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Turn briefing */}
      <TurnBriefing text={turnBriefing} loading={briefingLoading} causalExplanation={causalExplanation} />
      {mode === 'simulator' && (
        <div className="objectives-bar">
          <span className="obj-pill obj-pill-met" title="Simulator uses deterministic local stepping.">
            ✓ Deterministic run
          </span>
          <span className="obj-pill" title="r-g proxy: policy rate minus GDP growth.">
            r-g: {((state.country.policyRate - state.country.gdpGrowth) * 100).toFixed(2)} pts
          </span>
          <span className="obj-pill" title="Current account as % of GDP.">
            CA/GDP: {state.country.gdp !== 0 ? ((state.country.currentAccount / state.country.gdp) * 100).toFixed(2) : '0.00'}%
          </span>
          <span className="obj-pill" title="Fiscal deficit as % of GDP.">
            Deficit/GDP: {state.country.gdp !== 0 ? ((state.country.deficit / state.country.gdp) * 100).toFixed(2) : '0.00'}%
          </span>
        </div>
      )}
      {mode === 'simulator' && <SimulatorModelPanel state={state} />}
      {mode === 'simulator' && <SimulatorDiagnostics diagnostics={simulatorDiagnostics} />}

      <main className="game-main">
        <section className="dashboard-section">
          <Dashboard state={state} history={history} />
        </section>

        <section className="advisory-section">
          <AdvisoryPanel items={advisory} llmAdvisoryText={llmAdvisoryText} />
        </section>

        <section className="policy-section">
          <PolicyControls
            state={state}
            onStep={step}
            loading={loading}
            mode={mode}
            gameOver={!!gameResult}
          />
          {history.length > 1 && !gameResult && (
            <button className="undo-btn" onClick={undo} title="Go back one turn">
              Undo last turn
            </button>
          )}
        </section>

        <section className="events-section">
          <EventsFeed events={state.events} />
          <div className="chat-section">
            <AdvisorChat
              chatHistory={chatHistory}
              chatLoading={chatLoading}
              onSend={sendChat}
            />
          </div>
        </section>
      </main>

      {/* Game over overlay */}
      {gameResult && (
        <GameOver
          result={gameResult}
          postGameAnalysis={postGameAnalysis}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {/* Settings modal */}
      {showSettings && (
        <LLMSettings
          config={llmConfig}
          onSave={setLLMConfig}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Auto-play overlay */}
      {showAutoPlay && (
        <div className="autoplay-overlay">
          <div className="autoplay-panel">
            <h2>AI Auto-Play</h2>
            <p className="autoplay-desc">
              The AI will analyze the economic situation each turn, set policies according to its
              best judgment, and advance the simulation automatically. You can stop at any time.
            </p>
            {autoPlayLog.length > 0 && (
              <div className="autoplay-log" ref={autoPlayLogRef}>
                {autoPlayLog.map((line, i) => (
                  <div key={i} className="autoplay-log-line">{line}</div>
                ))}
              </div>
            )}
            <div className="autoplay-actions">
              {!autoPlaying ? (
                <>
                  <button
                    className="autoplay-start-btn"
                    onClick={() => startAutoPlay()}
                    disabled={!llmConfig.enabled || !!gameResult}
                  >
                    Start Auto-Play
                  </button>
                  <button className="autoplay-close-btn" onClick={() => setShowAutoPlay(false)}>
                    Close
                  </button>
                </>
              ) : (
                <button className="autoplay-stop-btn" onClick={() => stopAutoPlay()}>
                  Stop Auto-Play
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

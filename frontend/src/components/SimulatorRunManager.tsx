import { useMemo } from 'react';
import { useGameStore } from '../state/gameStore';
import type { SimulationState } from '../types';

interface Props {
  state: SimulationState;
}

function delta(current: number, base: number) {
  const d = current - base;
  const sign = d >= 0 ? '+' : '';
  return `${sign}${d.toFixed(2)}`;
}

export function SimulatorRunManager({ state }: Props) {
  const seed = useGameStore((s) => s.simulatorSeed);
  const setSeed = useGameStore((s) => s.setSimulatorSeed);
  const baseline = useGameStore((s) => s.simulatorBaseline);
  const captureBaseline = useGameStore((s) => s.captureSimulatorBaseline);
  const clearBaseline = useGameStore((s) => s.clearSimulatorBaseline);

  const comparison = useMemo(() => {
    if (!baseline) return null;
    return [
      ['GDP', state.country.gdp, baseline.country.gdp],
      ['GDP growth', state.country.gdpGrowth * 100, baseline.country.gdpGrowth * 100],
      ['Inflation', state.country.inflationRate * 100, baseline.country.inflationRate * 100],
      ['Unemployment', state.country.unemploymentRate * 100, baseline.country.unemploymentRate * 100],
      ['Debt/GDP', state.country.debtToGdp * 100, baseline.country.debtToGdp * 100],
      ['Approval', state.country.approval * 100, baseline.country.approval * 100],
    ] as const;
  }, [state, baseline]);

  const exportRun = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      seed,
      turn: state.turn,
      scenarioId: state.scenario.scenarioId,
      state,
      baseline,
      mode: 'simulator',
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sim-run-${state.scenario.scenarioId}-turn-${state.turn}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="sim-diagnostics">
      <div className="sim-diag-head">
        <h3>Run Manager</h3>
      </div>
      <div className="control-group">
        <label>
          Deterministic seed
          <input type="number" min={1} step={1} value={seed} onChange={(e) => setSeed(Number(e.target.value || 1))} />
          <span className="control-value">{seed}</span>
        </label>
      </div>
      <div className="sim-run-actions">
        <button type="button" className="sim-eq-toggle" onClick={captureBaseline}>Set baseline (current turn)</button>
        <button type="button" className="sim-eq-toggle" onClick={clearBaseline} disabled={!baseline}>Clear baseline</button>
        <button type="button" className="sim-eq-toggle" onClick={exportRun}>Export run JSON</button>
      </div>

      {comparison && (
        <div className="sim-diagnostics-grid">
          <div>
            <h4>Baseline Comparison</h4>
            {comparison.map(([label, cur, base]) => (
              <div key={label} className="sim-row">
                <span>{label}</span>
                <span>{delta(cur, base)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}


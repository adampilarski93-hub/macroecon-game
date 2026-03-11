import { useState } from 'react';
import { useGameStore } from '../state/gameStore';
import type { SimulationState } from '../types';

interface Props {
  state: SimulationState;
}

function Row({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="control-group">
      <label>
        {label}
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
        <span className="control-value">{value.toFixed(2)}</span>
      </label>
    </div>
  );
}

export function SimulatorModelPanel({ state }: Props) {
  const setParams = useGameStore((s) => s.setSimulatorScenarioParams);
  const [showTheory, setShowTheory] = useState(false);
  const p = state.scenario;

  return (
    <section className="sim-diagnostics">
      <div className="sim-diag-head">
        <h3>Model Assumptions (Full Simulation)</h3>
        <button type="button" className="sim-eq-toggle" onClick={() => setShowTheory((v) => !v)}>
          {showTheory ? 'Hide theory' : 'Show theory'}
        </button>
      </div>

      <Row
        label="Consumption propensity (MPC proxy)"
        value={p.consumptionPropensity}
        min={0.5}
        max={0.95}
        step={0.01}
        onChange={(v) => setParams({ consumptionPropensity: v })}
      />
      <Row
        label="Investment interest elasticity"
        value={p.investmentInterestElasticity}
        min={0.5}
        max={3}
        step={0.05}
        onChange={(v) => setParams({ investmentInterestElasticity: v })}
      />
      <Row
        label="Phillips curve slope"
        value={p.phillipsCurveSlope}
        min={0.05}
        max={0.6}
        step={0.01}
        onChange={(v) => setParams({ phillipsCurveSlope: v })}
      />
      <Row
        label="Trade elasticity"
        value={p.tradeElasticity}
        min={0.5}
        max={2}
        step={0.05}
        onChange={(v) => setParams({ tradeElasticity: v })}
      />
      <Row
        label="Debt sustainability threshold"
        value={p.debtSustainabilityThreshold}
        min={0.3}
        max={1.5}
        step={0.05}
        onChange={(v) => setParams({ debtSustainabilityThreshold: v })}
      />

      {showTheory && (
        <div className="sim-diagnostics-grid">
          <div>
            <h4>Demand Mechanism</h4>
            <p className="sim-eq">
              Keynesian/post-Keynesian: higher consumption propensity raises multiplier effects. Lower values imply stronger leakage to savings.
            </p>
          </div>
          <div>
            <h4>Investment Channel</h4>
            <p className="sim-eq">
              Neoclassical/Keynesian synthesis: higher interest elasticity means policy-rate changes bite harder on investment.
            </p>
          </div>
          <div>
            <h4>Inflation Mechanism</h4>
            <p className="sim-eq">
              Phillips slope controls demand-pull sensitivity. Structuralist view: cost-push can still dominate even with low slope.
            </p>
          </div>
          <div>
            <h4>External Sector</h4>
            <p className="sim-eq">
              Trade elasticity governs import compression from tariffs/exchange shifts. Higher values mean stronger external adjustment.
            </p>
          </div>
          <div>
            <h4>Debt Regime</h4>
            <p className="sim-eq">
              MMT/Post-Keynesian framing: sustainability is contextual. This threshold changes when warnings escalate, not an automatic collapse rule.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}


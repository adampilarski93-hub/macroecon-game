import { useState } from 'react';
import type { SimulatorDiagnostics as SimulatorDiagnosticsType } from '../types';

interface Props {
  diagnostics: SimulatorDiagnosticsType | null;
}

function fmt(v: number) {
  const s = v >= 0 ? '+' : '';
  return `${s}${v.toFixed(2)}`;
}

export function SimulatorDiagnostics({ diagnostics }: Props) {
  const [showEq, setShowEq] = useState(false);
  if (!diagnostics) return null;

  return (
    <section className="sim-diagnostics">
      <div className="sim-diag-head">
        <h3>Model Decomposition (This Turn)</h3>
        <button type="button" className="sim-eq-toggle" onClick={() => setShowEq((v) => !v)}>
          {showEq ? 'Hide equations' : 'Show equations'}
        </button>
      </div>
      <div className="sim-diagnostics-grid">
        <div>
          <h4>Growth Drivers</h4>
          {diagnostics.growth.map((d) => (
            <div key={d.label}>
              <div className="sim-row">
                <span>{d.label}</span>
                <span>{fmt(d.value)}</span>
              </div>
              {showEq && d.equation && <div className="sim-eq">{d.equation}</div>}
            </div>
          ))}
        </div>
        <div>
          <h4>Inflation Drivers</h4>
          {diagnostics.inflation.map((d) => (
            <div key={d.label}>
              <div className="sim-row">
                <span>{d.label}</span>
                <span>{fmt(d.value)}</span>
              </div>
              {showEq && d.equation && <div className="sim-eq">{d.equation}</div>}
            </div>
          ))}
        </div>
        <div>
          <h4>Debt Drivers</h4>
          {diagnostics.debt.map((d) => (
            <div key={d.label}>
              <div className="sim-row">
                <span>{d.label}</span>
                <span>{fmt(d.value)}</span>
              </div>
              {showEq && d.equation && <div className="sim-eq">{d.equation}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


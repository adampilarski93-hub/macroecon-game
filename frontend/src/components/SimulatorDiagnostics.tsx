import type { SimulatorDiagnostics as SimulatorDiagnosticsType } from '../types';

interface Props {
  diagnostics: SimulatorDiagnosticsType | null;
}

function fmt(v: number) {
  const s = v >= 0 ? '+' : '';
  return `${s}${v.toFixed(2)}`;
}

export function SimulatorDiagnostics({ diagnostics }: Props) {
  if (!diagnostics) return null;

  return (
    <section className="sim-diagnostics">
      <h3>Model Decomposition (This Turn)</h3>
      <div className="sim-diagnostics-grid">
        <div>
          <h4>Growth Drivers</h4>
          {diagnostics.growth.map((d) => (
            <div key={d.label} className="sim-row">
              <span>{d.label}</span>
              <span>{fmt(d.value)}</span>
            </div>
          ))}
        </div>
        <div>
          <h4>Inflation Drivers</h4>
          {diagnostics.inflation.map((d) => (
            <div key={d.label} className="sim-row">
              <span>{d.label}</span>
              <span>{fmt(d.value)}</span>
            </div>
          ))}
        </div>
        <div>
          <h4>Debt Drivers</h4>
          {diagnostics.debt.map((d) => (
            <div key={d.label} className="sim-row">
              <span>{d.label}</span>
              <span>{fmt(d.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


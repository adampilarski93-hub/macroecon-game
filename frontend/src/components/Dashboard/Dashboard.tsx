import { useRef, useEffect } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import type { SimulationState } from '../../types';
import {
  IconGDP,
  IconInflation,
  IconUnemployment,
  IconDebt,
  IconTrade,
  IconApproval,
} from '../Icons';

interface DashboardProps {
  state: SimulationState;
  history?: SimulationState[];
}

export function Dashboard({ state, history }: DashboardProps) {
  const c = state.country;
  const prevTurn = useRef(state.turn);
  const justUpdated = state.turn !== prevTurn.current;

  const data = (history ?? [state]).map((s) => ({
    turn: s.turn,
    gdp: s.country.gdp,
    inflation: s.country.inflationRate * 100,
    unemployment: s.country.unemploymentRate * 100,
    debtToGdp: s.country.debtToGdp * 100,
    approval: s.country.approval * 100,
  }));

  useEffect(() => {
    prevTurn.current = state.turn;
  }, [state.turn]);

  const kpis = [
    {
      key: 'gdp',
      label: 'GDP',
      value: c.gdp.toFixed(0),
      delta: `${(c.gdpGrowth * 100).toFixed(2)}%`,
      positive: c.gdpGrowth >= 0,
      icon: IconGDP,
      className: 'kpi-gdp',
    },
    {
      key: 'inflation',
      label: 'Inflation',
      value: `${(c.inflationRate * 100).toFixed(1)}%`,
      icon: IconInflation,
      className: 'kpi-inflation',
      warn: c.inflationRate > 0.08,
    },
    {
      key: 'unemployment',
      label: 'Unemployment',
      value: `${(c.unemploymentRate * 100).toFixed(1)}%`,
      icon: IconUnemployment,
      className: 'kpi-unemployment',
      warn: c.unemploymentRate > 0.08,
    },
    {
      key: 'debt',
      label: 'Debt / GDP',
      value: `${(c.debtToGdp * 100).toFixed(1)}%`,
      icon: IconDebt,
      className: 'kpi-debt',
      warn: c.debtToGdp > 0.6,
    },
    {
      key: 'trade',
      label: 'Current account',
      value: c.currentAccount.toFixed(0),
      icon: IconTrade,
      className: 'kpi-trade',
    },
    {
      key: 'approval',
      label: 'Approval',
      value: `${(c.approval * 100).toFixed(0)}%`,
      icon: IconApproval,
      className: 'kpi-approval',
      approvalPct: c.approval * 100,
      warn: c.approval < 0.3,
    },
  ];

  const chartConfig = [
    { key: 'gdp', label: 'GDP', color: 'var(--color-gdp)' },
    { key: 'inflation', label: 'Inflation %', color: 'var(--color-inflation)' },
    { key: 'debtToGdp', label: 'Debt/GDP %', color: 'var(--color-debt)' },
    { key: 'approval', label: 'Approval %', color: 'var(--color-approval)' },
  ];

  return (
    <div className="dashboard">
      <h2>Economic dashboard</h2>
      <div className="kpi-grid">
        {kpis.map((item) => (
          <div key={item.key} className={`kpi ${item.className}${item.warn ? ' kpi-warn' : ''}`}>
            <div className="kpi-icon" aria-hidden>
              <item.icon />
            </div>
            <span className="label">{item.label}</span>
            <span className={`value ${justUpdated ? 'updated' : ''}`}>
              {item.value}
            </span>
            {item.delta != null && (
              <span className={`delta ${item.positive ? 'pos' : 'neg'}`}>
                {item.delta}
              </span>
            )}
            {item.approvalPct != null && (
              <div className="approval-bar">
                <div
                  className="approval-fill"
                  style={{ width: `${item.approvalPct}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Separate mini-charts so each metric has its own Y-axis */}
      {data.length > 1 && (
        <div className="charts-grid">
          {chartConfig.map((cfg) => (
            <div className="mini-chart" key={cfg.key}>
              <span className="mini-chart-label" style={{ color: cfg.color }}>
                {cfg.label}
              </span>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart
                  data={data}
                  margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
                >
                  <defs>
                    <linearGradient id={`grad-${cfg.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={cfg.color} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={cfg.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="turn" hide />
                  <YAxis
                    width={40}
                    stroke="var(--text-muted)"
                    fontSize={10}
                    tickFormatter={(v: number) =>
                      cfg.key === 'gdp' ? v.toFixed(0) : `${v.toFixed(0)}%`
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                    }}
                    formatter={(v: number) => [
                      cfg.key === 'gdp' ? v.toFixed(0) : `${v.toFixed(1)}%`,
                      cfg.label,
                    ]}
                    labelFormatter={(t) => `Turn ${t}`}
                  />
                  <Area
                    type="monotone"
                    dataKey={cfg.key}
                    stroke={cfg.color}
                    fill={`url(#grad-${cfg.key})`}
                    strokeWidth={2}
                    isAnimationActive
                    animationDuration={500}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

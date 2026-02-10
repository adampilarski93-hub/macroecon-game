import { useRef, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
    },
    {
      key: 'unemployment',
      label: 'Unemployment',
      value: `${(c.unemploymentRate * 100).toFixed(1)}%`,
      icon: IconUnemployment,
      className: 'kpi-unemployment',
    },
    {
      key: 'debt',
      label: 'Debt / GDP',
      value: `${(c.debtToGdp * 100).toFixed(1)}%`,
      icon: IconDebt,
      className: 'kpi-debt',
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
    },
  ];

  return (
    <div className="dashboard">
      <h2>Economic dashboard</h2>
      <div className="kpi-grid">
        {kpis.map((item) => (
          <div key={item.key} className={`kpi ${item.className}`}>
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
      {data.length > 0 && (
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
            >
              <defs>
                <linearGradient id="gdpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-gdp)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-gdp)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="inflationGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-inflation)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-inflation)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="debtGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-debt)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-debt)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="turn" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={(v) => v.toFixed(0)} />
              <Tooltip
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                }}
                formatter={(v: number) => [v.toFixed(2), '']}
                labelFormatter={(t) => `Turn ${t}`}
              />
              <Area
                type="monotone"
                dataKey="gdp"
                stroke="var(--color-gdp)"
                fill="url(#gdpGrad)"
                strokeWidth={2}
                name="GDP"
                isAnimationActive
                animationDuration={600}
                animationEasing="ease-out"
              />
              <Line
                type="monotone"
                dataKey="inflation"
                stroke="var(--color-inflation)"
                strokeWidth={2}
                name="Inflation %"
                dot={false}
                isAnimationActive
                animationDuration={600}
                animationEasing="ease-out"
              />
              <Line
                type="monotone"
                dataKey="debtToGdp"
                stroke="var(--color-debt)"
                strokeWidth={2}
                name="Debt/GDP %"
                dot={false}
                isAnimationActive
                animationDuration={600}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

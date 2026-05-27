import { useRef, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import type { SimulationState, GameHistoryEntry } from '../../types';
import {
  IconGDP,
  IconInflation,
  IconUnemployment,
  IconDebt,
  IconTrade,
  IconApproval,
  IconHealth,
} from '../Icons';

interface DashboardProps {
  state: SimulationState;
  history?: GameHistoryEntry[];
}

type HealthStatus = 'good' | 'warning' | 'danger';

function getHealthStatus(metric: string, value: number): HealthStatus {
  switch (metric) {
    case 'inflation':
      if (value > 10) return 'danger';
      if (value > 5) return 'warning';
      return 'good';
    case 'unemployment':
      if (value > 10) return 'danger';
      if (value > 6) return 'warning';
      return 'good';
    case 'debt':
      if (value > 90) return 'danger';
      if (value > 60) return 'warning';
      return 'good';
    case 'approval':
      if (value < 30) return 'danger';
      if (value < 50) return 'warning';
      return 'good';
    case 'trade':
      if (value < -50) return 'danger';
      if (value < -10) return 'warning';
      return 'good';
    default:
      return 'good';
  }
}

function getHealthColor(status: HealthStatus): string {
  switch (status) {
    case 'good':
      return '#22c55e';
    case 'warning':
      return '#f59e0b';
    case 'danger':
      return '#ef4444';
    default:
      return '#94a3b8';
  }
}

function getHealthLabel(status: HealthStatus): string {
  switch (status) {
    case 'good':
      return 'Stable';
    case 'warning':
      return 'Caution';
    case 'danger':
      return 'Critical';
    default:
      return '';
  }
}

export function Dashboard({ state, history }: DashboardProps) {
  const c = state.country;
  const prevTurn = useRef(state.turn);
  const justUpdated = state.turn !== prevTurn.current;

  // Map history entries to chart data (handle both GameHistoryEntry and current state)
  const chartData = history && history.length > 0
    ? history.map((entry) => ({
        turn: entry.state.turn,
        gdp: entry.state.country.gdp,
        inflation: entry.state.country.inflationRate * 100,
        unemployment: entry.state.country.unemploymentRate * 100,
        debtToGdp: entry.state.country.debtToGdp * 100,
        approval: entry.state.country.approval * 100,
        wageShare: (entry.state.country.wageShare ?? 0.5) * 100,
        fragility: (entry.state.country.financialFragility ?? 0.1) * 100,
        publicInvestmentShare: (entry.state.country.publicInvestmentShare ?? 0.15) * 100,
        investmentQuality: (entry.state.country.investmentQuality ?? 0.7) * 100,
        stateCapacity: (entry.state.country.stateCapacity ?? 0.5) * 100,
      }))
    : [{
        turn: state.turn,
        gdp: state.country.gdp,
        inflation: state.country.inflationRate * 100,
        unemployment: state.country.unemploymentRate * 100,
        debtToGdp: state.country.debtToGdp * 100,
        approval: state.country.approval * 100,
        wageShare: (state.country.wageShare ?? 0.5) * 100,
        fragility: (state.country.financialFragility ?? 0.1) * 100,
        publicInvestmentShare: (state.country.publicInvestmentShare ?? 0.15) * 100,
        investmentQuality: (state.country.investmentQuality ?? 0.7) * 100,
        stateCapacity: (state.country.stateCapacity ?? 0.5) * 100,
      }];

  useEffect(() => {
    prevTurn.current = state.turn;
  }, [state.turn]);

  // Calculate overall economic health score
  const healthMetrics = [
    { metric: 'inflation', value: c.inflationRate * 100, weight: 1 },
    { metric: 'unemployment', value: c.unemploymentRate * 100, weight: 1 },
    { metric: 'debt', value: c.debtToGdp * 100, weight: 1 },
    { metric: 'approval', value: c.approval * 100, weight: 1 },
  ];

  const dangerCount = healthMetrics.filter(
    (m) => getHealthStatus(m.metric, m.value) === 'danger'
  ).length;
  const warningCount = healthMetrics.filter(
    (m) => getHealthStatus(m.metric, m.value) === 'warning'
  ).length;

  let overallHealth: HealthStatus = 'good';
  if (dangerCount >= 2) overallHealth = 'danger';
  else if (dangerCount >= 1 || warningCount >= 2) overallHealth = 'warning';

  // Define KPI type with proper health typing
interface KpiItem {
  key: string;
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  icon: () => JSX.Element;
  className: string;
  health: HealthStatus;
  progressValue: number;
  rawValue?: number;
  warn?: boolean;
  approvalPct?: number;
}

const kpis: KpiItem[] = [
    {
      key: 'gdp',
      label: 'GDP',
      value: c.gdp.toFixed(0),
      delta: `${(c.gdpGrowth * 100).toFixed(2)}%`,
      positive: c.gdpGrowth >= 0,
      icon: IconGDP,
      className: 'kpi-gdp',
      health: (c.gdpGrowth >= 0 ? 'good' : 'warning') as HealthStatus,
      progressValue: Math.min(100, Math.max(0, 50 + c.gdpGrowth * 200)),
    },
    {
      key: 'inflation',
      label: 'Inflation',
      value: `${(c.inflationRate * 100).toFixed(1)}%`,
      rawValue: c.inflationRate * 100,
      icon: IconInflation,
      className: 'kpi-inflation',
      health: getHealthStatus('inflation', c.inflationRate * 100),
      progressValue: Math.min(100, (c.inflationRate * 100) * 5),
      warn: c.inflationRate > 0.08,
    },
    {
      key: 'unemployment',
      label: 'Unemployment',
      value: `${(c.unemploymentRate * 100).toFixed(1)}%`,
      rawValue: c.unemploymentRate * 100,
      icon: IconUnemployment,
      className: 'kpi-unemployment',
      health: getHealthStatus('unemployment', c.unemploymentRate * 100),
      progressValue: (c.unemploymentRate * 100) * 5,
      warn: c.unemploymentRate > 0.08,
    },
    {
      key: 'debt',
      label: 'Debt / GDP',
      value: `${(c.debtToGdp * 100).toFixed(1)}%`,
      rawValue: c.debtToGdp * 100,
      icon: IconDebt,
      className: 'kpi-debt',
      health: getHealthStatus('debt', c.debtToGdp * 100),
      progressValue: c.debtToGdp * 100,
      warn: c.debtToGdp > 0.6,
    },
    {
      key: 'trade',
      label: 'Current account',
      value: c.currentAccount.toFixed(0),
      rawValue: c.currentAccount,
      icon: IconTrade,
      className: 'kpi-trade',
      health: getHealthStatus('trade', c.currentAccount),
      progressValue: Math.min(100, Math.max(0, 50 + c.currentAccount / 2)),
    },
    {
      key: 'approval',
      label: 'Approval',
      value: `${(c.approval * 100).toFixed(0)}%`,
      rawValue: c.approval * 100,
      icon: IconApproval,
      className: 'kpi-approval',
      health: getHealthStatus('approval', c.approval * 100),
      approvalPct: c.approval * 100,
      progressValue: c.approval * 100,
      warn: c.approval < 0.3,
    },
  ];

  const wageShare = c.wageShare ?? 0.5;
  const termsOfTrade = c.termsOfTrade ?? 1.0;
  const fragility = c.financialFragility ?? 0.1;
  const profitRate = c.profitRate ?? 0.1;
  const workerSup = c.workerSupport ?? c.approval;
  const eliteSup = c.eliteSupport ?? c.approval;

  const chartConfig = [
    { key: 'gdp', label: 'GDP', color: 'var(--color-gdp)' },
    { key: 'inflation', label: 'Inflation %', color: 'var(--color-inflation)' },
    { key: 'debtToGdp', label: 'Debt/GDP %', color: 'var(--color-debt)' },
    { key: 'approval', label: 'Approval %', color: 'var(--color-approval)' },
    { key: 'wageShare', label: 'Wage share %', color: '#3b82f6' },
    { key: 'fragility', label: 'Fragility %', color: '#f97316' },
  ];

  return (
    <div className="dashboard">
      <h2>
        Economic dashboard
        <span className="dashboard-health-badge" style={{ color: getHealthColor(overallHealth) }}>
          <IconHealth />
          {getHealthLabel(overallHealth)}
        </span>
      </h2>
      
      {/* Overall Health Summary */}
      <div className="health-summary-bar">
        <div className="health-summary-item">
          <span className="health-dot" style={{ background: getHealthColor(overallHealth) }} />
          <span className="health-text">Overall Status: <strong>{getHealthLabel(overallHealth)}</strong></span>
        </div>
        <div className="health-breakdown">
          {healthMetrics.map((m) => {
            const status = getHealthStatus(m.metric, m.value);
            return (
              <span key={m.metric} className="health-mini-indicator" title={`${m.metric}: ${m.value.toFixed(1)}%`}>
                <span className="health-dot-sm" style={{ background: getHealthColor(status) }} />
              </span>
            );
          })}
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((item) => {
          const healthColor = getHealthColor(item.health);
          return (
            <div key={item.key} className={`kpi ${item.className} kpi-health-${item.health}${item.warn ? ' kpi-warn' : ''}`}>
              <div className="kpi-icon" aria-hidden style={{ color: healthColor }}>
                <item.icon />
              </div>
              <div className="kpi-header">
                <span className="label">{item.label}</span>
                <span className="health-badge" style={{ color: healthColor }}>
                  {getHealthLabel(item.health)}
                </span>
              </div>
              <span className={`value ${justUpdated ? 'updated' : ''}`}>
                {item.value}
              </span>
              {item.delta != null && (
                <span className={`delta ${item.positive ? 'pos' : 'neg'}`}>
                  {item.delta}
                </span>
              )}
              {/* Progress bar for visual indicator */}
              {item.approvalPct == null && (
                <div className="kpi-progress-bar">
                  <div
                    className="kpi-progress-fill"
                    style={{ 
                      width: `${item.progressValue}%`,
                      background: healthColor,
                    }}
                  />
                </div>
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
          );
        })}
      </div>

      {/* Secondary KPIs: distribution, fragility, class dynamics, capital composition */}
      <div className="kpi-secondary-grid">
        <div className="kpi-secondary">
          <span className="kpi-secondary-label">Wage share</span>
          <span className="kpi-secondary-value">{(wageShare * 100).toFixed(0)}%</span>
          <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{ width: `${wageShare * 100}%`, background: wageShare > 0.5 ? '#22c55e' : wageShare > 0.35 ? '#f59e0b' : '#ef4444' }} /></div>
          <span className="kpi-secondary-hint">Labor's share of GDP (Piketty/Kalecki)</span>
        </div>
        <div className="kpi-secondary">
          <span className="kpi-secondary-label">Terms of trade</span>
          <span className="kpi-secondary-value">{termsOfTrade.toFixed(2)}</span>
          <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{ width: `${Math.min(100, termsOfTrade * 100)}%`, background: termsOfTrade >= 0.95 ? '#22c55e' : termsOfTrade >= 0.8 ? '#f59e0b' : '#ef4444' }} /></div>
          <span className="kpi-secondary-hint">Export/import price ratio (Prebisch-Singer)</span>
        </div>
        <div className="kpi-secondary">
          <span className="kpi-secondary-label">Financial fragility</span>
          <span className="kpi-secondary-value">{(fragility * 100).toFixed(0)}%</span>
          <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{ width: `${fragility * 100}%`, background: fragility < 0.3 ? '#22c55e' : fragility < 0.6 ? '#f59e0b' : '#ef4444' }} /></div>
          <span className="kpi-secondary-hint">{fragility > 0.6 ? 'Crisis risk! Regulate finance.' : 'Minsky cycle indicator'}</span>
        </div>
        <div className="kpi-secondary">
          <span className="kpi-secondary-label">Profit rate</span>
          <span className="kpi-secondary-value">{(profitRate * 100).toFixed(1)}%</span>
          <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{ width: `${Math.min(100, profitRate * 200)}%`, background: 'var(--accent)' }} /></div>
          <span className="kpi-secondary-hint">Return on capital (Marxian)</span>
        </div>
        <div className="kpi-secondary kpi-class-support">
          <span className="kpi-secondary-label">Class support</span>
          <div className="class-support-bars">
            <div className="class-bar">
              <span className="class-bar-label">Workers</span>
              <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{ width: `${workerSup * 100}%`, background: '#3b82f6' }} /></div>
              <span className="class-bar-value">{(workerSup * 100).toFixed(0)}%</span>
            </div>
            <div className="class-bar">
              <span className="class-bar-label">Elites</span>
              <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{ width: `${eliteSup * 100}%`, background: '#a855f7' }} /></div>
              <span className="class-bar-value">{(eliteSup * 100).toFixed(0)}%</span>
            </div>
          </div>
          <span className="kpi-secondary-hint">Who supports you? (Kalecki class dynamics)</span>
        </div>
        {/* Capital Composition KPIs - New */}
        <div className="kpi-secondary">
          <span className="kpi-secondary-label">Public investment share</span>
          <span className="kpi-secondary-value">{((c.publicInvestmentShare ?? 0.15) * 100).toFixed(0)}%</span>
          <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{ width: `${(c.publicInvestmentShare ?? 0.15) * 100}%`, background: (c.publicInvestmentShare ?? 0.15) > 0.3 ? '#06b6d4' : (c.publicInvestmentShare ?? 0.15) > 0.15 ? '#f59e0b' : '#94a3b8' }} /></div>
          <span className="kpi-secondary-hint">State vs private capital formation (Mazzucato)</span>
        </div>
        <div className="kpi-secondary">
          <span className="kpi-secondary-label">Investment quality</span>
          <span className="kpi-secondary-value">{((c.investmentQuality ?? 0.7) * 100).toFixed(0)}%</span>
          <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{ width: `${(c.investmentQuality ?? 0.7) * 100}%`, background: (c.investmentQuality ?? 0.7) > 0.8 ? '#22c55e' : (c.investmentQuality ?? 0.7) > 0.6 ? '#f59e0b' : '#ef4444' }} /></div>
          <span className="kpi-secondary-hint">Productive vs speculative (Minsky)</span>
        </div>
        <div className="kpi-secondary">
          <span className="kpi-secondary-label">State capacity</span>
          <span className="kpi-secondary-value">{((c.stateCapacity ?? 0.5) * 100).toFixed(0)}%</span>
          <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{ width: `${(c.stateCapacity ?? 0.5) * 100}%`, background: (c.stateCapacity ?? 0.5) > 0.7 ? '#22c55e' : (c.stateCapacity ?? 0.5) > 0.5 ? '#f59e0b' : '#ef4444' }} /></div>
          <span className="kpi-secondary-hint">Bureaucratic effectiveness (Evans)</span>
        </div>
      </div>

      {/* Separate mini-charts so each metric has its own Y-axis */}
      {chartData.length > 1 && (
        <div className="charts-grid">
          {chartConfig.map((cfg) => (
            <div className="mini-chart" key={cfg.key}>
              <span className="mini-chart-label" style={{ color: cfg.color }}>
                {cfg.label}
              </span>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart
                  data={chartData}
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

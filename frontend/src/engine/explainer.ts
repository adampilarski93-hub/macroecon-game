/**
 * Template-based causal explanation generator.
 * Compares previous and current state to explain what happened and why,
 * without requiring an LLM API key.
 */

import type { SimulationState, PolicyActions } from './state';

interface Explanation {
  headline: string;
  details: string[];
}

function pct(v: number): string {
  return `${(v * 100).toFixed(1)}%`;
}

function abs(v: number): string {
  return v.toFixed(0);
}

function delta(prev: number, curr: number): string {
  const d = curr - prev;
  const sign = d >= 0 ? '+' : '';
  return `${sign}${(d * 100).toFixed(1)}pp`;
}

export function generateCausalExplanation(
  prev: SimulationState,
  curr: SimulationState,
  actions: PolicyActions,
): Explanation {
  const pc = prev.country;
  const cc = curr.country;
  const details: string[] = [];

  // GDP change
  const gdpChange = cc.gdp - pc.gdp;
  if (Math.abs(gdpChange) > 1) {
    if (gdpChange > 0) {
      details.push(`GDP rose from ${abs(pc.gdp)} to ${abs(cc.gdp)} (${pct(cc.gdpGrowth)} growth).`);
    } else {
      details.push(`GDP fell from ${abs(pc.gdp)} to ${abs(cc.gdp)} (${pct(cc.gdpGrowth)} contraction).`);
    }
  }

  // Explain GDP drivers
  const taxRate = actions.incomeTaxRate ?? 0.2;
  const prevTaxRate = pc.taxRevenue / Math.max(1, pc.gdp);
  if (taxRate > prevTaxRate + 0.02) {
    details.push(`You raised taxes. Higher taxes reduce disposable income, lowering consumption — but increase government revenue.`);
  } else if (taxRate < prevTaxRate - 0.02) {
    details.push(`You cut taxes. Lower taxes boost disposable income and consumption — but reduce government revenue.`);
  }

  const spendingShare = actions.spendingShareOfGdp ?? 0.25;
  const prevSpendingShare = pc.expenditure / Math.max(1, pc.gdp);
  if (spendingShare > prevSpendingShare + 0.02) {
    details.push(`Government spending increased. In the short run with idle capacity (recession), this has a multiplier effect: each unit of G generates more than one unit of GDP. The multiplier is state-dependent: larger when unemployment is high (crowding in), smaller at full employment (crowding out).`);
  } else if (spendingShare < prevSpendingShare - 0.02) {
    details.push(`Government spending decreased. This is contractionary fiscal policy. The impact depends on economic conditions: in a slump, cuts deepen recession; at full employment, cuts may reduce inflationary pressure.`);
  }

  // Inflation explanation
  const inflDelta = cc.inflationRate - pc.inflationRate;
  if (Math.abs(inflDelta) > 0.005) {
    if (inflDelta > 0) {
      const reasons: string[] = [];
      if (cc.gdpGrowth > 0.03) reasons.push('strong demand (Phillips Curve effect—though Friedman/Phelps showed this tradeoff breaks down once expectations adjust)');
      if (curr.global.commodityPriceIndex > prev.global.commodityPriceIndex) reasons.push('rising commodity prices (cost-push inflation)');
      if (cc.exchangeRate > pc.exchangeRate * 1.02) reasons.push('currency depreciation making imports costlier (pass-through inflation)');
      details.push(`Inflation rose from ${pct(pc.inflationRate)} to ${pct(cc.inflationRate)}${reasons.length ? ` driven by ${reasons.join(', ')}` : ''}.`);
    } else {
      details.push(`Inflation fell from ${pct(pc.inflationRate)} to ${pct(cc.inflationRate)}.`);
      if ((actions.priceControlStrength ?? 0) > 0.3) details.push(`Price controls helped contain inflation by limiting price increases in administered sectors.`);
      if ((actions.incomesPolicyStrength ?? 0) > 0.3) details.push(`Incomes policy coordinated wage-price restraint, addressing inflation as distributional conflict rather than pure excess demand.`);
    }
  }

  // Unemployment
  const unempDelta = cc.unemploymentRate - pc.unemploymentRate;
  if (Math.abs(unempDelta) > 0.005) {
    if (unempDelta > 0) {
      details.push(`Unemployment rose from ${pct(pc.unemploymentRate)} to ${pct(cc.unemploymentRate)}. ${cc.gdpGrowth < 0 ? 'The economy is contracting, so firms are laying off workers (Okun\'s law).' : 'Growth is too slow to absorb new workers.'}`);
    } else {
      details.push(`Unemployment fell from ${pct(pc.unemploymentRate)} to ${pct(cc.unemploymentRate)}. Growth is creating jobs.`);
    }
  }

  // Debt
  const debtDelta = cc.debtToGdp - pc.debtToGdp;
  if (Math.abs(debtDelta) > 0.01) {
    if (debtDelta > 0) {
      if (cc.gdpGrowth < 0) {
        details.push(`Debt-to-GDP rose (${delta(pc.debtToGdp, cc.debtToGdp)}). The denominator (GDP) is shrinking — even if you cut spending, the ratio can worsen. This is the "austerity trap."`)
      } else {
        details.push(`Debt-to-GDP rose (${delta(pc.debtToGdp, cc.debtToGdp)}) because the deficit exceeds what growth can offset.`);
      }
    } else {
      details.push(`Debt-to-GDP improved (${delta(pc.debtToGdp, cc.debtToGdp)}). ${cc.gdpGrowth > 0.02 ? 'Growth is shrinking the ratio — you\'re growing your way out of debt.' : 'Fiscal consolidation is working.'}`);
    }
  }

  // Trade
  const tradeDelta = cc.currentAccount - pc.currentAccount;
  if (Math.abs(tradeDelta) > 5) {
    if (tradeDelta > 0) {
      details.push(`Trade balance improved by ${tradeDelta.toFixed(0)}. ${(actions.tariffRate ?? 0) > 0.15 ? 'Tariffs reduced imports.' : 'Exports grew.'}`);
    } else {
      details.push(`Trade deficit widened by ${Math.abs(tradeDelta).toFixed(0)}. ${curr.global.commodityPriceIndex > 1.1 ? 'High commodity prices increased import costs.' : 'Import demand outpaced exports.'}`);
    }
  }

  // Wage share
  const wsDelta = (cc.wageShare ?? 0.5) - (pc.wageShare ?? 0.5);
  if (Math.abs(wsDelta) > 0.01) {
    if (wsDelta > 0) {
      details.push(`Workers\' share of GDP rose. Social spending, incomes policy, and planning shifted income toward labor.`);
    } else {
      details.push(`Workers\' share of GDP fell. Growth is disproportionately benefiting capital. Consider social spending, incomes policy, or higher taxes on capital.`);
    }
  }

  // Financial fragility
  const fragDelta = (cc.financialFragility ?? 0.1) - (pc.financialFragility ?? 0.1);
  if (fragDelta > 0.05) {
    details.push(`Financial fragility is rising. Weak regulation during growth lets risk build up (Minsky cycle). Consider strengthening financial regulation.`);
  } else if (fragDelta < -0.05) {
    details.push(`Financial fragility is declining. Regulation is working to stabilize the financial system.`);
  }

  // Approval breakdown
  const approvalDelta = cc.approval - pc.approval;
  if (Math.abs(approvalDelta) > 0.03) {
    const workerDelta = (cc.workerSupport ?? 0.5) - (pc.workerSupport ?? 0.5);
    const eliteDelta = (cc.eliteSupport ?? 0.5) - (pc.eliteSupport ?? 0.5);
    if (approvalDelta > 0) {
      details.push(`Approval rose. ${workerDelta > eliteDelta ? 'Workers responded positively to your policies.' : 'Elites are satisfied with growth and stability.'}`);
    } else {
      details.push(`Approval fell. ${workerDelta < eliteDelta ? 'Workers are hurting from inflation, unemployment, or low wages.' : 'Elites are unhappy with taxes, regulation, or planning.'}`);
    }
  }

  // Headline
  let headline: string;
  if (cc.gdpGrowth > 0.03 && cc.inflationRate < 0.05) {
    headline = 'Strong growth with stable prices — the economy is performing well.';
  } else if (cc.gdpGrowth < -0.01) {
    headline = `The economy is contracting. ${cc.inflationRate > 0.06 ? 'Combined with inflation, this is stagflation.' : 'Demand is too weak.'}`;
  } else if (cc.inflationRate > 0.10) {
    headline = 'Inflation is dangerously high. Prices are eroding living standards.';
  } else if (cc.unemploymentRate > 0.10) {
    headline = 'Mass unemployment is the most pressing problem.';
  } else if (cc.debtToGdp > 0.8) {
    headline = 'Debt is elevated. Whether this is sustainable depends on growth and interest rates.';
  } else if (cc.approval < 0.25) {
    headline = 'Public support is critically low. Your government may fall.';
  } else {
    headline = 'The economy is in a mixed state. Watch the trade-offs between your policy goals.';
  }

  return { headline, details };
}

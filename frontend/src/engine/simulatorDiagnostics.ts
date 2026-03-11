import type { PolicyActions, SimulationState } from './state';
import { equilibriumY } from './equations/demand';
import { exchangeRateChange } from './equations/external';
import { nextInflation } from './equations/inflation';
import { expenditure, nextDebt, publicBankingRevenue, taxRevenue } from './equations/government';
import type { SimulatorDiagnostics } from '../types';

function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}

export function computeSimulatorDiagnostics(
  state: SimulationState,
  actions: PolicyActions,
): SimulatorDiagnostics {
  const c = state.country;
  const g = state.global;
  const s = state.scenario;
  const previousGdp = state.previousGdp ?? c.gdp;

  const taxRate = clamp(actions.incomeTaxRate ?? (c.gdp ? c.taxRevenue / c.gdp : 0.2), s.minTaxRate, s.maxTaxRate);
  const spendShare = clamp(actions.spendingShareOfGdp ?? (c.gdp ? c.expenditure / c.gdp : 0.25), s.minSpendingShare, s.maxSpendingShare);
  const tariffRate = actions.tariffRate ?? 0.1;
  const policyRate = actions.policyRate ?? c.policyRate;
  const control = clamp(actions.priceControlStrength ?? 0, 0, 1);
  const incomes = clamp(actions.incomesPolicyStrength ?? 0, 0, 1);
  const basicGoods = clamp(actions.basicGoodsGuarantee ?? 0, 0, 1);
  const profitWindfall = clamp(actions.profitWindfallTaxRate ?? 0, 0, 0.2);
  const planning = clamp(actions.planningIntensity ?? 0, 0, 1);
  const pubBank = clamp(actions.publicBankingStrength ?? 0, 0, 1);
  const debtRestructure = clamp(actions.debtRestructuringStance ?? 0, 0, 1);
  const capControl = clamp(actions.capitalControlStrength ?? 0, 0, 1);
  const regime = actions.exchangeRateRegime ?? 'managed';

  const yParts = equilibriumY(
    { ...c, policyRate },
    g,
    s,
    {
      ...actions,
      incomeTaxRate: taxRate,
      spendingShareOfGdp: spendShare,
      tariffRate,
      planningIntensity: planning,
      publicBankingStrength: pubBank,
    },
    previousGdp,
  );
  const y = Math.max(0, yParts.y);
  const nx = yParts.x - yParts.m;
  const currentAccount = nx;
  const erChange = exchangeRateChange(currentAccount, y, regime, capControl, c.fxReserves);

  const inflation = nextInflation(
    { ...c, policyRate, inflationExpectations: c.inflationExpectations },
    g,
    s,
    erChange,
    control,
    incomes,
    basicGoods,
  );

  const rev = taxRevenue(y, yParts.m, taxRate, tariffRate, profitWindfall, planning) + publicBankingRevenue(y, pubBank);
  const exp = expenditure(y, spendShare);
  const deficit = exp - rev;
  const riskPremium = g.riskPremium;
  const newDebt = nextDebt(c.publicDebt, deficit, policyRate, riskPremium, debtRestructure);
  const interestPayment = Math.max(0, newDebt - c.publicDebt - deficit);

  return {
    growth: [
      { label: 'Consumption C', value: y !== 0 ? yParts.c / y : 0, equation: 'C/Y' },
      { label: 'Investment I', value: y !== 0 ? yParts.i / y : 0, equation: 'I/Y' },
      { label: 'Government G', value: y !== 0 ? yParts.g / y : 0, equation: 'G/Y' },
      { label: 'Net Exports NX', value: y !== 0 ? nx / y : 0, equation: '(X-M)/Y' },
      { label: 'GDP growth', value: previousGdp > 0 ? (y - previousGdp) / previousGdp : 0, equation: '(Y_t - Y_{t-1})/Y_{t-1}' },
    ],
    inflation: [
      { label: 'Inflation outcome', value: inflation, equation: 'pi_t = f(pi_e, demand, import-push) * dampeners' },
      { label: 'Expectations pi_e', value: c.inflationExpectations, equation: '0.6 * pi_e (base weight)' },
      { label: 'ER pass-through proxy', value: Math.max(0, erChange), equation: 'max(0, dER)' },
      { label: 'Incomes policy', value: -0.4 * incomes, equation: 'multiplier: (1 - 0.4 * incomes)' },
      { label: 'Price controls', value: -control, equation: 'control dampening (nonlinear)' },
    ],
    debt: [
      { label: 'Revenue', value: y !== 0 ? rev / y : 0, equation: 'T/Y' },
      { label: 'Expenditure', value: y !== 0 ? exp / y : 0, equation: 'G/Y fiscal' },
      { label: 'Deficit', value: y !== 0 ? deficit / y : 0, equation: '(G - T)/Y' },
      { label: 'Interest payment', value: y !== 0 ? interestPayment / y : 0, equation: 'Debt_{t-1} * (r + rp) adjusted' },
      { label: 'Debt ratio', value: y !== 0 ? newDebt / y : 0, equation: 'Debt_t / Y_t' },
    ],
  };
}


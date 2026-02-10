import { useState, useEffect, useCallback } from 'react';
import type { SimulationState, PolicyActions } from '../../types';
import { IconPolicy } from '../Icons';

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

/** Hover over the ? to see what this policy is and how it can affect the economy. */
function PolicyHelp({ text }: { text: string }) {
  return (
    <span className="policy-help-wrap">
      <span className="policy-help" aria-label="What is this and how does it affect the economy?">?</span>
      <span className="policy-help-content" role="tooltip">{text}</span>
    </span>
  );
}

interface PolicyControlsProps {
  state: SimulationState;
  onStep: (actions: PolicyActions) => Promise<void>;
  loading: boolean;
  mode?: 'easy' | 'advanced';
}

export function PolicyControls({ state, onStep, loading, mode = 'advanced' }: PolicyControlsProps) {
  const s = state.scenario;
  const c = state.country;
  const [incomeTaxRate, setIncomeTaxRate] = useState(c.gdp ? c.taxRevenue / c.gdp : 0.2);
  const [tariffRate, setTariffRate] = useState(0.1);
  const [spendingShareOfGdp, setSpendingShareOfGdp] = useState(c.gdp ? c.expenditure / c.gdp : 0.25);
  const [policyRate, setPolicyRate] = useState(c.policyRate);
  const [exchangeRateRegime, setExchangeRateRegime] = useState<'float' | 'peg' | 'managed'>('managed');
  const [socialSpendingShare, setSocialSpendingShare] = useState(0.35);
  const [profitWindfallTaxRate, setProfitWindfallTaxRate] = useState(0);
  const [priceControlStrength, setPriceControlStrength] = useState(0);
  const [capitalControlStrength, setCapitalControlStrength] = useState(0);
  const [incomesPolicyStrength, setIncomesPolicyStrength] = useState(0);
  const [financialRegulationStrength, setFinancialRegulationStrength] = useState(0);
  const [domesticDebtShare, setDomesticDebtShare] = useState(0.5);
  const [basicGoodsGuarantee, setBasicGoodsGuarantee] = useState(0);
  const [planningIntensity, setPlanningIntensity] = useState(0);
  const [publicBankingStrength, setPublicBankingStrength] = useState(0);
  const [debtRestructuringStance, setDebtRestructuringStance] = useState(0);
  const [multiYearAgendaStrength, setMultiYearAgendaStrength] = useState(0);

  // Quick-set sliders (Easy mode): when moved, update the batch of levers they control
  const [quickStateRole, setQuickStateRole] = useState(0.5);
  const [quickRegulation, setQuickRegulation] = useState(0.5);
  const [quickCbStance, setQuickCbStance] = useState(0.5);
  const [quickTrade, setQuickTrade] = useState(0.5);

  useEffect(() => {
    if (!c.gdp) return;
    setIncomeTaxRate(c.taxRevenue / c.gdp);
    setSpendingShareOfGdp(c.expenditure / c.gdp);
    setPolicyRate(c.policyRate);
  }, [state.turn, c.gdp, c.taxRevenue, c.expenditure, c.policyRate]);

  const applyQuickStateRole = useCallback((t: number) => {
    setIncomeTaxRate(lerp(s.minTaxRate, s.maxTaxRate, t));
    setSpendingShareOfGdp(lerp(s.minSpendingShare, s.maxSpendingShare, t));
    setSocialSpendingShare(lerp(0.2, 0.6, t));
    setProfitWindfallTaxRate(lerp(0, 0.18, t));
    setPriceControlStrength(t > 0.5 ? Math.min(1, (t - 0.5) * 2 * 0.7) : 0);
    setBasicGoodsGuarantee(lerp(0, 0.7, t));
    setPlanningIntensity(lerp(0, 0.6, t));
    setPublicBankingStrength(lerp(0, 0.6, t));
    setMultiYearAgendaStrength(lerp(0, 0.5, t));
  }, [s.minTaxRate, s.maxTaxRate, s.minSpendingShare, s.maxSpendingShare]);

  const applyQuickRegulation = useCallback((t: number) => {
    setIncomesPolicyStrength(t);
    setFinancialRegulationStrength(t);
  }, []);

  const applyQuickCbStance = useCallback((t: number) => {
    const base = (s.minPolicyRate + s.maxPolicyRate) / 2;
    const range = (s.maxPolicyRate - s.minPolicyRate) / 2;
    setPolicyRate(base + range * (t - 0.5));
  }, [s.minPolicyRate, s.maxPolicyRate]);

  const applyQuickTrade = useCallback((t: number) => {
    setTariffRate(lerp(0.25, 0, t));
    setExchangeRateRegime(t > 0.7 ? 'float' : t < 0.3 ? 'peg' : 'managed');
    setCapitalControlStrength(lerp(0, 0.8, 1 - t));
    setDomesticDebtShare(lerp(0.3, 0.85, 1 - t * 0.5));
  }, []);

  const handleQuickStateRole = (v: number) => {
    setQuickStateRole(v);
    applyQuickStateRole(v);
  };
  const handleQuickRegulation = (v: number) => {
    setQuickRegulation(v);
    applyQuickRegulation(v);
  };
  const handleQuickCbStance = (v: number) => {
    setQuickCbStance(v);
    applyQuickCbStance(v);
  };
  const handleQuickTrade = (v: number) => {
    setQuickTrade(v);
    applyQuickTrade(v);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStep({
      incomeTaxRate,
      tariffRate,
      spendingShareOfGdp,
      policyRate,
      exchangeRateRegime,
      socialSpendingShare,
      profitWindfallTaxRate,
      priceControlStrength,
      capitalControlStrength,
      incomesPolicyStrength,
      financialRegulationStrength,
      domesticDebtShare,
      basicGoodsGuarantee,
      planningIntensity,
      publicBankingStrength,
      debtRestructuringStance,
      multiYearAgendaStrength,
    });
  };

  return (
    <div className="policy-controls">
      <h2>
        <span className="icon" aria-hidden><IconPolicy /></span>
        Policy tools
      </h2>
      <p className="policy-controls-intro">
        Use the tools below to steer the economy. You can mix and match. Each option has a <strong>?</strong>—hover over it to see what it is and how it might affect the economy.
      </p>
      <form onSubmit={handleSubmit}>
        {mode === 'easy' && (
          <section className="policy-school quick-set">
            <h3>Quick set (start here, then tweak below)</h3>
            <div className="control-group">
              <label>
                How big a role should the government play?
                <input type="range" min={0} max={1} step={0.05} value={quickStateRole} onChange={(e) => handleQuickStateRole(Number(e.target.value))} />
                <span className="control-value">{quickStateRole < 0.33 ? 'Small' : quickStateRole > 0.66 ? 'Big' : 'Mixed'}</span>
              </label>
            </div>
            <div className="control-group">
              <label>
                How much should we regulate business and protect workers?
                <input type="range" min={0} max={1} step={0.05} value={quickRegulation} onChange={(e) => handleQuickRegulation(Number(e.target.value))} />
                <span className="control-value">{quickRegulation < 0.33 ? 'Light' : quickRegulation > 0.66 ? 'Strong' : 'Mixed'}</span>
              </label>
            </div>
            <div className="control-group">
              <label>
                Should the central bank be loose (help jobs) or tight (fight inflation)?
                <input type="range" min={0} max={1} step={0.05} value={quickCbStance} onChange={(e) => handleQuickCbStance(Number(e.target.value))} />
                <span className="control-value">{quickCbStance < 0.33 ? 'Dovish' : quickCbStance > 0.66 ? 'Hawkish' : 'Mixed'}</span>
              </label>
            </div>
            <div className="control-group">
              <label>
                How open should we be to trade with other countries?
                <input type="range" min={0} max={1} step={0.05} value={quickTrade} onChange={(e) => handleQuickTrade(Number(e.target.value))} />
                <span className="control-value">{quickTrade < 0.33 ? 'Closed' : quickTrade > 0.66 ? 'Open' : 'Mixed'}</span>
              </label>
            </div>
          </section>
        )}
        <section className="policy-school all-levers">
          <h3>All policy tools (use any mix)</h3>
          <section className="policy-school" data-school="mainstream">
          <h3>Mainstream — interest rate, taxes, spending, exchange rate</h3>
          <div className="control-group">
            <label>
              Policy rate (interest rate) <PolicyHelp text="The central bank’s interest rate. Higher = borrowing costs more, so spending falls and inflation can drop but growth may slow. Lower = cheaper borrowing, more jobs, but prices can rise." />
              <input type="range" min={s.minPolicyRate} max={s.maxPolicyRate} step={0.005} value={policyRate} onChange={(e) => setPolicyRate(Number(e.target.value))} />
              <span className="control-value">{(policyRate * 100).toFixed(2)}%</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Income tax rate <PolicyHelp text="Share of people’s income the government takes. Higher = more revenue and a smaller deficit. Lower = people spend more but the deficit can grow." />
              <input type="range" min={s.minTaxRate} max={s.maxTaxRate} step={0.01} value={incomeTaxRate} onChange={(e) => setIncomeTaxRate(Number(e.target.value))} />
              <span className="control-value">{(incomeTaxRate * 100).toFixed(0)}%</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Government spending (share of GDP) <PolicyHelp text="How much of the economy’s output the government spends. Higher = more jobs and growth, bigger deficit. Lower = smaller deficit but weaker economy." />
              <input type="range" min={s.minSpendingShare} max={s.maxSpendingShare} step={0.01} value={spendingShareOfGdp} onChange={(e) => setSpendingShareOfGdp(Number(e.target.value))} />
              <span className="control-value">{(spendingShareOfGdp * 100).toFixed(0)}%</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Exchange rate regime <PolicyHelp text="How your currency’s value is set: float (market), peg (fixed), or managed. Affects how much imports cost and how competitive exports are." />
              <select value={exchangeRateRegime} onChange={(e) => setExchangeRateRegime(e.target.value as 'float' | 'peg' | 'managed')}>
                <option value="float">Float</option>
                <option value="peg">Peg</option>
                <option value="managed">Managed</option>
              </select>
            </label>
          </div>
        </section>

        <section className="policy-school" data-school="keynesian">
          <h3>Keynesian — social spending, wage–price coordination, profit tax</h3>
          <div className="control-group">
            <label>
              Social spending share <PolicyHelp text="Share of government spending on health, education, welfare. Higher = more support for people and often more approval. Lower = less support." />
              <input type="range" min={0.1} max={0.6} step={0.05} value={socialSpendingShare} onChange={(e) => setSocialSpendingShare(Number(e.target.value))} />
              <span className="control-value">{(socialSpendingShare * 100).toFixed(0)}%</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Incomes policy strength <PolicyHelp text="Government gets employers and workers to agree on wage and price growth. Higher = less wage–price spiral, so you may need fewer rate hikes. Lower = no coordination." />
              <input type="range" min={0} max={1} step={0.1} value={incomesPolicyStrength} onChange={(e) => setIncomesPolicyStrength(Number(e.target.value))} />
              <span className="control-value">{incomesPolicyStrength.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Profit / windfall tax rate <PolicyHelp text="Extra tax on profits, especially when they’re very high. Higher = more revenue and can slow price rises. Lower = firms keep more." />
              <input type="range" min={0} max={0.2} step={0.02} value={profitWindfallTaxRate} onChange={(e) => setProfitWindfallTaxRate(Number(e.target.value))} />
              <span className="control-value">{(profitWindfallTaxRate * 100).toFixed(0)}%</span>
            </label>
          </div>
        </section>

        <section className="policy-school" data-school="marxian">
          <h3>Marxian — planning, set prices, guaranteed basics, public banking, debt options</h3>
          <div className="control-group">
            <label>
              Price control strength <PolicyHelp text="Government sets or caps prices on key goods (food, energy, transport). Higher = essentials cheaper, less inflation there. Lower = market sets prices." />
              <input type="range" min={0} max={1} step={0.1} value={priceControlStrength} onChange={(e) => setPriceControlStrength(Number(e.target.value))} />
              <span className="control-value">{priceControlStrength.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Basic goods guarantee (rationing) <PolicyHelp text="Everyone gets basics (e.g. rationing or subsidised supply). Higher = stable staple prices, more approval. Lower = all from market." />
              <input type="range" min={0} max={1} step={0.1} value={basicGoodsGuarantee} onChange={(e) => setBasicGoodsGuarantee(Number(e.target.value))} />
              <span className="control-value">{basicGoodsGuarantee.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Planning intensity <PolicyHelp text="State directs where investment and production go (targets, state firms). Higher = resources go to priorities, some profit to budget. Lower = market decides." />
              <input type="range" min={0} max={1} step={0.1} value={planningIntensity} onChange={(e) => setPlanningIntensity(Number(e.target.value))} />
              <span className="control-value">{planningIntensity.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Public and cooperative banking <PolicyHelp text="Banks owned by the public or cooperatives. Higher = less reliance on private lenders, some profit to budget. Lower = mostly private banks." />
              <input type="range" min={0} max={1} step={0.1} value={publicBankingStrength} onChange={(e) => setPublicBankingStrength(Number(e.target.value))} />
              <span className="control-value">{publicBankingStrength.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Debt restructuring / selective default <PolicyHelp text="Willingness to renegotiate or default to free money for spending. Higher = lower debt payments but costlier future borrowing. Lower = pay in full." />
              <input type="range" min={0} max={1} step={0.1} value={debtRestructuringStance} onChange={(e) => setDebtRestructuringStance(Number(e.target.value))} />
              <span className="control-value">{debtRestructuringStance.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Multi-year policy agenda <PolicyHelp text="A clear multi-year plan for the economy. Higher = more trust, stable expectations, more approval. Lower = no clear plan." />
              <input type="range" min={0} max={1} step={0.1} value={multiYearAgendaStrength} onChange={(e) => setMultiYearAgendaStrength(Number(e.target.value))} />
              <span className="control-value">{multiYearAgendaStrength.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Profit / windfall tax rate <PolicyHelp text="Extra tax on high profits. Higher = more revenue, can slow price rises. Lower = firms keep more." />
              <input type="range" min={0} max={0.2} step={0.02} value={profitWindfallTaxRate} onChange={(e) => setProfitWindfallTaxRate(Number(e.target.value))} />
              <span className="control-value">{(profitWindfallTaxRate * 100).toFixed(0)}%</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Social spending share <PolicyHelp text="Share of spending on health, education, welfare. Higher = more public provision and approval. Lower = less." />
              <input type="range" min={0.1} max={0.6} step={0.05} value={socialSpendingShare} onChange={(e) => setSocialSpendingShare(Number(e.target.value))} />
              <span className="control-value">{(socialSpendingShare * 100).toFixed(0)}%</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Capital control strength <PolicyHelp text="Limits on money in and out. Higher = less pressure from foreign lenders, protects jobs and exchange rate. Lower = freer flows, more exposure." />
              <input type="range" min={0} max={1} step={0.1} value={capitalControlStrength} onChange={(e) => setCapitalControlStrength(Number(e.target.value))} />
              <span className="control-value">{capitalControlStrength.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Domestic debt share <PolicyHelp text="Share of government debt borrowed at home in local currency. Higher = less at mercy of foreign lenders. Lower = more foreign debt." />
              <input type="range" min={0} max={1} step={0.1} value={domesticDebtShare} onChange={(e) => setDomesticDebtShare(Number(e.target.value))} />
              <span className="control-value">{(domesticDebtShare * 100).toFixed(0)}%</span>
            </label>
          </div>
        </section>

        <section className="policy-school" data-school="postkeynesian">
          <h3>Post-Keynesian — wage–price coordination and financial regulation</h3>
          <div className="control-group">
            <label>
              Incomes policy strength <PolicyHelp text="Government gets employers and workers to agree on wage and price growth. Higher = less spiral, fewer rate hikes needed. Lower = no coordination." />
              <input type="range" min={0} max={1} step={0.1} value={incomesPolicyStrength} onChange={(e) => setIncomesPolicyStrength(Number(e.target.value))} />
              <span className="control-value">{incomesPolicyStrength.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Price control strength <PolicyHelp text="Government watches or caps prices in key sectors (energy, food). Higher = key prices less likely to shoot up. Lower = market sets prices." />
              <input type="range" min={0} max={1} step={0.1} value={priceControlStrength} onChange={(e) => setPriceControlStrength(Number(e.target.value))} />
              <span className="control-value">{priceControlStrength.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Financial regulation strength <PolicyHelp text="How strictly banks are regulated. Higher = safer system, less short-term speculation. Lower = more risk." />
              <input type="range" min={0} max={1} step={0.1} value={financialRegulationStrength} onChange={(e) => setFinancialRegulationStrength(Number(e.target.value))} />
              <span className="control-value">{financialRegulationStrength.toFixed(1)}</span>
            </label>
          </div>
        </section>

        <section className="policy-school" data-school="structuralist">
          <h3>Structuralist — tariffs, capital controls, domestic debt, exchange rate</h3>
          <div className="control-group">
            <label>
              Tariff rate <PolicyHelp text="Tax on imports. Higher = more revenue, pricier imports, more protection for domestic firms. Lower = cheaper imports." />
              <input type="range" min={0} max={0.3} step={0.01} value={tariffRate} onChange={(e) => setTariffRate(Number(e.target.value))} />
              <span className="control-value">{(tariffRate * 100).toFixed(0)}%</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Capital control strength <PolicyHelp text="Limits on money in and out. Higher = less at mercy of sudden outflows. Lower = freer flows, more exposure." />
              <input type="range" min={0} max={1} step={0.1} value={capitalControlStrength} onChange={(e) => setCapitalControlStrength(Number(e.target.value))} />
              <span className="control-value">{capitalControlStrength.toFixed(1)}</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Domestic debt share <PolicyHelp text="Share of debt borrowed at home in local currency. Higher = less exposed to foreign lenders. Lower = more foreign borrowing." />
              <input type="range" min={0} max={1} step={0.1} value={domesticDebtShare} onChange={(e) => setDomesticDebtShare(Number(e.target.value))} />
              <span className="control-value">{(domesticDebtShare * 100).toFixed(0)}%</span>
            </label>
          </div>
          <div className="control-group">
            <label>
              Exchange rate regime <PolicyHelp text="How your currency’s value is set (float, peg, or managed). Managing it can limit big swings in import costs." />
              <select value={exchangeRateRegime} onChange={(e) => setExchangeRateRegime(e.target.value as 'float' | 'peg' | 'managed')}>
                <option value="float">Float</option>
                <option value="peg">Peg</option>
                <option value="managed">Managed</option>
              </select>
            </label>
          </div>
        </section>
        </section>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Advancing…' : 'Advance turn'}
        </button>
      </form>
    </div>
  );
}

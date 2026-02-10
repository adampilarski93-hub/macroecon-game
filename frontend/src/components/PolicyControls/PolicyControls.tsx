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
  gameOver?: boolean;
}

export function PolicyControls({ state, onStep, loading, mode = 'advanced', gameOver }: PolicyControlsProps) {
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
  const [infrastructureShare, setInfrastructureShare] = useState(0.15);

  // Quick-set sliders (Easy mode)
  const [quickStateRole, setQuickStateRole] = useState(0.5);
  const [quickRegulation, setQuickRegulation] = useState(0.5);
  const [quickCbStance, setQuickCbStance] = useState(0.5);
  const [quickTrade, setQuickTrade] = useState(0.5);

  // Show/hide advanced section in Easy mode
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const handleQuickStateRole = (v: number) => { setQuickStateRole(v); applyQuickStateRole(v); };
  const handleQuickRegulation = (v: number) => { setQuickRegulation(v); applyQuickRegulation(v); };
  const handleQuickCbStance = (v: number) => { setQuickCbStance(v); applyQuickCbStance(v); };
  const handleQuickTrade = (v: number) => { setQuickTrade(v); applyQuickTrade(v); };

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
      infrastructureShare,
    });
  };

  return (
    <div className="policy-controls">
      <h2>
        <span className="icon" aria-hidden><IconPolicy /></span>
        Policy tools
      </h2>
      <p className="policy-controls-intro">
        Use the tools below to steer the economy. Each option has a <strong>?</strong> — hover over it to learn what it does.
      </p>
      <form onSubmit={handleSubmit}>
        {/* ── EASY MODE: Quick-set sliders only ── */}
        {mode === 'easy' && (
          <section className="policy-school quick-set">
            <h3>Your strategy</h3>
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
                Central bank: help jobs or fight inflation?
                <input type="range" min={0} max={1} step={0.05} value={quickCbStance} onChange={(e) => handleQuickCbStance(Number(e.target.value))} />
                <span className="control-value">{quickCbStance < 0.33 ? 'Dovish' : quickCbStance > 0.66 ? 'Hawkish' : 'Mixed'}</span>
              </label>
            </div>
            <div className="control-group">
              <label>
                How open should we be to trade?
                <input type="range" min={0} max={1} step={0.05} value={quickTrade} onChange={(e) => handleQuickTrade(Number(e.target.value))} />
                <span className="control-value">{quickTrade < 0.33 ? 'Closed' : quickTrade > 0.66 ? 'Open' : 'Mixed'}</span>
              </label>
            </div>
          </section>
        )}

        {/* ── ADVANCED MODE or fine-tune toggle ── */}
        {mode === 'easy' && (
          <button
            type="button"
            className="toggle-advanced"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide detailed controls' : 'Fine-tune individual policies'}
          </button>
        )}

        {(mode === 'advanced' || showAdvanced) && (
          <section className="all-levers-section">
            {mode === 'easy' && (
              <p className="easy-help">Adjust individual levers for more control. These override the quick-set sliders above.</p>
            )}

            {/* ── Fiscal & Monetary (no duplicates) ── */}
            <section className="policy-school" data-school="mainstream">
              <h3>Fiscal & Monetary</h3>
              <div className="control-group">
                <label>
                  Policy rate <PolicyHelp text="The central bank's interest rate. Higher = borrowing costs more, so spending falls and inflation can drop but growth may slow." />
                  <input type="range" min={s.minPolicyRate} max={s.maxPolicyRate} step={0.005} value={policyRate} onChange={(e) => setPolicyRate(Number(e.target.value))} />
                  <span className="control-value">{(policyRate * 100).toFixed(2)}%</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Income tax rate <PolicyHelp text="Share of income the government takes. Higher = more revenue. Lower = people spend more but deficit can grow." />
                  <input type="range" min={s.minTaxRate} max={s.maxTaxRate} step={0.01} value={incomeTaxRate} onChange={(e) => setIncomeTaxRate(Number(e.target.value))} />
                  <span className="control-value">{(incomeTaxRate * 100).toFixed(0)}%</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Government spending / GDP <PolicyHelp text="How much of GDP the government spends. Higher = more jobs and growth, bigger deficit." />
                  <input type="range" min={s.minSpendingShare} max={s.maxSpendingShare} step={0.01} value={spendingShareOfGdp} onChange={(e) => setSpendingShareOfGdp(Number(e.target.value))} />
                  <span className="control-value">{(spendingShareOfGdp * 100).toFixed(0)}%</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Social spending share <PolicyHelp text="Share of government spending on health, education, welfare. Higher = more support for people and more approval." />
                  <input type="range" min={0.1} max={0.6} step={0.05} value={socialSpendingShare} onChange={(e) => setSocialSpendingShare(Number(e.target.value))} />
                  <span className="control-value">{(socialSpendingShare * 100).toFixed(0)}%</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Profit / windfall tax <PolicyHelp text="Extra tax on high profits. Higher = more revenue, can slow price rises." />
                  <input type="range" min={0} max={0.2} step={0.02} value={profitWindfallTaxRate} onChange={(e) => setProfitWindfallTaxRate(Number(e.target.value))} />
                  <span className="control-value">{(profitWindfallTaxRate * 100).toFixed(0)}%</span>
                </label>
              </div>
            </section>

            {/* ── Trade & External ── */}
            <section className="policy-school" data-school="structuralist">
              <h3>Trade & External</h3>
              <div className="control-group">
                <label>
                  Tariff rate <PolicyHelp text="Tax on imports. Higher = more revenue, pricier imports, more protection for domestic firms." />
                  <input type="range" min={0} max={0.3} step={0.01} value={tariffRate} onChange={(e) => setTariffRate(Number(e.target.value))} />
                  <span className="control-value">{(tariffRate * 100).toFixed(0)}%</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Exchange rate regime <PolicyHelp text="How your currency's value is set: float (market), peg (fixed), or managed." />
                  <select value={exchangeRateRegime} onChange={(e) => setExchangeRateRegime(e.target.value as 'float' | 'peg' | 'managed')}>
                    <option value="float">Float</option>
                    <option value="peg">Peg</option>
                    <option value="managed">Managed</option>
                  </select>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Capital controls <PolicyHelp text="Limits on money in and out. Higher = less pressure from foreign lenders, protects exchange rate." />
                  <input type="range" min={0} max={1} step={0.1} value={capitalControlStrength} onChange={(e) => setCapitalControlStrength(Number(e.target.value))} />
                  <span className="control-value">{capitalControlStrength.toFixed(1)}</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Domestic debt share <PolicyHelp text="Share of debt borrowed at home in local currency. Higher = less at mercy of foreign lenders." />
                  <input type="range" min={0} max={1} step={0.1} value={domesticDebtShare} onChange={(e) => setDomesticDebtShare(Number(e.target.value))} />
                  <span className="control-value">{(domesticDebtShare * 100).toFixed(0)}%</span>
                </label>
              </div>
            </section>

            {/* ── Regulation & Coordination ── */}
            <section className="policy-school" data-school="keynesian">
              <h3>Regulation & Coordination</h3>
              <div className="control-group">
                <label>
                  Incomes policy <PolicyHelp text="Government gets employers and workers to agree on wage and price growth. Reduces wage-price spiral." />
                  <input type="range" min={0} max={1} step={0.1} value={incomesPolicyStrength} onChange={(e) => setIncomesPolicyStrength(Number(e.target.value))} />
                  <span className="control-value">{incomesPolicyStrength.toFixed(1)}</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Financial regulation <PolicyHelp text="How strictly banks are regulated. Higher = safer system, less speculation." />
                  <input type="range" min={0} max={1} step={0.1} value={financialRegulationStrength} onChange={(e) => setFinancialRegulationStrength(Number(e.target.value))} />
                  <span className="control-value">{financialRegulationStrength.toFixed(1)}</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Price controls <PolicyHelp text="Government sets or caps prices on key goods (food, energy). Higher = essentials cheaper, less inflation there." />
                  <input type="range" min={0} max={1} step={0.1} value={priceControlStrength} onChange={(e) => setPriceControlStrength(Number(e.target.value))} />
                  <span className="control-value">{priceControlStrength.toFixed(1)}</span>
                </label>
              </div>
            </section>

            {/* ── State & Planning ── */}
            <section className="policy-school" data-school="marxian">
              <h3>State & Planning</h3>
              <div className="control-group">
                <label>
                  Planning intensity <PolicyHelp text="State directs where investment and production go. Moderate levels boost growth in developing economies (like South Korea, China). Very high levels can reduce innovation in advanced economies." />
                  <input type="range" min={0} max={1} step={0.1} value={planningIntensity} onChange={(e) => setPlanningIntensity(Number(e.target.value))} />
                  <span className="control-value">{planningIntensity.toFixed(1)}</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Infrastructure investment <PolicyHelp text="Share of spending on roads, energy, broadband, irrigation. Boosts ALL sectors' productivity. Every successful developing country invested heavily in infrastructure." />
                  <input type="range" min={0} max={0.5} step={0.05} value={infrastructureShare} onChange={(e) => setInfrastructureShare(Number(e.target.value))} />
                  <span className="control-value">{(infrastructureShare * 100).toFixed(0)}%</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Public banking <PolicyHelp text="State-owned banks direct credit to strategic sectors. Reduces financial crises, provides counter-cyclical lending. Used by Germany (KfW), Brazil (BNDES), China, and all Nordic countries." />
                  <input type="range" min={0} max={1} step={0.1} value={publicBankingStrength} onChange={(e) => setPublicBankingStrength(Number(e.target.value))} />
                  <span className="control-value">{publicBankingStrength.toFixed(1)}</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Basic goods guarantee <PolicyHelp text="Universal access to food, housing, healthcare. Cuba achieves health outcomes rivaling wealthy nations. Nordic countries use universal provision for high approval and social stability." />
                  <input type="range" min={0} max={1} step={0.1} value={basicGoodsGuarantee} onChange={(e) => setBasicGoodsGuarantee(Number(e.target.value))} />
                  <span className="control-value">{basicGoodsGuarantee.toFixed(1)}</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Debt restructuring <PolicyHelp text="Willingness to renegotiate or default on debts. Argentina (2001) and Iceland (2008) recovered faster after defaulting. Short-term pain but can free resources for growth." />
                  <input type="range" min={0} max={1} step={0.1} value={debtRestructuringStance} onChange={(e) => setDebtRestructuringStance(Number(e.target.value))} />
                  <span className="control-value">{debtRestructuringStance.toFixed(1)}</span>
                </label>
              </div>
              <div className="control-group">
                <label>
                  Multi-year agenda <PolicyHelp text="A clear multi-year economic plan. Anchors expectations and builds investor/public confidence. Higher = more predictable policy environment." />
                  <input type="range" min={0} max={1} step={0.1} value={multiYearAgendaStrength} onChange={(e) => setMultiYearAgendaStrength(Number(e.target.value))} />
                  <span className="control-value">{multiYearAgendaStrength.toFixed(1)}</span>
                </label>
              </div>
            </section>
          </section>
        )}

        <div className="advance-turn-bar">
          <button type="submit" className="advance-turn-btn" disabled={loading || gameOver}>
            {gameOver ? 'Game Over' : loading ? 'Advancing...' : '\u25B6  Advance Turn'}
          </button>
        </div>
      </form>
    </div>
  );
}

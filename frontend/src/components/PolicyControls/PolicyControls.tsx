import { useState, useEffect, useCallback } from 'react';
import type { SimulationState, PolicyActions } from '../../types';
import type { CountryState } from '../../engine/state';
import { IconPolicy } from '../Icons';
import { useGameStore } from '../../state/gameStore';
import { equilibriumY } from '../../engine/equations/demand';
import { nextInflation } from '../../engine/equations/inflation';
import { exchangeRateChange } from '../../engine/equations/external';
import { approvalBreakdown } from '../../engine/equations/approval';

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

/** Click the ? to open an explainer box about this policy lever. */
function PolicyHelp({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="policy-help-wrap">
      <button
        type="button"
        className={`policy-help ${open ? 'policy-help-active' : ''}`}
        aria-label="What is this and how does it affect the economy?"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
      >
        ?
      </button>
      {open && (
        <>
          <div className="policy-help-backdrop" onClick={() => setOpen(false)} />
          <div className="policy-help-panel" role="tooltip">
            <button type="button" className="policy-help-close" onClick={() => setOpen(false)} aria-label="Close">&times;</button>
            <p>{text}</p>
          </div>
        </>
      )}
    </span>
  );
}

interface PolicyControlsProps {
  state: SimulationState;
  onStep: (actions: PolicyActions) => Promise<void>;
  loading: boolean;
  mode?: 'guided' | 'simulator';
  gameOver?: boolean;
}

export function PolicyControls({ state, onStep, loading, mode = 'guided', gameOver }: PolicyControlsProps) {
  const simulatorPolicyLag = useGameStore((gs) => gs.simulatorPolicyLag);
  const setSimulatorPolicyLag = useGameStore((gs) => gs.setSimulatorPolicyLag);
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

  // Quick-set sliders for guided mode
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
        Use the tools below to steer the economy. Each option has a <strong>?</strong> button ? click it to learn what it does.
      </p>
      <form onSubmit={handleSubmit}>
        {/* GUIDED MODE: 5 Strategic Levers with Heterodox Context */}
        {mode === 'guided' && (
          <section className="policy-school guided-mode">
            <h3>Guided Simulation — Key Policy Levers</h3>
            <p className="guided-intro">
              Adjust these five strategic levers to shape your economy. Each represents a major policy domain grounded in heterodox economic traditions.
            </p>

            {/* Lever 1: Fiscal Stance */}
            <div className="control-group guided-lever">
              <label className="guided-label">
                <span className="lever-number">1</span>
                Fiscal Stance: Government Role in the Economy
                <PolicyHelp text="Post-Keynesian tradition: government spending creates effective demand and drives growth through the multiplier. 'Stimulative' = high spending, boosts growth but adds debt. 'Austere' = reduces debt but may cause recession. 'Balanced' = middle path." />
              </label>
              <div className="guided-slider-wrap">
                <input type="range" min={0} max={1} step={0.1} value={quickStateRole} onChange={(e) => handleQuickStateRole(Number(e.target.value))} className="guided-slider" />
                <div className="guided-labels">
                  <span className={quickStateRole < 0.33 ? 'active' : ''}>Austere</span>
                  <span className={quickStateRole >= 0.33 && quickStateRole <= 0.66 ? 'active' : ''}>Balanced</span>
                  <span className={quickStateRole > 0.66 ? 'active' : ''}>Stimulative</span>
                </div>
              </div>
            </div>

            {/* Lever 2: Central Bank */}
            <div className="control-group guided-lever">
              <label className="guided-label">
                <span className="lever-number">2</span>
                Central Bank: Inflation vs Employment
                <PolicyHelp text="Monetarist vs Post-Keynesian debate: Should the central bank prioritize price stability or employment? 'Hawkish' = fight inflation even at cost of jobs. 'Dovish' = support employment, accept some inflation. 'Balanced' = dual mandate." />
              </label>
              <div className="guided-slider-wrap">
                <input type="range" min={0} max={1} step={0.1} value={quickCbStance} onChange={(e) => handleQuickCbStance(Number(e.target.value))} className="guided-slider" />
                <div className="guided-labels">
                  <span className={quickCbStance < 0.33 ? 'active' : ''}>Dovish</span>
                  <span className={quickCbStance >= 0.33 && quickCbStance <= 0.66 ? 'active' : ''}>Balanced</span>
                  <span className={quickCbStance > 0.66 ? 'active' : ''}>Hawkish</span>
                </div>
              </div>
            </div>

            {/* Lever 3: Labor Policy */}
            <div className="control-group guided-lever">
              <label className="guided-label">
                <span className="lever-number">3</span>
                Labor Standards: Flexibility vs Protection
                <PolicyHelp text="Institutional tradition (Polanyi): labor is embedded in social relations. 'Protective' = strong unions, minimum wages, job security. 'Flexible' = easier to hire/fire, lower regulation ? helps business competitiveness. 'Mixed' = balance." />
              </label>
              <div className="guided-slider-wrap">
                <input type="range" min={0} max={1} step={0.1} value={quickRegulation} onChange={(e) => handleQuickRegulation(Number(e.target.value))} className="guided-slider" />
                <div className="guided-labels">
                  <span className={quickRegulation < 0.33 ? 'active' : ''}>Flexible</span>
                  <span className={quickRegulation >= 0.33 && quickRegulation <= 0.66 ? 'active' : ''}>Mixed</span>
                  <span className={quickRegulation > 0.66 ? 'active' : ''}>Protective</span>
                </div>
              </div>
            </div>

            {/* Lever 4: Trade */}
            <div className="control-group guided-lever">
              <label className="guided-label">
                <span className="lever-number">4</span>
                Global Integration: Open vs Protected
                <PolicyHelp text="Structuralist tradition (Prebisch): free trade benefits industrialized core at expense of periphery. 'Open' = low tariffs, capital mobility. 'Protected' = tariffs, capital controls. 'Strategic' = selective openness." />
              </label>
              <div className="guided-slider-wrap">
                <input type="range" min={0} max={1} step={0.1} value={quickTrade} onChange={(e) => handleQuickTrade(Number(e.target.value))} className="guided-slider" />
                <div className="guided-labels">
                  <span className={quickTrade < 0.33 ? 'active' : ''}>Protected</span>
                  <span className={quickTrade >= 0.33 && quickTrade <= 0.66 ? 'active' : ''}>Strategic</span>
                  <span className={quickTrade > 0.66 ? 'active' : ''}>Open</span>
                </div>
              </div>
            </div>

            {/* Lever 5: Distribution */}
            <div className="control-group guided-lever">
              <label className="guided-label">
                <span className="lever-number">5</span>
                Economic Distribution: Capital vs Labor
                <PolicyHelp text="Piketty's r > g: returns to capital grow faster than economy, concentrating wealth. 'Pro-labor' = wealth taxes, high wages, social spending. 'Pro-capital' = low taxes, deregulation. 'Balanced' = middle ground." />
              </label>
              <div className="guided-slider-wrap">
                <input type="range" min={0} max={1} step={0.1} value={(incomeTaxRate - s.minTaxRate) / (s.maxTaxRate - s.minTaxRate)} onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v < 0.33) { setIncomeTaxRate(lerp(s.minTaxRate, s.maxTaxRate, 0.25)); setSocialSpendingShare(0.25); setProfitWindfallTaxRate(0); }
                  else if (v > 0.66) { setIncomeTaxRate(lerp(s.minTaxRate, s.maxTaxRate, 0.65)); setSocialSpendingShare(0.5); setProfitWindfallTaxRate(0.12); }
                  else { setIncomeTaxRate(lerp(s.minTaxRate, s.maxTaxRate, 0.45)); setSocialSpendingShare(0.35); setProfitWindfallTaxRate(0.05); }
                }} className="guided-slider" />
                <div className="guided-labels">
                  <span className={incomeTaxRate < (s.minTaxRate + s.maxTaxRate) / 2 - 0.02 ? 'active' : ''}>Pro-Capital</span>
                  <span className={incomeTaxRate >= (s.minTaxRate + s.maxTaxRate) / 2 - 0.02 && incomeTaxRate <= (s.minTaxRate + s.maxTaxRate) / 2 + 0.02 ? 'active' : ''}>Balanced</span>
                  <span className={incomeTaxRate > (s.minTaxRate + s.maxTaxRate) / 2 + 0.02 ? 'active' : ''}>Pro-Labor</span>
                </div>
              </div>
            </div>

            <div className="guided-tip">
              <strong>Tip:</strong> Each lever combines multiple policy instruments. For finer control, use Full Simulation mode.
            </div>
          </section>
        )}
        {mode === 'simulator' && (
          <section className="all-levers-section">
            {mode === 'simulator' && (
              <p className="easy-help">
                Simulator mode uses the same policy levers with deterministic stepping and explicit diagnostics. Random shocks are disabled so policy effects are easier to inspect.
              </p>
            )}
            {mode === 'simulator' && (
              <div className="control-group">
                <label>
                  Policy lag (fraction of last turn carried forward)
                  <PolicyHelp text="Explicit policy lag for simulator runs. At 0.0, policy is applied immediately. At 1.0, this turn mostly inherits last turn's settings." />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={simulatorPolicyLag}
                    onChange={(e) => setSimulatorPolicyLag(Number(e.target.value))}
                  />
                  <span className="control-value">{simulatorPolicyLag.toFixed(2)}</span>
                </label>
              </div>
            )}

        {/* ?? Fiscal & Monetary (no duplicates) ?? */}
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

        {/* ?? Trade & External ?? */}
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

        {/* ?? Regulation & Coordination ?? */}
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

        {/* ?? State & Planning ?? */}
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

        {/* Policy Impact Preview */}
        <PolicyImpactPreview
          state={state}
          policies={{
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
          }}
        />

        <div className="advance-turn-bar">
          <button type="submit" className="advance-turn-btn" disabled={loading || gameOver}>
            {gameOver ? 'Game Over' : loading ? 'Advancing...' : '\u25B6  Next Turn'}
          </button>
        </div>
      </form>
    </div>
  );
}

/** Preview panel showing projected effects of current policy settings
 * Uses actual engine calculations for accurate projections
 */
function PolicyImpactPreview({
  state,
  policies,
}: {
  state: SimulationState;
  policies: Record<string, number | string>;
}) {
  const c = state.country;
  const s = state.scenario;

  // Build policy actions from current policy settings
  const policyActions: PolicyActions = {
    incomeTaxRate: policies.incomeTaxRate as number,
    tariffRate: policies.tariffRate as number,
    spendingShareOfGdp: policies.spendingShareOfGdp as number,
    exchangeRateRegime: policies.exchangeRateRegime as 'peg' | 'managed' | 'float',
    socialSpendingShare: policies.socialSpendingShare as number,
    profitWindfallTaxRate: policies.profitWindfallTaxRate as number,
    priceControlStrength: policies.priceControlStrength as number,
    capitalControlStrength: policies.capitalControlStrength as number,
    incomesPolicyStrength: policies.incomesPolicyStrength as number,
    financialRegulationStrength: policies.financialRegulationStrength as number,
    domesticDebtShare: policies.domesticDebtShare as number,
    basicGoodsGuarantee: policies.basicGoodsGuarantee as number,
    planningIntensity: policies.planningIntensity as number,
    publicBankingStrength: policies.publicBankingStrength as number,
    debtRestructuringStance: policies.debtRestructuringStance as number,
    multiYearAgendaStrength: policies.multiYearAgendaStrength as number,
    infrastructureShare: policies.infrastructureShare as number,
  };

  // Calculate projected GDP using actual demand equilibrium
  const { y: projectedGdp } = equilibriumY(
    c,
    state.global,
    s,
    policyActions,
    c.gdp
  );
  const gdpChange = ((projectedGdp - c.gdp) / c.gdp) * 100;

  // Calculate projected inflation using actual inflation equation
  const erChange = exchangeRateChange(
    c.currentAccount,
    c.gdp,
    policyActions.exchangeRateRegime ?? 'managed',
    policyActions.capitalControlStrength ?? 0,
    c.fxReserves
  );
  const projectedInflation = nextInflation(
    c,
    state.global,
    s,
    erChange,
    policyActions.priceControlStrength ?? 0,
    policyActions.incomesPolicyStrength ?? 0,
    policyActions.basicGoodsGuarantee ?? 0
  );
  const inflationChange = (projectedInflation - c.inflationRate) * 100;

  // Calculate projected unemployment using Okun's Law
  const trendGrowth = 0.02;
  const gdpGrowth = (projectedGdp - c.gdp) / c.gdp;
  const okunCoeff = gdpGrowth >= trendGrowth ? 0.4 : 0.5;
  const planningBonus = (policies.planningIntensity as number) * 0.02;
  const equilibriumUnemp = Math.max(0.02, 0.05 - okunCoeff * (gdpGrowth - trendGrowth) - planningBonus);
  const projectedUnemployment = c.unemploymentRate + 0.4 * (equilibriumUnemp - c.unemploymentRate);
  const unemployChange = (projectedUnemployment - c.unemploymentRate) * 100;

  // Calculate projected debt
  const projectedDeficit = ((policies.spendingShareOfGdp as number) - (policies.incomeTaxRate as number)) * projectedGdp;
  const effectiveRate = ((policies.policyRate as number) + state.global.riskPremium) * 
    (1 - 0.35 * Math.min(1, Math.max(0, policies.debtRestructuringStance as number)));
  const periodRate = effectiveRate / (s.periodsPerYear ?? 4);
  const projectedDebt = c.publicDebt + projectedDeficit + c.publicDebt * periodRate;
  const projectedDebtToGdp = (projectedDebt / projectedGdp) * 100;
  const currentDebtToGdp = (c.publicDebt / c.gdp) * 100;
  const debtChange = projectedDebtToGdp - currentDebtToGdp;

  // Build projections array with actual calculated values
  const projections = [];

  if (Math.abs(gdpChange) > 0.1) {
    projections.push({
      indicator: 'GDP Growth',
      change: `${gdpChange > 0 ? '+' : ''}${gdpChange.toFixed(1)}%`,
      direction: gdpChange > 0.5 ? 'up' : gdpChange < -0.5 ? 'down' : 'neutral',
      reason: gdpChange > 1 ? 'Strong stimulus from fiscal expansion' : 
              gdpChange > 0 ? 'Modest demand boost' :
              gdpChange > -1 ? 'Slight contraction' : 'Significant demand contraction',
    });
  }

  if (Math.abs(inflationChange) > 0.2) {
    projections.push({
      indicator: 'Inflation',
      change: `${inflationChange > 0 ? '+' : ''}${inflationChange.toFixed(1)}pp`,
      direction: inflationChange > 0.5 ? 'up' : inflationChange < -0.5 ? 'down' : 'neutral',
      reason: inflationChange > 1 ? 'Strong demand pressure & cost-push' :
              inflationChange > 0 ? 'Moderate price pressures' :
              inflationChange > -1 ? 'Disinflationary pressure' : 'Significant deflation risk',
    });
  }

  if (Math.abs(unemployChange) > 0.1) {
    projections.push({
      indicator: 'Unemployment',
      change: `${unemployChange > 0 ? '+' : ''}${unemployChange.toFixed(1)}pp`,
      direction: unemployChange > 0.3 ? 'up' : unemployChange < -0.3 ? 'down' : 'neutral',
      reason: unemployChange > 0.5 ? 'Tighter policy reducing labor demand' :
              unemployChange > 0 ? 'Moderate job market softening' :
              unemployChange > -0.5 ? 'Modest employment gains' : 'Strong labor market recovery',
    });
  }

  if (Math.abs(debtChange) > 1) {
    projections.push({
      indicator: 'Debt/GDP',
      change: `${debtChange > 0 ? '+' : ''}${debtChange.toFixed(1)} pts`,
      direction: debtChange > 2 ? 'up' : debtChange < -2 ? 'down' : 'neutral',
      reason: debtChange > 3 ? 'Rising deficits increasing debt burden' :
              debtChange > 0 ? 'Modest debt accumulation' :
              debtChange > -3 ? 'Slight debt reduction' : 'Strong fiscal consolidation',
    });
  }

  // Calculate approval using actual approval breakdown
  const approvalResult = approvalBreakdown(
    { ...c, gdp: projectedGdp, gdpGrowth: gdpChange / 100, unemploymentRate: projectedUnemployment, inflationRate: projectedInflation } as CountryState,
    policies.socialSpendingShare as number,
    policies.basicGoodsGuarantee as number,
    policies.multiYearAgendaStrength as number,
    policies.incomeTaxRate as number,
    policies.financialRegulationStrength as number,
    policies.planningIntensity as number
  );
  const approvalChange = (approvalResult.overall - c.approval) * 100;

  if (Math.abs(approvalChange) > 0.5) {
    projections.push({
      indicator: 'Public Approval',
      change: `${approvalChange > 0 ? '+' : ''}${approvalChange.toFixed(1)}%`,
      direction: approvalChange > 1 ? 'up' : approvalChange < -1 ? 'down' : 'neutral',
      reason: approvalChange > 2 ? 'Strong popular support from social programs' :
              approvalChange > 0 ? 'Modest approval gains' :
              approvalChange > -2 ? 'Slight approval decline' : 'Significant political backlash',
    });
  }

  if (projections.length === 0) {
    projections.push({
      indicator: 'Stability',
      change: 'Minimal change',
      direction: 'neutral',
      reason: 'Current policies maintain economic trajectory',
    });
  }

  return (
    <div className="policy-impact-preview">
      <h4>
        Expected Impact
        <span className="impact-hint">(approximate direction, not exact)</span>
      </h4>
      <div className="impact-grid">
        {projections.map((proj, idx) => (
          <div key={idx} className={`impact-item impact-${proj.direction}`}>
            <span className="impact-indicator">{proj.indicator}</span>
            <span className="impact-change">{proj.change}</span>
            <span className="impact-reason">{proj.reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

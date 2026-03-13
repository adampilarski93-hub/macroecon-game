import type {
  SimulationState,
  CountryState,
  GlobalState,
  ScenarioParams,
  PolicyActions,
  SimulationEvent,
} from './state';
import { computeSectorOutputs, aggregateGdp } from './equations/production';
import { equilibriumY } from './equations/demand';
import { nextInflation, nextInflationExpectations } from './equations/inflation';
import {
  taxRevenue,
  expenditure,
  nextDebt,
  publicBankingRevenue,
} from './equations/government';
import { exchangeRateChange, nextTermsOfTrade } from './equations/external';
import { approvalBreakdown } from './equations/approval';

/* ───────── Helpers ───────── */

function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

function hasEvent(events: SimulationEvent[], id: string): boolean {
  return events.some((e) => e.id === id);
}

function push(events: SimulationEvent[], e: SimulationEvent): void {
  events.push(e);
}

/* ── Simple seeded pseudo-random based on turn ── */
function turnRng(turn: number, seed: number = 42): () => number {
  let s = (turn * 2654435761 + seed) >>> 0;
  return () => {
    s ^= s << 13;
    s ^= s >> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

/* ───────── Apply policy rate / target ───────── */

function applyPolicyToCountry(
  country: CountryState,
  scenario: ScenarioParams,
  actions: PolicyActions,
): CountryState {
  const policyRate = clamp(
    actions.policyRate ?? country.policyRate,
    scenario.minPolicyRate,
    scenario.maxPolicyRate,
  );
  return {
    ...country,
    policyRate,
    inflationTarget: scenario.scenarioId.includes('stagflation') ? 0.02 : 0.025,
  };
}

/* ═══════════════════════════════════════════════════════════
   DYNAMIC EVENTS PER SCENARIO
   ═══════════════════════════════════════════════════════════ */

function generateDynamicEvents(
  state: SimulationState,
  newCountry: CountryState,
  actions: PolicyActions,
  nextTurn: number,
  events: SimulationEvent[],
  global: GlobalState,
  rng: () => number,
): GlobalState {
  let g = { ...global };
  const sid = state.scenario.scenarioId;

  const planningIntensity = clamp(actions.planningIntensity ?? 0, 0, 1);
  const publicBankingStrength = clamp(actions.publicBankingStrength ?? 0, 0, 1);
  const profitWindfallTaxRate = clamp(actions.profitWindfallTaxRate ?? 0, 0, 0.2);
  const tariffRate = actions.tariffRate ?? 0.1;
  const capitalControlStrength = clamp(actions.capitalControlStrength ?? 0, 0, 1);
  const debtRestructuringStance = clamp(actions.debtRestructuringStance ?? 0, 0, 1);
  const priceControlStrength = clamp(actions.priceControlStrength ?? 0, 0, 1);
  const socialSpendingShare = actions.socialSpendingShare ?? 0.35;
  const basicGoodsGuarantee = clamp(actions.basicGoodsGuarantee ?? 0, 0, 1);
  const infrastructureShare = clamp(actions.infrastructureShare ?? 0, 0, 1);
  const financialRegulationStrength = clamp(actions.financialRegulationStrength ?? 0, 0, 1);
  const incomesPolicyStrength = clamp(actions.incomesPolicyStrength ?? 0, 0, 1);

  /* ──────── UNIVERSAL EVENTS (all scenarios) ──────── */

  // Financial instability (Minsky moment) — if deregulated and growing fast
  if (!hasEvent(events, 'minsky-moment') && state.turn > 4) {
    const fragility = (1 - financialRegulationStrength) * 0.3
      + Math.max(0, newCountry.gdpGrowth - 0.03) * 5
      + (newCountry.debtToGdp > 1.0 ? 0.2 : 0);
    if (fragility > 0.6 && rng() < 0.3) {
      push(events, {
        id: 'minsky-moment',
        turn: nextTurn,
        type: 'shock',
        title: 'Financial Crisis Strikes',
        description: 'Years of loose financial regulation and fast credit growth have created a bubble. Asset prices crash, banks tighten lending, and confidence collapses. This is a "Minsky Moment" — stability bred instability. Stronger financial regulation could have prevented this.',
      });
      // Shock: GDP contracts, confidence drops
      newCountry.gdpGrowth = Math.min(newCountry.gdpGrowth, -0.03);
      newCountry.approval = Math.max(0, newCountry.approval - 0.12);
    }
  }

  // Austerity spiral warning
  if (!hasEvent(events, 'austerity-spiral') && state.turn > 3) {
    const isAusterity = (actions.spendingShareOfGdp ?? 0.25) < 0.2;
    const isRecession = newCountry.gdpGrowth < -0.01;
    const risingDebt = newCountry.debtToGdp > (state.country.debtToGdp + 0.02);
    if (isAusterity && isRecession && risingDebt) {
      push(events, {
        id: 'austerity-spiral',
        turn: nextTurn,
        type: 'warning',
        title: 'Austerity Is Self-Defeating',
        description: 'You cut spending during a recession, but GDP fell so much that tax revenue dropped even more. Your debt-to-GDP ratio actually INCREASED despite the cuts. This happened to Greece (2010-2015) and the UK. Keynesian economists argue that stimulus, not austerity, is needed in downturns.',
      });
    }
  }

  // Sectoral balance warning (Post-Keynesian)
  if (!hasEvent(events, 'sectoral-imbalance') && state.turn > 5) {
    const govSurplus = newCountry.taxRevenue > newCountry.expenditure;
    const risingUnemployment = newCountry.unemploymentRate > 0.08;
    if (govSurplus && risingUnemployment) {
      push(events, {
        id: 'sectoral-imbalance',
        turn: nextTurn,
        type: 'warning',
        title: 'Sectoral Balance Problem',
        description: 'Your government is running a surplus while unemployment rises. Post-Keynesian economics explains this: if the private sector wants to save and you have a trade deficit, the government MUST run a deficit or the economy contracts. Consider whether the surplus is appropriate right now.',
      });
    }
  }

  // Innovation boom from R&D/education
  if (!hasEvent(events, 'innovation-boom') && state.turn > 6 && socialSpendingShare > 0.4 && infrastructureShare > 0.3) {
    if (rng() < 0.35) {
      push(events, {
        id: 'innovation-boom',
        turn: nextTurn,
        type: 'milestone',
        title: 'Innovation Takes Off',
        description: 'Years of investment in education and infrastructure are paying off. Universities are producing skilled graduates, startups are forming, and productivity is rising. This mirrors the experience of South Korea and Finland, which invested heavily in human capital.',
      });
      newCountry.institutionQuality = Math.min(1, newCountry.institutionQuality + 0.03);
    }
  }

  // Workers demand better conditions (Marxian)
  if (!hasEvent(events, 'labor-movement') && newCountry.gdpGrowth > 0.03 && newCountry.unemploymentRate < 0.04 && state.turn > 3) {
    push(events, {
      id: 'labor-movement',
      turn: nextTurn,
      type: 'policy_effect',
      title: 'Workers Organize for Better Conditions',
      description: 'With low unemployment and a growing economy, workers have bargaining power. They demand higher wages and better working conditions. Marxian economists see this as the natural tension between labor and capital. You can accommodate demands (higher wages → more consumption) or resist (risk unrest).',
    });
  }

  /* ──────── TUTORIAL ──────── */
  if (sid === 'tutorial') {
    if (!hasEvent(events, 'tut-factory') && newCountry.gdpGrowth > 0.02 && state.turn > 2) {
      push(events, {
        id: 'tut-factory',
        turn: nextTurn,
        type: 'milestone',
        title: 'New Businesses Open',
        description: 'Economic growth is encouraging entrepreneurs to start new businesses. More jobs are being created and tax revenue is rising.',
      });
    }
    if (!hasEvent(events, 'tut-graduates') && state.turn === 5) {
      push(events, {
        id: 'tut-graduates',
        turn: nextTurn,
        type: 'milestone',
        title: 'University Graduates Join Workforce',
        description: 'A new cohort of educated workers enters the labor market. This boosts productivity and helps the economy grow.',
      });
      newCountry.institutionQuality = Math.min(1, newCountry.institutionQuality + 0.02);
    }
  }

  /* ──────── EMERGING DEBT CRISIS ──────── */
  if (sid === 'emerging-debt-crisis') {
    // IMF loan offer
    if (!hasEvent(events, 'imf-loan') && newCountry.debtToGdp > 0.6 && state.turn > 2) {
      push(events, {
        id: 'imf-loan',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'IMF Offers Emergency Loan',
        description: 'The International Monetary Fund offers a loan, but with conditions: cut spending, raise interest rates, and privatize state assets. Structuralist economists warn that these conditions often worsen recessions. Keynesian economists suggest stimulus instead. The choice is yours.',
      });
    }
    // Credit downgrade
    if (!hasEvent(events, 'credit-downgrade') && newCountry.debtToGdp > 0.8 && newCountry.gdpGrowth < 0) {
      push(events, {
        id: 'credit-downgrade',
        turn: nextTurn,
        type: 'warning',
        title: 'Credit Rating Downgraded',
        description: 'International rating agencies downgraded your country. Borrowing costs rise. However, Post-Keynesian economists note that rating agencies often make crises worse by downgrading during recessions, creating a self-fulfilling prophecy.',
      });
      g = { ...g, riskPremium: g.riskPremium + 0.015 };
    }
    // Diaspora remittances
    if (!hasEvent(events, 'remittances') && state.turn > 4 && rng() < 0.4) {
      push(events, {
        id: 'remittances',
        turn: nextTurn,
        type: 'milestone',
        title: 'Diaspora Sends Remittances',
        description: 'Citizens working abroad are sending money home to their families. This provides foreign exchange and supports household consumption, reducing poverty. Remittances are often a lifeline for developing countries in crisis.',
      });
      newCountry.fxReserves += newCountry.gdp * 0.02;
    }
    // Creditor reaction to restructuring
    if (!hasEvent(events, 'geo-creditors-default') && debtRestructuringStance > 0.6) {
      push(events, {
        id: 'geo-creditors-default',
        turn: nextTurn,
        type: 'warning',
        title: 'Creditors React to Default',
        description: 'You chose to restructure or default on debt. Creditors are angry and borrowing costs rise. However, Argentina (2001) and Iceland (2008) both recovered faster after defaulting than countries that pursued austerity. Sometimes default IS the best option.',
      });
      g = { ...g, riskPremium: g.riskPremium + 0.028 };
    }
    // Underground economy
    if (!hasEvent(events, 'underground-economy') && (actions.incomeTaxRate ?? 0.2) > 0.35 && planningIntensity > 0.3) {
      push(events, {
        id: 'underground-economy',
        turn: nextTurn,
        type: 'warning',
        title: 'Underground Economy Growing',
        description: 'High taxes combined with heavy regulation are pushing economic activity underground. The informal sector is growing, reducing tax revenue. Consider whether tax rates are appropriate for your institutional capacity.',
      });
    }
  }

  /* ──────── STAGFLATION ──────── */
  if (sid === 'stagflation') {
    // Energy price shock
    if (!hasEvent(events, 'energy-shock') && state.turn > 2 && rng() < 0.35) {
      push(events, {
        id: 'energy-shock',
        turn: nextTurn,
        type: 'shock',
        title: 'Energy Prices Surge',
        description: 'Global oil and gas prices spike due to geopolitical tensions. This is COST-PUSH inflation — raising interest rates won\'t fix it because the problem is supply, not demand. Post-Keynesian economists suggest targeted subsidies and incomes policy instead of rate hikes.',
      });
      g = { ...g, commodityPriceIndex: g.commodityPriceIndex * 1.3 };
    }
    // Wage-price spiral
    if (!hasEvent(events, 'wage-spiral') && newCountry.inflationRate > 0.06 && state.turn > 3) {
      push(events, {
        id: 'wage-spiral',
        turn: nextTurn,
        type: 'warning',
        title: 'Workers Demand Higher Wages',
        description: 'With prices rising fast, workers demand wage increases to keep up. If businesses pass these costs to prices, you get a wage-price spiral. Incomes policy (wage-price coordination) can break this cycle — it worked in Scandinavia and Australia in the 1980s.',
      });
    }
    // Manufacturing innovation
    if (!hasEvent(events, 'mfg-innovation') && infrastructureShare > 0.3 && state.turn > 5 && rng() < 0.4) {
      push(events, {
        id: 'mfg-innovation',
        turn: nextTurn,
        type: 'milestone',
        title: 'Manufacturing Sector Innovates',
        description: 'Infrastructure investment is helping manufacturers adopt new technology. Productivity rises, helping to fight inflation from the supply side. This is the structuralist approach: fix supply problems, don\'t just suppress demand.',
      });
    }
    // Supply-side recovery
    if (!hasEvent(events, 'supply-recovery') && state.turn > 7 && g.commodityPriceIndex > 1.1 && rng() < 0.3) {
      push(events, {
        id: 'supply-recovery',
        turn: nextTurn,
        type: 'milestone',
        title: 'Commodity Prices Stabilize',
        description: 'Global commodity markets have found a new equilibrium. Energy and food prices stop rising. The worst of the supply shock may be over.',
      });
      g = { ...g, commodityPriceIndex: g.commodityPriceIndex * 0.85 };
    }
  }

  /* ──────── RUST BELT ──────── */
  if (sid === 'rust-belt') {
    // Tech sector emerges
    if (!hasEvent(events, 'tech-boom') && socialSpendingShare > 0.35 && state.turn > 4 && rng() < 0.35) {
      push(events, {
        id: 'tech-boom',
        turn: nextTurn,
        type: 'milestone',
        title: 'Tech Startups Emerge',
        description: 'Investment in education and retraining is producing results. Former manufacturing workers are finding new careers in technology and services. This shows that industrial decline doesn\'t have to be permanent if the state actively manages the transition.',
      });
    }
    // Workers retrain
    if (!hasEvent(events, 'retraining-success') && socialSpendingShare > 0.4 && state.turn > 6) {
      push(events, {
        id: 'retraining-success',
        turn: nextTurn,
        type: 'milestone',
        title: 'Retraining Programs Succeed',
        description: 'Active labor market policies are working. Workers displaced from factories have gained new skills and found employment in growing sectors. Nordic countries pioneered this approach — the state helps workers adapt rather than letting markets decide who sinks.',
      });
      newCountry.unemploymentRate = Math.max(0.03, newCountry.unemploymentRate - 0.02);
    }
    // Brain drain
    if (!hasEvent(events, 'brain-drain') && newCountry.unemploymentRate > 0.10 && state.turn > 3) {
      push(events, {
        id: 'brain-drain',
        turn: nextTurn,
        type: 'warning',
        title: 'Brain Drain Accelerates',
        description: 'Young, educated workers are leaving for better opportunities elsewhere. High unemployment is driving talent away. Without active policy to create new industries, the region risks permanent decline.',
      });
    }
    // Green energy opportunity
    if (!hasEvent(events, 'green-energy') && state.turn > 6 && rng() < 0.4) {
      push(events, {
        id: 'green-energy',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'Green Energy Investment Opportunity',
        description: 'A renewable energy company wants to build solar and wind farms in your region. This could create thousands of jobs and attract more investment. Industrial policy can accelerate this transition — China used it to become the world leader in solar panels.',
      });
    }
    // Trade retaliation
    if (!hasEvent(events, 'geo-retaliation-protectionism') && (tariffRate > 0.2 && capitalControlStrength > 0.6 || tariffRate > 0.25)) {
      push(events, {
        id: 'geo-retaliation-protectionism',
        turn: nextTurn,
        type: 'warning',
        title: 'Trading Partners Retaliate',
        description: 'Your trade barriers prompted retaliatory tariffs. However, every successful industrializer — including the US, Germany, Japan, and South Korea — used tariffs during development. The question is whether your protection comes with export discipline and sunset clauses.',
      });
      g = { ...g, exportDemandMultiplier: g.exportDemandMultiplier * 0.88 };
    }
    // Cooperative/community economy
    if (!hasEvent(events, 'coop-economy') && planningIntensity > 0.3 && basicGoodsGuarantee > 0.4 && state.turn > 5) {
      push(events, {
        id: 'coop-economy',
        turn: nextTurn,
        type: 'milestone',
        title: 'Worker Cooperatives Emerge',
        description: 'With state support, worker-owned cooperatives are forming in the region. Mondragon in Spain\'s Basque Country shows this model can be highly successful — it\'s one of Spain\'s largest employers with no layoffs during crises.',
      });
    }
  }

  /* ──────── INDEPENDENCE & UNDERDEVELOPMENT ──────── */
  if (sid === 'independence-underdevelopment') {
    // Literacy campaign
    if (!hasEvent(events, 'literacy-campaign') && socialSpendingShare > 0.4 && state.turn > 3) {
      push(events, {
        id: 'literacy-campaign',
        turn: nextTurn,
        type: 'milestone',
        title: 'Literacy Campaign Succeeds',
        description: 'Your investment in education is paying off. Literacy rates are rising rapidly. Cuba achieved 99.8% literacy through similar programs, and Kerala (India) achieved 96% literacy at very low GDP. Education is the foundation of development regardless of economic system.',
      });
      newCountry.institutionQuality = Math.min(1, newCountry.institutionQuality + 0.04);
    }
    // Former colonial power trade deal
    if (!hasEvent(events, 'colonial-trade-deal') && state.turn > 4 && rng() < 0.35) {
      push(events, {
        id: 'colonial-trade-deal',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'Former Colonial Power Offers Trade Deal',
        description: 'Your former colonizer offers a trade agreement, but on terms that would keep you exporting raw materials and importing their manufactured goods. Structuralist economists like Raúl Prebisch warned that this "dependency" trap keeps developing countries poor. You could accept for short-term stability or reject to build your own industries.',
      });
    }
    // Mineral discovery
    if (!hasEvent(events, 'mineral-discovery') && state.turn > 5 && rng() < 0.3) {
      push(events, {
        id: 'mineral-discovery',
        turn: nextTurn,
        type: 'milestone',
        title: 'Valuable Minerals Discovered',
        description: 'Geologists found significant mineral deposits. This could be a blessing or a curse — the "resource curse" afflicts many developing countries where mineral wealth funds corruption rather than development. Norway avoided this through public ownership (Equinor) and a sovereign wealth fund. Your institutions and policies will determine the outcome.',
      });
      g = { ...g, commodityPriceIndex: g.commodityPriceIndex * 1.05 };
    }
    // Land reform
    if (!hasEvent(events, 'land-reform') && planningIntensity > 0.3 && state.turn > 3) {
      push(events, {
        id: 'land-reform',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'Land Reform Movement',
        description: 'Peasants are demanding redistribution of land from large estates. Land reform was crucial to the success of South Korea, Taiwan, and Japan — it broke feudal power structures and increased agricultural productivity. But poorly executed land reform (Zimbabwe) can devastate agriculture.',
      });
    }
    // Nationalisation sanctions
    if (!hasEvent(events, 'geo-sanctions-nationalize')) {
      const nationalizing = (planningIntensity > 0.5 && publicBankingStrength > 0.4) || (profitWindfallTaxRate > 0.12 && planningIntensity > 0.4);
      if (nationalizing) {
        push(events, {
          id: 'geo-sanctions-nationalize',
          turn: nextTurn,
          type: 'warning',
          title: 'Sanctions Imposed After Nationalization',
          description: 'Your nationalization of key industries angered powerful foreign interests. Sanctions have been imposed. This happened to Iran, Cuba, and Venezuela when they nationalized oil. However, many countries — including the UK, France, and Norway — nationalized industries without this backlash. Geopolitical power dynamics determine the response more than economics.',
        });
        g = { ...g, sanctionsActive: true, riskPremium: g.riskPremium + 0.035, exportDemandMultiplier: g.exportDemandMultiplier * 0.82 };
      }
    }
    // Healthcare achievement
    if (!hasEvent(events, 'healthcare-milestone') && basicGoodsGuarantee > 0.5 && socialSpendingShare > 0.4 && state.turn > 5) {
      push(events, {
        id: 'healthcare-milestone',
        turn: nextTurn,
        type: 'milestone',
        title: 'Public Health Improves Dramatically',
        description: 'Universal healthcare and basic goods provision are saving lives. Infant mortality drops and life expectancy rises. Cuba achieves health outcomes comparable to wealthy nations at a fraction of the cost. Your investment in people is your greatest asset.',
      });
    }
  }

  /* ──────── COMMODITY PRESSURE ──────── */
  if (sid === 'commodity-pressure') {
    // Commodity crash
    if (!hasEvent(events, 'commodity-crash') && state.turn > 3 && rng() < 0.3) {
      push(events, {
        id: 'commodity-crash',
        turn: nextTurn,
        type: 'shock',
        title: 'Commodity Prices Collapse',
        description: 'Global demand for your primary exports has fallen sharply. This is exactly the vulnerability that structuralist economists warned about — dependence on commodity exports leaves you at the mercy of global markets. Diversifying your economy through industrial policy is the long-term solution.',
      });
      g = { ...g, commodityPriceIndex: g.commodityPriceIndex * 0.7, exportDemandMultiplier: g.exportDemandMultiplier * 0.85 };
    }
    // New trade agreement
    if (!hasEvent(events, 'new-trade-deal') && state.turn > 5 && rng() < 0.35) {
      push(events, {
        id: 'new-trade-deal',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'Regional Trade Agreement Proposed',
        description: 'Neighboring countries propose a regional trade bloc. South-South cooperation (like ASEAN or Mercosur) can provide markets for your developing industries without the power imbalance of deals with wealthy nations.',
      });
      g = { ...g, exportDemandMultiplier: g.exportDemandMultiplier * 1.05 };
    }
    // Drought
    if (!hasEvent(events, 'drought') && state.turn > 4 && rng() < 0.25) {
      push(events, {
        id: 'drought',
        turn: nextTurn,
        type: 'shock',
        title: 'Severe Drought Hits Agriculture',
        description: 'A devastating drought reduces agricultural output. Food prices rise and rural communities suffer. Climate change is making these events more frequent. Investment in irrigation infrastructure and crop insurance can build resilience.',
      });
      g = { ...g, commodityPriceIndex: g.commodityPriceIndex * 1.15 };
    }
    // Creditor reaction
    if (!hasEvent(events, 'geo-creditors-restructure') && debtRestructuringStance > 0.55) {
      push(events, {
        id: 'geo-creditors-restructure',
        turn: nextTurn,
        type: 'warning',
        title: 'Creditors React to Restructuring',
        description: 'You pushed back on debt repayment terms. Creditors are upset. But economists like Joseph Stiglitz argue that odious debts — taken on by dictators or under predatory terms — should be restructured. Ecuador (2008) defaulted on unjust debts and recovered well.',
      });
      g = { ...g, riskPremium: g.riskPremium + 0.03 };
    }
    // Foreign aid with conditions
    if (!hasEvent(events, 'conditional-aid') && newCountry.gdpGrowth < -0.02 && state.turn > 4) {
      push(events, {
        id: 'conditional-aid',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'Foreign Aid Offered With Conditions',
        description: 'A wealthy country offers aid, but requires you to liberalize your economy, cut tariffs, and privatize state enterprises. The "Washington Consensus" prescribed this recipe for decades. Countries that followed it (much of Africa, Latin America) often saw deindustrialization. Countries that rejected it (China, Vietnam) grew rapidly.',
      });
    }
  }

  /* ──────── RISING INDUSTRIALIZER ──────── */
  if (sid === 'rising-industrializer') {
    // Environmental crisis
    if (!hasEvent(events, 'environmental-crisis') && newCountry.gdpGrowth > 0.04 && state.turn > 4) {
      push(events, {
        id: 'environmental-crisis',
        turn: nextTurn,
        type: 'warning',
        title: 'Environmental Damage from Rapid Growth',
        description: 'Rapid industrialization is polluting rivers and air. This happened in every country that industrialized — London\'s "Great Smog" of 1952, China\'s air pollution crisis in the 2010s. Environmental regulation has costs but also drives green innovation (the Porter Hypothesis). Ignoring it creates long-term health and productivity costs.',
      });
    }
    // Technology transfer
    if (!hasEvent(events, 'tech-transfer') && tariffRate > 0.15 && state.turn > 3 && rng() < 0.4) {
      push(events, {
        id: 'tech-transfer',
        turn: nextTurn,
        type: 'milestone',
        title: 'Foreign Technology Transferred',
        description: 'A multinational corporation wants access to your market and agrees to share technology with local firms. China required this of every foreign company entering its market. South Korea licensed foreign technology and then improved it. This is how countries catch up — not through free markets alone.',
      });
      newCountry.institutionQuality = Math.min(1, newCountry.institutionQuality + 0.02);
    }
    // Rural-urban migration
    if (!hasEvent(events, 'urbanization') && state.turn > 3 && newCountry.gdpGrowth > 0.02) {
      push(events, {
        id: 'urbanization',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'Mass Rural-Urban Migration',
        description: 'Workers are flooding into cities seeking factory jobs. This is the Lewis model of development — transferring labor from low-productivity agriculture to high-productivity industry. Managing this transition (housing, infrastructure, services) is critical. China\'s hukou system attempted to manage it; India struggles without one.',
      });
    }
    // Export success
    if (!hasEvent(events, 'export-takeoff') && tariffRate > 0.15 && state.turn > 6 && newCountry.gdpGrowth > 0.03) {
      push(events, {
        id: 'export-takeoff',
        turn: nextTurn,
        type: 'milestone',
        title: 'Exports Take Off',
        description: 'Your protected industries have matured and are now competitive internationally. Exports surge. This is exactly what happened in South Korea and Taiwan — infant industries grew behind tariff walls, then became world-class exporters. The key was EXPORT DISCIPLINE alongside protection.',
      });
      g = { ...g, exportDemandMultiplier: g.exportDemandMultiplier * 1.08 };
    }
    // Trade accusation
    if (!hasEvent(events, 'geo-unfair-trade') && planningIntensity > 0.55 && tariffRate > 0.18) {
      push(events, {
        id: 'geo-unfair-trade',
        turn: nextTurn,
        type: 'warning',
        title: 'Accused of Unfair Trade',
        description: 'Wealthy countries accuse you of using state subsidies and protection unfairly. But Ha-Joon Chang points out that EVERY wealthy country used these same tactics during their development — Britain, the US, Germany, Japan. They are "kicking away the ladder" they climbed.',
      });
      g = { ...g, exportDemandMultiplier: g.exportDemandMultiplier * 0.92 };
    }
    // Developmental state milestone
    if (!hasEvent(events, 'dev-state-success') && planningIntensity > 0.3 && infrastructureShare > 0.3 && socialSpendingShare > 0.35 && state.turn > 7) {
      push(events, {
        id: 'dev-state-success',
        turn: nextTurn,
        type: 'milestone',
        title: 'Developmental State Model Working',
        description: 'Your combination of industrial policy, infrastructure investment, and social spending is driving sustained growth. This is the East Asian developmental state model — coordinated state intervention creating the conditions for rapid industrialization. You\'re following in the footsteps of South Korea, Taiwan, and Singapore.',
      });
    }
  }

  /* ──────── SANCTIONS & ISOLATION ──────── */
  if (sid === 'sanctions-isolation') {
    // Black market growth
    if (!hasEvent(events, 'black-market') && priceControlStrength > 0.5 && state.turn > 3) {
      push(events, {
        id: 'black-market',
        turn: nextTurn,
        type: 'warning',
        title: 'Black Market Grows',
        description: 'Heavy price controls under sanctions are creating shortages. A black market is emerging. The USSR experienced this — official prices were low but goods were scarce. Moderate price controls with strong enforcement work better than trying to control everything.',
      });
    }
    // Allied trade deal
    if (!hasEvent(events, 'ally-trade') && state.turn > 4 && rng() < 0.35) {
      push(events, {
        id: 'ally-trade',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'Friendly Country Offers Trade Deal',
        description: 'A country not participating in sanctions offers to trade with you. Cuba survived sanctions partly through Soviet trade; Iran developed regional trade networks. Sanctions are rarely total — there are almost always alternative partners.',
      });
      g = { ...g, exportDemandMultiplier: g.exportDemandMultiplier * 1.06 };
    }
    // Domestic innovation
    if (!hasEvent(events, 'necessity-innovation') && planningIntensity > 0.4 && state.turn > 6 && rng() < 0.4) {
      push(events, {
        id: 'necessity-innovation',
        turn: nextTurn,
        type: 'milestone',
        title: 'Innovation Born of Necessity',
        description: 'Unable to import technology, your engineers developed their own solutions. Iran built a domestic tech sector under sanctions. Cuba developed world-class biotech despite isolation. Necessity is the mother of invention — but this path is slower and more costly than technology transfer.',
      });
      newCountry.institutionQuality = Math.min(1, newCountry.institutionQuality + 0.02);
    }
    // Diplomatic opening
    if (!hasEvent(events, 'diplomatic-opening') && state.turn > 8 && rng() < 0.3) {
      push(events, {
        id: 'diplomatic-opening',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'Diplomatic Channel Opens',
        description: 'Backchannel negotiations offer a path to reducing sanctions. Some sanctions may be eased if you make concessions on certain policies. This mirrors Iran\'s nuclear deal negotiations or Cuba\'s gradual opening under Obama.',
      });
      g = { ...g, riskPremium: Math.max(0, g.riskPremium - 0.01), exportDemandMultiplier: g.exportDemandMultiplier * 1.03 };
    }
    // Sanctions tightening
    if (!hasEvent(events, 'geo-sanctions-tighten') && planningIntensity > 0.6 && priceControlStrength > 0.6) {
      push(events, {
        id: 'geo-sanctions-tighten',
        turn: nextTurn,
        type: 'warning',
        title: 'Sanctions Intensify',
        description: 'Your defiant economic policies have prompted harsher sanctions. However, Cuba, Iran, and Russia have all survived decades of sanctions through domestic production, alternative trade partners, and state planning. Sanctions hurt but rarely achieve regime change.',
      });
      g = { ...g, riskPremium: g.riskPremium + 0.025, exportDemandMultiplier: g.exportDemandMultiplier * 0.85 };
    }
    // Public resilience
    if (!hasEvent(events, 'public-resilience') && basicGoodsGuarantee > 0.5 && newCountry.approval > 0.5 && state.turn > 5) {
      push(events, {
        id: 'public-resilience',
        turn: nextTurn,
        type: 'milestone',
        title: 'Public Rallies Behind Government',
        description: 'Despite sanctions, your guarantee of basic goods maintains public support. The "rally around the flag" effect combined with visible government provision of essentials creates social cohesion. Cuba maintained high social indicators throughout decades of embargo through this approach.',
      });
    }
  }

  /* ──────── CHOKEPOINT CLOSURE ──────── */
  if (sid === 'chokepoint-closure') {
    if (!hasEvent(events, 'chokepoint-closure-initial') && state.turn >= 1) {
      push(events, {
        id: 'chokepoint-closure-initial',
        turn: nextTurn,
        type: 'shock',
        title: 'Critical Sea Lane Shut Down',
        description: 'A major maritime chokepoint has been closed by conflict, disrupting a large share of global oil and container flows. Freight rates jump, insurers raise premia, and import costs rise sharply. This is a classic geopolitical supply shock: inflation rises even as growth slows.',
      });
      g = {
        ...g,
        commodityPriceIndex: g.commodityPriceIndex * 1.35,
        exportDemandMultiplier: g.exportDemandMultiplier * 0.84,
        riskPremium: g.riskPremium + 0.018,
      };
    }

    if (!hasEvent(events, 'chokepoint-rerouting') && state.turn > 4 && (planningIntensity > 0.35 || infrastructureShare > 0.35 || capitalControlStrength > 0.4)) {
      push(events, {
        id: 'chokepoint-rerouting',
        turn: nextTurn,
        type: 'milestone',
        title: 'Emergency Rerouting Network Built',
        description: 'Public coordination with ports, logistics firms, and regional partners is easing bottlenecks. Rerouting through longer sea paths is costly, but inventories are rebuilding and panic in wholesale markets is cooling.',
      });
      g = {
        ...g,
        exportDemandMultiplier: g.exportDemandMultiplier * 1.07,
        riskPremium: Math.max(0, g.riskPremium - 0.008),
      };
    }

    if (!hasEvent(events, 'chokepoint-energy-rationing') && state.turn > 3 && basicGoodsGuarantee < 0.25 && priceControlStrength < 0.2 && rng() < 0.4) {
      push(events, {
        id: 'chokepoint-energy-rationing',
        turn: nextTurn,
        type: 'warning',
        title: 'Fuel and Transport Rationing Pressures',
        description: 'Without targeted protection, high fuel import costs are spilling into transport and food distribution. Households face shortages and firms cut shifts. Some analysts argue that strategic buffering and targeted subsidies can prevent supply shocks from becoming social crises.',
      });
      newCountry.approval = Math.max(0, newCountry.approval - 0.06);
    }

    if (!hasEvent(events, 'chokepoint-reopening') && state.turn > 8 && rng() < 0.35) {
      push(events, {
        id: 'chokepoint-reopening',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'Partial Maritime Reopening',
        description: 'A mediated ceasefire and naval escort arrangement allow limited transit through the chokepoint. Shipping costs remain elevated, but the worst bottlenecks begin to unwind.',
      });
      g = {
        ...g,
        commodityPriceIndex: g.commodityPriceIndex * 0.88,
        exportDemandMultiplier: g.exportDemandMultiplier * 1.05,
      };
    }
  }

  /* ──────── HIGH DEBT ──────── */

  // REBALANCED: No arbitrary debt panic. Debt sustainability depends on context.
  // Monetarily sovereign countries can sustain much higher debt (Japan: 250%+)
  // Foreign-currency borrowers face real constraints
  // Debt-to-GDP can rise from austerity (denominator effect)
  const scenarioParams = state.scenario as unknown as Record<string, unknown>;
  const debtThreshold = (scenarioParams.debtSustainabilityThreshold as number) ?? 1.0;
  if (newCountry.debtToGdp > debtThreshold) {
    // Only warn — don't automatically penalise
    if (!hasEvent(events, `debt-warning-${state.turn}`)) {
      push(events, {
        id: `debt-warning-${state.turn}`,
        turn: nextTurn,
        type: 'warning',
        title: 'High Government Debt',
        description: `Debt is ${(newCountry.debtToGdp * 100).toFixed(0)}% of GDP. Whether this is a problem depends on context. Japan functions at 250%. The key is: can you grow faster than your interest rate (r < g)? Is debt in your own currency? Are you investing productively?`,
      });
    }
  }
  if (newCountry.inflationRate > 0.10) {
    if (!hasEvent(events, `inflation-warning-${state.turn}`)) {
      push(events, {
        id: `inflation-warning-${state.turn}`,
        turn: nextTurn,
        type: 'warning',
        title: 'High Inflation',
        description: `Prices rising at ${(newCountry.inflationRate * 100).toFixed(1)}%/year. Is this demand-pull (too much spending) or cost-push (supply shock)? The right response depends on the cause. Rate hikes fight demand inflation but worsen cost-push recessions. Consider incomes policy and supply-side investment.`,
      });
    }
  }

  return g;
}

/* ═══════════════════════════════════════════════════════════
   MAIN STEP FUNCTION
   ═══════════════════════════════════════════════════════════ */

export function step(
  state: SimulationState,
  actions: PolicyActions,
  _rng?: () => number,
): SimulationState {
  const { country, global, scenario } = state;
  const previousGdp = state.previousGdp ?? state.country.gdp;

  const countryWithPolicy = applyPolicyToCountry(country, scenario, actions);
  const taxRate = clamp(actions.incomeTaxRate ?? 0.2, scenario.minTaxRate, scenario.maxTaxRate);
  const spendingShare = clamp(actions.spendingShareOfGdp ?? 0.25, scenario.minSpendingShare, scenario.maxSpendingShare);
  const tariffRate = actions.tariffRate ?? 0.1;
  const policyRate = countryWithPolicy.policyRate;
  const regime = actions.exchangeRateRegime ?? 'managed';
  const socialSpendingShare = actions.socialSpendingShare ?? 0.35;
  const profitWindfallTaxRate = clamp(actions.profitWindfallTaxRate ?? 0, 0, 0.2);
  const priceControlStrength = clamp(actions.priceControlStrength ?? 0, 0, 1);
  const incomesPolicyStrength = clamp(actions.incomesPolicyStrength ?? 0, 0, 1);
  const capitalControlStrength = clamp(actions.capitalControlStrength ?? 0, 0, 1);
  const domesticDebtShare = clamp(actions.domesticDebtShare ?? 0.5, 0, 1);
  const basicGoodsGuarantee = clamp(actions.basicGoodsGuarantee ?? 0, 0, 1);
  const planningIntensity = clamp(actions.planningIntensity ?? 0, 0, 1);
  const publicBankingStrength = clamp(actions.publicBankingStrength ?? 0, 0, 1);
  const debtRestructuringStance = clamp(actions.debtRestructuringStance ?? 0, 0, 1);
  const multiYearAgendaStrength = clamp(actions.multiYearAgendaStrength ?? 0, 0, 1);
  const infrastructureShare = clamp(actions.infrastructureShare ?? 0, 0, 1);
  const financialRegulationStrength = clamp(actions.financialRegulationStrength ?? 0, 0, 1);

  /* ── Demand equilibrium ── */
  const { y, c, i, g, x, m } = equilibriumY(
    countryWithPolicy,
    global,
    scenario,
    actions,
    previousGdp,
  );

  /* ── External sector ── */
  const currentAccount = x - m;
  const erChange = exchangeRateChange(currentAccount, y, regime, capitalControlStrength, country.fxReserves);
  const newExchangeRate = country.exchangeRate * (1 + erChange);

  /* ── Inflation ── */
  const nextInf = nextInflation(country, global, scenario, erChange, priceControlStrength, incomesPolicyStrength, basicGoodsGuarantee);
  const nextPiE = nextInflationExpectations(country.inflationExpectations, nextInf, 0.025, multiYearAgendaStrength);

  /* ── Fiscal ── */
  const rev = taxRevenue(y, m, taxRate, tariffRate, profitWindfallTaxRate, planningIntensity)
    + publicBankingRevenue(y, publicBankingStrength);
  const exp = expenditure(y, spendingShare);
  const deficit = exp - rev;

  /* ── Risk premium: REBALANCED ──
     No arbitrary threshold. Risk depends on:
     - Growth vs interest rate (r - g)
     - Currency sovereignty (domestic debt share)
     - Capital controls (reduce speculative pressure)
     - Public banking (stabilises financial system)
  */
  const scenarioParams = scenario as unknown as Record<string, unknown>;
  const debtThreshold = (scenarioParams.debtSustainabilityThreshold as number) ?? 1.0;
  let riskPremium = global.riskPremium;
  // Gradual risk, not cliff: mild increase above threshold
  if (country.debtToGdp > debtThreshold) {
    riskPremium += 0.008 * (country.debtToGdp - debtThreshold);
  }
  // But domestic debt is much safer (Japan model)
  riskPremium *= 1 - 0.3 * domesticDebtShare;
  // Capital controls reduce speculative pressure
  riskPremium *= 1 - 0.25 * capitalControlStrength;
  // Public banking stabilises
  riskPremium *= 1 - 0.1 * publicBankingStrength;
  // Debt restructuring: short-term pain, but reasonable stance
  riskPremium += 0.015 * debtRestructuringStance;

  const newDebt = nextDebt(country.publicDebt, deficit, policyRate, riskPremium, debtRestructuringStance, scenario.periodsPerYear ?? 4);
  const debtToGdp = y > 0 ? newDebt / y : 0;

  /* ── Production (updated with planning/infra bonuses) ── */
  const sectorOutputs = computeSectorOutputs(country, planningIntensity, infrastructureShare, publicBankingStrength, tariffRate);
  const gdpGrowth = previousGdp > 0 ? (y - previousGdp) / previousGdp : 0;

  /* ── Employment ── */
  // Full Okun's law: unemployment responds to growth in both directions
  // Contraction raises unemployment sharply; expansion lowers it gradually
  const planningEmploymentBonus = planningIntensity * 0.02;
  const okunEffect = gdpGrowth >= 0
    ? 0.12 * gdpGrowth   // recovery: each 1pp growth cuts ~0.12pp unemployment
    : 0.25 * gdpGrowth;  // contraction: each 1pp decline raises ~0.25pp unemployment
  const baseEmployment = country.laborForce * (1 - 0.05 + okunEffect + planningEmploymentBonus);
  const employed = Math.min(country.laborForce, Math.max(0, baseEmployment));
  const unemployed = Math.max(0, country.laborForce - employed);
  const unemploymentRate = country.laborForce > 0 ? unemployed / country.laborForce : 0.05;

  /* ── Institution quality: slowly evolves ── */
  const instImprovement = 0.005 * socialSpendingShare
    + 0.003 * Math.min(1, infrastructureShare)
    + 0.002 * financialRegulationStrength
    - 0.005 * Math.max(0, planningIntensity - 0.7); // heavy planning can erode institutions
  const newInstitutionQuality = clamp(country.institutionQuality + instImprovement, 0.1, 1.0);

  /* ── Terms of trade (Prebisch-Singer) ── */
  const prevToT = country.termsOfTrade ?? 1.0;
  const newTermsOfTrade = nextTermsOfTrade(prevToT, scenario.scenarioId, tariffRate, capitalControlStrength, global.commodityPriceIndex);

  /* ── Wage share (Kaleckian distribution) ── */
  const prevWageShare = country.wageShare ?? 0.5;
  const wageShareDrift =
    0.02 * socialSpendingShare
    + 0.015 * incomesPolicyStrength
    + 0.01 * planningIntensity
    + 0.01 * basicGoodsGuarantee
    - 0.02 * Math.max(0, gdpGrowth - 0.03)  // fast growth without redistribution favors capital
    - 0.015 * (1 - financialRegulationStrength) * Math.max(0, gdpGrowth)
    - 0.01 * Math.max(0, 0.3 - taxRate);  // low taxes favor capital
  const newWageShare = clamp(prevWageShare + wageShareDrift, 0.2, 0.75);

  /* ── Profit rate (Marxian) ── */
  const totalCapital = Object.values(country.sectors).reduce((sum, s) => sum + s.capitalStock, 0);
  const wages = y * newWageShare;
  const newProfitRate = totalCapital > 0 ? (y - wages) / totalCapital : 0.1;

  /* ── Financial fragility (Minsky) ── */
  const prevFragility = country.financialFragility ?? 0.1;
  const fragilityChange =
    0.03 * (1 - financialRegulationStrength) * Math.max(0, gdpGrowth)
    + 0.02 * (1 - financialRegulationStrength)
    - 0.04 * financialRegulationStrength
    - 0.02 * publicBankingStrength;
  let newFragility = clamp(prevFragility + fragilityChange, 0, 1);

  /* ── Approval (class-based) ── */
  const approvalInput = {
    ...countryWithPolicy,
    gdp: y,
    gdpGrowth,
    unemploymentRate,
    inflationRate: nextInf,
    institutionQuality: newInstitutionQuality,
    wageShare: newWageShare,
    termsOfTrade: newTermsOfTrade,
    financialFragility: newFragility,
    profitRate: newProfitRate,
    workerSupport: 0.5,
    eliteSupport: 0.5,
  } as CountryState;
  const approvalResult = approvalBreakdown(
    approvalInput,
    socialSpendingShare,
    basicGoodsGuarantee,
    multiYearAgendaStrength,
    taxRate,
    financialRegulationStrength,
    planningIntensity,
  );

  /* ── Reserves ── */
  const reserveChange = currentAccount * 0.1 - (regime === 'managed' ? Math.abs(erChange) * y * 0.05 : 0);

  const newCountry: CountryState = {
    ...countryWithPolicy,
    gdp: y,
    gdpGrowth,
    sectors: { ...country.sectors },
    employed,
    unemployed,
    unemploymentRate,
    inflationRate: nextInf,
    inflationExpectations: nextPiE,
    exchangeRate: newExchangeRate,
    taxRevenue: rev,
    expenditure: exp,
    deficit,
    publicDebt: newDebt,
    debtToGdp,
    exports: x,
    imports: m,
    currentAccount,
    fxReserves: Math.max(0, country.fxReserves + reserveChange),
    institutionQuality: newInstitutionQuality,
    approval: approvalResult.overall,
    workerSupport: approvalResult.workerSupport,
    eliteSupport: approvalResult.eliteSupport,
    wageShare: newWageShare,
    termsOfTrade: newTermsOfTrade,
    financialFragility: newFragility,
    profitRate: newProfitRate,
  };

  /* ── Financial crisis from Minsky fragility ── */
  if (newFragility > 0.7 && prevFragility <= 0.7) {
    newCountry.gdpGrowth = Math.min(newCountry.gdpGrowth, -0.025);
    newCountry.approval = Math.max(0, newCountry.approval - 0.1);
    newFragility = 0.3;
    newCountry.financialFragility = newFragility;
  }

  /* ── Dynamic events ── */
  const events = [...state.events];
  const nextTurn = state.turn + 1;
  const rng = _rng ?? turnRng(state.turn);

  let newGlobal = generateDynamicEvents(state, newCountry, actions, nextTurn, events, global, rng);

  /* ── Commodity price cycling (endogenous global) ── */
  const cyclePhase = Math.sin(state.turn * 0.4) * 0.03;
  const commodityDrift = cyclePhase + (rng() - 0.5) * 0.04;
  newGlobal = { ...newGlobal, commodityPriceIndex: clamp(newGlobal.commodityPriceIndex + commodityDrift, 0.5, 2.0) };

  /* ── South-South cooperation (endogenous global) ── */
  const isDeveloping = ['independence-underdevelopment', 'commodity-pressure', 'rising-industrializer'].includes(scenario.scenarioId);
  if (isDeveloping && capitalControlStrength > 0.3 && planningIntensity > 0.3) {
    const ssBoost = 0.01 * (capitalControlStrength + planningIntensity - 0.6);
    newGlobal = { ...newGlobal, exportDemandMultiplier: newGlobal.exportDemandMultiplier + ssBoost };
    if (!hasEvent(events, 'south-south-coop') && capitalControlStrength > 0.5 && planningIntensity > 0.5 && state.turn > 4) {
      push(events, {
        id: 'south-south-coop',
        turn: nextTurn,
        type: 'milestone',
        title: 'South-South Cooperation Strengthens',
        description: 'Your independent economic policies are attracting trade partners from the Global South. Alternative trade networks reduce dependence on Western markets. BRICS, Mercosur, and ASEAN show that South-South cooperation can provide meaningful alternatives.',
      });
    }
  }

  return {
    turn: nextTurn,
    country: newCountry,
    global: newGlobal,
    scenario: { ...scenario },
    events,
    previousGdp: state.country.gdp,
  };
}

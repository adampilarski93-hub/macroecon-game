/**
 * LLM service — calls OpenAI-compatible Chat Completions API from the browser.
 * Falls back to template-based output when no API key is configured.
 */

import type {
  SimulationState,
  PolicyActions,
  AdvisoryItem,
  ChatMessage,
  LLMConfig,
} from '../types';

/* ────────── config helpers ────────── */

const STORAGE_KEY = 'macro-planner-llm';

export function loadLLMConfig(): LLMConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as LLMConfig;
  } catch { /* ignore */ }
  return { apiKey: '', baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o-mini', enabled: false };
}

export function saveLLMConfig(cfg: LLMConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

/* ────────── low-level API call ────────── */

interface ChatCompletionMessage { role: 'system' | 'user' | 'assistant'; content: string }

async function chatCompletion(
  cfg: LLMConfig,
  messages: ChatCompletionMessage[],
  maxTokens = 600,
): Promise<string> {
  const url = `${cfg.baseUrl.replace(/\/+$/, '')}/chat/completions`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.apiKey}` },
    body: JSON.stringify({ model: cfg.model, messages, max_tokens: maxTokens, temperature: 0.7 }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`LLM API ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? '';
}

/* ────────── state snapshot helper ────────── */

function stateSnapshot(s: SimulationState): string {
  const c = s.country;
  return [
    `Turn ${s.turn} | ${s.scenario.countryName} (${s.scenario.scenarioId})`,
    `GDP: ${c.gdp.toFixed(0)} | Growth: ${(c.gdpGrowth * 100).toFixed(2)}%`,
    `Inflation: ${(c.inflationRate * 100).toFixed(1)}% | Unemployment: ${(c.unemploymentRate * 100).toFixed(1)}%`,
    `Debt/GDP: ${(c.debtToGdp * 100).toFixed(1)}% | Deficit: ${c.deficit.toFixed(0)}`,
    `Exports: ${c.exports.toFixed(0)} | Imports: ${c.imports.toFixed(0)} | Current account: ${c.currentAccount.toFixed(0)}`,
    `Policy rate: ${(c.policyRate * 100).toFixed(2)}% | Exchange rate: ${c.exchangeRate.toFixed(2)}`,
    `Approval: ${(c.approval * 100).toFixed(0)}%`,
    `World growth: ${(s.global.worldGrowth * 100).toFixed(1)}% | Sanctions: ${s.global.sanctionsActive}`,
  ].join('\n');
}

function actionsSnapshot(a: PolicyActions): string {
  const lines: string[] = [];
  if (a.incomeTaxRate != null) lines.push(`Income tax: ${(a.incomeTaxRate * 100).toFixed(0)}%`);
  if (a.tariffRate != null) lines.push(`Tariff: ${(a.tariffRate * 100).toFixed(0)}%`);
  if (a.spendingShareOfGdp != null) lines.push(`Govt spending/GDP: ${(a.spendingShareOfGdp * 100).toFixed(0)}%`);
  if (a.policyRate != null) lines.push(`Policy rate: ${(a.policyRate * 100).toFixed(2)}%`);
  if (a.exchangeRateRegime) lines.push(`Exchange regime: ${a.exchangeRateRegime}`);
  if (a.socialSpendingShare != null) lines.push(`Social spending share: ${(a.socialSpendingShare * 100).toFixed(0)}%`);
  if (a.priceControlStrength) lines.push(`Price controls: ${a.priceControlStrength.toFixed(1)}`);
  if (a.planningIntensity) lines.push(`Planning intensity: ${a.planningIntensity.toFixed(1)}`);
  if (a.capitalControlStrength) lines.push(`Capital controls: ${a.capitalControlStrength.toFixed(1)}`);
  if (a.basicGoodsGuarantee) lines.push(`Basic goods guarantee: ${a.basicGoodsGuarantee.toFixed(1)}`);
  if (a.publicBankingStrength) lines.push(`Public banking: ${a.publicBankingStrength.toFixed(1)}`);
  if (a.debtRestructuringStance) lines.push(`Debt restructuring: ${a.debtRestructuringStance.toFixed(1)}`);
  return lines.join('\n');
}

/* ────────── PUBLIC API ────────── */

const SYSTEM_BASE = `You are an economics advisor in a macroeconomic simulation game called Macro Planner. The player controls fiscal, monetary, and structural policy for a fictional country. Write in plain English for a smart non-economist. Be concise. Never use markdown headers or bullet lists — write short flowing paragraphs.`;

/**
 * Generate a 3-5 sentence narrative briefing explaining what happened this turn and why.
 */
export async function generateTurnBriefing(
  cfg: LLMConfig,
  prev: SimulationState,
  curr: SimulationState,
  actions: PolicyActions,
): Promise<string> {
  if (!cfg.enabled || !cfg.apiKey) return templateTurnBriefing(prev, curr, actions);
  try {
    return await chatCompletion(cfg, [
      { role: 'system', content: `${SYSTEM_BASE}\nYou write a concise quarterly economic briefing (3-5 sentences). Explain what changed and why, referencing the player's specific policy choices. Mention causal chains (e.g. "Your tax increase cut household spending, which slowed GDP"). End with a forward-looking sentence about risks or opportunities.` },
      { role: 'user', content: `PREVIOUS STATE:\n${stateSnapshot(prev)}\n\nPOLICY ACTIONS THIS TURN:\n${actionsSnapshot(actions)}\n\nCURRENT STATE:\n${stateSnapshot(curr)}\n\nWrite the briefing.` },
    ], 350);
  } catch {
    return templateTurnBriefing(prev, curr, actions);
  }
}

/**
 * Generate personalized advisory for the current economic situation.
 */
export async function generateAdvisory(
  cfg: LLMConfig,
  state: SimulationState,
): Promise<string> {
  if (!cfg.enabled || !cfg.apiKey) return '';
  try {
    return await chatCompletion(cfg, [
      { role: 'system', content: `${SYSTEM_BASE}\nGive the player 2-3 short paragraphs of personalized policy advice for their current situation. Reference specific numbers. Mention what different economic schools of thought (mainstream, Keynesian, structuralist, Marxian) would recommend and why. Keep it practical and tied to the game's policy levers.` },
      { role: 'user', content: `CURRENT STATE:\n${stateSnapshot(state)}\n\nWrite personalized advice.` },
    ], 500);
  } catch { return ''; }
}

/**
 * Interactive chat: player asks a question about the economy.
 */
export async function chatWithAdvisor(
  cfg: LLMConfig,
  state: SimulationState,
  history: ChatMessage[],
  userMessage: string,
): Promise<string> {
  // Try LLM first if configured
  if (cfg.enabled && cfg.apiKey) {
    try {
      const messages: ChatCompletionMessage[] = [
        { role: 'system', content: `${SYSTEM_BASE}\nThe player can ask you anything about their economy, policy options, economic concepts, or real-world parallels. Always ground your answers in the current game state. Keep answers to 2-4 sentences unless the player asks for detail. If they ask "why did X happen", trace the causal chain through their policy choices.\n\nCURRENT STATE:\n${stateSnapshot(state)}` },
        ...history.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
        { role: 'user', content: userMessage },
      ];
      return await chatCompletion(cfg, messages, 400);
    } catch {
      // Fall through to template advisor
    }
  }
  // Built-in template advisor — always works, no API key needed
  return templateAdvisorChat(state, userMessage);
}

/* ────────── BUILT-IN ADVISOR (no API needed) ────────── */

/** Pick one item at random from an array */
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

/** Format a percentage nicely */
function pct(v: number, d = 1): string { return (v * 100).toFixed(d) + '%'; }

function templateAdvisorChat(state: SimulationState, question: string): string {
  const c = state.country;
  const g = state.global;
  const sid = state.scenario.scenarioId;
  const q = question.toLowerCase();
  const turn = state.turn;
  const recentEvents = state.events.slice(-3).map(e => e.title).join(', ');

  // ── Detect scenario family for thinker selection ──
  const isDeveloping = ['independence-underdevelopment', 'commodity-pressure', 'rising-industrializer'].includes(sid);
  const isSanctioned = sid === 'sanctions-isolation' || g.sanctionsActive;
  const isDebtCrisis = sid === 'emerging-debt-crisis' || c.debtToGdp > 0.7;
  const isIndustrial = ['rust-belt', 'stagflation'].includes(sid);

  // ── GDP / Growth ──
  if (q.includes('gdp') || q.includes('growth') || q.includes('grow') || q.includes('recession') || q.includes('shrink') || q.includes('output')) {
    if (c.gdpGrowth < -0.01) {
      return pick([
        `Your economy is contracting at ${pct(c.gdpGrowth)}. Michael Hudson would point out that if debt service is eating into productive investment, you're in a "debt deflation" spiral — debt grows while the economy shrinks. The way out is NOT austerity (which shrinks GDP further) but productive public investment and, if needed, debt restructuring. Hudson documented how countries that defaulted — Argentina in 2001, Iceland in 2008 — recovered faster than those that accepted creditor-imposed austerity.`,
        `GDP is falling at ${pct(c.gdpGrowth)}. Adam Tooze's analysis of the 2008 crisis showed that recessions don't self-correct — they require active political intervention. Central banks and treasuries must act decisively. In your case, raise government spending, increase infrastructure investment, and consider whether your interest rate is too high. The European austerity experiment of 2010-2015 proved that cutting your way out of a recession is self-defeating.`,
        `Contraction of ${pct(c.gdpGrowth)}. Kalecki showed that profits equal investment plus the government deficit minus savings. If private investment is collapsing, the government deficit MUST rise or profits collapse further, taking employment with them. This isn't ideology — it's accounting. Increase spending now.${isDeveloping ? ' Samir Amin would add: check whether your recession is being worsened by value transfer outward through unequal trade.' : ''}`,
      ]);
    }
    if (c.gdpGrowth < 0.02) {
      return pick([
        `Growth at ${pct(c.gdpGrowth)} is sluggish. ${isDeveloping ? 'Samir Amin argued that peripheral economies face a structural growth disadvantage because the terms of trade drain surplus to the center. Your slow growth may not be a domestic policy failure but a consequence of your position in the world economy. Consider raising tariffs and capital controls to retain more value domestically.' : 'Piketty would note that when growth is this low, inequality tends to rise (r > g — capital returns outpace the economy). Without active redistribution, wealth will concentrate, further depressing demand.'}`,
        `At ${pct(c.gdpGrowth)}, you're barely growing. ${isDebtCrisis ? 'Hudson warns that slow growth combined with debt is a trap — interest compounds while the economy stagnates. You may need to restructure debt or expand public investment to break out.' : 'Radhika Desai would suggest looking at your productive base. Countries with strong manufacturing and infrastructure outperform those dominated by finance. Raise infrastructure spending and consider industrial planning.'}`,
      ]);
    }
    return pick([
      `Growth is ${pct(c.gdpGrowth)}, which is solid. ${isDeveloping ? 'But Ruy Mauro Marini would ask: growth for whom? If this growth depends on low wages and raw material exports, it\'s "dependent development" — growth that serves foreign capital. Check whether your current account is draining surplus abroad. Raise wages and build domestic demand to make growth self-sustaining.' : 'Polanyi would remind you that growth built on deregulation and commodification of labor is fragile. Make sure social protections keep pace with market expansion — the "double movement" demands it.'}`,
      `Good growth at ${pct(c.gdpGrowth)}. Schumpeter would say growth comes from innovation and "creative destruction." But Max Ajl would counter: growth at what ecological cost? If you're growing fast without environmental policy, you're borrowing against the future. Consider whether your growth model is sustainable.`,
    ]);
  }

  // ── Inflation ──
  if (q.includes('inflation') || q.includes('prices') || q.includes('price') || q.includes('cost of living') || q.includes('expensive')) {
    if (c.inflationRate > 0.08) {
      return pick([
        `Inflation at ${pct(c.inflationRate)} is severe. The crucial distinction — which mainstream economics often ignores — is between demand-pull and cost-push inflation. ${g.commodityPriceIndex > 1.1 ? 'Your commodity prices are elevated, suggesting cost-push inflation. Raising interest rates will NOT fix supply-side problems — it will just cause a recession on top of inflation. Instead, use incomes policy to prevent a wage-price spiral, price controls on essentials to protect living standards, and invest in domestic supply capacity.' : 'This looks like demand may be overheating. A modest rate increase combined with incomes policy can cool things without the brutality of Volcker-style shock therapy.'} Polanyi would note that price controls on essentials aren't "market distortions" — they're society protecting itself from the fiction that food and energy are ordinary commodities.`,
        `At ${pct(c.inflationRate)}, prices are rising fast. Michael Hudson distinguishes between asset-price inflation (which enriches property owners) and consumer-price inflation (which hurts workers). The FIRE sector — Finance, Insurance, Real Estate — often drives the former while policymakers obsess over the latter. ${isDeveloping ? 'Arghiri Emmanuel would add that for a developing country, much of your inflation may be IMPORTED through exchange rate depreciation and expensive foreign goods. Capital controls can insulate you from imported inflation.' : 'Consider who benefits from your inflation — landlords, financiers, commodity speculators — and target policy at them.'}`,
      ]);
    }
    if (c.inflationRate > 0.04) {
      return pick([
        `Inflation is ${pct(c.inflationRate)}, moderately elevated. Before reaching for the interest rate lever, consider Kalecki's insight: the "political business cycle" means central banks often tighten prematurely to serve creditor interests at the expense of employment. A better approach may be incomes policy — coordinating wage and price growth as Australia did with the Accord (1983-1996), bringing inflation from 11% to 3% without recession.`,
        `At ${pct(c.inflationRate)}, inflation needs attention but not panic. ${isDeveloping ? 'Ali Kadri notes that developing countries are often forced into deflationary policies by international creditors, even when modest inflation is compatible with development. Don\'t sacrifice growth on the altar of price stability — your people need jobs more than they need 2% inflation targets designed for rich countries.' : 'Price controls on essentials (0.3-0.5 range) can take the edge off while you address root causes. The Nordic countries have used pharmaceutical and utility price regulation for decades with excellent results.'}`,
      ]);
    }
    return `Inflation is well-controlled at ${pct(c.inflationRate)}. This gives you policy space. ${pick([
      'Piketty would say use this stability to address inequality through progressive taxation — wealth concentration is the deeper structural problem.',
      'Use this breathing room to invest in infrastructure and human capital. Low inflation is wasted if it\'s accompanied by stagnation.',
      isDeveloping ? 'Samir Amin would note that low inflation in a peripheral economy sometimes means suppressed demand — your workers can\'t afford to buy what they produce.' : 'Stable prices are a foundation, not a destination. Build on it.',
    ])}`;
  }

  // ── Unemployment ──
  if (q.includes('unemploy') || q.includes('jobs') || q.includes('employ') || q.includes('workers') || q.includes('labor') || q.includes('work')) {
    if (c.unemploymentRate > 0.08) {
      return pick([
        `Unemployment at ${pct(c.unemploymentRate)} means real suffering. ${isDeveloping ? 'Marini\'s concept of "super-exploitation" is relevant: in dependent economies, the reserve army of unemployed workers allows capital to push wages below subsistence. The solution isn\'t just "more jobs" but DECENT jobs — raise the basic goods guarantee to establish a floor, use planning to direct investment toward labor-intensive sectors, and invest in infrastructure that employs people directly.' : 'Polanyi argued that treating labor as a commodity — to be hired and fired according to market signals — destroys communities and social bonds. Active labor market policy (retraining, public employment, social investment) treats workers as people, not inputs.'}`,
        `${pct(c.unemploymentRate)} unemployment. Kalecki showed that full employment is actually FEARED by capital because it gives workers bargaining power. The "natural rate of unemployment" is a political construct that serves employers. Your job is to push unemployment as low as possible through public investment, infrastructure, planning, and social spending. ${c.approval < 0.4 ? 'Your approval is suffering — people notice when they can\'t find work.' : ''}`,
      ]);
    }
    return pick([
      `Unemployment is ${pct(c.unemploymentRate)}. ${c.unemploymentRate < 0.04 ? 'This is excellent — workers have real bargaining power. Torkil Lauesen would point out that low unemployment in the Global North has historically depended on cheap imports produced by super-exploited labor in the South. Is your low unemployment built on a sustainable foundation, or on someone else\'s misery?' : 'Manageable, but don\'t get complacent. Invest in skills and infrastructure to keep people employed as the economy evolves.'}`,
      `At ${pct(c.unemploymentRate)}, the labor market is ${c.unemploymentRate < 0.05 ? 'tight' : 'okay'}. ${isDeveloping ? 'Remember that official unemployment figures often hide underemployment and informal work. Max Ajl argues for food sovereignty and land reform as employment strategies — not everyone needs a factory job.' : 'Focus on quality of employment, not just quantity. Well-paid, secure jobs drive demand better than precarious gig work.'}`,
    ]);
  }

  // ── Debt ──
  if (q.includes('debt') || q.includes('deficit') || q.includes('borrow') || q.includes('fiscal') || q.includes('sustainable') || q.includes('auster')) {
    return pick([
      `Debt is ${pct(c.debtToGdp, 0)} of GDP. Michael Hudson's life work demonstrates that debt is a tool of power, not just a financial instrument. ${c.debtToGdp > 0.7 ? 'When Hudson wrote "Super Imperialism," he showed how the US uses the dollar system to make other countries finance American deficits. For YOUR country, the key question is: who do you owe? Domestic-currency debt to your own citizens is fundamentally different from foreign-currency debt to international creditors. Raise the domestic debt share and consider debt restructuring — throughout history, from ancient Mesopotamia to Argentina 2001, debt cancellation has been the path to recovery.' : 'Your debt is manageable. Use this fiscal space for productive investment — infrastructure, education, industrial capacity. These generate returns that outpace the interest cost.'}`,
      `${pct(c.debtToGdp, 0)} debt-to-GDP. ${isDebtCrisis ? 'Adam Tooze documented how the European debt crisis was CREATED by austerity — Greece cut spending, GDP collapsed, and debt-to-GDP actually ROSE from 127% to 177%. The lesson is clear: you cannot cut your way to solvency in a weak economy. If international creditors are demanding austerity, remember that Ali Kadri showed how structural adjustment programs systematically deindustrialized the Arab world. Default and rebuild may be better than comply and decline.' : 'Radhika Desai argues that debt sustainability depends on monetary sovereignty. If you issue your own currency, you face inflation risk, not default risk. Japan has 250% debt-to-GDP and no crisis because the Bank of Japan accommodates. The "debt crisis" framing often serves creditor interests, not yours.'}`,
    ]);
  }

  // ── Trade / exchange / delink ──
  if (q.includes('trade') || q.includes('tariff') || q.includes('export') || q.includes('import') || q.includes('exchange') || q.includes('currency') || q.includes('delink') || q.includes('protection')) {
    return pick([
      `${isDeveloping ? `Arghiri Emmanuel's theory of unequal exchange is essential here. When your low-wage workers produce goods sold at world-market prices set by high-wage countries, value flows OUT of your economy with every transaction. Your current account is ${c.currentAccount.toFixed(0)}. ${c.currentAccount < 0 ? 'You\'re losing value on both ends — importing expensive goods and exporting cheap ones. Samir Amin\'s prescription is "delinking": raise tariffs, impose capital controls, develop domestic industry behind protective walls, and trade with other Southern countries on more equal terms. This is exactly what South Korea, Taiwan, and China did.' : 'Your trade balance is positive, which helps, but check whether your exports are raw materials or manufactured goods. Exporting commodities at volatile world prices while importing expensive manufactures is the dependency trap that Prebisch identified in the 1950s.'}` : `Your trade balance is ${c.currentAccount.toFixed(0)}. ${c.currentAccount < -30 ? 'A large deficit means you\'re dependent on foreign capital inflows to finance your imports. Torkil Lauesen points out that this creates vulnerability — when capital flows reverse (as in 1997 Asia or 2008), the crash is devastating. Capital controls provide insurance against sudden stops.' : 'Trade looks manageable. Radhika Desai argues that the era of unchallenged dollar hegemony is ending — building diverse trade relationships and regional blocs reduces dependence on any single power.'}`}`,
      `On trade: every successful industrializer — Britain, the US, Germany, Japan, South Korea, China — used tariffs and industrial policy to develop. Ha-Joon Chang calls the insistence on free trade for developing countries "kicking away the ladder." ${isDeveloping ? 'Samir Amin went further: he argued that participation in the world market on unequal terms is itself a mechanism of exploitation. Consider whether integration serves YOUR development or merely provides cheap labor and materials to wealthy nations.' : 'Even for an advanced economy, strategic trade policy matters. Managed exchange rates and targeted protection can support domestic industry.'} Your tariff and capital control settings are your main levers here.`,
    ]);
  }

  // ── Planning / state / nationalization / socialism ──
  if (q.includes('plan') || q.includes('state') || q.includes('government role') || q.includes('national') || q.includes('public bank') || q.includes('social') || q.includes('marx')) {
    return pick([
      `${isDeveloping ? 'Samir Amin argued that the developmental state — strong planning, public banking, directed investment — is not just one option among many for peripheral countries. It\'s the ONLY path that has historically produced genuine industrialization. Every success story (South Korea, Taiwan, China) involved heavy state direction. The "free market" path prescribed by the IMF produced deindustrialization across Africa and Latin America. Raise your planning intensity to 0.3-0.5, invest in infrastructure, and use public banking to direct credit toward strategic sectors.' : 'Lenin and Bukharin analyzed how the state and monopoly capital fuse in advanced capitalism. The question isn\'t WHETHER the state intervenes in the economy — it always does — but in whose interest. Public banking, directed investment, and planning can serve the public; deregulation and privatization serve finance capital. Michael Hudson calls the modern financialized economy a "rentier" system where the FIRE sector extracts rather than produces.'} Your planning intensity and public banking sliders are the key tools.`,
      `Nikolai Bukharin wrote about "transition economics" — how to build a new economic system under hostile conditions. ${isSanctioned ? 'Under sanctions, you\'re essentially forced into a version of this. Direct the economy through planning, build domestic substitutes for imports, and use public banking to allocate scarce credit.' : 'Even without sanctions, public ownership and planning can outperform markets in infrastructure, utilities, healthcare, and strategic industries.'} Karl Polanyi showed that the "free market" is itself a political project enforced by the state — there is no neutral baseline. The choice is always: state intervention for whom?`,
    ]);
  }

  // ── Who agrees with my strategy ──
  if (q.includes('agree') || q.includes('who would') || q.includes('school') || q.includes('which economist') || q.includes('ideology')) {
    const approachProfile: string[] = [];
    // Analyze current policy stance from state
    if (c.debtToGdp < 0.5 && c.gdpGrowth > 0.02) approachProfile.push('growth-oriented');
    if (c.inflationRate < 0.04) approachProfile.push('price-stable');
    if (c.approval > 0.5) approachProfile.push('popular');
    if (c.unemploymentRate < 0.05) approachProfile.push('full-employment');

    return `Based on your current situation — ${pct(c.gdpGrowth)} growth, ${pct(c.inflationRate)} inflation, ${pct(c.unemploymentRate)} unemployment, ${pct(c.debtToGdp, 0)} debt — here's how different thinkers would evaluate you: ${pick([
      `Piketty would focus on whether inequality is rising behind your aggregate numbers. Hudson would ask if your financial sector is extracting rents or supporting production. ${isDeveloping ? 'Samir Amin would ask: is your growth generating domestic capacity or just feeding export dependency? Marini would check whether your workers are being "super-exploited" — growing GDP means nothing if wages don\'t rise.' : 'Polanyi would ask whether your growth is embedded in social protections or tearing the social fabric. Tooze would check your financial fragility — is a Minsky moment building?'}`,
      `${c.gdpGrowth > 0.03 ? 'Your growth is strong. Desai would approve if it\'s based on productive capacity. Lauesen would ask if it depends on cheap Southern imports.' : 'Growth is modest.'} ${c.approval > 0.45 ? 'Good approval — Polanyi would say your social protections are working.' : 'Low approval — Kalecki would say the working class is paying the price of your strategy.'} ${isDeveloping ? 'Amin and Emmanuel would evaluate whether you\'re retaining surplus domestically or losing it through unequal exchange.' : ''}`,
    ])}`;
  }

  // ── Risks ──
  if (q.includes('risk') || q.includes('danger') || q.includes('watch') || q.includes('worry') || q.includes('threat') || q.includes('warning')) {
    const risks: string[] = [];
    if (c.inflationRate > 0.06) risks.push(`Inflation at ${pct(c.inflationRate)} could spiral if expectations become unanchored`);
    if (c.debtToGdp > 0.7 && c.gdpGrowth < 0.02) risks.push(`Hudson's debt deflation: debt at ${pct(c.debtToGdp, 0)} with weak growth means the debt burden is compounding`);
    if (c.unemploymentRate > 0.08) risks.push(`Mass unemployment creates political instability — Polanyi's counter-movement could turn destructive`);
    if (c.currentAccount < -30 && !isSanctioned) risks.push(`Large trade deficit makes you vulnerable to a "sudden stop" in capital flows (Tooze)`);
    if (c.approval < 0.3) risks.push(`Approval at ${pct(c.approval, 0)} is dangerously low — you could lose power`);
    if (g.sanctionsActive) risks.push(`Sanctions are constraining your options — Kadri showed how sustained sanctions can deindustrialize an economy`);
    if (isDeveloping && c.currentAccount < 0) risks.push(`Value is flowing out through unequal exchange (Emmanuel, Amin)`);

    if (risks.length === 0) {
      return `Your economy looks relatively stable right now. But Minsky's core insight is that "stability breeds instability" — long periods of calm encourage risk-taking that eventually produces crisis. ${pick(['Keep financial regulation strong.', 'Watch for asset bubbles.', 'Don\'t let success make you complacent about inequality.'])} ${recentEvents ? `Recent events (${recentEvents}) may signal emerging pressures.` : ''}`;
    }
    return `Key risks right now: ${risks.join('. ')}. ${pick([
      'Tooze would warn that these risks can interact — a "polycrisis" where financial, political, and economic shocks compound each other.',
      'Hudson would say: follow the money. Who benefits from the current trajectory, and who bears the risk?',
      'Amin would note that for peripheral countries, the biggest risk is often EXTERNAL — shifts in world commodity prices, capital flow reversals, or imperial policy changes that you can\'t control.',
    ])}`;
  }

  // ── What should I do / prioritize ──
  if (q.includes('what should') || q.includes('what do') || q.includes('advice') || q.includes('recommend') || q.includes('suggest') || q.includes('help') || q.includes('priorit')) {
    const issues: string[] = [];
    if (c.gdpGrowth < 0) issues.push('recession');
    if (c.inflationRate > 0.06) issues.push('inflation');
    if (c.unemploymentRate > 0.07) issues.push('unemployment');
    if (c.debtToGdp > 0.7) issues.push('debt burden');
    if (c.approval < 0.35) issues.push('political crisis');
    if (c.currentAccount < -25) issues.push('trade drain');

    if (issues.length === 0) {
      return pick([
        `Your economy is in decent shape. Now is the time for structural investment. Piketty would say: use this stability to build progressive taxation and reduce inequality before r > g concentrates wealth further. ${isDeveloping ? 'Amin would say: use this window to deepen industrialization and reduce dependence on commodity exports. Build the productive capacity that will sustain you when the next external shock hits.' : 'Polanyi would say: strengthen social protections now, while you can afford it. The next crisis will test your social fabric.'}`,
        `Things are stable — use it wisely. Max Ajl would argue for investing in food sovereignty and ecological sustainability. Desai would push for deepening productive capacity and South-South trade relationships. Hudson would say: regulate finance before it becomes parasitic. The best time to build resilience is when you don't urgently need it.`,
      ]);
    }

    const adviceParts: string[] = [`Your most pressing issues: ${issues.join(', ')}.`];
    if (issues.includes('recession')) adviceParts.push(`For the recession: expand government spending and infrastructure investment immediately. Tooze showed that every successful crisis response involved massive state intervention — the 2008 response, the COVID response. Austerity in a downturn is self-defeating.`);
    if (issues.includes('inflation')) adviceParts.push(`For inflation: distinguish cost-push from demand-pull. If commodity prices are high, use incomes policy and price controls rather than rate hikes that cause unemployment.`);
    if (issues.includes('debt burden')) adviceParts.push(`For debt: Hudson advocates restructuring — don't let creditors dictate policy that makes the debt worse. Raise the domestic debt share and consider whether default is actually the better path.`);
    if (issues.includes('trade drain')) adviceParts.push(`For the trade drain: Emmanuel and Amin would say raise tariffs, impose capital controls, and develop domestic substitutes. "Free trade" between unequal partners enriches the stronger.`);
    if (issues.includes('political crisis')) adviceParts.push(`For approval: increase basic goods guarantee and social spending. Visible support for ordinary people builds legitimacy faster than GDP numbers.`);
    return adviceParts.join(' ');
  }

  // ── Sanctions / imperialism / geopolitics ──
  if (q.includes('sanction') || q.includes('imperial') || q.includes('geopolit') || q.includes('foreign') || q.includes('imf') || q.includes('world bank')) {
    return pick([
      `${isSanctioned ? 'Lenin analyzed sanctions as tools of imperial discipline — they punish countries that assert economic sovereignty. Bukharin wrote about how to build an economy under hostile external conditions: prioritize domestic production, manage scarcity through planning, and build alliances with other peripheral states.' : 'Even without formal sanctions, the international economic system embeds power relations.'} Hudson showed in "Super Imperialism" that the dollar system functions as tribute extraction — other countries finance American deficits by holding dollar reserves. ${isDeveloping ? 'Kadri documented how this system, reinforced by the IMF and World Bank, systematically deindustrialized the developing world. Desai argues that BRICS and the multipolar world offer genuine alternatives.' : 'The "rules-based order" serves those who wrote the rules.'}`,
      `Radhika Desai's "geopolitical economy" framework is essential here. The international economy is not a neutral playing field — it's shaped by the power of states, particularly the US through the dollar system, military bases, and control of international institutions. ${isDeveloping ? 'For your country, this means IMF "advice" reflects creditor interests, trade agreements reflect Northern power, and "free markets" mean freedom for Northern capital to extract Southern surplus. Your sovereignty requires capital controls, industrial policy, and South-South cooperation.' : 'Even advanced economies must navigate this power structure. Trade deals, financial regulation, and monetary policy are all geopolitical.'} Torkil Lauesen goes further: the entire global division of labor is structured to transfer value from South to North.`,
    ]);
  }

  // ── Inequality / distribution ──
  if (q.includes('inequal') || q.includes('wealth') || q.includes('distribut') || q.includes('rich') || q.includes('poor') || q.includes('gini')) {
    return pick([
      `Piketty's central finding: when the rate of return on capital (r) exceeds economic growth (g), wealth concentrates at the top automatically. This is the DEFAULT state of capitalism — equality is the exception, not the rule, and it requires active redistribution to maintain. Progressive wealth taxes, inheritance taxes, and strong public services are the proven tools. ${isDeveloping ? 'Marini adds a global dimension: "super-exploitation" in the periphery means YOUR workers produce the surplus that concentrates as wealth in the core. Rising inequality in your country may partly reflect value extraction by foreign capital.' : ''}`,
      `Hudson's distinction between "earned" and "unearned" income is crucial. Rentier income — from land, finance, monopolies — extracts from the productive economy. Piketty showed this extraction accelerating since the 1980s. The policy response must target RENT, not just income: financial regulation, land taxes, public banking, and anti-monopoly policy. ${isDeveloping ? 'Ali Kadri shows how inequality in the Global South is compounded by imperial extraction — domestic elites and foreign capital form an alliance against the working population.' : 'Polanyi would say inequality is what happens when the economy is "disembedded" from society.'}`,
    ]);
  }

  // ── Environment / ecology / green ──
  if (q.includes('environment') || q.includes('ecolog') || q.includes('climate') || q.includes('green') || q.includes('sustainab') || q.includes('pollution')) {
    return `Max Ajl argues that climate policy must center the Global South's development needs, not Northern green consumerism. ${isDeveloping ? 'Your country has contributed least to climate change but faces the worst consequences. A "People\'s Green New Deal" means: food sovereignty through agroecological farming, renewable energy for YOUR industrialization (not for export), and demanding climate debt from the North. Don\'t accept "green conditionality" that keeps you dependent.' : 'Polanyi\'s framework applies: the environment, like labor, is a "fictitious commodity" that markets will destroy unless society intervenes. Financial regulation of speculation in commodities, public investment in renewables, and direct environmental regulation are needed.'} Invest in agriculture and infrastructure with environmental sustainability in mind — this builds long-term resilience.`;
  }

  // ── Real-world parallels ──
  if (q.includes('real') || q.includes('country') || q.includes('histor') || q.includes('example') || q.includes('parallel') || q.includes('compare')) {
    const parallels: Record<string, string[]> = {
      'emerging-debt-crisis': [
        'Hudson compared your situation to the Latin American debt crisis of the 1980s, where petrodollar recycling created unpayable debts that the IMF used to impose structural adjustment — privatization, deregulation, and austerity that devastated the continent\'s industry. Argentina broke free by defaulting in 2001 and recovered within 3 years. Greece accepted creditor terms in 2010 and lost 25% of GDP.',
        'Tooze documented how the European debt crisis was manufactured by austerity — the "cure" was worse than the disease. Your situation also resembles Egypt under IMF programs: forced liberalization, currency collapse, and rising poverty despite "reform."',
      ],
      'stagflation': [
        'The 1970s US/UK stagflation was caused by oil shocks (cost-push), not excess demand. Volcker crushed it with 20% interest rates — but at the cost of mass unemployment and the destruction of American manufacturing. Australia\'s Accord (1983) used incomes policy instead, proving there was a better way. Tooze shows how the 2022 inflation was similarly cost-push, yet central banks raised rates anyway.',
        'Polanyi would see your stagflation as the market system failing to manage a basic resource (energy). The counter-movement — price controls, incomes policy, public investment in alternatives — is society protecting itself.',
      ],
      'rust-belt': [
        'Lauesen would point out that deindustrialization in the Global North is partly the RESULT of imperialism — factories moved to the South for cheap labor, leaving Northern workers behind. The same system that enriched the North through unequal exchange now abandons its own working class. Polanyi\'s "double movement" demands social protection: retraining, public employment, community investment.',
        'Tooze documented how austerity in post-industrial Britain worsened decline. Germany invested in retraining and green industry. The choice is: managed transition with state support, or market-driven abandonment.',
      ],
      'independence-underdevelopment': [
        'Samir Amin lived this scenario — as an Egyptian-Senegalese economist, he saw how newly independent nations were trapped by colonial economic structures. His prescription: delink from unequal trade, build domestic industry through planning, invest in education and healthcare, and resist IMF conditionality. The Kerala model (India) shows this works even at low GDP.',
        'Ali Kadri documents how postcolonial developmental states in the Arab world were systematically destroyed through wars, sanctions, and structural adjustment. Your independence means nothing if foreign capital and institutions control your economic policy. Marini would add: don\'t accept "development" that means super-exploitation of your workers for foreign markets.',
      ],
      'commodity-pressure': [
        'Your dependence on commodity exports is exactly what Prebisch and the structuralists diagnosed in the 1950s: the "center-periphery" structure of the world economy means raw material exporters face declining terms of trade. Emmanuel showed the value transfer mechanism. Kadri showed how oil-producing Arab states lost their wealth through dollar recycling and arms purchases. Norway avoided this through public ownership (Equinor) and a sovereign wealth fund.',
        'Max Ajl argues that food sovereignty — not integration into global commodity markets — is the foundation of genuine development. Your agricultural sector should feed YOUR people first, with surplus for export. Resource revenues should be captured through public ownership and invested in diversification.',
      ],
      'rising-industrializer': [
        'This is the developmental state trajectory that Amin, Desai, and Chang all champion. China, South Korea, and Taiwan used exactly these tools: directed credit, planning, tariff protection with export discipline, massive infrastructure and education investment. Desai sees this as "geopolitical economy" — the state actively shaping comparative advantage rather than accepting the market\'s verdict.',
        'Marini would warn about the "sub-imperialism" trap: as you industrialize, you might exploit smaller peripheral countries while still being exploited by the core. Lenin and Bukharin analyzed how rising powers enter the imperialist system rather than transforming it. Build solidarity with the periphery, not exploitation.',
      ],
      'sanctions-isolation': [
        'Cuba survived 60 years of US sanctions through exactly the tools in your policy kit: planning, public provision of basic goods, public banking, and alliance with other states outside the imperial orbit. Iran developed a domestic tech sector under sanctions. Bukharin\'s "transition economics" — building under hostile conditions — is your playbook. Kadri shows that sanctions aim to destroy sovereign developmental capacity.',
        'Desai argues that the multipolar world is creating alternatives to dollar hegemony and Western-dominated institutions. BRICS development banks, currency swap agreements, and South-South trade networks can partially offset sanctions. Lauesen would add that sanctions reveal the imperial nature of the "rules-based order" — the rules serve the powerful.',
      ],
    };
    const pool = parallels[sid] ?? ['Every economy has historical parallels. The key insight from dependency theory (Amin, Emmanuel, Marini) is that your position in the world system shapes your options more than domestic policy alone.'];
    return pick(pool);
  }

  // ── Default: context-aware general analysis ──
  const issues: string[] = [];
  if (c.inflationRate > 0.06) issues.push(`inflation (${pct(c.inflationRate)})`);
  if (c.unemploymentRate > 0.07) issues.push(`unemployment (${pct(c.unemploymentRate)})`);
  if (c.gdpGrowth < 0) issues.push(`contraction (${pct(c.gdpGrowth)})`);
  if (c.debtToGdp > 0.7) issues.push(`high debt (${pct(c.debtToGdp, 0)})`);
  if (c.approval < 0.35) issues.push(`low approval (${pct(c.approval, 0)})`);
  if (c.currentAccount < -20) issues.push(`trade deficit (${c.currentAccount.toFixed(0)})`);

  const thinkerInsight = pick([
    isDeveloping ? `Samir Amin would examine whether your economy is developing for its own people or for foreign capital. The key metric isn't GDP — it's whether surplus stays in the country.` : `Piketty would ask whether growth is being shared or captured by the top. Without redistribution, inequality compounds.`,
    `Hudson would check your debt structure: who are the creditors, what currency is the debt in, and is the financial sector producing or parasitizing?`,
    `Polanyi would evaluate whether your social protections match your market exposure. An unprotected society in a volatile market is heading for crisis.`,
    isDeveloping ? `Emmanuel and Lauesen would trace the value flows: how much of your workers' output leaves the country through unequal trade?` : `Tooze would assess your financial fragility — is a Minsky moment building beneath the surface?`,
    `Desai would look at your geopolitical position: are your trade relationships building sovereignty or dependence?`,
  ]);

  if (issues.length === 0) {
    return `Your economy is stable this turn. ${thinkerInsight} Try asking about specific policies ("Should I raise tariffs?"), risks ("What could go wrong?"), or strategies ("How do I delink from world markets?"). You can also ask what specific economists would think of your approach.`;
  }
  return `Turn ${turn}: your main challenges are ${issues.join(', ')}. ${thinkerInsight} Ask me about any of these issues, or about specific policy tools, historical parallels, or what different economists would recommend.`;
}

/**
 * Post-game analysis with score, historical parallels, and recommendations.
 */
export async function generatePostGameAnalysis(
  cfg: LLMConfig,
  history: SimulationState[],
  won: boolean,
  score: number,
): Promise<string> {
  if (!cfg.enabled || !cfg.apiKey) return '';
  const first = history[0];
  const last = history[history.length - 1];
  try {
    return await chatCompletion(cfg, [
      { role: 'system', content: `${SYSTEM_BASE}\nWrite a post-game analysis (3-4 paragraphs). Summarize the player's overall strategy and trajectory. Rate their performance. Draw a parallel to a real country that faced similar challenges. Suggest what they could try differently next time.` },
      { role: 'user', content: `SCENARIO: ${first.scenario.scenarioId} (${first.scenario.countryName})\nOUTCOME: ${won ? 'Won' : 'Lost'} | Score: ${score}/100\nTURNS PLAYED: ${last.turn}\n\nSTART STATE:\n${stateSnapshot(first)}\n\nEND STATE:\n${stateSnapshot(last)}\n\nWrite the analysis.` },
    ], 600);
  } catch { return ''; }
}

/**
 * Generate a vivid scenario introduction.
 */
export async function generateScenarioIntro(
  cfg: LLMConfig,
  scenarioId: string,
  countryName: string,
  description: string,
): Promise<string> {
  if (!cfg.enabled || !cfg.apiKey) return '';
  try {
    return await chatCompletion(cfg, [
      { role: 'system', content: `${SYSTEM_BASE}\nWrite a vivid 2-paragraph scenario introduction for a macroeconomic simulation game. Set the scene with character, stakes, and history. Make the player feel the weight of the decisions ahead. Do not repeat the description verbatim; expand on it with narrative colour.` },
      { role: 'user', content: `Scenario: ${scenarioId}\nCountry: ${countryName}\nDescription: ${description}\n\nWrite the introduction.` },
    ], 300);
  } catch { return ''; }
}

/**
 * Auto-play: LLM decides policy actions given current state.
 * Returns a PolicyActions object parsed from LLM JSON output.
 */
export async function generateAutoPlayActions(
  cfg: LLMConfig,
  state: SimulationState,
): Promise<PolicyActions | null> {
  if (!cfg.enabled || !cfg.apiKey) return null;
  try {
    const response = await chatCompletion(cfg, [
      { role: 'system', content: `You are an expert AI economist playing a macroeconomic simulation game. Given the current state, decide the BEST policy actions for the next turn. Consider all schools of economic thought and choose what fits the situation best.

You MUST respond with ONLY a valid JSON object (no markdown, no explanation) with these fields (all numbers):
{
  "incomeTaxRate": 0.0-0.5,
  "tariffRate": 0.0-0.3,
  "spendingShareOfGdp": 0.1-0.5,
  "policyRate": 0.0-0.15,
  "exchangeRateRegime": "float" | "peg" | "managed",
  "socialSpendingShare": 0.1-0.6,
  "profitWindfallTaxRate": 0.0-0.2,
  "priceControlStrength": 0.0-1.0,
  "capitalControlStrength": 0.0-1.0,
  "incomesPolicyStrength": 0.0-1.0,
  "financialRegulationStrength": 0.0-1.0,
  "domesticDebtShare": 0.0-1.0,
  "basicGoodsGuarantee": 0.0-1.0,
  "planningIntensity": 0.0-1.0,
  "publicBankingStrength": 0.0-1.0,
  "debtRestructuringStance": 0.0-1.0,
  "multiYearAgendaStrength": 0.0-1.0,
  "infrastructureShare": 0.0-0.5
}

Choose values that address the country's most pressing problems. Be strategic.` },
      { role: 'user', content: `CURRENT STATE:\n${stateSnapshot(state)}\n\nRecent events:\n${state.events.slice(-5).map(e => `- ${e.title}: ${e.description}`).join('\n')}\n\nDecide policy actions (JSON only):` },
    ], 500);

    // Parse JSON from response (handle potential markdown wrapping)
    const jsonStr = response.replace(/```json?\s*/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(jsonStr);
    return parsed as PolicyActions;
  } catch (e) {
    console.error('Auto-play action generation failed:', e);
    return null;
  }
}

/* ────────── TEMPLATE FALLBACKS ────────── */

export function templateTurnBriefing(
  prev: SimulationState,
  curr: SimulationState,
  _actions: PolicyActions,
): string {
  const pc = prev.country;
  const cc = curr.country;
  const parts: string[] = [];

  // GDP
  const gdpDelta = cc.gdp - pc.gdp;
  const gdpPct = pc.gdp > 0 ? ((gdpDelta / pc.gdp) * 100).toFixed(1) : '0';
  parts.push(
    gdpDelta >= 0
      ? `GDP grew ${gdpPct}% this quarter to ${cc.gdp.toFixed(0)}.`
      : `GDP contracted ${Math.abs(Number(gdpPct))}% this quarter to ${cc.gdp.toFixed(0)}.`,
  );

  // Inflation
  const infDir = cc.inflationRate > pc.inflationRate ? 'rose' : cc.inflationRate < pc.inflationRate ? 'fell' : 'held steady at';
  parts.push(`Inflation ${infDir} ${infDir === 'held steady at' ? '' : 'to '}${(cc.inflationRate * 100).toFixed(1)}%.`);

  // Unemployment
  if (Math.abs(cc.unemploymentRate - pc.unemploymentRate) > 0.005) {
    const uDir = cc.unemploymentRate > pc.unemploymentRate ? 'rose' : 'fell';
    parts.push(`Unemployment ${uDir} to ${(cc.unemploymentRate * 100).toFixed(1)}%.`);
  }

  // Debt
  if (cc.debtToGdp > 0.6) {
    parts.push(`Public debt remains elevated at ${(cc.debtToGdp * 100).toFixed(1)}% of GDP.`);
  }

  // Approval
  const appDelta = cc.approval - pc.approval;
  if (Math.abs(appDelta) > 0.02) {
    parts.push(
      appDelta > 0
        ? `Public approval improved to ${(cc.approval * 100).toFixed(0)}%.`
        : `Public approval slipped to ${(cc.approval * 100).toFixed(0)}%.`,
    );
  }

  // Risks
  if (cc.inflationRate > 0.1) parts.push('Inflation is dangerously high — consider tightening monetary policy or using price coordination.');
  else if (cc.unemploymentRate > 0.08) parts.push('Unemployment is concerning — stimulus or social spending may help.');
  else if (cc.debtToGdp > ((curr.scenario as unknown as Record<string, unknown>).debtSustainabilityThreshold as number ?? 0.6)) parts.push('Debt sustainability is at risk — watch the deficit.');

  return parts.join(' ');
}

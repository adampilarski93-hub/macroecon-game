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

function templateAdvisorChat(state: SimulationState, question: string): string {
  const c = state.country;
  const q = question.toLowerCase();

  // ── GDP / Growth questions ──
  if (q.includes('gdp') || q.includes('growth') || q.includes('grow') || q.includes('recession') || q.includes('economy shrink')) {
    if (c.gdpGrowth < -0.01) {
      return `Your economy is contracting at ${(c.gdpGrowth * 100).toFixed(1)}%. In a recession, Keynesian economics suggests increasing government spending to boost demand — the fiscal multiplier is strongest when the economy has idle resources. Cutting spending now could make it worse (this happened to Greece in 2010-2015). Consider raising the spending share and social spending to stimulate demand.`;
    }
    if (c.gdpGrowth < 0.02) {
      return `Growth is sluggish at ${(c.gdpGrowth * 100).toFixed(1)}%. To boost it, you have several options: increase government spending (Keynesian approach), invest in infrastructure (structuralist approach), or lower interest rates to encourage private investment. The right mix depends on your other indicators — if inflation is low, you have more room to stimulate.`;
    }
    return `Growth is ${(c.gdpGrowth * 100).toFixed(1)}%, which is decent. To sustain it, keep investing in infrastructure and human capital (education, healthcare). South Korea and Taiwan maintained high growth for decades through a combination of industrial policy, education investment, and managed trade. Watch inflation — fast growth can overheat the economy.`;
  }

  // ── Inflation questions ──
  if (q.includes('inflation') || q.includes('prices') || q.includes('price') || q.includes('cost of living')) {
    if (c.inflationRate > 0.08) {
      return `Inflation is high at ${(c.inflationRate * 100).toFixed(1)}%. The key question is: is this demand-pull (too much spending) or cost-push (supply problems, import costs)? If demand-pull, raising the policy rate or cutting spending can help. If cost-push, try incomes policy (wage-price coordination — it worked in 1980s Australia and Scandinavia), price controls on essentials, or investing in supply capacity. Rate hikes won't fix supply-side inflation and can cause a recession.`;
    }
    if (c.inflationRate > 0.04) {
      return `Inflation is ${(c.inflationRate * 100).toFixed(1)}%, moderately above target. Consider a modest interest rate increase, incomes policy to coordinate wages and prices, or targeted price controls on essentials. The Scandinavian model used corporatist wage bargaining to keep inflation low while maintaining full employment.`;
    }
    return `Inflation is ${(c.inflationRate * 100).toFixed(1)}%, which is well-controlled. You have room to focus on growth and employment without worrying too much about prices. If anything, very low inflation (below 2%) can be a sign of weak demand — consider whether you need more stimulus.`;
  }

  // ── Unemployment questions ──
  if (q.includes('unemployment') || q.includes('jobs') || q.includes('employment') || q.includes('workers')) {
    if (c.unemploymentRate > 0.08) {
      return `Unemployment is ${(c.unemploymentRate * 100).toFixed(1)}%, which is high. Options: increase government spending (direct job creation, infrastructure), invest in social spending and retraining (Nordic active labor market policy), use planning intensity to direct investment toward job-creating sectors, or lower interest rates to stimulate private hiring. The most effective approach combines demand stimulus with targeted skills investment.`;
    }
    return `Unemployment is ${(c.unemploymentRate * 100).toFixed(1)}%. ${c.unemploymentRate < 0.04 ? 'This is very low — workers have bargaining power. Watch for wage-push inflation. You might want incomes policy to coordinate wage growth with productivity.' : 'This is manageable. Focus on maintaining demand and investing in skills to keep people employed as the economy evolves.'}`;
  }

  // ── Debt questions ──
  if (q.includes('debt') || q.includes('deficit') || q.includes('borrow') || q.includes('fiscal')) {
    if (c.debtToGdp > 0.8) {
      return `Debt is ${(c.debtToGdp * 100).toFixed(0)}% of GDP. Whether this is dangerous depends on context — Japan functions at 250%. The key is: are you growing faster than your interest rate? Is debt in domestic currency? If so, it's sustainable. Cutting spending in a weak economy can INCREASE debt-to-GDP by shrinking the denominator (GDP). Consider growing your way out: invest productively, and the debt ratio falls as GDP rises.`;
    }
    return `Debt is ${(c.debtToGdp * 100).toFixed(0)}% of GDP. ${c.deficit > 0 ? 'You\'re running a deficit. Post-Keynesian economics says this is appropriate if the private sector wants to save — government deficits create private surpluses. The real question is: are you spending on productive investment (infrastructure, education, R&D) or just consumption?' : 'You\'re roughly balanced. Good fiscal management gives you room to spend when the next downturn hits.'}`;
  }

  // ── Trade / tariffs / exchange rate questions ──
  if (q.includes('trade') || q.includes('tariff') || q.includes('export') || q.includes('import') || q.includes('exchange rate') || q.includes('currency')) {
    if (c.currentAccount < -20) {
      return `Your current account deficit is ${c.currentAccount.toFixed(0)}, meaning you're importing much more than exporting. Structuralist economists recommend: tariffs to protect infant industries (this is how South Korea and China industrialized), capital controls to reduce speculative capital flows, and a managed exchange rate to keep exports competitive. Free trade theory says this corrects itself, but in practice, developing countries often get stuck in dependency traps without active policy.`;
    }
    return `Trade balance is ${c.currentAccount.toFixed(0)}. ${c.currentAccount > 0 ? 'A surplus gives you policy space and reserve accumulation. China maintained surpluses for decades as part of its development strategy.' : 'A modest deficit is normal for growing economies importing capital goods.'} The exchange rate regime matters: managed rates reduce volatility, which helps business planning. Capital controls can protect against speculative "hot money" flows.`;
  }

  // ── Planning / state role questions ──
  if (q.includes('planning') || q.includes('state') || q.includes('government role') || q.includes('nationali') || q.includes('public bank') || q.includes('socialist')) {
    return `State-led development has a strong track record. South Korea, Taiwan, Singapore, and China all used heavy state intervention — directed credit, industrial policy, public enterprises, and strategic tariffs — to achieve rapid growth. The key is INSTITUTIONAL QUALITY: well-governed state intervention succeeds (Korea), poorly governed intervention fails (Argentina). In this game, planning intensity combined with infrastructure investment and good governance quality can boost growth significantly, especially in developing economies.`;
  }

  // ── Price controls questions ──
  if (q.includes('price control') || q.includes('price cap') || q.includes('rationing')) {
    return `Price controls work best on goods provided by monopolies or oligopolies — they can move prices closer to competitive levels. On competitive markets, heavy controls can create shortages. Moderate controls (0.2-0.5) on essentials like food and energy can stabilize the cost of living and boost approval. Cuba's rationing system guaranteed basic nutrition for everyone despite very low GDP. The Nordic countries use price regulation in healthcare and pharmaceuticals very effectively.`;
  }

  // ── Capital controls questions ──
  if (q.includes('capital control') || q.includes('capital flow')) {
    return `Capital controls limit money flowing in and out of your country. They reduce exchange rate volatility, prevent speculative attacks, and give you more monetary policy independence (the "impossible trinity"). Malaysia used capital controls during the 1998 Asian Crisis and recovered faster than Thailand and Indonesia, which didn't. Chile's tax on short-term capital inflows successfully shifted investment toward long-term FDI. Even the IMF now accepts capital controls as a legitimate policy tool.`;
  }

  // ── What should I do / advice questions ──
  if (q.includes('what should') || q.includes('what do') || q.includes('advice') || q.includes('recommend') || q.includes('suggest') || q.includes('help')) {
    const issues: string[] = [];
    if (c.inflationRate > 0.06) issues.push(`high inflation (${(c.inflationRate * 100).toFixed(1)}%)`);
    if (c.unemploymentRate > 0.07) issues.push(`high unemployment (${(c.unemploymentRate * 100).toFixed(1)}%)`);
    if (c.gdpGrowth < 0) issues.push(`recession (${(c.gdpGrowth * 100).toFixed(1)}% growth)`);
    if (c.debtToGdp > 0.7) issues.push(`elevated debt (${(c.debtToGdp * 100).toFixed(0)}% of GDP)`);
    if (c.approval < 0.35) issues.push(`low approval (${(c.approval * 100).toFixed(0)}%)`);

    if (issues.length === 0) {
      return `Your economy is in relatively good shape! Focus on long-term investments: infrastructure, education (social spending), and institutional quality. These compound over time and build resilience against future shocks. Consider whether you want to build a Nordic-style welfare state (high social spending, strong regulation) or an East Asian developmental state (industrial policy, export discipline, infrastructure). Both paths can succeed.`;
    }
    return `Your main challenges are: ${issues.join(', ')}. ${c.gdpGrowth < 0 ? 'In a recession, prioritize stimulus — raise government spending and social spending. Austerity now would make things worse.' : ''} ${c.inflationRate > 0.06 ? 'For inflation, try incomes policy and consider whether it\'s demand-pull or cost-push before raising rates.' : ''} ${c.unemploymentRate > 0.07 ? 'For jobs, increase infrastructure investment and consider planning intensity to direct investment toward labor-intensive sectors.' : ''} ${c.approval < 0.35 ? 'For approval, increase social spending and basic goods guarantee — visible support for citizens builds legitimacy.' : ''}`;
  }

  // ── Real world parallels ──
  if (q.includes('real') || q.includes('country') || q.includes('histor') || q.includes('example') || q.includes('parallel')) {
    const sid = state.scenario.scenarioId;
    const parallels: Record<string, string> = {
      'emerging-debt-crisis': 'Your situation resembles Greece (2010), Argentina (2001), or many developing countries under IMF programs. Greece tried austerity and GDP fell 25%. Argentina defaulted and recovered within 3 years. The lesson: growth-oriented approaches often work better than pure austerity for resolving debt crises.',
      'stagflation': 'This mirrors the US/UK in the 1970s (oil shocks + wage-price spirals), or many countries after 2022. Volcker raised US rates to 20% — it crushed inflation but caused severe recession. Australia\'s Accord (1983) used incomes policy instead, reducing inflation while growing the economy.',
      'rust-belt': 'Think US Midwest, UK North of England, or Germany\'s Ruhr Valley. Germany invested heavily in retraining and green industry. The UK pursued austerity and saw prolonged decline. The Nordic model of "flexicurity" (easy firing but generous retraining/safety net) has the best track record.',
      'independence-underdevelopment': 'Similar to post-independence India, Ghana, Kenya, or Algeria. South Korea started at a similar level in 1960 and became wealthy through state-led industrialization. The Kerala model (India) achieved high human development at very low GDP through public investment in health and education.',
      'commodity-pressure': 'Resembles Egypt, Nigeria, or many commodity-dependent economies. Norway avoided the "resource curse" through public ownership (Equinor) and a sovereign wealth fund. Botswana used diamond revenues for education and infrastructure investment.',
      'rising-industrializer': 'This is China (1980s-2000s), South Korea (1960s-1980s), or Vietnam today. The developmental state model — combining state direction, infrastructure investment, export discipline, and gradual market opening — produced the most successful industrializations in history.',
      'sanctions-isolation': 'Think Iran, Cuba, or Russia. Cuba maintained excellent health and education outcomes despite decades of US embargo through universal public provision. Iran developed a domestic tech sector out of necessity. Sanctions hurt but rarely achieve regime change.',
    };
    return parallels[sid] ?? 'Every economic situation has historical parallels. The key lesson from economic history is that there is no single path to prosperity — different countries have succeeded with very different approaches, from Nordic social democracy to East Asian developmental states to mixed-market economies.';
  }

  // ── Default fallback ──
  const c2 = state.country;
  const biggestIssue = c2.inflationRate > 0.08 ? 'inflation'
    : c2.unemploymentRate > 0.08 ? 'unemployment'
    : c2.gdpGrowth < 0 ? 'recession'
    : c2.debtToGdp > 0.8 ? 'debt'
    : 'maintaining stability';
  return `That's an interesting question. Right now your biggest challenge is ${biggestIssue}. Your GDP growth is ${(c2.gdpGrowth * 100).toFixed(1)}%, inflation is ${(c2.inflationRate * 100).toFixed(1)}%, unemployment is ${(c2.unemploymentRate * 100).toFixed(1)}%, and debt is ${(c2.debtToGdp * 100).toFixed(0)}% of GDP. Try asking me about specific topics like "How can I reduce inflation?", "What should I do about debt?", "What would a real country do here?", or "How does planning intensity work?" For more advanced AI responses, you can add an API key in Settings.`;
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

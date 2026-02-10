/**
 * Policy advisor: very simple recommendations for inflation and
 * public debt. Written for a high-school intro-to-economics audience.
 */

import type { SimulationState, CountryState } from './state.js';

export type AdvisoryTopic = 'inflation' | 'debt';

export interface AdvisoryItem {
  school: string;
  topic: AdvisoryTopic;
  title: string;
  instruction: string;
  explanation: string;
}

const INFLATION_THRESHOLD = 0.08;   // 8% annual
const DEBT_THRESHOLD = 0.6;         // 60% of GDP

function inflationAdvisory(country: CountryState): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];

  items.push({
    school: 'Mainstream',
    topic: 'inflation',
    title: 'Raise interest rates a little at a time',
    instruction: 'Have the central bank raise the interest rate it charges banks (the policy rate) in small steps. Tell people you will keep doing it until prices calm down. Do not surprise markets with big jumps.',
    explanation: 'When it costs more to borrow, people and companies spend less. That means less demand, so prices rise more slowly. If people believe you will stick with it, they adjust sooner and you may not need as big a slowdown to get inflation down.',
  });

  items.push({
    school: 'Keynesian',
    topic: 'inflation',
    title: 'Fix the cause before you squeeze spending',
    instruction: 'If a lot of people are still out of work, do not rush to raise rates. Instead: cut only wasteful or luxury spending, not things that help everyone. Invest in things that ease bottlenecks (like energy or transport). Get employers and workers to agree on how fast wages and prices should grow so they do not chase each other up.',
    explanation: 'Inflation can come from too much demand or from supply problems and firms raising prices. If the economy is weak, raising rates can make things worse and may not fix supply. Helping supply and coordinating wages and prices can slow inflation without killing jobs.',
  });

  items.push({
    school: 'Marxian',
    topic: 'inflation',
    title: 'Use planning, set prices on basics, and guarantee essentials',
    instruction: 'Do not rely on interest rates, which hit workers first. (1) Set or cap prices for essentials (food, energy, transport) so they cannot be pushed up for profit—like in the Soviet and Cuban systems. (2) Guarantee that everyone can get basics (e.g. through rationing or subsidised state supply, like Cuba’s libreta) at stable prices. (3) Tax windfall or excess profits and use price controls on key goods so firms cannot pass all costs onto workers. (4) Expand state or collective provision (housing, health, education) so less of people’s spending is at the mercy of market prices. (5) Use planning or targets to direct resources into supply bottlenecks instead of leaving it all to the market.',
    explanation: 'Some socialist states (e.g. USSR, Cuba, China, Vietnam) fought inflation with central or guided allocation, fixed or capped prices, and guaranteed access to basics rather than with rate hikes. Inflation is a conflict over who bears the cost: raising rates mainly creates unemployment and weakens workers. Setting prices on essentials and guaranteeing basics directly limit the ability of firms to restore profits through price rises and protect workers’ real living standards.',
  });

  items.push({
    school: 'Post-Keynesian',
    topic: 'inflation',
    title: 'Use price and wage coordination, not just rates',
    instruction: 'Do not rely only on interest rates. Watch or cap prices in important sectors (energy, food, key imports). Get business, labour, and government to agree on how fast wages and prices should grow so they do not spiral. Use taxes or subsidies to soften shocks from world prices or the exchange rate.',
    explanation: 'Inflation is often about costs and conflict: everyone tries to protect their share. Rate hikes work mainly by creating unemployment and weakening workers, which is harsh. Agreed rules on wages and prices and targeted action on key prices can slow inflation with less job loss.',
  });

  items.push({
    school: 'Structuralist',
    topic: 'inflation',
    title: 'Steer the exchange rate and key supply prices',
    instruction: 'Manage the exchange rate or capital flows so a big drop in your currency does not push import prices up. Use tariffs or reserves to smooth the cost of important goods. Help domestic production of essentials so you depend less on shaky world prices.',
    explanation: 'In many countries, inflation is driven by a falling currency and by supply shocks. A completely free float can make that worse. Managing the rate and stabilising key prices gives you more room to support growth while keeping inflation in check.',
  });

  return items;
}

function debtAdvisory(country: CountryState, scenarioDebtThreshold: number): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];

  items.push({
    school: 'Mainstream',
    topic: 'debt',
    title: 'Cut the deficit slowly and spend on growth',
    instruction: 'Plan to shrink the deficit a bit each year (e.g. 0.5–1% of GDP) by spending less or raising revenue. Keep or increase spending on things that help growth (infrastructure, education) and cut the rest. Keep the central bank credible so borrowing costs do not shoot up.',
    explanation: 'To bring debt down, the budget balance has to improve over time. Doing it slowly avoids a sudden squeeze that could cause recession. A trusted central bank keeps interest rates from spiking. Debt is easier to carry when the economy is growing.',
  });

  items.push({
    school: 'Keynesian',
    topic: 'debt',
    title: 'Grow your way out of debt; tax the rich',
    instruction: 'When the economy is weak, do not slash spending or you may shrink GDP and make debt look worse. Tighten when growth is strong instead. Raise more from the wealthy (wealth tax, higher top rates, property tax) and close loopholes. Invest in things that raise long-run growth so debt shrinks as a share of GDP.',
    explanation: 'Cutting spending in a slump can backfire: output falls, so debt relative to GDP can rise even if the deficit falls. It is easier to stabilise debt when the economy is growing. Taxing the rich and investing in growth both help the budget and help growth, so you do not put the whole cost on ordinary people.',
  });

  items.push({
    school: 'Marxian',
    topic: 'debt',
    title: 'Use public ownership, public banking, and who pays—and, if needed, restructure debt',
    instruction: '(1) Finance the state through ownership and planning, not only taxes: state-owned firms and banks (as in USSR, China, Cuba) can send surpluses to the budget and reduce reliance on bond markets. (2) Build or strengthen public and cooperative banking so borrowing is in local currency and at least partly outside private finance—like some socialist states that kept foreign debt and “market discipline” at arm’s length. (3) Raise revenue from capital and wealth (profit and wealth taxes) so the burden does not fall on workers; resist austerity that cuts jobs and public provision. (4) If debt is imposed by creditors and unsustainable, consider restructuring or selective default to reclaim policy space for development and social spending, as some socialist and post-colonial states have done. (5) Set out a clear multi-year policy agenda so investment serves development goals rather than just debt service.',
    explanation: 'Historically, some socialist states (e.g. USSR, China, Cuba, Yugoslavia, Vietnam) relied on state ownership of key sectors, planning, and domestic or non-market financing rather than on “sound finance” dictated by creditors. Debt sustainability was treated as a political choice about who pays and who controls investment. Public banks and state firms can reduce dependence on private lenders; taxing wealth and profits and—when necessary—restructuring unjust debt keep the cost off workers and preserve room for planned development.',
  });

  items.push({
    school: 'Post-Keynesian',
    topic: 'debt',
    title: 'Do not cut the deficit if the private sector is weak',
    instruction: 'Remember: if households and firms are saving more or paying down debt, the government may need to spend to keep the economy going. Cutting the deficit too fast when the private sector is weak can cause recession and even push debt up. Tighten slowly when private demand is strong. Invest in jobs and growth so GDP grows and debt shrinks as a share of it. Consider lower or preferential rates on public debt to keep costs down.',
    explanation: 'One sector’s deficit is another’s surplus. When the private sector is cautious, the public sector often has to step in or income and jobs collapse. Forcing the government to balance the books no matter what can deepen a slump and sometimes raise debt relative to GDP. Supporting growth and managing who pays is the way to sustainable debt.',
  });

  items.push({
    school: 'Structuralist',
    topic: 'debt',
    title: 'Borrow in your own currency; spend on productive stuff',
    instruction: 'Borrow in local currency when you can and build local bond markets so you are not at the mercy of foreign lenders or the exchange rate. Use capital controls or rules to limit short-term foreign debt. Spend on infrastructure and sectors that raise exports and growth so debt becomes easier to carry over time. Coordinate with monetary and exchange-rate policy so interest rates and the exchange rate help both debt sustainability and competitiveness.',
    explanation: 'In many countries, debt blows up because of foreign-currency borrowing and unstable capital flows. Relying more on domestic funding and spending on growth-raising projects improves both the budget and GDP. Aligning monetary and exchange-rate policy with development helps avoid crises and keeps debt manageable.',
  });

  return items;
}

/**
 * Returns advisory recommendations for the current state. When inflation or
 * debt is above thresholds, returns multiple recommendations per topic from
 * different schools of thought.
 */
export function getAdvisory(state: SimulationState): AdvisoryItem[] {
  const { country, scenario } = state;
  const out: AdvisoryItem[] = [];
  const debtThreshold = scenario.debtSustainabilityThreshold ?? DEBT_THRESHOLD;

  if (country.inflationRate >= INFLATION_THRESHOLD) {
    out.push(...inflationAdvisory(country));
  }

  if (country.debtToGdp >= debtThreshold) {
    out.push(...debtAdvisory(country, debtThreshold));
  }

  return out;
}

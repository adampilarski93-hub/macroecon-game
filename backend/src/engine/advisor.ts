import type { SimulationState, CountryState } from './state.js';

export type AdvisoryTopic = 'inflation' | 'debt' | 'growth' | 'unemployment' | 'trade' | 'outlook';

export interface AdvisoryItem {
  school: string;
  topic: AdvisoryTopic;
  title: string;
  instruction: string;
  explanation: string;
}

const INFLATION_THRESHOLD = 0.08;
const DEBT_THRESHOLD = 0.6;

function inflationAdvisory(country: CountryState): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  items.push({ school: 'Mainstream', topic: 'inflation', title: 'Raise interest rates a little at a time', instruction: 'Have the central bank raise the interest rate it charges banks (the policy rate) in small steps. Tell people you will keep doing it until prices calm down. Do not surprise markets with big jumps.', explanation: 'When it costs more to borrow, people and companies spend less. That means less demand, so prices rise more slowly. If people believe you will stick with it, they adjust sooner and you may not need as big a slowdown to get inflation down.' });
  items.push({ school: 'Keynesian', topic: 'inflation', title: 'Fix the cause before you squeeze spending', instruction: 'If a lot of people are still out of work, do not rush to raise rates. Instead: cut only wasteful or luxury spending, not things that help everyone. Invest in things that ease bottlenecks (like energy or transport). Get employers and workers to agree on how fast wages and prices should grow so they do not chase each other up.', explanation: 'Inflation can come from too much demand or from supply problems and firms raising prices. If the economy is weak, raising rates can make things worse and may not fix supply. Helping supply and coordinating wages and prices can slow inflation without killing jobs.' });
  items.push({ school: 'Marxian', topic: 'inflation', title: 'Use planning, set prices on basics, and guarantee essentials', instruction: 'Do not rely on interest rates, which hit workers first. (1) Set or cap prices for essentials (food, energy, transport) so they cannot be pushed up for profit. (2) Guarantee that everyone can get basics at stable prices. (3) Tax windfall or excess profits. (4) Expand state or collective provision. (5) Use planning to direct resources into supply bottlenecks.', explanation: 'Inflation is a conflict over who bears the cost: raising rates mainly creates unemployment and weakens workers. Setting prices on essentials and guaranteeing basics directly protect workers\' real living standards.' });
  items.push({ school: 'Post-Keynesian', topic: 'inflation', title: 'Use price and wage coordination, not just rates', instruction: 'Do not rely only on interest rates. Watch or cap prices in important sectors (energy, food, key imports). Get business, labour, and government to agree on how fast wages and prices should grow so they do not spiral. Use taxes or subsidies to soften shocks from world prices or the exchange rate.', explanation: 'Inflation is often about costs and conflict: everyone tries to protect their share. Rate hikes work mainly by creating unemployment and weakening workers, which is harsh. Agreed rules on wages and prices and targeted action on key prices can slow inflation with less job loss.' });
  items.push({ school: 'Structuralist', topic: 'inflation', title: 'Steer the exchange rate and key supply prices', instruction: 'Manage the exchange rate or capital flows so a big drop in your currency does not push import prices up. Use tariffs or reserves to smooth the cost of important goods. Help domestic production of essentials so you depend less on shaky world prices.', explanation: 'In many countries, inflation is driven by a falling currency and by supply shocks. A completely free float can make that worse. Managing the rate and stabilising key prices gives you more room to support growth while keeping inflation in check.' });
  return items;
}

function debtAdvisory(country: CountryState, scenarioDebtThreshold: number): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  items.push({ school: 'Mainstream', topic: 'debt', title: 'Cut the deficit slowly and spend on growth', instruction: 'Plan to shrink the deficit a bit each year by spending less or raising revenue. Keep or increase spending on things that help growth (infrastructure, education) and cut the rest.', explanation: 'To bring debt down, the budget balance has to improve over time. Doing it slowly avoids a sudden squeeze that could cause recession.' });
  items.push({ school: 'Keynesian', topic: 'debt', title: 'Grow your way out of debt; tax the rich', instruction: 'When the economy is weak, do not slash spending or you may shrink GDP and make debt look worse. Tighten when growth is strong instead. Raise more from the wealthy and invest in things that raise long-run growth.', explanation: 'Cutting spending in a slump can backfire: output falls, so debt relative to GDP can rise even if the deficit falls.' });
  items.push({ school: 'Marxian', topic: 'debt', title: 'Public ownership, public banking, and restructure if needed', instruction: 'Finance the state through ownership and planning. Build public and cooperative banking. Raise revenue from capital and wealth. If debt is unsustainable, consider restructuring or selective default.', explanation: 'Debt sustainability is a political choice about who pays and who controls investment. Public banks and state firms reduce dependence on private lenders.' });
  items.push({ school: 'Post-Keynesian', topic: 'debt', title: 'Do not cut the deficit if the private sector is weak', instruction: 'If households and firms are saving more, the government may need to spend to keep the economy going. Cutting the deficit too fast when the private sector is weak can cause recession. Invest in jobs and growth so GDP grows and debt shrinks as a share of it.', explanation: 'One sector\'s deficit is another\'s surplus. When the private sector is cautious, the public sector often has to step in or income and jobs collapse.' });
  items.push({ school: 'Structuralist', topic: 'debt', title: 'Borrow in your own currency; spend on productive stuff', instruction: 'Borrow in local currency when you can. Use capital controls to limit short-term foreign debt. Spend on infrastructure and sectors that raise exports and growth.', explanation: 'In many countries, debt blows up because of foreign-currency borrowing and unstable capital flows. Relying more on domestic funding improves both the budget and GDP.' });
  return items;
}

function growthAdvisory(country: CountryState): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  if (country.gdpGrowth < -0.005) {
    items.push({ school: 'Keynesian', topic: 'growth', title: 'Spend to stop the contraction', instruction: 'Increase government spending and infrastructure investment. Cut interest rates if inflation allows. The private sector is not spending enough, so the government must step in.', explanation: 'When GDP is shrinking, the economy has spare capacity. Government spending fills the gap in demand and puts people back to work via the multiplier effect.' });
    items.push({ school: 'Marxian', topic: 'growth', title: 'Direct investment through planning', instruction: 'Use state planning and public banking to direct investment into productive sectors. The private sector will not invest during a downturn because profits are low. State-led industrialisation can sustain demand while building long-term productive capacity.', explanation: 'Kalecki showed that if private investment collapses, the state must replace it or the economy enters a deflationary spiral.' });
    items.push({ school: 'Structuralist', topic: 'growth', title: 'Protect domestic industry and invest in supply', instruction: 'Use tariffs and capital controls to prevent capital flight during the downturn. Invest in infrastructure and import substitution. Protect strategic industries.', explanation: 'In developing countries, recessions are often worsened by capital outflows and import surges. Protecting domestic capacity prevents deindustrialisation.' });
  } else if (country.gdpGrowth < 0.02) {
    items.push({ school: 'Keynesian', topic: 'growth', title: 'Stimulate demand carefully', instruction: 'Growth is sluggish. Consider modest increases in infrastructure spending or social investment. These boost demand while building productive capacity.', explanation: 'Low growth often reflects insufficient demand. Productive public investment raises both current spending and future capacity.' });
    items.push({ school: 'Structuralist', topic: 'growth', title: 'Invest in productive transformation', instruction: 'Sluggish growth in developing countries often reflects structural dependence on low-value exports. Invest in manufacturing, processing, and skills to move up the value chain.', explanation: 'Prebisch and the structuralists showed that countries exporting raw materials face declining terms of trade. Breaking this pattern requires deliberate structural transformation.' });
  } else {
    items.push({ school: 'Post-Keynesian', topic: 'growth', title: 'Watch for financial fragility', instruction: 'Growth is solid, but Minsky warned that stability breeds instability. Keep financial regulation strong. Build fiscal buffers now for the next downturn.', explanation: 'During good times, borrowers and lenders take on more risk. Strong regulation and prudent fiscal management during booms prevent the next crisis.' });
    items.push({ school: 'Marxian', topic: 'growth', title: 'Ask who benefits from growth', instruction: 'GDP growth means nothing if the gains flow to capital while wages stagnate. Check whether social spending and basic goods guarantees ensure growth is shared.', explanation: 'Piketty showed that when r > g, wealth concentrates automatically. Active redistribution during growth periods is essential.' });
  }
  return items;
}

function unemploymentAdvisory(country: CountryState): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  if (country.unemploymentRate > 0.08) {
    items.push({ school: 'Keynesian', topic: 'unemployment', title: 'Expand demand to create jobs', instruction: 'Increase government spending on infrastructure and social services. Consider lowering interest rates to encourage private investment. Do not pursue austerity when unemployment is high.', explanation: 'Unemployment above 8% reflects a demand shortfall. Government spending creates demand, which creates jobs, which creates more demand.' });
    items.push({ school: 'Marxian', topic: 'unemployment', title: 'Public employment and planning', instruction: 'Counter mass unemployment through direct public employment, state-led industrialisation, and planning that directs investment toward labour-intensive sectors. Guarantee basic goods so the unemployed can survive with dignity.', explanation: 'Kalecki argued that full employment is feared by capital because it gives workers bargaining power. State intervention to guarantee employment is both economically viable and politically transformative.' });
  } else if (country.unemploymentRate > 0.05) {
    items.push({ school: 'Mainstream', topic: 'unemployment', title: 'Support investment and skills', instruction: 'Moderate unemployment can be addressed through lower interest rates (if inflation allows), skills training, and modest increases in infrastructure spending.', explanation: 'When unemployment is moderate, targeted interventions work better than broad stimulus.' });
  } else {
    items.push({ school: 'Post-Keynesian', topic: 'unemployment', title: 'Protect full employment', instruction: 'Low unemployment is a policy achievement. Maintain it through stable demand management. Resist calls to raise interest rates just because unemployment is low. Use incomes policy to manage wage-price pressures.', explanation: 'Post-Keynesians argue that incomes policy and coordination can maintain full employment without accelerating inflation.' });
  }
  return items;
}

function tradeAdvisory(country: CountryState, state: SimulationState): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  const isDeveloping = ['independence-underdevelopment', 'commodity-pressure', 'rising-industrializer'].includes(state.scenario.scenarioId);
  if (country.currentAccount < -30) {
    items.push({ school: 'Structuralist', topic: 'trade', title: 'Reduce external dependence', instruction: 'Raise tariffs on non-essential imports, use capital controls, and invest in domestic production of goods you currently import. Manage the exchange rate to prevent further deterioration.', explanation: 'Large trade deficits make you dependent on foreign capital inflows. When those flows reverse, the result is a currency crash and recession.' });
    if (isDeveloping) {
      items.push({ school: 'Marxian', topic: 'trade', title: 'Delink from unequal exchange', instruction: 'Your current account deficit reflects value transfer to wealthier countries. Raise tariffs, impose capital controls, develop domestic industry, and pursue South-South trade on more equal terms.', explanation: 'Samir Amin\'s "delinking" strategy means partially withdrawing from a world market structured to drain your surplus. South Korea, Taiwan, and China industrialised behind protective walls.' });
    }
  } else if (country.currentAccount > 30) {
    items.push({ school: 'Keynesian', topic: 'trade', title: 'Use your surplus wisely', instruction: 'A large trade surplus means you are lending to the rest of the world. Consider boosting domestic consumption and living standards instead.', explanation: 'Persistent surpluses can suppress domestic demand. Some rebalancing toward domestic consumption raises living standards.' });
  } else {
    items.push({ school: 'Structuralist', topic: 'trade', title: 'Build trade resilience', instruction: 'Trade is manageable. Diversify exports, build processing capacity for raw materials, and develop regional trade relationships.', explanation: 'Even when trade is balanced, structural vulnerabilities may lurk. Commodity dependence and concentrated export markets can trigger crises when conditions change.' });
  }
  return items;
}

function outlookAdvisory(country: CountryState, state: SimulationState): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  const risks: string[] = [];
  if (country.inflationRate > 0.06) risks.push('elevated inflation');
  if (country.unemploymentRate > 0.07) risks.push('high unemployment');
  if (country.debtToGdp > 0.7) risks.push('heavy debt burden');
  if (country.currentAccount < -25) risks.push('trade deficit');
  if (country.approval < 0.35) risks.push('low public support');
  if (country.gdpGrowth < -0.005) risks.push('recession');

  if (risks.length === 0) {
    items.push({ school: 'General', topic: 'outlook', title: 'Economy is broadly stable', instruction: 'No urgent crises. Use this window to invest in long-term capacity: infrastructure, education, industrial development, and social protections.', explanation: 'Stability is an opportunity. Countries that invest during good times weather bad times better. Minsky\'s insight — stability breeds instability — means complacency is the greatest risk.' });
  } else if (risks.length <= 2) {
    items.push({ school: 'General', topic: 'outlook', title: `Watch: ${risks.join(' and ')}`, instruction: `Your economy faces ${risks.join(' and ')}. These are manageable but require attention. Prioritise the most pressing issue while avoiding policy choices that worsen the others.`, explanation: 'Most policy challenges involve trade-offs. Fighting inflation with rate hikes can worsen unemployment. Cutting spending to reduce debt can slow growth.' });
  } else {
    items.push({ school: 'General', topic: 'outlook', title: `Multiple pressures: ${risks.join(', ')}`, instruction: `Your economy is under stress on several fronts. Protect the most vulnerable while addressing root causes. Consider whether a bold structural shift might resolve multiple problems at once.`, explanation: 'Adam Tooze calls the interaction of multiple crises a "polycrisis." When problems compound, incremental fixes are insufficient.' });
  }
  return items;
}

export function getAdvisory(state: SimulationState): AdvisoryItem[] {
  const { country, scenario } = state;
  const out: AdvisoryItem[] = [];
  const debtThreshold = scenario.debtSustainabilityThreshold ?? DEBT_THRESHOLD;

  out.push(...outlookAdvisory(country, state));
  out.push(...growthAdvisory(country));
  out.push(...unemploymentAdvisory(country));
  out.push(...tradeAdvisory(country, state));

  if (country.inflationRate >= INFLATION_THRESHOLD) out.push(...inflationAdvisory(country));
  if (country.debtToGdp >= debtThreshold) out.push(...debtAdvisory(country, debtThreshold));

  return out;
}

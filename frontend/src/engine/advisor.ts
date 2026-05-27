import type { SimulationState, CountryState } from './state';

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
  items.push({ school: 'Mainstream', topic: 'inflation', title: 'Raise interest rates to target inflation', instruction: 'Have the central bank raise the policy rate to bring inflation back to target (typically 2%). Be clear about the target and the path. Expectations matter: if people believe inflation will return to target, they adjust wages and prices accordingly.', explanation: 'Mainstream economics follows the NAIRU (Non-Accelerating Inflation Rate of Unemployment) concept: there is a "natural rate" of unemployment below which inflation accelerates. Rate hikes reduce demand, creating slack in labor and product markets. Friedman and Phelps showed that once expectations adjust, the unemployment-inflation tradeoff breaks down—so credible central bank commitment is essential.' });
  items.push({ school: 'Keynesian', topic: 'inflation', title: 'Fix the cause before you squeeze spending', instruction: 'If a lot of people are still out of work, do not rush to raise rates. Instead: cut only wasteful or luxury spending, not things that help everyone. Invest in things that ease bottlenecks (like energy or transport). Get employers and workers to agree on how fast wages and prices should grow so they do not chase each other up.', explanation: 'Inflation can come from too much demand or from supply problems and firms raising prices. If the economy is weak, raising rates can make things worse and may not fix supply. Helping supply and coordinating wages and prices can slow inflation without killing jobs.' });
  items.push({ school: 'Marxian', topic: 'inflation', title: 'Use planning, set prices on basics, and guarantee essentials', instruction: 'Do not rely on interest rates, which hit workers first. (1) Set or cap prices for essentials (food, energy, transport) so they cannot be pushed up for profit—like in the Soviet and Cuban systems. (2) Guarantee that everyone can get basics (e.g. through rationing or subsidised state supply, like Cuba\'s libreta) at stable prices. (3) Tax windfall or excess profits and use price controls on key goods so firms cannot pass all costs onto workers. (4) Expand state or collective provision (housing, health, education) so less of people\'s spending is at the mercy of market prices. (5) Use planning or targets to direct resources into supply bottlenecks instead of leaving it all to the market.', explanation: 'Some socialist states (e.g. USSR, Cuba, China, Vietnam) fought inflation with central or guided allocation, fixed or capped prices, and guaranteed access to basics rather than with rate hikes. Inflation is a conflict over who bears the cost: raising rates mainly creates unemployment and weakens workers. Setting prices on essentials and guaranteeing basics directly limit the ability of firms to restore profits through price rises and protect workers\' real living standards.' });
  items.push({ school: 'Post-Keynesian', topic: 'inflation', title: 'Use price and wage coordination, not just rates', instruction: 'Do not rely only on interest rates. Watch or cap prices in important sectors (energy, food, key imports). Get business, labour, and government to agree on how fast wages and prices should grow so they do not spiral. Use taxes or subsidies to soften shocks from world prices or the exchange rate.', explanation: 'Inflation is often about costs and conflict: everyone tries to protect their share. Rate hikes work mainly by creating unemployment and weakening workers, which is harsh. Agreed rules on wages and prices and targeted action on key prices can slow inflation with less job loss.' });
  items.push({ school: 'Structuralist', topic: 'inflation', title: 'Steer the exchange rate and key supply prices', instruction: 'Manage the exchange rate or capital flows so a big drop in your currency does not push import prices up. Use tariffs or reserves to smooth the cost of important goods. Help domestic production of essentials so you depend less on shaky world prices.', explanation: 'In many countries, inflation is driven by a falling currency and by supply shocks. A completely free float can make that worse. Managing the rate and stabilising key prices gives you more room to support growth while keeping inflation in check.' });
  return items;
}

function debtAdvisory(country: CountryState, scenarioDebtThreshold: number): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  items.push({ school: 'Mainstream', topic: 'debt', title: 'Cut the deficit slowly and spend on growth', instruction: 'Plan to shrink the deficit a bit each year (e.g. 0.5–1% of GDP) by spending less or raising revenue. Keep or increase spending on things that help growth (infrastructure, education) and cut the rest. Keep the central bank credible so borrowing costs do not shoot up.', explanation: 'To bring debt down, the budget balance has to improve over time. Doing it slowly avoids a sudden squeeze that could cause recession. A trusted central bank keeps interest rates from spiking. Debt is easier to carry when the economy is growing.' });
  items.push({ school: 'Keynesian', topic: 'debt', title: 'Grow your way out of debt; tax the rich', instruction: 'When the economy is weak, do not slash spending or you may shrink GDP and make debt look worse. Tighten when growth is strong instead. Raise more from the wealthy (wealth tax, higher top rates, property tax) and close loopholes. Invest in things that raise long-run growth so debt shrinks as a share of GDP.', explanation: 'Cutting spending in a slump can backfire: output falls, so debt relative to GDP can rise even if the deficit falls. It is easier to stabilise debt when the economy is growing. Taxing the rich and investing in growth both help the budget and help growth, so you do not put the whole cost on ordinary people.' });
  items.push({ school: 'Marxian', topic: 'debt', title: 'Use public ownership, public banking, and who pays—and, if needed, restructure debt', instruction: '(1) Finance the state through ownership and planning, not only taxes: state-owned firms and banks (as in USSR, China, Cuba) can send surpluses to the budget and reduce reliance on bond markets. (2) Build or strengthen public and cooperative banking so borrowing is in local currency and at least partly outside private finance—like some socialist states that kept foreign debt and "market discipline" at arm\'s length. (3) Raise revenue from capital and wealth (profit and wealth taxes) so the burden does not fall on workers; resist austerity that cuts jobs and public provision. (4) If debt is imposed by creditors and unsustainable, consider restructuring or selective default to reclaim policy space for development and social spending, as some socialist and post-colonial states have done. (5) Set out a clear multi-year policy agenda so investment serves development goals rather than just debt service.', explanation: 'Historically, some socialist states (e.g. USSR, China, Cuba, Yugoslavia, Vietnam) relied on state ownership of key sectors, planning, and domestic or non-market financing rather than on "sound finance" dictated by creditors. Debt sustainability was treated as a political choice about who pays and who controls investment. Public banks and state firms can reduce dependence on private lenders; taxing wealth and profits and—when necessary—restructuring unjust debt keep the cost off workers and preserve room for planned development.' });
  items.push({ school: 'Post-Keynesian', topic: 'debt', title: 'Do not cut the deficit if the private sector is weak', instruction: 'Remember: if households and firms are saving more or paying down debt, the government may need to spend to keep the economy going. Cutting the deficit too fast when the private sector is weak can cause recession and even push debt up. Tighten slowly when private demand is strong. Invest in jobs and growth so GDP grows and debt shrinks as a share of it. Consider lower or preferential rates on public debt to keep costs down.', explanation: 'One sector\'s deficit is another\'s surplus. When the private sector is cautious, the public sector often has to step in or income and jobs collapse. Forcing the government to balance the books no matter what can deepen a slump and sometimes raise debt relative to GDP. Supporting growth and managing who pays is the way to sustainable debt.' });
  items.push({ school: 'Structuralist', topic: 'debt', title: 'Borrow in your own currency; spend on productive stuff', instruction: 'Borrow in local currency when you can and build local bond markets so you are not at the mercy of foreign lenders or the exchange rate. Use capital controls or rules to limit short-term foreign debt. Spend on infrastructure and sectors that raise exports and growth so debt becomes easier to carry over time. Coordinate with monetary and exchange-rate policy so interest rates and the exchange rate help both debt sustainability and competitiveness.', explanation: 'In many countries, debt blows up because of foreign-currency borrowing and unstable capital flows. Relying more on domestic funding and spending on growth-raising projects improves both the budget and GDP. Aligning monetary and exchange-rate policy with development helps avoid crises and keeps debt manageable.' });
  return items;
}

function growthAdvisory(country: CountryState): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  if (country.gdpGrowth < -0.005) {
    items.push({ school: 'Keynesian', topic: 'growth', title: 'Spend to stop the contraction', instruction: 'Increase government spending and infrastructure investment. Cut interest rates if inflation allows. The private sector is not spending enough, so the government must step in. Counter-cyclical fiscal policy is the fastest way out of a recession.', explanation: 'When GDP is shrinking, the economy has spare capacity. Government spending fills the gap in demand and puts people back to work. The multiplier effect means each unit of spending generates more than one unit of output.' });
    items.push({ school: 'Marxian', topic: 'growth', title: 'Direct investment through planning', instruction: 'Use state planning and public banking to direct investment into productive sectors. The private sector will not invest during a downturn because profits are low. State-led industrialisation can sustain demand while building long-term productive capacity, as China did during the 2008 crisis.', explanation: 'Kalecki showed that profits equal investment plus the deficit minus savings. If private investment collapses, the state must replace it or the economy enters a deflationary spiral. Planning directs resources where they are needed rather than where profits are highest.' });
    items.push({ school: 'Structuralist', topic: 'growth', title: 'Protect domestic industry and invest in supply', instruction: 'Use tariffs and capital controls to prevent capital flight during the downturn. Invest in infrastructure and import substitution. Protect strategic industries so they survive the recession and can lead recovery.', explanation: 'In developing countries, recessions are often triggered or worsened by capital outflows and import surges. Protecting domestic capacity during downturns prevents deindustrialisation and preserves the base for future growth.' });
  } else if (country.gdpGrowth < 0.02) {
    items.push({ school: 'Keynesian', topic: 'growth', title: 'Stimulate demand carefully', instruction: 'Growth is sluggish. Consider modest increases in infrastructure spending or social investment. These boost demand while building productive capacity. Avoid tightening fiscal policy during weak growth.', explanation: 'Low growth often reflects insufficient demand. Productive public investment raises both current spending and future capacity, improving growth without stoking inflation.' });
    items.push({ school: 'Structuralist', topic: 'growth', title: 'Invest in productive transformation', instruction: 'Sluggish growth in developing countries often reflects structural dependence on low-value exports. Invest in manufacturing, processing, and skills to move up the value chain. Use planning and industrial policy to direct resources toward higher-productivity sectors.', explanation: 'Prebisch and the structuralists showed that countries exporting raw materials and importing manufactures face declining terms of trade. Breaking this pattern requires deliberate structural transformation.' });
  } else {
    items.push({ school: 'Post-Keynesian', topic: 'growth', title: 'Watch for financial fragility', instruction: 'Growth is solid, but Minsky warned that stability breeds instability. Keep financial regulation strong. Watch whether growth is driven by productive investment or by credit-fuelled speculation. Build fiscal buffers now for the next downturn.', explanation: 'During good times, borrowers and lenders take on more risk. Financial fragility builds invisibly. Strong regulation and prudent fiscal management during booms prevent the next crisis from being devastating.' });
    items.push({ school: 'Marxian', topic: 'growth', title: 'Ask who benefits from growth', instruction: 'GDP growth means nothing if the gains flow to capital while wages stagnate. Check whether social spending, basic goods guarantees, and planning intensity are high enough to ensure growth is shared. Strong growth is an opportunity to build public capacity and reduce inequality.', explanation: 'Marx showed that growth under capitalism tends to increase the organic composition of capital (more machines per worker), which creates a tendency for the rate of profit to fall—leading to crises. Marini demonstrated that growth in dependent economies can coexist with super-exploitation of workers. Without active redistribution, growth concentrates wealth.' });
  }
  return items;
}

function unemploymentAdvisory(country: CountryState): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  if (country.unemploymentRate > 0.08) {
    items.push({ school: 'Keynesian', topic: 'unemployment', title: 'Expand demand to create jobs', instruction: 'High unemployment means the economy has idle capacity. Increase government spending, particularly on infrastructure and social services that employ people directly. Consider lowering interest rates to encourage private investment. Do not pursue austerity when unemployment is high.', explanation: 'Unemployment above 8% reflects a demand shortfall. The private sector is not hiring because there are not enough customers. Government spending creates demand, which creates jobs, which creates more demand — the multiplier at work.' });
    items.push({ school: 'Marxian', topic: 'unemployment', title: 'Public employment and planning', instruction: 'Mass unemployment is the "reserve army of labour" that disciplines workers and suppresses wages. Counter it through direct public employment, state-led industrialisation, and planning that directs investment toward labour-intensive sectors. Guarantee basic goods so the unemployed can survive with dignity.', explanation: 'Kalecki argued that full employment is feared by capital because it gives workers bargaining power. The "natural rate of unemployment" is a political construct. State intervention to guarantee employment is both economically viable and politically transformative.' });
  } else if (country.unemploymentRate > 0.05) {
    items.push({ school: 'Mainstream', topic: 'unemployment', title: 'Address structural unemployment', instruction: 'Unemployment above the "natural rate" (NAIRU) suggests structural issues. Combine moderate demand support with supply-side policies: skills training, job search assistance, and incentives for hiring. Avoid overstimulating demand beyond the economy\'s potential, which could ignite inflation.', explanation: 'Mainstream theory distinguishes cyclical unemployment (from weak demand) from structural unemployment (skills mismatches, geographic mismatches, labor market rigidities). Near the NAIRU, demand stimulus mainly creates inflation rather than jobs. Supply-side interventions—training, mobility programs, labor market flexibility—are the sustainable solution.' });
  } else {
    items.push({ school: 'Post-Keynesian', topic: 'unemployment', title: 'Protect full employment', instruction: 'Low unemployment is a policy achievement, not an accident. Maintain it through stable demand management. Resist calls to raise interest rates just because unemployment is low — full employment is the goal. Use incomes policy and coordination to manage wage-price pressures without creating joblessness.', explanation: 'Friedman and Phelps argued that there is no permanent unemployment-inflation tradeoff (the expectations-augmented Phillips Curve). Post-Keynesians accept this critique but reject the NAIRU concept: unemployment is not "natural" but a policy variable. Incomes policy—coordinated wage-price restraint—can maintain full employment without inflation. The Australian Accord (1983-1996) demonstrated this, though its success depended on unique institutional and external conditions.' });
  }
  return items;
}

function tradeAdvisory(country: CountryState, state: SimulationState): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  const isDeveloping = ['independence-underdevelopment', 'commodity-pressure', 'rising-industrializer'].includes(state.scenario.scenarioId);

  if (country.currentAccount < -30) {
    items.push({ school: 'Structuralist', topic: 'trade', title: 'Reduce external dependence', instruction: 'Your trade deficit is large. Raise tariffs on non-essential imports, use capital controls to limit short-term capital outflows, and invest in domestic production of goods you currently import. Manage the exchange rate to prevent further deterioration.', explanation: 'Large trade deficits make you dependent on foreign capital inflows. When those flows reverse — as in the 1997 Asian crisis or 2008 — the result is a currency crash and recession. Import substitution and capital controls reduce this vulnerability.' });
    if (isDeveloping) {
      items.push({ school: 'Marxian', topic: 'trade', title: 'Delink from unequal exchange', instruction: 'Your current account deficit reflects value transfer to wealthier countries. Arghiri Emmanuel showed that trade between low-wage and high-wage countries systematically transfers value from the periphery. Raise tariffs, impose capital controls, develop domestic industry, and pursue South-South trade on more equal terms.', explanation: 'Samir Amin\'s "delinking" strategy means partially withdrawing from a world market that is structured to drain your surplus. South Korea, Taiwan, and China industrialised behind protective walls. Free trade between unequal partners enriches the stronger.' });
    }
  } else if (country.currentAccount > 30) {
    items.push({ school: 'Keynesian', topic: 'trade', title: 'Use your surplus wisely', instruction: 'A large trade surplus means you are lending to the rest of the world. Consider whether you could boost domestic consumption and living standards instead. Accumulating reserves indefinitely is not a development strategy.', explanation: 'Persistent surpluses can suppress domestic demand. Germany\'s export obsession contributed to the eurozone crisis by draining demand from Southern Europe. Some rebalancing toward domestic consumption raises living standards.' });
  } else {
    items.push({ school: 'Structuralist', topic: 'trade', title: 'Build trade resilience', instruction: 'Your trade position is manageable. Use this stability to diversify exports, build processing capacity for raw materials, and develop regional trade relationships. Managed exchange rates and prudent capital controls provide insurance against future shocks.', explanation: 'Even when trade is balanced, structural vulnerabilities may lurk. Commodity dependence, concentrated export markets, and short-term foreign debt can all trigger crises when conditions change.' });
  }
  return items;
}

function capitalCompositionAdvisory(country: CountryState): AdvisoryItem[] {
  const items: AdvisoryItem[] = [];
  const pubInvShare = country.publicInvestmentShare ?? 0;
  const pubOwnShare = country.publicOwnershipShare ?? 0;
  const invQuality = country.investmentQuality ?? 0.7;
  const stateCap = country.stateCapacity ?? 0.5;

  // Marxian perspective on capital composition
  if (pubInvShare < 0.2 && pubOwnShare < 0.15) {
    items.push({ school: 'Marxian', topic: 'growth', title: 'Capital composition favors private accumulation', instruction: 'Your economy relies heavily on private investment. Consider expanding public banking, planning intensity, or state-owned enterprises to direct investment toward social needs rather than profit maximization.', explanation: 'Kalecki showed that investment determines profits under capitalism. When private capital dominates, investment flows where profits are highest—not necessarily where social needs are greatest. China\'s rapid development combined state capacity with market mechanisms, directing investment toward infrastructure and industrialization. High private dominance without countervailing public power leads to underinvestment in public goods, financialization, and periodic crises as capital seeks returns over sustainability.' });
  }

  if (pubInvShare > 0.35 && stateCap < 0.6) {
    items.push({ school: 'Structuralist', topic: 'growth', title: 'State-led investment without adequate capacity', instruction: 'High public investment share but low state capacity risks inefficiency. Strengthen institutional quality through anti-corruption measures, technocratic meritocracy, and transparent procurement before expanding planning further.', explanation: 'Prebisch and the ECLAC school recognized that state capacity varies across development stages. Simply expanding public investment without capable bureaucracy—what Evans called "embedded autonomy"—leads to rent-seeking, patronage, and inefficient capital allocation. The East Asian developmental states (South Korea, Taiwan) succeeded because they combined high investment with Weberian bureaucratic capacity. Your state capacity must match your intervention ambition.' });
  }

  if (invQuality < 0.6) {
    items.push({ school: 'Post-Keynesian', topic: 'outlook', title: 'Investment quality deteriorating—speculative boom risks', instruction: 'Your investment quality score is low, suggesting much private investment is speculative rather than productive. Strengthen financial regulation to channel credit toward real capital formation and away from asset price bubbles.', explanation: 'Minsky\'s financial instability hypothesis shows that unregulated private investment cycles through hedge, speculative, and Ponzi phases. Low investment quality means your growth rests on financial bubbles rather than productive capacity. When the bubble bursts—as in 2008—supposed investment becomes non-performing loans, triggering debt deflation. Public investment typically has higher quality (directed at infrastructure, capacity) but requires state capacity to deploy effectively.' });
  }

  if (pubInvShare > 0.4 && invQuality > 0.8) {
    items.push({ school: 'Keynesian', topic: 'growth', title: 'High-quality public investment enables sustainable growth', instruction: 'Your capital composition—high public investment share with high quality—is the foundation for long-term growth. Maintain this balance; avoid privatization drives that would sacrifice productive investment for short-term efficiency gains.', explanation: 'Mariana Mazzucato\'s work on the entrepreneurial state shows that public investment often bears the risks that private capital shuns—basic research, infrastructure, early-stage technology. The internet, GPS, touchscreen technology, and green energy all received decisive public investment before private profit could be extracted. Your current capital composition reflects this wisdom: public investment targets the high-risk, high-social-return projects that markets underprovide.' });
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
  // Add capital composition risks
  if ((country.publicInvestmentShare ?? 0) < 0.15 && (country.investmentQuality ?? 0.7) < 0.65) risks.push('low-quality private investment dominance');
  if ((country.stateCapacity ?? 0.5) < 0.4 && (country.publicOwnershipShare ?? 0) > 0.3) risks.push('state overreach beyond capacity');

  if (risks.length === 0) {
    items.push({ school: 'General', topic: 'outlook', title: 'Economy is broadly stable', instruction: 'No urgent crises. Use this window to invest in long-term capacity: infrastructure, education, industrial development, and social protections. Build fiscal buffers and financial resilience for the next shock.', explanation: 'Stability is an opportunity, not a destination. Countries that invest during good times weather bad times better. Minsky\'s insight — stability breeds instability — means complacency is the greatest risk right now.' });
  } else if (risks.length <= 2) {
    items.push({ school: 'General', topic: 'outlook', title: `Watch: ${risks.join(' and ')}`, instruction: `Your economy faces ${risks.join(' and ')}. These are manageable but require attention. Prioritise the most pressing issue while avoiding policy choices that worsen the others. Check the advice panels for each issue.`, explanation: 'Most policy challenges involve trade-offs. Fighting inflation with rate hikes can worsen unemployment. Cutting spending to reduce debt can slow growth. Finding the right balance requires understanding these interconnections.' });
  } else {
    items.push({ school: 'General', topic: 'outlook', title: `Multiple pressures: ${risks.join(', ')}`, instruction: `Your economy is under stress on several fronts. Triage: protect the most vulnerable (basic goods guarantee, social spending) while addressing the root cause. Consider whether a bold structural shift — debt restructuring, capital controls, planning — might resolve multiple problems at once rather than treating each separately.`, explanation: 'Adam Tooze calls the interaction of multiple crises a "polycrisis." When problems compound, incremental fixes are insufficient. Bold action — like Iceland\'s decision to let banks fail in 2008, or Argentina\'s default in 2001 — can resolve structural contradictions that piecemeal policy cannot.' });
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
  out.push(...capitalCompositionAdvisory(country)); // New: capital composition awareness

  if (country.inflationRate >= INFLATION_THRESHOLD) out.push(...inflationAdvisory(country));
  if (country.debtToGdp >= debtThreshold) out.push(...debtAdvisory(country, debtThreshold));

  return out;
}

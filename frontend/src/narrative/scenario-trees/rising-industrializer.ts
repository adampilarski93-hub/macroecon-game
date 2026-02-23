import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Rising Industrializer — People's Republic of Donghai (20 decisions)
 * Thinkers: Amin, Marini, Lenin, Desai
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'Rising Industrializer',
    narrative: `You lead the People's Republic of Donghai. Marini theorized dependent development. Amin warned opening without capacity causes deindustrialization. Lenin analyzed monopoly capital's super-profits. Desai's geopolitical economy explains your options. What do you do first?`,
    choices: [
      { id: 'full', text: 'Full speed ahead', consequence: '', effects: { economicStrength: 15, priceStability: -10, debtBurden: 10 } },
      { id: 'managed', text: 'Managed growth', consequence: '', effects: { economicStrength: 8, priceStability: 5, publicSupport: 5 } },
      { id: 'shared', text: 'Shared gains', consequence: '', effects: { publicSupport: 15, economicStrength: 5, debtBurden: 5 } },
    ],
  },
  { phase: 1, title: 'State vs Market', narrative: `Do you expand state-directed investment or rely on private capital?`, choices: [{ id: 'state', text: 'Expand state investment', consequence: '', effects: { economicStrength: 12, sovereignty: 10 } }, { id: 'private', text: 'Rely on private', consequence: '', effects: { economicStrength: 10, sovereignty: -5 } }] },
  { phase: 1, title: 'Wages', narrative: `Marini: super-exploitation boosts exports but destroys demand. Do you raise wages?`, choices: [{ id: 'yes', text: 'Raise wages', consequence: '', effects: { publicSupport: 15, economicStrength: 5 } }, { id: 'no', text: 'Keep low', consequence: '', effects: { economicStrength: 12, publicSupport: -8 } }] },
  { phase: 1, title: 'Foreign Investment', narrative: `Lenin: monopoly capital exports for super-profits. Do you restrict or welcome FDI?`, choices: [{ id: 'restrict', text: 'Restrict FDI', consequence: '', effects: { sovereignty: 12, economicStrength: 2 } }, { id: 'welcome', text: 'Welcome FDI', consequence: '', effects: { economicStrength: 15, sovereignty: -10 } }] },
  { phase: 2, title: 'Export Strategy', narrative: `Do you prioritize export discipline or domestic demand?`, choices: [{ id: 'export', text: 'Export discipline', consequence: '', effects: { economicStrength: 12 } }, { id: 'domestic', text: 'Domestic demand', consequence: '', effects: { publicSupport: 12, economicStrength: 8 } }] },
  { phase: 2, title: 'Inflation', narrative: `Inflation is rising. Do you impose price controls or raise rates?`, choices: [{ id: 'controls', text: 'Price controls', consequence: '', effects: { priceStability: 10, publicSupport: 8 } }, { id: 'rates', text: 'Raise rates', consequence: '', effects: { priceStability: 8, economicStrength: -5 } }] },
  { phase: 2, title: 'South-South', narrative: `Desai: multipolarity offers alternatives. Do you prioritize South-South trade?`, choices: [{ id: 'yes', text: 'Prioritize', consequence: '', effects: { sovereignty: 10, economicStrength: 5 } }, { id: 'no', text: 'Focus on North', consequence: '', effects: { economicStrength: 10, sovereignty: -5 } }] },
  { phase: 2, title: 'Rural Development', narrative: `Do you invest in rural areas to share gains?`, choices: [{ id: 'yes', text: 'Invest in rural', consequence: '', effects: { publicSupport: 15, economicStrength: 6 } }, { id: 'no', text: 'Focus on industry', consequence: '', effects: { economicStrength: 12 } }] },
  { phase: 3, title: 'Subimperialism', narrative: `Marini's subimperialism: do you avoid exploiting smaller neighbors?`, choices: [{ id: 'yes', text: 'Avoid exploitation', consequence: '', effects: { sovereignty: 8, publicSupport: 5 } }, { id: 'no', text: 'Pursue advantage', consequence: '', effects: { economicStrength: 10 } }] },
  { phase: 3, title: 'Technology Transfer', narrative: `Do you insist on technology transfer in FDI deals?`, choices: [{ id: 'yes', text: 'Insist on transfer', consequence: '', effects: { sovereignty: 12, economicStrength: 8 } }, { id: 'no', text: 'No', consequence: '', effects: { economicStrength: 10 } }] },
  { phase: 3, title: 'Debt', narrative: `Debt is building. Do you slow investment or borrow more?`, choices: [{ id: 'slow', text: 'Slow investment', consequence: '', effects: { debtBurden: -10, economicStrength: -5 } }, { id: 'borrow', text: 'Borrow more', consequence: '', effects: { economicStrength: 12, debtBurden: 10 } }] },
  { phase: 3, title: 'Labor Rights', narrative: `Do you strengthen labor rights?`, choices: [{ id: 'yes', text: 'Strengthen', consequence: '', effects: { publicSupport: 15 } }, { id: 'no', text: 'No', consequence: '', effects: { economicStrength: 5 } }] },
  { phase: 4, title: 'Mid-Term', narrative: `Industry is booming. Do you cool the economy or let it run?`, choices: [{ id: 'cool', text: 'Cool the economy', consequence: '', effects: { priceStability: 10, economicStrength: -3 } }, { id: 'run', text: 'Let it run', consequence: '', effects: { economicStrength: 15, priceStability: -8 } }] },
  { phase: 4, title: 'Inequality', narrative: `Growth is uneven. Do you redistribute?`, choices: [{ id: 'yes', text: 'Redistribute', consequence: '', effects: { publicSupport: 15, economicStrength: 2 } }, { id: 'no', text: 'No', consequence: '', effects: { economicStrength: 8 } }] },
  { phase: 4, title: 'Geopolitical Economy', narrative: `Desai: states shape outcomes. Do you use industrial policy aggressively?`, choices: [{ id: 'yes', text: 'Aggressive industrial policy', consequence: '', effects: { economicStrength: 12, sovereignty: 10 } }, { id: 'no', text: 'Modest intervention', consequence: '', effects: { economicStrength: 6 } }] },
  { phase: 4, title: 'Exchange Rate', narrative: `Do you manage the exchange rate for export competitiveness?`, choices: [{ id: 'yes', text: 'Manage rate', consequence: '', effects: { economicStrength: 10 } }, { id: 'no', text: 'Let it float', consequence: '', effects: { sovereignty: 5 } }] },
  { phase: 5, title: 'Year Two', narrative: `Growth is strong. Do you consolidate or accelerate?`, choices: [{ id: 'consolidate', text: 'Consolidate', consequence: '', effects: { priceStability: 8 } }, { id: 'accelerate', text: 'Accelerate', consequence: '', effects: { economicStrength: 12 } }] },
  { phase: 5, title: 'Dollar Dependence', narrative: `Do you reduce dollar dependence in trade?`, choices: [{ id: 'yes', text: 'Reduce dependence', consequence: '', effects: { sovereignty: 12 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 5, title: 'Legacy', narrative: `What development model do you leave?`, choices: [{ id: 'sovereign', text: 'Sovereign industrializer', consequence: '', effects: { sovereignty: 12, economicStrength: 10 } }, { id: 'integrated', text: 'Integrated industrializer', consequence: '', effects: { economicStrength: 12 } }] },
  { phase: 5, title: 'Final Decision', narrative: `Your last decision for Donghai.`, choices: [{ id: 'shared', text: 'Shared growth legacy', consequence: '', effects: { publicSupport: 12, economicStrength: 8 } }, { id: 'industrial', text: 'Industrial powerhouse legacy', consequence: '', effects: { economicStrength: 12 } }, { id: 'balanced', text: 'Balanced legacy', consequence: '', effects: { economicStrength: 8, publicSupport: 8 } }] },
];

const endings: LongFormEnding[] = [
  { id: 'victory', endingType: 'victory', title: 'Industrialisation with a Human Face', endingNarrative: `You industrialised while sharing the gains. Donghai has grown without losing its soul.` },
  { id: 'partial', endingType: 'partial_victory', title: 'Industrial Powerhouse', endingNarrative: `You built industry. Growth was strong. The distribution of gains remains contested.` },
  { id: 'defeat', endingType: 'defeat', title: 'Dependent Development', endingNarrative: `Growth came but in ways that serve foreign capital. The struggle for sovereign development continues.` },
];

const { getNode } = createLongFormTree(blocks, endings, (i) => (i === 0 ? 0 : i === 1 ? 1 : 2));
export { getNode };

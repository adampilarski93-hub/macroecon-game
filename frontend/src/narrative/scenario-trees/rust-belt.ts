import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Rust Belt Revival — Federal Republic of Nordmark (20 decisions)
 * Thinkers: Polanyi, Piketty, Lauesen
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'The Rust Belt Challenge',
    narrative: `You lead the Federal Republic of Nordmark. Factories have closed, jobs have moved away. Lauesen argues Northern prosperity rests on value transferred from the South. Polanyi's double movement was violated. Piketty shows wealth concentrates when r > g. What do you do first?`,
    choices: [
      { id: 'industrial', text: 'Launch industrial policy', consequence: 'You bet on factories.', effects: { economicStrength: 8, employment: 10, debtBurden: 5 } },
      { id: 'services', text: 'Invest in services and retraining', consequence: 'You focus on human capital.', effects: { employment: 5, publicSupport: 8, economicStrength: 5 } },
      { id: 'austerity', text: 'Cut spending and wait', consequence: 'You take a hands-off approach.', effects: { debtBurden: -10, publicSupport: -15, employment: -5 } },
    ],
  },
  { phase: 1, title: 'First Moves', narrative: `Your initial policy has drawn attention. Do you hold a summit with mayors of affected towns or work through existing channels?`, choices: [{ id: 'summit', text: 'Hold a summit', consequence: '', effects: { publicSupport: 8 } }, { id: 'channels', text: 'Work through channels', consequence: '', effects: { economicStrength: 3 } }] },
  { phase: 1, title: 'Energy Costs', narrative: `Energy prices are squeezing industry. Do you subsidize industrial energy or let the market decide?`, choices: [{ id: 'subsidize', text: 'Subsidize industrial energy', consequence: '', effects: { economicStrength: 8, debtBurden: 8 } }, { id: 'market', text: 'Let the market decide', consequence: '', effects: { debtBurden: -5, economicStrength: -5 } }] },
  { phase: 1, title: 'Training Programs', narrative: `Retraining enrollment is low. Do you add stipends for trainees or improve placement incentives?`, choices: [{ id: 'stipends', text: 'Add trainee stipends', consequence: '', effects: { employment: 8, publicSupport: 10, debtBurden: 5 } }, { id: 'placement', text: 'Improve placement incentives', consequence: '', effects: { employment: 5, debtBurden: 2 } }] },
  { phase: 2, title: 'Green Investment', narrative: `Battery manufacturers are interested. Do you offer tax breaks or direct grants?`, choices: [{ id: 'tax', text: 'Offer tax breaks', consequence: '', effects: { economicStrength: 10, debtBurden: 3 } }, { id: 'grants', text: 'Direct grants', consequence: '', effects: { economicStrength: 12, debtBurden: 8 } }] },
  { phase: 2, title: 'Import Competition', narrative: `Lauesen would note your cheap imports reflect global wage hierarchies. Do you raise tariffs on key goods or stay open?`, choices: [{ id: 'tariffs', text: 'Raise tariffs', consequence: '', effects: { economicStrength: 5, publicSupport: 5, priceStability: -5 } }, { id: 'open', text: 'Stay open', consequence: '', effects: { economicStrength: -3, priceStability: 5 } }] },
  { phase: 2, title: 'Inequality Focus', narrative: `Piketty's work applies: wealth is concentrating in your cities. Do you propose a wealth tax or focus on jobs?`, choices: [{ id: 'wealth_tax', text: 'Propose wealth tax', consequence: '', effects: { publicSupport: 12, debtBurden: -5 } }, { id: 'jobs', text: 'Focus on jobs', consequence: '', effects: { employment: 10, economicStrength: 8 } }] },
  { phase: 2, title: 'Service Sector', narrative: `The service sector is growing but wages are low. Do you push for minimum wage increases or let it evolve?`, choices: [{ id: 'min_wage', text: 'Push for minimum wage', consequence: '', effects: { publicSupport: 10, employment: -3 } }, { id: 'evolve', text: 'Let it evolve', consequence: '', effects: { employment: 5, publicSupport: -5 } }] },
  { phase: 3, title: 'Infrastructure', narrative: `Roads and broadband are inadequate in rural areas. Do you launch a major program?`, choices: [{ id: 'launch', text: 'Launch major program', consequence: '', effects: { economicStrength: 10, debtBurden: 10, publicSupport: 8 } }, { id: 'modest', text: 'Modest improvements only', consequence: '', effects: { economicStrength: 4, debtBurden: 3 } }] },
  { phase: 3, title: 'Union Relations', narrative: `Unions want sectoral bargaining. Do you support it or resist?`, choices: [{ id: 'support', text: 'Support sectoral bargaining', consequence: '', effects: { publicSupport: 12, economicStrength: 2 } }, { id: 'resist', text: 'Resist', consequence: '', effects: { economicStrength: 5, publicSupport: -10 } }] },
  { phase: 3, title: 'Housing Crisis', narrative: `Factory towns have empty homes; cities have shortages. Do you fund relocation or build in cities?`, choices: [{ id: 'relocation', text: 'Fund relocation', consequence: '', effects: { employment: 5, publicSupport: 5 } }, { id: 'cities', text: 'Build in cities', consequence: '', effects: { economicStrength: 8, publicSupport: 3 } }] },
  { phase: 3, title: 'Budget Pressure', narrative: `Debt is rising. Do you cut other programs to fund industrial policy or borrow more?`, choices: [{ id: 'cut', text: 'Cut other programs', consequence: '', effects: { debtBurden: -8, publicSupport: -5 } }, { id: 'borrow', text: 'Borrow more', consequence: '', effects: { debtBurden: 8, economicStrength: 8 } }] },
  { phase: 4, title: 'Mid-Term Review', narrative: `Some factories have opened. Unemployment has fallen slightly. Do you double down or consolidate?`, choices: [{ id: 'double', text: 'Double down', consequence: '', effects: { economicStrength: 12, debtBurden: 10 } }, { id: 'consolidate', text: 'Consolidate', consequence: '', effects: { debtBurden: -8, economicStrength: 2 } }] },
  { phase: 4, title: 'Skills Mismatch', narrative: `Employers say workers lack skills. Do you expand vocational education or immigration?`, choices: [{ id: 'vocational', text: 'Expand vocational education', consequence: '', effects: { employment: 10, debtBurden: 5 } }, { id: 'immigration', text: 'Ease immigration', consequence: '', effects: { economicStrength: 8, publicSupport: -5 } }] },
  { phase: 4, title: 'Regional Inequality', narrative: `The gap between thriving and declining regions is widening. Do you redistribute or focus on growth?`, choices: [{ id: 'redistribute', text: 'Redistribute', consequence: '', effects: { publicSupport: 12, economicStrength: 2 } }, { id: 'growth', text: 'Focus on growth', consequence: '', effects: { economicStrength: 10, publicSupport: 2 } }] },
  { phase: 4, title: 'Energy Transition', narrative: `Coal plants are closing. Do you fund a just transition or let markets handle it?`, choices: [{ id: 'just', text: 'Fund just transition', consequence: '', effects: { publicSupport: 15, employment: 5, debtBurden: 8 } }, { id: 'market', text: 'Let markets handle it', consequence: '', effects: { debtBurden: -5, publicSupport: -10 } }] },
  { phase: 5, title: 'Year Two', narrative: `Progress is visible but uneven. Do you expand the program or declare victory?`, choices: [{ id: 'expand', text: 'Expand the program', consequence: '', effects: { economicStrength: 10, debtBurden: 8 } }, { id: 'declare', text: 'Declare victory', consequence: '', effects: { debtBurden: -5, publicSupport: 5 } }] },
  { phase: 5, title: 'Export Push', narrative: `New manufacturers want export support. Do you provide it?`, choices: [{ id: 'yes', text: 'Provide export support', consequence: '', effects: { economicStrength: 12 } }, { id: 'no', text: 'Decline', consequence: '', effects: { debtBurden: -3 } }] },
  { phase: 5, title: 'Labor Shortage', narrative: `Some sectors report labor shortages. Do you support wage increases or training?`, choices: [{ id: 'wages', text: 'Support wage increases', consequence: '', effects: { publicSupport: 10, economicStrength: 3 } }, { id: 'training', text: 'Focus on training', consequence: '', effects: { employment: 8 } }] },
  { phase: 5, title: 'Final Quarter', narrative: `Your term ends. What legacy do you leave for the rust belt?`, choices: [{ id: 'industrial', text: 'An industrial revival', consequence: '', effects: { economicStrength: 10, employment: 10 } }, { id: 'transition', text: 'A managed transition', consequence: '', effects: { publicSupport: 8, economicStrength: 5 } }, { id: 'mixed', text: 'A mixed record', consequence: '', effects: { debtBurden: -5 } }] },
];

const endings: LongFormEnding[] = [
  { id: 'victory', endingType: 'victory', title: 'Rust Belt Revival', endingNarrative: `You revived industry through targeted policy. Factories have reopened. Jobs have returned. The rust belt is showing signs of life.` },
  { id: 'partial', endingType: 'partial_victory', title: 'Managed Transition', endingNarrative: `You eased the transition. Not everyone was saved, but many found new paths. The outcome is mixed but real.` },
  { id: 'defeat', endingType: 'defeat', title: 'Decline Continues', endingNarrative: `The hands-off approach left many communities behind. Debt fell, but so did hope. The rust belt's struggle continues.` },
];

const { getNode } = createLongFormTree(blocks, endings, (i) => (i === 0 ? 0 : i === 1 ? 1 : 2));
export { getNode };

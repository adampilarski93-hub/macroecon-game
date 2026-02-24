import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';

/**
 * Emerging Debt Crisis — Republic of Meridia
 * Refactored into Dynamic Narrative Paths (Hudson vs Tooze vs Kadri)
 */

const introArc: ScenarioArc = {
  id: 'start',
  blocks: [
    {
      phase: 1,
      title: 'The Debt Trap',
      narrative: `You've just been appointed finance minister of the Republic of Meridia. The economy is in trouble: public debt stands at 65% of GDP and rising. Your borrowing costs are set to balloon.

Some analysts argue that international debt often functions as a tool of control — creditors use it to impose policies that serve their interests. How do you frame your initial response?`,
      choices: [
        { id: 'hudson', text: 'Challenge the "Creditor Cartel"', consequence: 'Frame debt as a mechanism of extraction.', effects: { sovereignty: 5, debtBurden: 2 }, nextArc: 'hudson' },
        { id: 'tooze', text: 'Manage the "Polycrisis"', consequence: 'Frame this as a complex political challenge.', effects: { internationalStanding: 5, economicStrength: -2 }, nextArc: 'tooze' },
        { id: 'kadri', text: 'Prioritize Sovereign Development', consequence: 'Frame debt as an obstacle to industrialization.', effects: { economicStrength: 5, sovereignty: 2 }, nextArc: 'kadri' },
      ],
    },
  ],
};

const hudsonArc: ScenarioArc = {
  id: 'hudson',
  blocks: [
    {
      phase: 2,
      title: 'The Debt Jubilee',
      narrative: `Michael Hudson argues that unpayable debts should be cancelled to prevent social collapse. You propose a partial "Debt Jubilee" for domestic borrowers and demand a haircut from international creditors. The IMF is furious, calling it a "violation of market norms." Do you hold firm?`,
      choices: [
        { id: 'hold_firm', text: 'Hold firm on Jubilee', consequence: 'Prioritize the social fabric over creditors.', effects: { publicSupport: 15, debtBurden: -15, internationalStanding: -10 } },
        { id: 'compromise', text: 'Compromise on terms', consequence: 'Seek a middle ground with the IMF.', effects: { debtBurden: -5, internationalStanding: 5 } },
      ],
    },
    {
      phase: 3,
      title: 'Public Banking',
      narrative: `To bypass the "FIRE sector parasitism" Hudson warns about, you propose a state-owned development bank to fund productive industry directly. Private banks claim this is "unfair competition." How do you respond?`,
      choices: [
        { id: 'nationalize', text: 'Nationalize key banks', consequence: 'Take full control of credit.', effects: { sovereignty: 10, economicStrength: 8, publicSupport: -5 }, minStats: { sovereignty: 60 } },
        { id: 'pbanking', text: 'Launch the Public Bank', consequence: 'Compete with the private sector.', effects: { economicStrength: 5, sovereignty: 5 } },
      ],
    },
    {
      phase: 4,
      title: 'Resisting Debt Deflation',
      narrative: `Debt deflation is crushing demand. Hudson suggests that the only way out is to prioritize the productive economy over the rentier class. Do you implement a steep wealth tax to fund a basic goods guarantee?`,
      choices: [
        { id: 'wealth_tax', text: 'Implement Wealth Tax', consequence: 'Tax the rentiers to fund the people.', effects: { publicSupport: 12, economicStrength: 5, debtBurden: -5 } },
        { id: 'stimulus', text: 'Standard Stimulus', consequence: 'Use traditional deficit spending.', effects: { economicStrength: 8, debtBurden: 10 } },
      ],
    },
  ],
};

const toozeArc: ScenarioArc = {
  id: 'tooze',
  blocks: [
    {
      phase: 2,
      title: 'Polycrisis Management',
      narrative: `Adam Tooze describes our era as a "polycrisis" where financial, climate, and geopolitical shocks interact. A sudden commodity price spike hits Meridia. Do you use political swap lines with major powers to stabilize the currency, or implement emergency price controls?`,
      choices: [
        { id: 'swap_lines', text: 'Activate Swap Lines', consequence: 'Leverage geopolitical relationships.', effects: { internationalStanding: 10, priceStability: 8, sovereignty: -5 } },
        { id: 'price_controls', text: 'Emergency Price Controls', consequence: 'Direct state intervention.', effects: { publicSupport: 10, priceStability: 5, economicStrength: -3 } },
      ],
    },
    {
      phase: 3,
      title: 'The Death of Ordoliberalism',
      narrative: `Austerity is failing, just as Tooze documented in "Crashed." The "market self-correction" isn't happening. Do you pivot to a massive "Green Industrial Plan" funded by central bank money printing, or stick to the fiscal rules to preserve credibility?`,
      choices: [
        { id: 'green_plan', text: 'Green Industrial Plan', consequence: 'Massive state-led investment.', effects: { economicStrength: 12, publicSupport: 8, debtBurden: 15 } },
        { id: 'fiscal_rules', text: 'Preserve Fiscal Rules', consequence: 'Maintain market confidence.', effects: { internationalStanding: 10, debtBurden: -5, economicStrength: -5 } },
      ],
    },
    {
      phase: 4,
      title: 'Political Intervention',
      narrative: `A major bank is on the verge of collapse. Tooze argues that such moments are purely political. Do you bail out the bank with strict conditions on executive pay and lending, or let it fail to "teach the market a lesson"?`,
      choices: [
        { id: 'bailout', text: 'Conditional Bailout', consequence: 'Stabilize the system but punish the owners.', effects: { economicStrength: 5, debtBurden: 8, publicSupport: 5 } },
        { id: 'fail', text: 'Let it Fail', consequence: 'Risk a systemic crash.', effects: { economicStrength: -15, debtBurden: -5, publicSupport: -10 } },
      ],
    },
  ],
};

const kadriArc: ScenarioArc = {
  id: 'kadri',
  blocks: [
    {
      phase: 2,
      title: 'Resisting Deindustrialization',
      narrative: `Ali Kadri warns that imperialist debt traps are designed to deindustrialize the periphery. You notice foreign firms are buying up your strategic assets at fire-sale prices. Do you block these sales and nationalize the resources?`,
      choices: [
        { id: 'block_sales', text: 'Block Asset Sales', consequence: 'Protect national productive capacity.', effects: { sovereignty: 12, economicStrength: 5, internationalStanding: -8 } },
        { id: 'negotiate', text: 'Negotiate Partnerships', consequence: 'Allow investment with state oversight.', effects: { economicStanding: 8, internationalStanding: 5, sovereignty: -3 } },
      ],
    },
    {
      phase: 3,
      title: 'The Comprador Challenge',
      narrative: `Local elites — what Samir Amin called the "comprador bourgeoisie" — are moving their capital out of the country to avoid your new taxes. Do you implement strict capital controls to keep Meridia's wealth at home?`,
      choices: [
        { id: 'cap_controls', text: 'Impose Capital Controls', consequence: 'Stop the drain of national wealth.', effects: { sovereignty: 10, debtBurden: -5, economicStrength: -5 } },
        { id: 'incentives', text: 'Offer Tax Incentives', consequence: 'Try to lure the capital back.', effects: { economicStrength: 5, publicSupport: -8 } },
      ],
    },
    {
      phase: 4,
      title: 'Sovereign Industrialization',
      narrative: `Kadri argues that development is a class struggle. You propose a "People's Development Plan" that prioritizes local manufacturing over imports. This will raise prices in the short term but build long-term strength. Do you proceed?`,
      choices: [
        { id: 'proceed', text: 'Launch the Plan', consequence: 'Build sovereign industry.', effects: { economicStrength: 15, sovereignty: 10, priceStability: -10 } },
        { id: 'delay', text: 'Delay for Stability', consequence: 'Prioritize current consumption.', effects: { priceStability: 5, publicSupport: 5, economicStrength: -5 } },
      ],
    },
  ],
};

const endings: LongFormEnding[] = [
  { id: 'victory', endingType: 'victory', title: 'Sustainable Path', endingNarrative: `You've navigated the debt crisis. By choosing a distinct theoretical path and sticking to it, you proved that political choices matter. Meridia is on a sustainable, sovereign path.` },
  { id: 'partial', endingType: 'partial_victory', title: 'Mixed Legacy', endingNarrative: `Your term ends with mixed results. You avoided catastrophe, but the underlying structural issues remain. The next government will inherit both your gains and your compromises.` },
  { id: 'defeat', endingType: 'defeat', title: 'Crisis Deepens', endingNarrative: `The crisis has deepened. Your choices failed to break the cycle of debt and dependency. The struggle for Meridia's future continues under even harder conditions.` },
];

const { getNode } = createArcBasedTree(
  [introArc, hudsonArc, toozeArc, kadriArc],
  endings,
  (choiceIdx) => (choiceIdx === 0 ? 0 : choiceIdx === 1 ? 1 : 2),
);

export { getNode };

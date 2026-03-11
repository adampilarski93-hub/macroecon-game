import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Reservation Governor — Tribal governor of a Southwest U.S. reservation (20 decisions)
 * Informed by: Majerle Lister, Andrew Curley, Kendrick Many Goats, George Manuel
 * See .cursor/skills/tribal-governance-southwest/SKILL.md
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'Taking Office',
    narrative: `You have just been sworn in as governor of the Red Mesa Nation, a reservation in the Southwest. Unemployment is high; many families lack running water and electricity. George Manuel wrote that Indigenous peoples are nations — "We own those places. They are ours." — but federal policy has long treated your people as wards. Your tribal council is divided. Some want gaming; others want to avoid it. The BIA holds your land in trust. What do you prioritise first?`,
    choices: [
      { id: 'gaming', text: 'Pursue gaming compact', consequence: 'You open negotiations.', effects: { economicStrength: 5, sovereignty: -5, publicSupport: 5 } },
      { id: 'infra', text: 'Push for infrastructure funding', consequence: 'You go to the feds.', effects: { fiscalHealth: 5, sovereignty: -8, publicSupport: 8 } },
      { id: 'sovereignty', text: 'Assert jurisdictional authority first', consequence: 'You strengthen the tribe\'s hand.', effects: { sovereignty: 12, economicStrength: -5 } },
    ],
  },
  {
    phase: 1,
    title: 'The Energy Question',
    narrative: `Your reservation sits on coal. A power plant and mine have employed tribal members for decades — but the plant is ageing, and utilities are shifting to renewables. Andrew Curley writes that tribal leaders have used coal development as a form of "carbon sovereignty," working within colonial structures to assert self-determination. Now that era is ending. Do you fight to extend the coal operations, pivot to renewables, or seek a just transition fund from the federal government?`,
    choices: [
      { id: 'extend', text: 'Fight to extend coal operations', consequence: 'You buy time.', effects: { economicStrength: 10, sovereignty: 5, culturalIntegrity: -10 }, nextBlock: 2 },
      { id: 'renewables', text: 'Pivot to solar and wind', consequence: 'You plan the transition.', effects: { sovereignty: 8, economicStrength: 3, fiscalHealth: -5 }, nextBlock: 3 },
      { id: 'transition', text: 'Seek federal just transition funding', consequence: 'You negotiate.', effects: { fiscalHealth: 10, sovereignty: -10, publicSupport: 5 }, nextBlock: 3 },
    ],
  },
  {
    phase: 1,
    title: 'After Extending Coal',
    narrative: `You have secured an extension. Jobs remain — for now. But the community is split. Elders who remember livestock reduction and forced relocation ask: is this development on our terms? Majerle Lister argues that Native desires for development are grounded in land histories and self-determination, not monolithic. Do you use the revenue to diversify the economy, or invest in language and cultural programs?`,
    choices: [
      { id: 'diversify', text: 'Diversify the economy', consequence: 'You build for the long term.', effects: { economicStrength: 12, fiscalHealth: 5 }, nextBlock: 4 },
      { id: 'culture', text: 'Invest in language and culture', consequence: 'You strengthen the people.', effects: { culturalIntegrity: 15, publicSupport: 10 }, nextBlock: 4 },
    ],
  },
  {
    phase: 1,
    title: 'After the Energy Pivot',
    narrative: `You have begun the transition. Solar projects are in the pipeline; federal grants are flowing. But construction takes time, and some former coal workers are still unemployed. Curley notes that tribal sovereignty is negotiated within colonial limits — you work with what you have. Do you prioritise job training for displaced workers, or accelerate renewable build-out to create new jobs faster?`,
    choices: [
      { id: 'training', text: 'Prioritise job training', consequence: 'You invest in people.', effects: { publicSupport: 12, economicStrength: 3 }, nextBlock: 4 },
      { id: 'build', text: 'Accelerate renewable build-out', consequence: 'You create jobs now.', effects: { economicStrength: 10, publicSupport: 5 }, nextBlock: 4 },
    ],
  },
  {
    phase: 1,
    title: 'Land and Grazing',
    narrative: `The grazing regime on your reservation was imposed by the federal government — livestock reduction, permits, boundaries. Majerle Lister's work on Diné communities shows how these regimes shape development desires. Some families want to expand livestock; others want to restore traditional land use. The BIA still has a say. Do you push for tribal control of grazing, support a community-led land plan, or leave the current system in place?`,
    choices: [
      { id: 'tribal', text: 'Push for tribal control of grazing', consequence: 'You assert jurisdiction.', effects: { sovereignty: 15, publicSupport: 8 } },
      { id: 'community', text: 'Support community-led land plan', consequence: 'You decentralise.', effects: { culturalIntegrity: 12, publicSupport: 12 } },
      { id: 'leave', text: 'Leave the current system', consequence: 'You avoid the fight.', effects: { sovereignty: -10 } },
    ],
  },
  {
    phase: 2,
    title: 'Water Rights',
    narrative: `Water is life — and it is scarce. Your tribe has rights under the Winters doctrine, but the state and non-Indian users have taken much of the flow. Securing your share means litigation, negotiation, or both. George Manuel's Fourth World framed Indigenous peoples as nations with title; water is part of that. Do you litigate aggressively, negotiate a settlement, or partner with other tribes for a regional approach?`,
    choices: [
      { id: 'litigate', text: 'Litigate aggressively', consequence: 'You go to court.', effects: { sovereignty: 15, fiscalHealth: -10 } },
      { id: 'settle', text: 'Negotiate a settlement', consequence: 'You seek certainty.', effects: { fiscalHealth: 5, sovereignty: -5, publicSupport: 5 } },
      { id: 'regional', text: 'Partner with other tribes', consequence: 'You build solidarity.', effects: { sovereignty: 10, publicSupport: 8 } },
    ],
  },
  {
    phase: 2,
    title: 'Federal Funding',
    narrative: `Self-determination contracts let tribes run their own programs — health, education, housing — instead of the BIA. But the funding is often inadequate, and the paperwork is burdensome. You can push for more contract authority, accept the status quo and focus elsewhere, or pursue grants for specific projects. Manuel fought assimilation; self-determination was the alternative. Do you expand contracting, or focus on grant-seeking for targeted projects?`,
    choices: [
      { id: 'contract', text: 'Expand self-determination contracting', consequence: 'You take control.', effects: { sovereignty: 12, fiscalHealth: 5 } },
      { id: 'grants', text: 'Focus on targeted grants', consequence: 'You chase funding.', effects: { fiscalHealth: 8, sovereignty: -5 } },
    ],
  },
  {
    phase: 2,
    title: 'Gaming Revenue',
    narrative: `The casino is open. Revenue is flowing. Now the question is how to use it. Some want per-capita payments to enrolled members; others want to invest in schools, health care, and housing. Per-capita can lift families out of poverty quickly — but it can also create dependence and political conflict. George Manuel would ask: does this strengthen the nation, or fragment it? Do you prioritise per-capita, invest in programs, or split the difference?`,
    choices: [
      { id: 'percapita', text: 'Prioritise per-capita payments', consequence: 'You put money in hands.', effects: { publicSupport: 15, fiscalHealth: -10 } },
      { id: 'programs', text: 'Invest in programs', consequence: 'You build institutions.', effects: { economicStrength: 8, culturalIntegrity: 5 } },
      { id: 'split', text: 'Split the difference', consequence: 'You balance.', effects: { publicSupport: 8, fiscalHealth: 5 } },
    ],
  },
  {
    phase: 2,
    title: 'Language Revitalisation',
    narrative: `Your language is endangered. Fewer than a thousand fluent speakers remain. Language programs exist but are underfunded. Manuel wrote that Indigenous survival is survival as nations and cultures — language is central. Do you make language revitalisation a budget priority, create an immersion school, or support community-led efforts without major tribal investment?`,
    choices: [
      { id: 'priority', text: 'Make it a budget priority', consequence: 'You commit resources.', effects: { culturalIntegrity: 18, fiscalHealth: -8 } },
      { id: 'immersion', text: 'Create an immersion school', consequence: 'You build an institution.', effects: { culturalIntegrity: 15, fiscalHealth: -10 } },
      { id: 'community', text: 'Support community-led efforts', consequence: 'You enable from the sidelines.', effects: { culturalIntegrity: 8, publicSupport: 5 } },
    ],
  },
  {
    phase: 3,
    title: 'Off-Reservation Development',
    narrative: `A tribal enterprise wants to build a hotel and cultural center in a nearby city — on land the tribe would acquire. It could create jobs and revenue, but it means investing off-reservation. Some say it dilutes sovereignty; others say economic power strengthens it. Curley and Lister both note that tribal development happens within settler structures. Do you support the off-reservation project, keep investment on-reservation only, or pursue a smaller urban presence?`,
    choices: [
      { id: 'support', text: 'Support the off-reservation project', consequence: 'You expand.', effects: { economicStrength: 15, sovereignty: -5 } },
      { id: 'onres', text: 'Keep investment on-reservation only', consequence: 'You stay home.', effects: { sovereignty: 10, economicStrength: 5 } },
      { id: 'small', text: 'Pursue a smaller urban presence', consequence: 'You compromise.', effects: { economicStrength: 8, sovereignty: 2 } },
    ],
  },
  {
    phase: 3,
    title: 'The Council Split',
    narrative: `Your council is divided. A faction wants to recall you; another stands firm. The issue is development — some say you have moved too fast, others too slow. Manuel faced similar divisions when he led the National Indian Brotherhood. Do you call a community assembly to build consensus, work the council one-on-one, or push ahead and let the next election decide?`,
    choices: [
      { id: 'assembly', text: 'Call a community assembly', consequence: 'You open the floor.', effects: { publicSupport: 15, sovereignty: 5 } },
      { id: 'council', text: 'Work the council one-on-one', consequence: 'You negotiate.', effects: { publicSupport: 5 } },
      { id: 'push', text: 'Push ahead', consequence: 'You bet on results.', effects: { sovereignty: 5, publicSupport: -10 } },
    ],
  },
  {
    phase: 3,
    title: 'Mineral Leases',
    narrative: `A mining company wants to lease tribal minerals — uranium, this time, not coal. The royalties would fund schools and infrastructure. But the last uranium boom left a legacy of contamination and cancer. Do you reject the lease, negotiate strict environmental terms, or put it to a referendum?`,
    choices: [
      { id: 'reject', text: 'Reject the lease', consequence: 'You say no.', effects: { culturalIntegrity: 10, fiscalHealth: -5 } },
      { id: 'terms', text: 'Negotiate strict environmental terms', consequence: 'You seek protection.', effects: { economicStrength: 8, sovereignty: 5 } },
      { id: 'referendum', text: 'Put it to a referendum', consequence: 'You let the people decide.', effects: { publicSupport: 10 } },
    ],
  },
  {
    phase: 3,
    title: 'Mid-Term',
    narrative: `You are halfway through your term. Some things have worked; others have not. The Fourth World, Manuel wrote, is the world of Indigenous nations surviving within colonial states. You have made choices. Do you consolidate — locking in gains and avoiding new fights — or push for more?`,
    choices: [
      { id: 'consolidate', text: 'Consolidate', consequence: 'You hold the line.', effects: { publicSupport: 5, fiscalHealth: 5 } },
      { id: 'push', text: 'Push for more', consequence: 'You accelerate.', effects: { sovereignty: 10, publicSupport: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'Federal Relations',
    narrative: `A new administration in Washington. Some appointees are sympathetic to tribal sovereignty; others want to trim federal obligations. Your relationship with the BIA will shape what is possible. Do you build alliances with other tribes to lobby collectively, cultivate direct relationships with federal officials, or focus on reducing federal dependence altogether?`,
    choices: [
      { id: 'alliance', text: 'Build tribal alliances', consequence: 'You unite.', effects: { sovereignty: 12, publicSupport: 5 } },
      { id: 'direct', text: 'Cultivate federal relationships', consequence: 'You work the system.', effects: { fiscalHealth: 10, sovereignty: -5 } },
      { id: 'reduce', text: 'Reduce federal dependence', consequence: 'You build self-reliance.', effects: { sovereignty: 15, fiscalHealth: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'Youth and Jobs',
    narrative: `Young people are leaving. There are few jobs; the pull of cities is strong. Bringing them back — or keeping them — means creating opportunity. Do you invest in vocational training and tribal enterprises, support entrepreneurship and small business, or prioritise education and hope they return with skills?`,
    choices: [
      { id: 'vocational', text: 'Invest in vocational training and enterprises', consequence: 'You create pathways.', effects: { economicStrength: 12, publicSupport: 10 } },
      { id: 'entrepreneur', text: 'Support entrepreneurship', consequence: 'You seed small business.', effects: { economicStrength: 10, fiscalHealth: -5 } },
      { id: 'education', text: 'Prioritise education', consequence: 'You invest long-term.', effects: { culturalIntegrity: 8, economicStrength: 5 } },
    ],
  },
  {
    phase: 4,
    title: 'Treaty Rights',
    narrative: `Your treaties guarantee hunting, fishing, and gathering rights — but state and federal agencies have often ignored or restricted them. Asserting those rights means conflict. Manuel said: "We own those places." Do you litigate to enforce treaty rights, negotiate co-management agreements, or prioritise other sovereignty fights?`,
    choices: [
      { id: 'litigate', text: 'Litigate to enforce', consequence: 'You go to court.', effects: { sovereignty: 18, fiscalHealth: -10 } },
      { id: 'comanage', text: 'Negotiate co-management', consequence: 'You seek partnership.', effects: { sovereignty: 8, publicSupport: 8 } },
      { id: 'prioritise', text: 'Prioritise other fights', consequence: 'You choose your battles.', effects: {} },
    ],
  },
  {
    phase: 5,
    title: 'Re-election',
    narrative: `Your term is ending. You can run again. The opposition says you have moved too fast — or too slow. The people will decide. Do you run on your record, or step aside and back a successor?`,
    choices: [
      { id: 'run', text: 'Run on your record', consequence: 'You seek another term.', effects: { publicSupport: 10 } },
      { id: 'step', text: 'Step aside, back a successor', consequence: 'You pass the torch.', effects: { publicSupport: 5 } },
    ],
  },
  {
    phase: 5,
    title: 'The Legacy',
    narrative: `What have you built? A stronger economy, or one still dependent on federal dollars and extractive leases? A nation that speaks its language and tends its land, or one that has traded culture for revenue? George Manuel's Fourth World endures — Indigenous nations, surviving. The work continues.`,
    choices: [
      { id: 'economy', text: 'A stronger economy', consequence: 'You built revenue.', effects: { economicStrength: 15 } },
      { id: 'sovereignty', text: 'Stronger sovereignty', consequence: 'You asserted the nation.', effects: { sovereignty: 15 } },
      { id: 'culture', text: 'Cultural renewal', consequence: 'You strengthened the people.', effects: { culturalIntegrity: 15 } },
      { id: 'balance', text: 'A difficult balance', consequence: 'You held it together.', effects: { sovereignty: 5, economicStrength: 5, culturalIntegrity: 5 } },
    ],
  },
];

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'A Nation Strengthened',
    endingNarrative: `You did it. The economy is stronger; sovereignty is asserted; the people have a future. The Fourth World endures — your nation, on its land, making its own choices. The work continues, but you have shown the way.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Progress',
    endingNarrative: `You made progress. Some gains held; some were lost. The reservation is not what it was — but the path ahead is still long. As Manuel wrote, Indigenous survival is survival as nations. You have kept that possibility alive.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'The Struggle Continues',
    endingNarrative: `It was hard. The forces arrayed against Indigenous self-determination are real. But the people remember. The land remains. The struggle for sovereignty, for development on our terms, goes on.`,
  },
];

const routeLastToEndings = (choiceIndex: number) => {
  if (choiceIndex === 0) return 0; // economy -> victory
  if (choiceIndex === 1) return 0; // sovereignty -> victory
  if (choiceIndex === 2) return 1; // culture -> partial
  return 0; // balance -> victory
};

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createLongFormTree(
    blocks,
    endings,
    routeLastToEndings,
    { shuffleBlocks: options?.shuffle ?? true, seed: options?.seed },
  );
}

import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * AI Displaced — Tech worker replaced by AI (25+ decisions)
 * Informed by: Citrini Research "2028 Global Intelligence Crisis", Yanis Varoufakis (technofeudalism),
 * Jodi Dean (neo-feudalism, communicative capitalism)
 *
 * You were a senior product manager, engineer, or analyst at a major tech company. Years of loyalty
 * and hard work are now irrelevant. The company has moved to reduce overhead and integrate cheaper
 * solutions. You navigate unemployment, a contracting labor market, price increases, and the
 * erosion of the "intelligence premium" that once paid your mortgage.
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'The Meeting',
    narrative: `You've just been called into a meeting. No agenda. HR is there. Your manager won't meet your eyes.

"Restructuring," they say. "Efficiency initiatives." The company is integrating AI agents that can now handle multi-step work — research, analysis, code, customer support — without sleep, sick days, or health insurance. Your role has been "consolidated."

Some analysts call this the repricing of the intelligence premium: human cognitive work, once the economy's scarcest resource, is being replaced by systems that get cheaper every quarter. You had a title, benefits, $180,000 a year. Now you have a severance package and 60 days of COBRA.

What do you do first?`,
    choices: [
      { id: 'negotiate', text: 'Negotiate the severance', consequence: 'You push for more.', effects: { savings: 8, dignity: 5 } },
      { id: 'network', text: 'Reach out to your network immediately', consequence: 'You start job hunting.', effects: { employability: 8, solidarity: 5 } },
      { id: 'breathe', text: 'Take a moment to process', consequence: 'You protect your mental state.', effects: { health: 10, savings: -2 } },
    ],
  },
  {
    phase: 1,
    title: 'The First Week',
    narrative: `Your laptop is returned. Your Slack is deactivated. Some analysts have called it "Ghost GDP": output that shows up in national accounts but never circulates through the real economy. A GPU cluster in North Dakota now does the work of 10,000 white-collar workers in midtown. Machines don't buy coffee, rent apartments, or pay for daycare.

Your savings will last six months if you're careful. Rent in your city has not fallen. The job boards are full of postings that want "AI-assisted" candidates — people who can prompt and review, not build. The salaries are half what you had.

Do you apply broadly and take whatever comes, or hold out for something closer to your old level?`,
    choices: [
      { id: 'broad', text: 'Apply broadly', consequence: 'You cast a wide net.', effects: { employability: 5, dignity: -5 } },
      { id: 'hold', text: 'Hold out for quality', consequence: 'You wait for the right fit.', effects: { dignity: 5, savings: -5 } },
    ],
  },
  {
    phase: 1,
    title: 'The Downshift',
    narrative: `Three months in. The "intelligence displacement spiral" is real: companies that cut headcount used the savings to buy more AI, which let them cut more. Your former colleagues are flooding into lower-tier roles. A friend who was a senior PM at Salesforce is now driving for Uber. Her earnings dropped from $180k to $45k. Overqualified labor is compressing wages everywhere.

Varoufakis calls it technofeudalism: cloud capital extracts value while you provide unpaid data and precarious labor. The platforms — Uber, DoorDash, TaskRabbit — are the new fiefdoms. You can sign up for gig work to extend your runway. Or you can keep searching for something "real."

What do you do?`,
    choices: [
      { id: 'gig', text: 'Sign up for gig work', consequence: 'You extend your runway.', effects: { savings: 10, health: -8, dignity: -10 } },
      { id: 'search', text: 'Keep searching', consequence: 'You hold the line.', effects: { employability: 5, savings: -8 } },
      { id: 'both', text: 'Gig by night, search by day', consequence: 'You do both.', effects: { savings: 5, health: -12, employability: 3 } },
    ],
  },
  {
    phase: 1,
    title: 'The Interview',
    narrative: `You land an interview. The role is "AI Operations Associate" — you'll train models, review outputs, and "ensure quality." The pay is $65,000. A year ago, this would have been a junior role at $95,000. The hiring manager says they've "right-sized" the team. You'll be one of three humans overseeing work that used to require twenty.

Jodi Dean writes about neo-feudalism: the parcelization of sovereignty, where corporations and platforms fragment the old social contract. This job would put you inside the machine that replaced you — maintaining the very systems that made you redundant.

Do you take it, or walk away?`,
    choices: [
      { id: 'take', text: 'Take the job', consequence: 'You need the money.', effects: { savings: 15, employability: 5, dignity: -8 } },
      { id: 'walk', text: 'Walk away', consequence: 'You refuse to feed the machine.', effects: { dignity: 12, savings: -10 } },
    ],
  },
  {
    phase: 2,
    title: 'The Mutual Aid Group',
    narrative: `Someone from your old company started a Slack for the "alumni." It's not official — just displaced workers sharing leads, venting, and sometimes pooling resources. A few have formed a mutual aid fund: small grants for people who can't make rent. They're calling it "solidarity, not charity."

Analysts suggest that when high earners lose jobs, the consumption hit is lagged but deep — savings buffers let you maintain the appearance of normalcy for a few quarters. Then the behavioral shift kicks in. You're not there yet, but you see it coming.

Do you contribute to the fund, take from it, or stay on the sidelines?`,
    choices: [
      { id: 'contribute', text: 'Contribute what you can', consequence: 'You give back.', effects: { solidarity: 15, savings: -5 } },
      { id: 'take', text: 'Accept help', consequence: 'You swallow your pride.', effects: { savings: 8, solidarity: 10, dignity: -5 } },
      { id: 'sidelines', text: 'Stay on the sidelines', consequence: 'You observe.', effects: { solidarity: -5 } },
    ],
  },
  {
    phase: 2,
    title: 'The Rent Increase',
    narrative: `Your landlord sends a notice. Rent is going up 12%. Inflation has eased from its peak, they say, but "market rates" have moved. Your unemployment benefits ran out two months ago. The job market has not recovered — white-collar openings keep falling while blue-collar and healthcare hold steady. The churn is in the jobs that write memos and approve budgets.

You could move to a cheaper neighborhood. You could get a roommate. You could dip into the 401(k) — the penalty hurts, but you need to eat. Each option has a cost.

What do you do?`,
    choices: [
      { id: 'move', text: 'Move to a cheaper area', consequence: 'You cut costs.', effects: { savings: 10, health: -5 } },
      { id: 'roommate', text: 'Get a roommate', consequence: 'You share the burden.', effects: { savings: 8, solidarity: 5 } },
      { id: '401k', text: 'Withdraw from 401(k)', consequence: 'You tap retirement.', effects: { savings: 15, health: -8 } },
    ],
  },
  {
    phase: 2,
    title: 'The Recruiter',
    narrative: `A recruiter reaches out. The role is at a "AI-native" startup — they've never had human PMs; they're hiring their first. The pitch: you'll "bridge the gap" between the models and the business. The salary is $90,000, with equity that might be worth something if they don't get acquired by a hyperscaler and shut down.

The recruiter says the market is "recalibrating." That's one word for it. Some describe it as a negative feedback loop with no natural brake: AI gets better, companies need fewer workers, displaced workers spend less, margin pressure pushes firms to invest more in AI.

Do you pursue it, or pass?`,
    choices: [
      { id: 'pursue', text: 'Pursue it', consequence: 'You take the interview.', effects: { employability: 10, dignity: 3 } },
      { id: 'pass', text: 'Pass', consequence: "You're not ready to be a \"bridge.\"", effects: { dignity: 5, employability: -3 } },
    ],
  },
  {
    phase: 2,
    title: 'The Mortgage',
    narrative: `You bought a condo two years ago. The payment was manageable on your old salary. Now it's 60% of your unemployment income. Fannie Mae has started flagging "elevated early-stage delinquencies" in ZIP codes with high tech employment. The question no one wanted to ask: are prime mortgages still money good when the borrowers' income assumptions have been structurally impaired?

You're not delinquent yet. But you're one shock away. You could try to refinance — rates have come down. You could sell and downsize. You could try to rent a room to a stranger.

What do you do?`,
    choices: [
      { id: 'refi', text: 'Try to refinance', consequence: 'You seek relief.', effects: { savings: 5, health: -3 } },
      { id: 'sell', text: 'Sell and downsize', consequence: 'You cut the anchor.', effects: { savings: 15, dignity: -8 } },
      { id: 'rent_room', text: 'Rent a room', consequence: 'You become a landlord.', effects: { savings: 10, solidarity: -5 } },
    ],
  },
  {
    phase: 2,
    title: 'The Organizing Meeting',
    narrative: `Someone from the alumni Slack has organized an in-person meetup. "Tech Workers United" — they're talking about forming a union or at least a collective bargaining association. The room is full of people like you: displaced, angry, unsure what comes next.

Varoufakis argues that cloud capital creates "cloud serfs" — users and workers who sustain the system without fair compensation. The only counter is collective action. But tech workers have never unionized at scale. And the companies have the leverage: they can offshore, automate, or simply wait you out.

Do you join, or stay away?`,
    choices: [
      { id: 'join', text: 'Join the organizing effort', consequence: 'You stand with them.', effects: { solidarity: 20, dignity: 15, employability: -5 } },
      { id: 'stay', text: 'Stay away', consequence: 'You protect your options.', effects: { employability: 3, solidarity: -10 } },
    ],
  },
  {
    phase: 3,
    title: 'The Offer',
    narrative: `You have an offer. It's not what you wanted — $75,000, "AI-augmented" role, no remote option. But it's a paycheck. The hiring manager says they're "building for the future." You'll be one of the humans "in the loop," at least for now.

Analysts suggest that for every new role AI created — prompt engineers, safety researchers — it rendered dozens obsolete. The new roles paid a fraction of the old ones. You can take this and rebuild, or hold out for something better. The market has not been kind to those who hold out.

What do you do?`,
    choices: [
      { id: 'accept', text: 'Accept the offer', consequence: 'You take the job.', effects: { savings: 20, employability: 10, dignity: -5 } },
      { id: 'decline', text: 'Decline', consequence: 'You hold out.', effects: { dignity: 8, savings: -15 } },
    ],
  },
  {
    phase: 3,
    title: 'The Side Project',
    narrative: `A former colleague is building something on the side — a cooperative that matches displaced tech workers with small businesses that can't afford enterprise AI. The model: humans do the work AI can't yet do well (relationship-building, nuance, judgment), and they split the revenue. No VC, no platform taking 30%.

It's early. It might fail. But it's a different kind of bet — on human value that hasn't been fully commodified. Dean writes that without organized political struggle, the system could evolve toward neo-feudalism rather than something better. This could be a seed of something else.

Do you get involved?`,
    choices: [
      { id: 'yes', text: 'Get involved', consequence: 'You invest your time.', effects: { solidarity: 15, dignity: 12, savings: -5 } },
      { id: 'no', text: 'Focus on your own situation', consequence: 'You stay focused.', effects: { savings: 5, solidarity: -5 } },
    ],
  },
  {
    phase: 3,
    title: 'The Mental Health Check',
    narrative: `You haven't slept well in months. The anxiety is constant. Your doctor mentions that the rate of depression and substance use among displaced white-collar workers has spiked. The lag between job loss and the full behavioral impact is one of the reasons the crisis was hard to see coming — people maintained the appearance of normalcy until they couldn't.

You could try therapy — there are sliding-scale options. You could lean on the mutual aid group. You could push through and hope it gets better when you land something. The first two cost time or money. The third costs something else.

What do you do?`,
    choices: [
      { id: 'therapy', text: 'Try therapy', consequence: 'You invest in your health.', effects: { health: 15, savings: -8 } },
      { id: 'group', text: 'Lean on the group', consequence: 'You seek community support.', effects: { health: 10, solidarity: 10 } },
      { id: 'push', text: 'Push through', consequence: 'You hope it passes.', effects: { health: -10, savings: 5 } },
    ],
  },
  {
    phase: 3,
    title: 'The Policy Debate',
    narrative: `Congress is finally holding hearings. UBI, retraining, a jobs guarantee — the proposals are on the table. The government's response has lagged, as it always does. Some warn that lack of a comprehensive plan could accelerate a deflationary spiral. You could add your voice: write to your representative, join a campaign, testify if they invite displaced workers.

Or you could focus entirely on your own survival. Policy moves slowly. Rent is due now.

What do you do?`,
    choices: [
      { id: 'advocate', text: 'Add your voice', consequence: 'You engage politically.', effects: { solidarity: 12, dignity: 10 } },
      { id: 'focus', text: 'Focus on survival', consequence: 'You prioritise yourself.', effects: { savings: 5, solidarity: -5 } },
    ],
  },

  {
    phase: 4,
    title: 'The Reckoning',
    narrative: `A year has passed. You've made it this far. The economy has not recovered the way the optimists hoped. The "creative destruction" narrative — that AI would destroy jobs and create better ones — has not played out. The intelligence premium has been repriced. You've seen friends downshift, move in with family, or leave the industry entirely.

You've also seen solidarity: mutual aid, organizing, people refusing to disappear quietly. The system is not fixed. But neither are you broken.

What do you take from this?`,
    choices: [
      { id: 'survivor', text: 'I survived', consequence: 'You got through.', effects: { health: 5, dignity: 5 } },
      { id: 'fighter', text: "I'm still fighting", consequence: "You haven't given up.", effects: { solidarity: 10, dignity: 10 } },
      { id: 'both', text: 'Both', consequence: "You survived and you're still in the fight.", effects: { solidarity: 8, health: 5, dignity: 12 } },
    ],
  },
  {
    phase: 4,
    title: 'The Next Chapter',
    narrative: `You have a choice about what comes next. The old economy — the one that paid you to think, to analyze, to build — is not coming back. The question is what you build in its place.

You could take whatever job you can find and rebuild from there. You could double down on the cooperative, the organizing, the mutual aid. You could retrain for something the machines can't yet do: care work, trades, hands-on skills. Each path has costs and possibilities.

What do you choose?`,
    choices: [
      { id: 'rebuild', text: 'Rebuild in the new economy', consequence: 'You adapt.', effects: { employability: 15, savings: 10 } },
      { id: 'organize', text: 'Double down on solidarity', consequence: 'You build something new.', effects: { solidarity: 20, dignity: 15 } },
      { id: 'retrain', text: 'Retrain for hands-on work', consequence: 'You pivot entirely.', effects: { employability: 10, dignity: 8, savings: -10 } },
    ],
  },
  {
    phase: 5,
    title: 'The Legacy',
    narrative: `Your story is one of millions. The intelligence displacement spiral touched everyone: the senior PM who drives for Uber, the engineer who retrained as a nurse, the analyst who joined a cooperative. The system did not self-correct. Policy lagged. The feedback loop had no natural brake.

But you're still here. You made choices. Some worked, some didn't. The question now is what you leave behind — for yourself, and for those who come after.

What is your legacy?`,
    choices: [
      { id: 'resilience', text: 'Resilience', consequence: 'You proved you could adapt.', effects: { health: 5, dignity: 8 } },
      { id: 'solidarity', text: 'Solidarity', consequence: 'You built community.', effects: { solidarity: 15, dignity: 10 } },
      { id: 'both_legacy', text: 'Both', consequence: 'You adapted and you built.', effects: { solidarity: 8, health: 5, dignity: 12 } },
    ],
  },
];

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Dignity Intact',
    endingNarrative: `You made it through. You kept your health, your sense of worth, and your connection to others. The economy changed — the intelligence premium was repriced, the old contract was broken — but you did not break. You built solidarity where you could. You adapted where you had to. The struggle continues, but so do you.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Still Standing',
    endingNarrative: `You survived. It wasn't pretty. You took jobs you didn't want, made choices you didn't like. The system extracted its toll. But you're still here. You have a roof, some savings, and a clearer picture of how the machine works. The fight for something better goes on.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'The Spiral',
    endingNarrative: `The spiral won. The savings ran out. The jobs didn't come. The system that replaced you with machines had no plan for what came next. You're not alone — millions have walked this path. Some were right: when human intelligence is repriced to zero, the feedback loop has no natural brake. But the fight for dignity, for solidarity, for a different future — that continues.`,
  },
];

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createLongFormTree(
    blocks,
    endings,
    (i) => (i === 0 ? 0 : i === 1 ? 1 : 2),
    {
      shuffleBlocks: options?.shuffle ?? true,
      seed: options?.seed,
      blockPool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      blockPoolCount: 11,
    },
  );
}

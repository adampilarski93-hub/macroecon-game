import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';

/**
 * Rust Belt Revival — Federal Republic of Nordmark
 * Refactored with Parallel Arcs to eliminate repetition
 * Three distinct approaches: Industrial Policy, Human Capital, Economic Complexity
 */

const introArc: ScenarioArc = {
  id: 'start',
  blocks: [
    {
      phase: 1,
      title: 'The Rust Belt Challenge',
      narrative: `You lead the Federal Republic of Nordmark. Factories have closed. Jobs have moved away. Communities that built the country's industrial might now face hollowed-out downtowns, abandoned plants, and populations in decline.

Some argue that prosperity here rested on global wage hierarchies — that cheap imports reflect labor paid poorly elsewhere. Others cite the "double movement": when markets run unchecked, society eventually pushes back.

Three schools of thought emerge in your cabinet:

**The Industrialists** — led by your economy minister — cite Alexander Hamilton and modern developmental states: active government intervention to attract advanced manufacturing and build strategic industries.

**The Human Capitalists** — led by your education minister — cite Gary Becker: invest in workers through education and retraining, letting markets match skills to opportunities.

**The Complexity Theorists** — led by a young advisor — cite Jane Jacobs: economic vitality comes not from big factories but from diverse, interconnected economic activity and local entrepreneurship.

How do you frame your response?`,
      choices: [
        {
          id: 'industrialist',
          text: 'Launch Industrial Policy — Hamiltonian Development',
          consequence: 'You commit to attracting advanced manufacturing and green industry.',
          effects: { economicStrength: 10, employment: 8, debtBurden: 8 },
          nextArc: 'industrialist',
        },
        {
          id: 'human_capital',
          text: 'Invest in Human Capital — Skills and Retraining',
          consequence: 'You focus on education, vocational training, and worker mobility.',
          effects: { employment: 5, publicSupport: 8, economicStrength: 5 },
          nextArc: 'human_capital',
        },
        {
          id: 'complexity',
          text: 'Build Economic Complexity — Jacobs-style Diversification',
          consequence: 'You support local entrepreneurship and diverse economic ecosystems.',
          effects: { publicSupport: 10, economicStrength: 6, employment: 3 },
          nextArc: 'complexity',
        },
      ],
    },
  ],
};

/**
 * INDUSTRIALIST ARC — Hamiltonian Development State
 * Active government intervention to attract strategic industries
 */
const industrialistArc: ScenarioArc = {
  id: 'industrialist',
  blocks: [
    {
      phase: 2,
      title: 'The Hamiltonian Bet',
      narrative: `You have committed to industrial policy in the Hamiltonian tradition. The question is: which industries? Your advisors present three options, each with different risk-reward profiles.

**Green manufacturing** — batteries, solar, wind — offers long-term viability and aligns with global demand. But competition for these plants is fierce globally.

**Advanced semiconductors** — chip fabrication — promises high wages and strategic importance. But the capital requirements are massive, and skilled workers are scarce.

**Reshoring traditional manufacturing** — using tariffs and incentives to bring back what left — offers immediate jobs but may not be competitive long-term.

Which sector do you prioritize?`,
      choices: [
        { id: 'green', text: 'Green manufacturing (batteries, renewables)', consequence: 'You bet on the energy transition.', effects: { economicStrength: 12, debtBurden: 10, employment: 8 } },
        { id: 'chips', text: 'Advanced semiconductors', consequence: 'You target high-value manufacturing.', effects: { economicStrength: 15, debtBurden: 20, employment: 5 } },
        { id: 'reshore', text: 'Reshore traditional industry', consequence: 'You try to bring back what left.', effects: { employment: 12, economicStrength: 5, debtBurden: 8 } },
      ],
    },
    {
      phase: 2,
      title: 'The Subsidy Question',
      narrative: `To attract these industries, you need to offer something. Other regions and countries are competing for the same investments. Your options:

**Tax breaks** — reduce corporate taxes for a decade or more. Costs less upfront but reduces revenue for years.

**Direct grants** — cash for capital investment, per-job subsidies. More visible, targeted, and immediate. But expensive.

**Infrastructure commitment** — promise roads, rail, and broadband to the site. Beneficial to all but may not be enough to win the deal.

What do you offer?`,
      choices: [
        { id: 'tax_breaks', text: 'Aggressive tax breaks', consequence: 'You minimize upfront cost.', effects: { economicStrength: 10, debtBurden: 5 } },
        { id: 'grants', text: 'Direct investment grants', consequence: 'You put real money on the table.', effects: { economicStrength: 15, debtBurden: 12 } },
        { id: 'infrastructure', text: 'Major infrastructure commitment', consequence: 'You improve the region for all.', effects: { economicStrength: 8, debtBurden: 8, publicSupport: 5 } },
      ],
    },
    {
      phase: 3,
      title: 'Labor Strategy',
      narrative: `Your industrial policy is attracting interest. Battery manufacturers and chip fabricators are considering sites in your region. But they have questions about labor.

Some want **union-free zones** — guarantees against organization, weaker labor protections. This might attract more investment but would betray your labor constituency.

Others will accept **sectoral bargaining** — industry-wide wage and condition negotiations. This strengthens worker power but makes wages predictable.

A third group wants **custom training pipelines** — you fund vocational programs tailored to their specific needs. This ties education to specific employers.

What labor framework do you establish?`,
      choices: [
        { id: 'union_free', text: 'Permit union-free zones', consequence: 'You sacrifice labor for investment.', effects: { economicStrength: 12, publicSupport: -15 } },
        { id: 'sectoral', text: 'Mandate sectoral bargaining', consequence: 'You strengthen worker power.', effects: { publicSupport: 12, economicStrength: 3 } },
        { id: 'pipelines', text: 'Custom training pipelines', consequence: 'You tie education to industry.', effects: { economicStrength: 10, employment: 8, debtBurden: 5 } },
      ],
    },
    {
      phase: 3,
      title: 'Protection vs. Competition',
      narrative: `Cheap imports continue to undercut your nascent industries. The question is whether to protect them while they grow, or let them compete immediately.

**Strategic tariffs** — temporary protection on key goods to give domestic firms breathing room. This violates trade agreements and may raise consumer prices.

**Subsidies instead** — support domestic producers directly rather than taxing imports. Permitted under most trade rules but costs the treasury.

**No protection** — let competition decide. If your firms cannot survive open markets, they were never viable. Frees budget but may kill infant industries.

What do you choose?`,
      choices: [
        { id: 'tariffs', text: 'Impose strategic tariffs', consequence: 'You protect at the border.', effects: { economicStrength: 10, priceStability: -8, publicSupport: 5 } },
        { id: 'subsidies', text: 'Production subsidies only', consequence: 'You support without protectionism.', effects: { economicStrength: 8, debtBurden: 10, priceStability: 0 } },
        { id: 'none', text: 'No protection — compete or die', consequence: 'You let markets decide.', effects: { economicStrength: -5, debtBurden: -5, publicSupport: -3 } },
      ],
    },
    {
      phase: 4,
      title: 'Cluster Development',
      narrative: `Your flagship plant is opening — batteries, chips, or reshoring. Now the question is how to build around it. Industrial clusters develop when suppliers, services, and skilled workers concentrate.

**Agglomeration strategy** — attract suppliers and related firms with subsidies, creating density. High cost, high coordination, but creates lasting ecosystems.

**Anchor strategy** — focus on keeping the flagship healthy; let private actors handle the rest. Lower government role, but risk losing suppliers to other regions.

**Incubator strategy** — fund local startups to serve the flagship and potentially compete with it. Promotes entrepreneurship but may not scale fast enough.

Which approach do you take?`,
      choices: [
        { id: 'agglomeration', text: 'Agglomeration — build the cluster', consequence: 'You coordinate ecosystem development.', effects: { economicStrength: 12, debtBurden: 15, employment: 10 } },
        { id: 'anchor', text: 'Anchor — support the flagship only', consequence: 'You minimize government role.', effects: { economicStrength: 8, debtBurden: 5 } },
        { id: 'incubator', text: 'Incubator — fund local startups', consequence: 'You bet on entrepreneurship.', effects: { economicStrength: 5, publicSupport: 8, debtBurden: 10 } },
      ],
    },
    {
      phase: 5,
      title: 'The Industrial Legacy',
      narrative: `Your term ends. The industrial policy experiment has run its course. Factories have opened — some, not all. Jobs have been created — more in some towns, fewer in others.

The question is how to assess the legacy. Did you build a new industrial base? Did you spend too much for too little? Did you reshape the region or just relocate problems?

How do you frame your industrial legacy?`,
      choices: [
        { id: 'success', text: 'A new industrial base', consequence: 'You claim the Hamiltonian victory.', effects: { economicStrength: 12, employment: 10 }, endingIndex: 0 },
        { id: 'partial', text: 'Progress, but costly', consequence: 'You acknowledge the trade-offs.', effects: { economicStrength: 5, debtBurden: -5 }, endingIndex: 1 },
        { id: 'question', text: 'Too soon to tell', consequence: 'You pass uncertain judgment.', effects: { publicSupport: 3 }, endingIndex: 2 },
      ],
    },
  ],
};

/**
 * HUMAN CAPITAL ARC — Becker-style Skills Development
 * Focus on education, retraining, and worker mobility
 */
const humanCapitalArc: ScenarioArc = {
  id: 'human_capital',
  blocks: [
    {
      phase: 2,
      title: 'The Retraining Dilemma',
      narrative: `You have committed to human capital investment. Your education minister presents the core question: what do you retrain displaced workers for?

**Healthcare and care work** — growing demand, stable employment, but often lower wages than manufacturing had paid. Immediate jobs available.

**Information technology** — high wages, growing field, but significant barrier to entry. Not all displaced workers can become programmers.

**Advanced manufacturing skills** — CNC machining, robotics maintenance, quality control. Bridges old skills to new economy, but jobs may not materialize.

What do you prioritize?`,
      choices: [
        { id: 'healthcare', text: 'Healthcare and care work', consequence: 'You bet on the care economy.', effects: { employment: 12, publicSupport: 8, economicStrength: 3 } },
        { id: 'it', text: 'Information technology', consequence: 'You aim for high-wage transition.', effects: { economicStrength: 10, employment: 5, publicSupport: 3 } },
        { id: 'advanced_mfg', text: 'Advanced manufacturing skills', consequence: 'You bridge old to new.', effects: { employment: 8, economicStrength: 8, publicSupport: 5 } },
      ],
    },
    {
      phase: 2,
      title: 'Making Training Accessible',
      narrative: `Enrollment in your retraining programs is low. Displaced workers cite two barriers: they cannot afford to study without income, and the programs feel abstract — no guarantee of jobs at the end.

**Trainee stipends** — pay workers to retrain, covering living costs. Expensive, but removes the income barrier.

**Earn-while-learn** — apprenticeships combining work and training. Less costly, immediate income, but slower skill acquisition.

**Job guarantees** — promise employment upon completion. Removes uncertainty, but requires either public jobs or employer commitments.

Which barrier do you target?`,
      choices: [
        { id: 'stipends', text: 'Generous trainee stipends', consequence: 'You remove the income barrier.', effects: { employment: 10, publicSupport: 10, debtBurden: 10 } },
        { id: 'apprentice', text: 'Expand apprenticeships', consequence: 'You earn while learning.', effects: { employment: 8, economicStrength: 5, debtBurden: 5 } },
        { id: 'guarantees', text: 'Job guarantees upon completion', consequence: 'You remove uncertainty.', effects: { employment: 12, publicSupport: 8, debtBurden: 8 } },
      ],
    },
    {
      phase: 3,
      title: 'Geographic Mobility',
      narrative: `Many of the new jobs are not where the displaced workers live. They're in cities, in different regions, or in entirely different industries.

**Relocation assistance** — fund moves for workers willing to go where jobs are. Helps individuals but hollows out communities further.

**Remote work infrastructure** — invest in broadband and co-working so workers can access distant jobs from home. Bridges geography but requires good connectivity.

**Bring jobs to workers** — incentives for employers to locate in rust belt towns. May be inefficient but preserves communities.

What mobility strategy do you pursue?`,
      choices: [
        { id: 'relocation', text: 'Fund geographic relocation', consequence: 'You help workers move to jobs.', effects: { employment: 10, publicSupport: -5 } },
        { id: 'remote', text: 'Remote work infrastructure', consequence: 'You bring jobs virtually.', effects: { employment: 8, economicStrength: 5, debtBurden: 8 } },
        { id: 'local', text: 'Incentivize jobs in place', consequence: 'You preserve communities.', effects: { employment: 5, economicStrength: -3, publicSupport: 10 } },
      ],
    },
    {
      phase: 3,
      title: 'Higher Education Expansion',
      narrative: `Your community colleges and vocational schools are at capacity. Demand for credentials — associates degrees, certificates, badges — is high.

**Expand existing institutions** — add faculty, facilities, and programs at current schools. Scales proven capacity but may replicate existing limitations.

**New institutions** — create specialized training centers focused on high-demand fields. Fresh start, targeted, but takes time to establish credibility.

**Online partnerships** — partner with national online providers for credentials. Fast, flexible, but lacks local connections and hands-on training.

What expansion model?`,
      choices: [
        { id: 'expand', text: 'Expand existing institutions', consequence: 'You scale what works.', effects: { employment: 8, debtBurden: 10, economicStrength: 3 } },
        { id: 'new', text: 'Create specialized training centers', consequence: 'You build targeted capacity.', effects: { employment: 10, debtBurden: 12, economicStrength: 5 } },
        { id: 'online', text: 'Partner with online providers', consequence: 'You maximize reach quickly.', effects: { employment: 12, debtBurden: 3, publicSupport: -3 } },
      ],
    },
    {
      phase: 4,
      title: 'Credential Recognition',
      narrative: `Workers have skills — from decades in factories, from military service, from informal work — but no credentials that employers recognize.

**Prior learning assessment** — evaluate and credential skills workers already have. Fast, respects experience, but may not match employer needs.

**Competency-based programs** — focus on demonstrating ability rather than seat time. Flexible, efficient, but requires new assessment infrastructure.

**Stackable credentials** — small certificates that combine into degrees. Builds gradually, portable, but takes longer to achieve full qualifications.

Which approach to credentialing?`,
      choices: [
        { id: 'prior_learning', text: 'Prior learning assessment', consequence: 'You credential experience.', effects: { employment: 10, publicSupport: 8 } },
        { id: 'competency', text: 'Competency-based programs', consequence: 'You test what you can do.', effects: { employment: 8, economicStrength: 5, debtBurden: 5 } },
        { id: 'stackable', text: 'Stackable credentials', consequence: 'You build qualifications gradually.', effects: { employment: 12, debtBurden: 8, economicStrength: 3 } },
      ],
    },
    {
      phase: 5,
      title: 'The Human Capital Assessment',
      narrative: `Your term ends. Thousands have gone through retraining. Some found new careers; others are still searching. Some moved away; others stayed and struggled.

Did you create a skilled workforce ready for the modern economy? Did you spend public money preparing people for jobs that did not materialize? Did you help individuals while communities dissolved?

How do you assess the human capital approach?`,
      choices: [
        { id: 'enabled', text: 'Enabled individual transitions', consequence: 'You helped workers adapt.', effects: { employment: 10, publicSupport: 8 }, endingIndex: 0 },
        { id: 'skills_gap', text: 'Closed the skills gap', consequence: 'You prepared the workforce.', effects: { economicStrength: 10, employment: 5 }, endingIndex: 1 },
        { id: 'incomplete', text: 'Training without jobs', consequence: 'You acknowledge the mismatch.', effects: { publicSupport: -5 }, endingIndex: 2 },
      ],
    },
  ],
};

/**
 * COMPLEXITY ARC — Jacobs-style Economic Diversification
 * Focus on entrepreneurship, local ecosystems, and economic complexity
 */
const complexityArc: ScenarioArc = {
  id: 'complexity',
  blocks: [
    {
      phase: 2,
      title: 'The Jacobs Insight',
      narrative: `You have committed to Jane Jacobs' vision: economic vitality comes not from attracting big factories but from diverse, interconnected local activity. "New work" arises from old work — new firms emerge when many kinds of work exist close together.

Your empty downtowns and hollowed neighborhoods are not just problems but opportunities. The question is how to seed the complexity.

**Small business incubators** — support local entrepreneurs to fill gaps in the local economy. Low capital, high uncertainty, but builds from within.

**Import replacement** — identify what the region imports and help local firms produce it instead. Targets leakage, builds self-sufficiency.

**Creative placemaking** — use arts, culture, and amenities to attract diverse people and ideas. Indirect, long-term, but creates the conditions for innovation.

Where do you start building complexity?`,
      choices: [
        { id: 'incubators', text: 'Small business incubators', consequence: 'You seed local entrepreneurship.', effects: { employment: 8, economicStrength: 5, debtBurden: 5 } },
        { id: 'import_replace', text: 'Import replacement initiative', consequence: 'You target economic leakage.', effects: { economicStrength: 8, employment: 5, debtBurden: 6 } },
        { id: 'placemaking', text: 'Creative placemaking', consequence: 'You build cultural infrastructure.', effects: { publicSupport: 10, economicStrength: 3, debtBurden: 8 } },
      ],
    },
    {
      phase: 2,
      title: 'Financing Local Economies',
      narrative: `Your rust belt communities need capital, but traditional banks see them as risky. Venture capital ignores them. Economic complexity requires patient, local capital.

**Community development financial institutions** — nonprofit lenders focused on underserved communities. Patient, mission-driven, but limited scale.

**Local investment funds** — allow residents to invest in local businesses, keeping returns circulating locally. Democratic, but requires financial literacy and risk tolerance.

**Public seed capital** — government-funded early stage investment in local ventures. Scaleable, but picks winners and risks politicization.

What financing model?`,
      choices: [
        { id: 'cdfi', text: 'Expand CDFIs', consequence: 'You build nonprofit lending.', effects: { economicStrength: 5, employment: 5, debtBurden: 5 } },
        { id: 'local_funds', text: 'Create local investment funds', consequence: 'You democratize local capital.', effects: { publicSupport: 8, economicStrength: 6, debtBurden: 3 } },
        { id: 'public_seed', text: 'Public seed capital program', consequence: 'You fund local ventures directly.', effects: { economicStrength: 10, debtBurden: 10, employment: 8 } },
      ],
    },
    {
      phase: 3,
      title: 'The Density Question',
      narrative: `Jacobs argued that economic complexity requires density — people and firms in close proximity, creating opportunities for collaboration and "knowledge spillovers." Your region is sprawling and hollowed.

**Downtown revitalization** — concentrate investment in traditional downtowns, creating density where little exists. Risky bet on one location, but creates visible transformation.

**Multiple nodes** — invest in several smaller centers across the region. Spreads risk, serves more communities, but may lack critical mass anywhere.

**Adaptive reuse** — convert abandoned industrial buildings into mixed-use spaces. Preserves heritage, creates unique character, but expensive and technically challenging.

Which density strategy?`,
      choices: [
        { id: 'downtown', text: 'Focus on downtown revitalization', consequence: 'You bet on central density.', effects: { economicStrength: 10, publicSupport: 8, debtBurden: 12 } },
        { id: 'nodes', text: 'Multiple smaller nodes', consequence: 'You spread investment widely.', effects: { publicSupport: 12, economicStrength: 5, debtBurden: 10 } },
        { id: 'adaptive', text: 'Adaptive reuse of industrial sites', consequence: 'You preserve and transform.', effects: { economicStrength: 8, publicSupport: 10, debtBurden: 15 } },
      ],
    },
    {
      phase: 3,
      title: 'Networks and Connections',
      narrative: `Complexity arises not just from diversity but from interconnection. Your region has fragments of economic activity that do not connect.

**Industry networks** — connect firms in similar industries for shared purchasing, training, and marketing. Builds collective strength but may exclude outsiders.

**Cross-sector collaboration** — deliberately connect different industries — manufacturing with arts, agriculture with tech — to spark innovation. Unconventional, uncertain, but creates Jacobs-style "new work."

**Regional supply chains** — map and strengthen local supplier relationships. Practical, immediate, but less transformative than new combinations.

What networking approach?`,
      choices: [
        { id: 'industry_nets', text: 'Strengthen industry networks', consequence: 'You connect similar firms.', effects: { economicStrength: 8, employment: 5 } },
        { id: 'cross_sector', text: 'Foster cross-sector innovation', consequence: 'You create unexpected combinations.', effects: { economicStrength: 10, publicSupport: 5 } },
        { id: 'supply_chains', text: 'Map regional supply chains', consequence: 'You strengthen local linkages.', effects: { economicStrength: 6, employment: 8, debtBurden: 3 } },
      ],
    },
    {
      phase: 4,
      title: 'The Anchor Institution Problem',
      narrative: `Big institutions — hospitals, universities, major employers — dominate your region's economy. They could be anchors for local complexity, or they could extract value and send it elsewhere.

**Anchor procurement** — require or incentivize anchors to buy from local small businesses. Channels resources locally but may raise costs and reduce efficiency.

**Anchor entrepreneurship** — encourage anchors to spin off ventures, license technology locally, and support employee startups. Transfers knowledge outward.

**Independence** — focus on building genuine economic diversity rather than depending on anchors. Long-term, uncertain, but avoids anchor dependency.

How do you relate to anchor institutions?`,
      choices: [
        { id: 'procurement', text: 'Local procurement requirements', consequence: 'You anchor spending locally.', effects: { economicStrength: 8, employment: 8, publicSupport: 5 } },
        { id: 'spinoffs', text: 'Encourage anchor spin-offs', consequence: 'You transfer anchor advantages.', effects: { economicStrength: 10, employment: 6, debtBurden: 5 } },
        { id: 'independence', text: 'Build genuine diversity', consequence: 'You reduce anchor dependency.', effects: { economicStrength: 5, publicSupport: 8, debtBurden: 8 } },
      ],
    },
    {
      phase: 5,
      title: 'The Complexity Assessment',
      narrative: `Your term ends. Your downtowns have new cafes and coworking spaces. Some old factories are now artist studios or maker spaces. New small businesses have opened — many will fail, some may thrive.

Did you create an ecosystem of innovation and opportunity? Did you build genuine economic complexity or just gentrification? Did you help communities or accelerate displacement?

How do you assess the Jacobs experiment?`,
      choices: [
        { id: 'ecosystem', text: 'A new ecosystem emerged', consequence: 'You built complexity.', effects: { economicStrength: 10, publicSupport: 8 }, endingIndex: 0 },
        { id: 'seeds', text: 'Seeds planted, growth uncertain', consequence: 'You acknowledge the long game.', effects: { economicStrength: 5, publicSupport: 5 }, endingIndex: 1 },
        { id: 'gentrification', text: 'Displacement without prosperity', consequence: 'You recognize the risks.', effects: { publicSupport: -5, economicStrength: 3 }, endingIndex: 2 },
      ],
    },
  ],
};

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Rust Belt Revival',
    endingNarrative: `The rust belt is showing signs of life. Whether through industrial policy, human capital investment, or economic complexity, you found a path that worked for your region.

Factories have opened or new businesses have emerged. Unemployment has fallen. Downtowns have activity. Communities that faced despair now have hope.

The revival is not complete — it never is. But the trajectory has changed. The next government inherits a region on the rise rather than in decline.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Uneven Progress',
    endingNarrative: `The rust belt has improved, but unevenly. Some communities have turned a corner; others still struggle. Some workers found new paths; others remain displaced.

Your chosen approach — industrial policy, human capital, or complexity — produced real gains but left gaps. Perhaps the scale was insufficient. Perhaps the problems were deeper than one term could solve.

The next government faces a region better than before but still fragile, still searching for sustained vitality.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'Decline Continues',
    endingNarrative: `Despite your efforts, the decline continues. Factories remain closed or have closed further. Young people continue to leave. Downtowns remain hollow.

Your chosen approach — whether too timid, too slow, or fundamentally mismatched to the problem — failed to turn the tide. Perhaps the forces of globalization and technological change were simply too strong.

The next government inherits the same challenge: how to revive a region that industry built and industry abandoned.`,
  },
];

const { getNode } = createArcBasedTree(
  [introArc, industrialistArc, humanCapitalArc, complexityArc],
  endings,
  (choiceIdx) => (choiceIdx === 0 ? 0 : choiceIdx === 1 ? 1 : 2),
);

export { getNode };

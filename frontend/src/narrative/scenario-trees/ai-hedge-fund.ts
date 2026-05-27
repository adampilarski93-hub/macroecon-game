import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * The Insolvency — Hedge Fund Manager in AI Investment
 *
 * Player manages a $200M long/short equity fund focused on AI/ML infrastructure.
 * First three decisions: allocating capital, managing risk, navigating hype cycles.
 * Midpoint: Major portfolio company (Silica Systems, AI chip designer) declared insolvent.
 * Final three decisions: containing contagion, managing investor redemption cascade,
 * regulatory scrutiny, and existential fund survival.
 *
 * Based on real patterns from:
 * - Tiger Global / Coatue / SoftBank tech valuation corrections (2022-2023)
 * - FTX/Alameda contagion mechanics
 * - Archegos family office implosion
 * - SVB/regional bank run dynamics
 */

const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'The Allocation Decision',
    narrative: `You're Managing Partner at Kestrel Capital, a $200M hedge fund seeded by a family office and university endowment. Your thesis: AI infrastructure—compute, data centers, specialized silicon—will outperform the overhyped model layer (ChatGPT competitors). Your anchor position: Silica Systems, Series C AI chip designer. They're 18 months from tape-out, burning $12M/month, but claim 3x performance/watt advantage over NVIDIA A100s. SoftBank's Vision Fund is circling with a $400M term sheet at $1.8B valuation—10x revenue multiple. Your options: join the round (insider access, mark your existing position up 40%), pass (avoid concentration risk), or short the model-layer competitors (hedge the infrastructure bet). Meanwhile, your limited partners want to know why you're not in the foundation models everyone reads about.`,
    choices: [
      {
        id: 'follow_on_lead',
        text: 'Lead the Series C, double down on Silica Systems—conviction requires concentration',
        consequence: 'Concentrated exposure to single-asset risk; LP concentration limits approach.',
        effects: { fundConcentration: 25, siliciaExposure: 30, lpConfidence: 10, riskProfile: 20, dryPowder: -25 }
      },
      {
        id: 'participate_trim',
        text: 'Participate pro-rata but trim public holdings to manage concentration',
        consequence: 'Maintain position without overexposure; sacrifice some upside.',
        effects: { fundConcentration: 10, siliciaExposure: 15, lpConfidence: 5, riskProfile: 10, dryPowder: -15, liquidityBuffer: 10 }
      },
      {
        id: 'pass_diversify',
        text: 'Pass on Series C, deploy to diversified data center REITs and GPU cloud operators',
        consequence: 'Avoid single-asset risk; potentially miss asymmetric upside.',
        effects: { fundConcentration: -5, siliciaExposure: 5, lpConfidence: -5, riskProfile: -10, dryPowder: 0, portfolioDiversification: 20 }
      }
    ]
  },
  {
    phase: 2,
    title: 'Liquidity Engineering',
    narrative: `Silica's $400M round closed—you participated at $10M. The position now represents 22% of fund NAV. Your quarterly letter praised "asymmetric infrastructure exposure." But cracks appear: a respected semiconductor blog questions Silica's power efficiency claims. The CTO's previous employer (a failed AI startup) is being sued for IP theft. Meanwhile, redemption requests trickle in—two LPs want quarterly liquidity (you're open-ended) citing "portfolio rebalancing." Your credit line offers $30M at 300bps over SOFR. You could gate redemptions (legal per LPA but reputationally damaging), sell the most liquid holdings (NVIDIA, AMD) to meet flows, or tap the credit line to avoid forced selling. The market feels fragile—AI names trade at 40x forward revenue.`,
    choices: [
      {
        id: 'gate_redemptions',
        text: 'Gate redemptions at 15% of NAV per quarter—protect long-term positions from panic selling',
        consequence: 'Preserves portfolio integrity but signals distress; may accelerate LP anxiety.',
        effects: { liquidityManagement: 15, lpConfidence: -20, reputationRisk: 20, portfolioStability: 10, redemptionPressure: -10 }
      },
      {
        id: 'liquidate_public',
        text: 'Sell liquid public holdings (NVIDIA, AMD, Equinix) to meet redemptions honorably',
        consequence: 'Preserves reputation but crystallizes losses, loses exposure to best-quality assets.',
        effects: { liquidityManagement: 10, lpConfidence: 5, reputationRisk: -5, portfolioQuality: -15, dryPowder: 10, publicEquityExposure: -20 }
      },
      {
        id: 'credit_line_leverage',
        text: 'Draw the full credit line, increase leverage to 1.3x—buy time for Silica to prove itself',
        consequence: 'Avoids forced selling but amplifies downside; margin call risk if NAV drops.',
        effects: { liquidityManagement: 5, leverageRatio: 20, lpConfidence: 5, riskProfile: 25, reputationRisk: -5, marginCallRisk: 15 }
      }
    ]
  },
      {
    phase: 3,
    title: 'The Information Edge',
    narrative: `A former Silica engineer—fired in acrimonious circumstances—contacts your research associate. For $50,000, she offers: Silica's "3x efficiency" claim is based on cherry-picked ResNet-50 benchmarks; real-world transformer inference shows only 15% advantage. More critically, the 4nm tape-out failed twice; the chip won't sample until 2026, not 2025. You have a material non-public information problem—trading on this violates insider trading laws. But you can: (1) Use it to privately pressure Silica's board for fuller disclosure, (2) Quietly accelerate your own exit planning, or (3) Report it to the SEC and wash your hands. Meanwhile, SoftBank just marked Silica up 30% in their own quarterly report—your position shows a $12M unrealized gain. Your LPs expect this performance in your next letter.`,
    choices: [
      {
        id: 'board_pressure',
        text: 'Confront Silica board with the allegations, demand independent technical audit',
        consequence: 'Ethical approach but alerts insiders you know; may accelerate their defensive actions.',
        effects: { integrityScore: 20, legalRisk: -10, siliciaValuation: -15, lpTransparency: 15, informationAdvantage: -10 }
      },
      {
        id: 'quiet_hedging',
        text: 'Use knowledge to quietly build NVIDIA long/short hedges without trading Silica',
        consequence: 'Legally defensible (no Silica trading) but ethically ambiguous; your reputation depends on never revealing how you knew.',
        effects: { informationAdvantage: 15, legalRisk: 5, integrityScore: -10, portfolioProtection: 15, reputationRisk: 10 }
      },
      {
        id: 'sec_disclosure',
        text: 'Report to SEC, disclose to LPs you cannot value Silica position until investigation concludes',
        consequence: 'Full legal protection but immediate NAV uncertainty; likely LP exodus.',
        effects: { legalRisk: -20, integrityScore: 15, lpConfidence: -25, reputationRisk: 15, fundValuationCertainty: -20, regulatoryStanding: 20 }
      }
    ]
  },
  // MIDPOINT: THE INSOLVENCY
  {
    phase: 4,
    title: 'Silica Systems: Chapter 11',
    narrative: `Silica filed for Chapter 11 this morning. The filing reveals: $47M cash remaining, $180M in liabilities to TSMC for failed tape-outs, $60M owed to secured creditors. Your $22M position—18% of fund NAV—is worthless in the liquidation waterfall (unsecured equity). Worse, you co-signed a $15M equipment lease as "credit support" for Silica's lab equipment. That liability just became real. Your fund's NAV drops 11% overnight. Three major LPs just called emergency capital committee meetings. The New York Times is asking for comment on "hedge funds' risky bets on unproven AI hardware." Your prime broker just reduced your leverage capacity by 40%. This is the moment that defines whether you survive.`,
    choices: [
      {
        id: 'immediate_gates',
        text: 'Immediately gate all redemptions, declare "exceptional circumstances" under LPA',
        consequence: 'Preserves remaining assets from fire sale but confirms to LPs you are in crisis.',
        effects: { liquidityManagement: 20, lpConfidence: -30, reputationRisk: 25, fundSurvival: 10, regulatoryScrutiny: 15 }
      },
      {
        id: 'transparent_call',
        text: 'Host emergency LP call, acknowledge losses, present 90-day survival plan before any gates',
        consequence: 'Honorable but gives LPs time to organize mass withdrawal when gates lift.',
        effects: { lpConfidence: -15, integrityScore: 15, transparencyScore: 20, fundSurvival: 5, redemptionPressure: 20 }
      },
      {
        id: 'side_pocket',
        text: 'Side-pocket Silica position immediately, continue normal operations with rest of fund',
        consequence: 'Technical solution that isolates the damage but requires LP vote and audit.',
        effects: { fundStructure: 15, legalRisk: 10, lpConfidence: -10, fundSurvival: 15, operationalComplexity: 20, transparencyScore: 10 }
      }
    ]
  },
  {
    phase: 5,
    title: 'Contagion and the Prime Broker',
    narrative: `The side-pocket vote passed—barely, 62% in favor. But the prime broker (Goldman Sachs PB) invoked your cross-default clause. Other positions—your NVIDIA shorts, your long Equinix—are being liquidated to meet margin calls. You're short $800M notional AI equities in a market that's suddenly rallying on "AI productivity boom" headlines. The short squeeze is costing $2M/day. Your credit line provider just pulled the facility—"portfolio quality deterioration." You're now forced to sell what you can, not what you should. The SEC sent a voluntary document request about Silica due diligence. One LP just sued, claiming you "fraudulently" omitted concentration risk in marketing materials. You have 48 hours of liquidity left at current burn.`,
    choices: [
      {
        id: 'negotiated_wind_down',
        text: 'Negotiate orderly wind-down with PB, accept 3-year liquidation period to maximize recovery',
        consequence: 'Preserves asset values but you are managing a zombie fund; career effectively over.',
        effects: { lpRecovery: 25, fundSurvival: 15, personalReputation: -20, careerDamage: 30, regulatoryExposure: 10 }
      },
      {
        id: 'emergency_capital',
        text: 'Seek emergency capital from distressed hedge fund buyer (Cerberus, etc.)—dilute yourself to 5%',
        consequence: 'Fund survives but you are an employee, not founder; culture destroyed.',
        effects: { fundSurvival: 25, ownershipRetention: -30, lpConfidence: 10, personalReputation: -15, careerDamage: 20 }
      },
      {
        id: 'fire_sale',
        text: 'Authorize fire sale of all liquid positions, return what cash remains immediately',
        consequence: 'LPs get 60-70 cents on dollar now, rather than uncertain future recovery.',
        effects: { lpRecovery: -10, integrityScore: 20, fundSurvival: -20, personalReputation: 5, careerDamage: 10, regulatoryExposure: -10 }
      }
    ]
  },
  {
    phase: 6,
    title: 'The Aftermath and Inquiry',
    narrative: `Twelve months later. Kestrel Capital is defunct (if you chose wind-down) or operating under new ownership (if you recapitalized) or liquidated (if you fire-sold). The SEC investigation concluded: no criminal charges for you personally, but a Wells Notice for inadequate risk disclosure. The civil suit settled for $4M—covered by D&O insurance, but your personal reputation is googleable. Your former LPs: the university endowment fired their CIO for "insufficient due diligence on alternative investments." The family office is suing their own investment committee for "herd behavior." Silica's technology, ironically, just got acquired by NVIDIA for the patent portfolio—your worthless equity returned 8 cents on the dollar in bankruptcy court. Your staff: two analysts found jobs at Tiger Global (who had their own Silica exposure). Your research associate—the one who heard the early whistleblower—testified before Congress about "hedge fund information asymmetries." What's left for you?`,
    choices: [
      {
        id: 'reflection_substack',
        text: 'Launch Substack: "What I Got Wrong About AI Infrastructure"—radical transparency about failures',
        consequence: 'Reputational rehabilitation through intellectual honesty; may enable eventual capital raising.',
        effects: { reputationRehabilitation: 20, intellectualHonesty: 25, futureCapitalAccess: 10, personalGrowth: 20 }
      },
      {
        id: 'regulatory_reform',
        text: 'Join SEC advisory committee on private fund liquidity risk—help reform the system',
        consequence: 'Service to the industry that burned you; personal redemption through policy impact.',
        effects: { industryStanding: 15, regulatoryInfluence: 20, personalGrowth: 15, reputationRehabilitation: 10 }
      },
      {
        id: 'stealth_second_act',
        text: 'Quietly raise a small family office vehicle, stricter risk limits, no institutional LPs',
        consequence: 'Return to markets humbly but without accountability structures that force discipline.',
        effects: { futureCapitalAccess: 15, riskRecidivism: 20, personalGrowth: -10, reputationRehabilitation: -5 }
      }
    ]
  }
];

const endings: LongFormEnding[] = [
  {
    id: 'institutional_lesson',
    endingType: 'victory',
    title: 'The Controlled Demolition',
    endingNarrative: `You managed an impossible situation with integrity. The side-pocket structure preserved $127M for LPs in a fund that had cratered 34% at its nadir. Your transparent LP communication became a case study at Wharton ("Crisis Communications in Alternative Investments"). The SEC investigation concluded with a civil settlement—no personal liability, just firm-level disclosure improvements. Your Substack attracted 40,000 subscribers, including the CIO who now asks harder questions about concentration risk. Most importantly, you learned what the Silicon Valley "fail fast" culture obscures: in finance, failure cascades. Your Silica position didn't just lose money; it nearly destroyed a $200M fund, damaged an endowment's educational mission, and consumed regulatory resources. Your post-Kestrel advisory work with the SEC helped implement "concentration liquidity stress testing" for funds over $150M. You never again confused conviction with recklessness. The AI revolution continued without you, funded by other people's money, other people's risk tolerance. You became the cautionary tale that saved the next manager from similar hubris.`
  },
  {
    id: 'damaged_survivor',
    endingType: 'partial_victory',
    title: 'The Recapitalized Zombification',
    endingNarrative: `Kestrel Capital still exists—technically. Cerberus owns 92%; you own 8% and a three-year employment contract managing "legacy portfolio resolution." Your name is no longer on the door. The fund is a shell: $47M in illiquid side-pocketed assets being litigated or wound down, no new investments, staff of four (down from 22). You kept your job but lost your creation. The LP recovery was 61 cents on the dollar—better than immediate fire sale, worse than a more conservative original strategy. Your reputation is bifurcated: LPs appreciate you didn't abscond to a beach, but they remember you gated redemptions and wrote quarterly letters praising Silica weeks before bankruptcy. Your new role at Cerberus is teaching you what professional risk management looks like—boring, diversified, hedged. But you're a manager now, not an entrepreneur. The AI infrastructure boom you bet on? It happened—NVIDIA is a $3 trillion company. Silica's patents were worth something after all, just not to equity holders. You were right about the trend, wrong about the vehicle. A common hedge fund failure mode: being too early, too concentrated, too leveraged, too certain.`
  },
  {
    id: 'cautionary_collapse',
    endingType: 'defeat',
    title: 'The Fire Sale and the Lawsuits',
    endingNarrative: `Kestrel Capital is a tombstone in the hedge fund graveyard—added to the list that includes Archegos, Amaranth, Long-Term Capital. You liquidated at the bottom, returning 58 cents on the dollar to LPs who had trusted you with their capital. The university endowment cut alternative investments entirely, missing the subsequent decade's private market returns. Your fire sale added selling pressure to an already fragile AI equity market, contributing to a 14% drawdown in the sector that month. The civil settlement consumed your personal savings; the reputation damage exceeded the financial. Your Substack—started in desperation—attracted only 800 subscribers, mostly short-sellers hoping you'd trash former competitors. The research associate who testified to Congress? She has a career. You have cautionary tales told at business schools. But the deepest loss is conceptual: you genuinely believed Silica would change AI computation efficiency, democratize access to training capacity, reduce dependency on NVIDIA's monopoly. That belief was well-researched, intellectually coherent, and catastrophically wrong in its execution as an investment. The lesson—conviction without liquidity is arrogance; concentration without information edge is gambling—came too late for your LPs. You will manage money again, perhaps, but never with the same presumption of understanding.`
  }
];

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createLongFormTree(
    blocks,
    endings,
    () => 1,
    { shuffleBlocks: options?.shuffle, seed: options?.seed }
  );
}

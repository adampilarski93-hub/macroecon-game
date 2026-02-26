export const salesEffortBlock = {
  phase: 3,
  title: 'The Sales Effort',
  narrative: `**Baran & Sweezy: The Sales Effort**

Under monopoly capitalism, the sales effort becomes massive. It's not about informing consumers—it's about creating wants, manufacturing dissatisfaction, and keeping the surplus circulating through unproductive channels.

**Calmwater's Ad Economy**: Your tech sector now employs 40% of its workforce in "growth hacking," ad targeting, and engagement optimization. They don't build anything useful—they keep people scrolling, clicking, wanting.

**The Waste**: Billions spent on algorithms to maximize "time on platform." Planned obsolescence ensures last year's model feels inadequate. The sales effort absorbs surplus capital without meeting human needs.

**Baran's Question**: What if these resources went to education, healthcare, infrastructure instead? What if we produced for use, not for advertising budgets?`,
  
  tooltipDefinitions: {
    "Sales Effort": "Resources allocated to marketing, advertising, and creating artificial demand rather than productive investment",
    "Planned Obsolescence": "Designing products to fail or become unfashionable, forcing replacement purchases",
    "Engagement Metrics": "Algorithms optimized to maximize user attention for ad delivery"
  },
  
  choices: [
    {
      id: 'regulate_ads',
      text: 'Ban targeted advertising and engagement algorithms',
      consequence: 'Force platforms to compete on service quality, not addiction metrics. Major revenue hit.',
      effects: { economicStrength: -10, wageShare: 10, publicSupport: 15 },
      learnMore: {
        concept: 'Decommodifying Attention',
        explanation: 'Baran argued that much of the sales effort represents waste—resources diverted from meeting real needs. Banning engagement metrics forces platforms to provide actual value.',
        thinkers: ['Paul Baran', 'Paul Sweezy', 'Tim Wu'],
        realWorldExample: 'EU Digital Services Act: limits targeting, requires transparency. Reduced ad revenue but improved platform quality.',
        counterArguments: 'Neoclassical: Advertising provides information. Without it, consumers can\'t find products. Reduced ad revenue means fewer "free" services.'
      }
    },
    {
      id: 'tax_waste',
      text: 'Tax advertising spend, fund public goods',
      consequence: 'Redirect the sales effort surplus. Corporates resist but public services expand.',
      effects: { wageShare: 15, economicStrength: -5, debtBurden: -10 },
      learnMore: {
        concept: 'Surplus Redistribution vs. Absorption',
        explanation: 'Instead of absorbing surplus through advertising, tax it and redirect to productive public goods. This changes WHO gets the surplus.',
        thinkers: ['Paul Baran', 'John Kenneth Galbraith', 'Michal Kalecki'],
        realWorldExample: 'France\'s "GAFA tax" on digital advertising funded public services. Reduced marketing budgets, increased public investment.',
        counterArguments: 'Keynesian: Taxing during downturn reduces demand. Better to regulate than tax heavily. Neoliberal: Governments spend inefficiently.'
      }
    },
    {
      id: 'maximize_engagement',
      text: 'Embrace the attention economy fully',
      consequence: 'Maximum surplus absorption through ads. Short-term growth, long-term social decay.',
      effects: { economicStrength: 12, wageShare: -15, publicSupport: -20 },
      learnMore: {
        concept: 'The Sales Effort as Surplus Absorption',
        explanation: 'Baran & Sweezy: The sales effort is a "sink" for surplus capital. It absorbs excess without productive investment. Maximum engagement = maximum waste = maximum absorption.',
        thinkers: ['Paul Baran', 'Paul Sweezy', 'Shoshana Zuboff'],
        realWorldExample: 'Social media platforms: billions in ad revenue, massive engagement, documented mental health crises, political polarization.',
        counterArguments: 'Market view: People choose to use platforms. If they didn\'t want it, they wouldn\'t click. Consumer sovereignty.'
      }
    }
  ]
};

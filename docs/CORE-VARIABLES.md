# Core State Variables and Policy Levers (V1)

## State Variables (CountryState)

| Variable | Type | Description |
|----------|------|-------------|
| gdp | number | Real GDP (constant local currency) |
| gdpGrowth | number | Annual GDP growth rate (decimal) |
| sectors | Record<SectorId, SectorState> | Agriculture, manufacturing, services: output, laborShare, capitalStock, tfp |
| laborForce | number | Working-age population in labor force |
| employed / unemployed | number | Level |
| unemploymentRate | number | unemployed / laborForce |
| inflationRate | number | Annual CPI inflation (decimal) |
| inflationTarget | number | Central bank target |
| exchangeRate | number | LCU per 1 foreign currency unit |
| taxRevenue | number | Total government revenue |
| expenditure | number | Total government spending |
| deficit | number | expenditure - taxRevenue |
| publicDebt | number | Stock of debt |
| debtToGdp | number | publicDebt / gdp |
| policyRate | number | Nominal policy interest rate |
| exports / imports | number | Real trade flows |
| currentAccount | number | Trade balance (simplified) |
| fxReserves | number | Foreign exchange reserves |
| inflationExpectations | number | Adaptive/anchored (0–1 index) |
| institutionQuality | number | 0–1 index |
| approval | number | Citizen satisfaction 0–1 |

## Policy Levers (PolicyActions)

| Lever | Type | Effect |
|-------|------|--------|
| incomeTaxRate | 0–1 | Sets effective income tax rate |
| tariffRate | 0–1 | Ad valorem tariff on imports |
| spendingShareOfGdp | 0–1 | G as share of GDP |
| policyRate | decimal | Central bank policy rate |
| exchangeRateRegime | float/peg/managed | Affects FX dynamics |
| infrastructureShare | 0–1 | Share of G to infrastructure |
| socialSpendingShare | 0–1 | Share of G to social spending |

## Scenario Parameters (ScenarioParams)

Define constraints (min/max tax, spending, policy rate), scenario id, country name, periods per year, and behavioral parameters (consumption propensity, investment elasticity, Phillips curve slope, trade elasticity, debt sustainability threshold).

## First Scenario: "Emerging Debt Crisis"

- Country: fictional emerging economy, high debt, current account deficit.
- Baseline: elevated debt/GDP, moderate inflation, fixed exchange rate.
- Geopolitical: world rate can rise (shock), export demand can fall.
- Levers: fiscal consolidation vs stimulus, monetary tightening, tariff changes, spending composition.

# Macroeconomic Equations (V1 Simulation Engine)

## 1. Production (Sectors)

- **Cobb-Douglas** per sector: `Y_s = A_s * K_s^alpha * L_s^(1-alpha)`.
- Alpha (capital share) ~0.33; TFP `A_s` grows with investment in infrastructure and institutions.
- Aggregate GDP: `Y = sum_s Y_s`.
- Labor allocation: shares respond to relative productivity and wages (simplified: fixed shares with slow adjustment).

## 2. Demand (Aggregate)

- **Identity**: `Y = C + I + G + (X - M)`.
- **Consumption**: `C = c * (1 - t) * Y_prev`, with `c` = marginal propensity to consume (scenario param), `t` = income tax rate.
- **Investment**: `I = I_0 * (1 - beta * (r - r_natural))` — decreasing in real interest rate; `r = policyRate - inflationExpectations`.
- **Government**: `G = spendingShareOfGdp * Y` (policy).
- **Net exports**: `NX = X - M`; see External sector.

## 3. Prices and Inflation

- **Phillips curve**: `pi = pi_e + gamma * (u - u_natural) + epsilon_import`.
- `pi_e` = inflation expectations; `gamma` = phillipsCurveSlope; `u` = unemployment rate; `epsilon_import` = pass-through from exchange rate and commodity prices.
- **Inflation expectations**: Adaptive: `pi_e_next = 0.7 * pi_e + 0.3 * pi`.

## 4. Labor Market

- **Employment**: `L = sum_s L_s`; `L_s = laborShare_s * laborForce`.
- **Unemployment**: `u = 1 - L / laborForce`.
- Natural rate approximated as constant in V1; labor force grows exogenously (scenario).

## 5. Government Budget

- **Revenue**: `T = incomeTaxRate * Y + tariffRate * M` (simplified).
- **Expenditure**: `G = spendingShareOfGdp * Y`.
- **Deficit**: `D = G - T`.
- **Debt dynamics**: `Debt_next = Debt + D + interestPayments`; interest = `Debt * (policyRate + riskPremium)` on new borrowing (simplified average rate).

## 6. Monetary

- **Policy rate**: Set by player (PolicyActions.policyRate); no automatic Taylor rule in V1.
- **Real rate**: `r = policyRate - inflationExpectations` (Fisher).

## 7. External Sector

- **Exports**: `X = X_0 * (1 + worldGrowth) * exportDemandMultiplier * (1 - tradeElasticity * realExchangeRateAppreciation)`.
- **Imports**: `M = m_0 * Y * (1 + tariffRate)^(-tradeElasticity)` — demand and relative price.
- **Current account**: `CA = X - M` (simplified; no net primary income in V1).
- **FX rate**: If float: depreciation when CA deficit and/or capital outflows; if peg: reserves change; if managed: weighted.

## 8. Geopolitical

- **Risk premium**: Base + uplift when sanctionsActive or high debtToGdp (scenario params).
- **Export demand**: Reduced when sanctionsActive (exportDemandMultiplier < 1).

## 9. Approval and Institutions

- **Approval**: Function of gdpGrowth, inflation, unemployment, inequality proxy (simplified: no inequality in V1), and public service level (socialSpendingShare).
- **Institution quality**: Slow-moving; improves with infrastructure and stability.

## Implementation Order in step()

1. Apply PolicyActions to update policy variables (tax, spending, rate, etc.).
2. Compute demand components (C, I, G) and NX.
3. Solve for equilibrium Y (iterate or closed form if linearized).
4. Update sector outputs and labor.
5. Update inflation (Phillips + import).
6. Update expectations, government budget, debt.
7. Update exchange rate and external sector.
8. Compute approval and events.

# V1 Scope (First Playable Version)

## In scope
- **Single country** only; global variables are exogenous (scenario-driven).
- **Two scenarios**: "Emerging Debt Crisis" and "Stagflation".
- **Turn-based**: one step per request; turn = period (quarter or year abstract).
- **Policy levers**: Income tax rate, tariff rate, spending share of GDP, policy rate, exchange rate regime, social spending share.
- **Dashboard**: GDP, growth, inflation, unemployment, debt/GDP, current account, approval; one chart over time.
- **Events feed**: Warnings (high debt, high inflation) and milestone messages.
- **Backend**: Express API with in-memory sessions; simulation engine in TypeScript.
- **Frontend**: React + Vite, scenario select → game screen with dashboard, policy form, events; proxy to API.

## Out of scope for V1
- Multi-country interactions, persistent storage, auth, save/load.
- Additional sectors or detailed fiscal breakdown beyond spending share.
- Geopolitical scripted events (e.g. sanctions trigger), AI advisors, counterfactuals.
- Calibration tooling and batch runs (can be added in a later milestone).

## Definition of done
- User can select a scenario, advance turns by submitting policy actions, and see KPIs and chart update; events appear when thresholds are crossed.

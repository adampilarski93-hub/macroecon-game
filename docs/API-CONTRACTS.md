# API Contracts

## Base URL
`http://localhost:3001/api` (or configured port)

## POST /start-simulation

**Request**
```json
{
  "scenarioId": "emerging-debt-crisis"
}
```

**Response** (200)
```json
{
  "sessionId": "uuid-string",
  "state": {
    "turn": 0,
    "country": { "gdp": 1000, "gdpGrowth": 0.02, "sectors": { ... }, "laborForce": 500, "employed": 475, "unemployed": 25, "unemploymentRate": 0.05, "inflationRate": 0.06, "inflationTarget": 0.025, "exchangeRate": 1, "taxRevenue": 200, "expenditure": 280, "deficit": 80, "publicDebt": 650, "debtToGdp": 0.65, "policyRate": 0.08, "exports": 300, "imports": 320, "currentAccount": -20, "fxReserves": 80, "inflationExpectations": 0.05, "institutionQuality": 0.5, "approval": 0.45 },
    "global": { "worldGrowth": 0.02, "worldRate": 0.05, "commodityPriceIndex": 1, "exportDemandMultiplier": 1, "sanctionsActive": false, "riskPremium": 0.02 },
    "scenario": { "scenarioId": "...", "countryName": "...", "periodsPerYear": 4, "minTaxRate": 0.1, "maxTaxRate": 0.4, ... },
    "events": []
  }
}
```

## POST /step

**Request**
```json
{
  "sessionId": "uuid-string",
  "turnIndex": 0,
  "actions": {
    "incomeTaxRate": 0.22,
    "tariffRate": 0.08,
    "spendingShareOfGdp": 0.26,
    "policyRate": 0.07,
    "exchangeRateRegime": "managed",
    "infrastructureShare": 0.2,
    "socialSpendingShare": 0.4
  }
}
```

**Response** (200)
```json
{
  "state": {
    "turn": 1,
    "country": { ... },
    "global": { ... },
    "scenario": { ... },
    "events": [ { "id": "...", "turn": 1, "type": "warning", "title": "...", "description": "..." } ]
  }
}
```

**Errors**
- 400: Missing sessionId or invalid scenarioId / session not found
- 409: turnIndex does not match server state (stale client)

## GET /scenarios

**Response** (200)
```json
{
  "scenarios": [
    { "id": "emerging-debt-crisis", "name": "Emerging Debt Crisis", "description": "...", "difficulty": "hard" },
    { "id": "stagflation", "name": "Stagflation", "description": "...", "difficulty": "medium" }
  ]
}
```

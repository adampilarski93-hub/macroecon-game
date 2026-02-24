# Tech Stack

## Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express
- **Simulation engine**: Pure TypeScript module under `src/engine/`, framework-agnostic and testable via CLI/scripts

## Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build**: Vite
- **State**: Zustand (lightweight, sufficient for simulation session state)
- **Charts**: Recharts

## Rationale
- Full-stack TypeScript for shared types and consistency.
- Express for a minimal, fast API layer.
- Vite for fast frontend dev and build.
- Zustand for simple client state without Redux boilerplate.

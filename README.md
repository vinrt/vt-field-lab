# VT Field Lab

VT Field Lab is an interactive physics and mathematics laboratory built with React, TypeScript, and Vite. Its light scientific dashboard connects mechanics, astronomy, quantum concepts, curated reading, and interactive experiments.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL printed by Vite.

## Verify the project

```bash
npm test
npm run typecheck
npm run build
```

## Public repository safety

This repository is public. Never commit credentials, `.env` files, private keys, service-account files, IDE workspace state, or personal data. Vite variables prefixed with `VITE_` are bundled into browser code and must always be treated as public configuration.

## Project structure

- `src/simulations/projectile-motion/` contains the pure projectile model, animation view, presets, page, and tests.
- `src/simulations/solar-system-motion/` contains the interactive orbital visualization and model tests.
- `src/simulations/qubit-bloch-sphere/` contains the pure one-qubit model, Bloch-sphere view, controls, and gate/measurement tests.
- `src/hooks/useProjectileSimulation.ts` owns time progression and Run/Pause/Reset behavior.
- `src/simulations/registry.ts` is the source of truth for simulation discovery.
- `src/app/` contains routing, layout, and supporting pages.
- `src/content/` contains curated learning references.
- `src/styles/global.css` contains the established simulation styles; `src/styles/dashboard.css` owns the dashboard shell, quantum pages, responsive navigation, and explicit themes.

## Main routes

- `/simulations` — scientific dashboard
- `/simulations/library` — filterable experiment catalog
- `/simulations/projectile-motion` — Projectile Motion
- `/simulations/solar-system-motion` — Solar System Motion
- `/simulations/qubit-bloch-sphere` — Qubit Explorer
- `/concepts/quantum-physics` — Quantum Physics Basics
- `/quantum` — quantum learning path

## Scientific model

The projectile simulation assumes:

- uniform gravitational acceleration;
- flat ground at `y = 0`;
- a point-like projectile launched from ground level;
- no aerodynamic drag;
- SI units internally and in the interface.

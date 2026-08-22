# VT Field Lab

VT Field Lab is an interactive physics and mathematics laboratory built with React, TypeScript, and Vite. The first experiment models projectile motion without air resistance and connects a live canvas visualization to measurements, velocity graphs, equations, and concise learning notes.

## Documentation

- [`architecture.md`](./architecture.md) describes the implemented system, runtime flows, scientific model, rendering, deployment, architectural decisions, and extension boundaries.
- [`agent.md`](./agent.md) defines repository conventions, scientific rules, testing requirements, and the expected workflow for future coding agents.
- [`SKILL.md`](./SKILL.md) contains the broader product vision and roadmap.

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

## Project structure

- `src/simulations/projectile-motion/` contains the pure physics model, animation view, presets, page, and model tests.
- `src/hooks/useProjectileSimulation.ts` owns time progression and Run/Pause/Reset behavior.
- `src/simulations/registry.ts` is the source of truth for simulation discovery.
- `src/app/` contains routing, layout, and supporting pages.
- `src/content/` contains curated learning references.
- `src/styles/global.css` defines the responsive visual system and dark/light color behavior.

## Scientific model

The projectile simulation assumes:

- uniform gravitational acceleration;
- flat ground at `y = 0`;
- a point-like projectile launched from ground level;
- no aerodynamic drag;
- SI units internally and in the interface.

The model uses the closed-form solution, so its state is deterministic and independent of animation frame rate.

## Cloudflare Pages

Use these settings:

```text
Build command: npm run build
Output directory: dist
```

`public/_redirects` enables direct navigation to client-side routes such as `/simulations/projectile-motion`.

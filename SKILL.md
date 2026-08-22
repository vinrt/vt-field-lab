---
name: vt-field-lab
description: Build and evolve VT Field Lab, an interactive physics and mathematics simulation website deployed from GitHub to Cloudflare, with reusable simulation infrastructure, science learning content, book recommendations, and social-media-ready visuals.
---

# VT Field Lab Skill

## Purpose

Use this skill when creating, extending, reviewing, or deploying **VT Field Lab**.

VT Field Lab is a long-term interactive science project centered on:

- physics simulations
- mathematical visualizations
- intuitive explanations
- equations and measurable quantities
- science and mathematics book recommendations
- reusable visual content for Instagram and other social platforms

The product should be able to grow from a small personal project into a polished public science platform without requiring a major architectural rewrite.

The core principle is:

> **See the phenomenon → interact with it → understand the mathematics → explore further.**

---

# 1. Product Vision

VT Field Lab should feel like a modern scientific instrument rather than a generic educational website.

A visitor should be able to:

1. open a simulation
2. change physical parameters
3. run/pause/reset it
4. observe the system evolve in real time
5. inspect numerical values and vectors
6. view relevant graphs
7. see the governing equations
8. read a concise conceptual explanation
9. follow recommendations for deeper learning
10. share or record the simulation visually

The platform should eventually support areas such as:

- Mechanics
- Waves and oscillations
- Electromagnetism
- Thermodynamics
- Relativity
- Quantum physics
- Linear algebra
- Calculus
- Geometry
- Probability
- Numerical methods
- Computational physics

Do not constrain the product branding or architecture to only quantum physics.

---

# 2. Development Philosophy

When working on VT Field Lab:

- Prefer a **small working implementation** over a large speculative architecture.
- Build reusable primitives only after a real simulation demonstrates the need.
- Keep physics/math logic independent from React UI logic.
- Do not introduce a backend until a feature actually requires one.
- Do not introduce Kubernetes, containers, Spring Boot, or a database for the first public version.
- Prioritize correctness, responsiveness, smooth animation, and clarity.
- Avoid unnecessary dependencies.
- Prefer browser-native capabilities when appropriate.
- Keep the app deployable as static assets for as long as possible.
- Make every simulation suitable for both desktop use and screen recording.
- Treat accessibility and mobile behavior as first-class requirements.
- Never put secrets, tokens, API keys, or credentials in frontend source code.

When modifying an existing repository, inspect the current implementation before proposing structural changes.

---

# 3. Initial Technology Stack

Use this stack unless there is a concrete reason to change it.

## Core

- **TypeScript**
- **React**
- **Vite**

## Rendering

Use the simplest rendering technology that satisfies the simulation.

Preferred progression:

1. SVG for simple diagrams and vectors
2. HTML Canvas 2D for fast animated 2D simulations
3. Three.js / WebGL for genuine 3D scenes
4. WebGPU only when a real performance or compute requirement justifies it

Do not introduce Three.js for a simulation that Canvas 2D can handle cleanly.

## Styling

Preferred:

- CSS Modules, plain CSS, or a lightweight design-system approach
- CSS custom properties for themes and scientific colors
- responsive grid/flex layouts

A utility framework may be introduced only when it clearly improves development speed without making the codebase opaque.

## Charts

Prefer lightweight charting or custom SVG/Canvas charts.

Potential libraries:

- Recharts
- Plotly
- uPlot

Choose based on actual needs rather than installing multiple chart libraries.

## Source Control

- Git
- GitHub

## Hosting

- Cloudflare Pages
- GitHub-integrated deployment
- Custom domain when available

Initial expected Cloudflare configuration:

```text
Build command: npm run build
Output directory: dist
```

---

# 4. Deployment Model

The initial architecture should remain:

```text
Developer machine
      |
      | git push
      v
GitHub
      |
      | automatic deployment
      v
Cloudflare Pages
      |
      +---- pages.dev preview
      |
      +---- custom domain
```

The domain registrar and hosting provider do not need to be the same company.

Cloudflare should initially provide:

- DNS
- HTTPS
- CDN
- static hosting
- deployment previews

Do not purchase or provision a VPS merely to host the initial React application.

---

# 5. Proposed Repository Structure

Prefer a structure similar to:

```text
vt-field-lab/
├── public/
│   ├── icons/
│   └── social/
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   └── layout/
│   │
│   ├── components/
│   │   ├── controls/
│   │   ├── charts/
│   │   ├── equations/
│   │   ├── simulation/
│   │   └── ui/
│   │
│   ├── simulations/
│   │   ├── registry.ts
│   │   └── projectile-motion/
│   │       ├── ProjectileMotionPage.tsx
│   │       ├── ProjectileCanvas.tsx
│   │       ├── projectileModel.ts
│   │       ├── projectileTypes.ts
│   │       ├── projectilePresets.ts
│   │       └── projectileModel.test.ts
│   │
│   ├── physics/
│   │   ├── constants.ts
│   │   ├── vectors.ts
│   │   └── units.ts
│   │
│   ├── math/
│   │   ├── interpolation.ts
│   │   └── numerical.ts
│   │
│   ├── content/
│   │   ├── books.ts
│   │   └── learningPaths.ts
│   │
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   └── main.tsx
│
├── tests/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

Do not force this exact layout when the repository already has a sensible structure.

---

# 6. Simulation Architecture

Each simulation should contain three clearly separated layers.

## A. Model

Pure mathematical/physical computation.

Example:

```ts
export interface ProjectileState {
  time: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface ProjectileParameters {
  initialSpeed: number;
  launchAngleDeg: number;
  gravity: number;
}
```

The model should preferably be testable without React or the browser.

## B. Simulation Controller

Responsible for:

- time progression
- animation state
- pause/resume
- reset
- stepping
- sampling
- simulation speed

Use `requestAnimationFrame` for browser animation.

Separate **render frame rate** from **physics integration timestep** when numerical simulations require it.

## C. View

Responsible for:

- drawing
- parameter controls
- labels
- graphs
- equations
- explanatory content

The view should not duplicate physics equations already implemented in the model.

---

# 7. Simulation Registry

As the library grows, simulations should be discoverable through metadata rather than hard-coded navigation.

Example concept:

```ts
export interface SimulationDefinition {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  route: string;
}
```

Potential categories:

```text
Mechanics
Waves
Electromagnetism
Thermodynamics
Relativity
Quantum Physics
Mathematics
Computational Physics
```

The registry should support:

- navigation
- search
- favorites later
- related simulations
- social sharing metadata
- future learning paths

---

# 8. First Simulation: Projectile Motion

The first public simulation should be **Projectile Motion**.

It should establish the design pattern used by later experiments.

## Minimum controls

- initial speed
- launch angle
- gravity
- Run
- Pause
- Reset

## Recommended presets

- Earth: 9.81 m/s²
- Moon: approximately 1.62 m/s²
- Mars: approximately 3.71 m/s²

## Initial model

Without air resistance:

```text
vx = v0 cos(theta)

vy = v0 sin(theta) - g t

x(t) = v0 cos(theta) t

y(t) = y0 + v0 sin(theta) t - 1/2 g t²
```

Stop or transition the simulation when the projectile reaches the ground.

## Display

Show:

- projectile
- trajectory trail
- x/y axes
- current time
- current x and y
- horizontal velocity
- vertical velocity
- total speed
- optional velocity vector

## Graphs

At least one of:

- y vs x
- velocity vs time
- kinetic/potential energy vs time

Do not overload the first version with every possible graph.

## Future extensions

Only after the basic version works:

- air resistance
- launch height
- object mass
- numerical integrators
- collision with terrain
- compare two trajectories
- Earth/Moon/Mars side-by-side mode

---

# 9. Physics and Mathematics Correctness

Scientific correctness is a core product feature.

For every simulation:

1. State assumptions explicitly.
2. Keep SI units as the internal default unless a different system is clearly justified.
3. Label every physical quantity with units.
4. Distinguish vectors from scalar magnitudes.
5. Keep degrees/radians conversions explicit.
6. Test known analytical cases when available.
7. Compare numerical output against closed-form solutions where possible.
8. Avoid giving false precision.
9. Document approximations.
10. Prefer canonical equations and terminology.

If a scientific claim is uncertain, verify it before encoding it into the simulation.

---

# 10. Numerical Simulation Rules

For systems without convenient analytical solutions:

- use deterministic time stepping
- start with a fixed timestep
- separate integration logic from rendering
- expose integrator choice only when it benefits the learner
- test conservation laws when appropriate

Potential methods:

- Euler
- semi-implicit Euler
- Verlet
- velocity Verlet
- RK4

Do not use RK4 merely because it appears sophisticated.

For energy-conserving mechanical systems, consider integrators appropriate to the system.

---

# 11. UI Direction

The visual identity should feel:

- scientific
- modern
- dark-mode friendly
- high contrast
- precise
- restrained rather than playful
- suitable for long sessions

Suggested page layout:

```text
+-------------------------------------------------------------+
| VT Field Lab | Simulations | Learn | Books | About          |
+---------------+---------------------------------------------+
| Simulation    | Projectile Motion                 Controls  |
| Library       |                                             |
|               |       MAIN SIMULATION CANVAS                |
| Mechanics     |                                             |
| Waves         |                                             |
| Quantum       |                                             |
| Math          +---------------------------------------------+
|               | Graph / measurements / explanation          |
+---------------+---------------------------------------------+
```

The interface should not depend on dark mode only. Maintain a valid light theme or at least sufficient accessibility behavior.

---

# 12. Mobile and Tablet Design

Do not design only for desktop.

On narrower screens:

- move the simulation library into a drawer or sheet
- place the canvas first
- place controls directly below the canvas
- stack graphs
- keep Run/Pause/Reset easy to reach
- ensure sliders work well with touch
- avoid tiny scientific labels
- preserve aspect ratio without hiding important content

The simulation itself should remain usable on an iPad and modern phones.

---

# 13. Performance Targets

For typical simulations:

- aim for smooth 60 FPS rendering
- avoid React state updates on every animation frame when not necessary
- use refs or local animation state for high-frequency values
- update expensive charts at a lower frequency than the canvas when appropriate
- minimize allocations inside animation loops
- cancel animation frames when components unmount
- avoid unnecessary rerenders

Measure before optimizing.

---

# 14. Accessibility

At minimum:

- keyboard-accessible controls
- proper labels for sliders and inputs
- visible focus states
- sufficient text contrast
- numerical input alternatives to sliders
- reduced-motion consideration where practical
- explanatory text available independently of animation
- color should not be the only way to communicate a physical distinction

---

# 15. Testing Strategy

Use lightweight but meaningful testing.

## Unit tests

Prioritize:

- equations
- vector operations
- unit conversion
- numerical solvers
- boundary cases
- presets

Example checks for projectile motion:

- `t = 0` gives initial position
- horizontal velocity remains constant without drag
- Moon trajectory lasts longer than Earth trajectory for equal initial conditions
- a 0° ground-level launch immediately intersects the ground boundary
- analytical range matches the simulated result within tolerance

## UI tests

Add only where useful:

- Run starts simulation
- Pause stops time progression
- Reset restores initial state
- changing a parameter changes the trajectory

---

# 16. Books and Learning References

The app should contain a curated **Books** section.

Do not turn it into an indiscriminate affiliate catalog.

Each book entry may contain:

```ts
export interface BookReference {
  title: string;
  author: string;
  area: string[];
  level: "popular" | "beginner" | "undergraduate" | "advanced";
  description: string;
  relatedSimulationIds?: string[];
}
```

Possible sections:

- Intuition and popular science
- Mathematics foundations
- Classical mechanics
- Waves
- Electromagnetism
- Relativity
- Quantum physics
- Computational physics

Books should also appear contextually inside simulations.

Example:

```text
Standing Waves
--------------
Want to go deeper?

• Six Easy Pieces — Richard Feynman
• Vibrations and Waves — A. P. French
```

Keep descriptions original and concise.

---

# 17. Learning Content

Each simulation should eventually support three levels of explanation.

## Level 1 — Intuition

Explain the phenomenon in plain language.

## Level 2 — Mathematics

Show the relevant equations and variables.

## Level 3 — Deeper Notes

Discuss assumptions, derivation, limitations, numerical treatment, or related phenomena.

Avoid making every simulation page feel like a textbook chapter.

---

# 18. Instagram / Social Content Workflow

The simulation platform should double as a content-generation engine.

Do not create unrelated generic science content merely to maintain posting frequency.

For each meaningful simulation feature, generate potential content such as:

- 10–15 second visual clip
- 20–30 second explanatory Reel
- one surprising question
- one comparison
- one conceptual misconception
- one book recommendation
- one behind-the-scenes build post

Example for projectile motion:

```text
Feature:
Earth/Moon gravity preset

Reel:
"Same launch. Different world."

Sequence:
1. Show Earth launch.
2. Freeze at landing.
3. Switch to Moon.
4. Show much longer trajectory.
5. Overlay gravity values.
6. End with: Try it at VT Field Lab.
```

Prefer visual-first content.

---

# 19. Social Recording Mode

Design simulations so a future **Presentation / Recording Mode** can:

- hide sidebars
- hide nonessential controls
- enlarge the canvas
- emphasize key numerical labels
- select a clean background
- optionally show an explanatory title
- work well in 16:9 and 9:16 crops

Do not build a full video renderer into V1.

A browser screen recording is sufficient initially.

---

# 20. SEO and Sharing

Each simulation should eventually have:

- descriptive page title
- meta description
- Open Graph metadata
- canonical URL
- readable route

Example:

```text
/simulations/projectile-motion
/simulations/standing-waves
/simulations/double-pendulum
```

Avoid routes such as:

```text
/sim?id=42
```

when a meaningful route is possible.

---

# 21. Git Workflow

Prefer simple development practices.

Suggested branches:

```text
main
feature/projectile-motion
feature/books-page
fix/mobile-controls
```

Commit messages should describe meaningful changes.

Examples:

```text
feat: add projectile motion simulation
feat: add Earth Moon Mars gravity presets
fix: prevent animation loop after page unmount
test: verify projectile range calculation
```

Do not create elaborate GitFlow infrastructure for a one-person project.

---

# 22. Initial Cloudflare Deployment Checklist

Before the first deployment:

- [ ] production build succeeds locally
- [ ] no TypeScript errors
- [ ] no secrets in repository
- [ ] repository pushed to GitHub
- [ ] Cloudflare Pages connected to GitHub
- [ ] build command is correct
- [ ] output directory is `dist`
- [ ] deployment succeeds on `pages.dev`
- [ ] custom domain added
- [ ] HTTPS works
- [ ] root domain works
- [ ] `www` behavior is intentionally configured
- [ ] mobile rendering checked

---

# 23. When to Add a Backend

Do not add a backend merely because the project may need one someday.

Introduce one when there is a real feature such as:

- user accounts
- persistent favorites
- saved simulations
- shareable custom configurations
- comments
- server-side content management
- analytics requiring custom ingestion
- paid features
- collaboration

Potential later architecture:

```text
React / TypeScript
       |
       v
API
       |
       +---- authentication
       +---- database
       +---- saved simulations
```

A managed backend such as Supabase may be considered before maintaining a custom server.

If a Java/Spring Boot backend is eventually justified, keep it as a separately deployable service.

---

# 24. Security Rules

Always:

- keep API credentials outside source control
- use environment variables where appropriate
- assume all browser code is public
- validate user-controlled data
- sanitize rendered user content
- use HTTPS
- keep dependencies updated
- avoid unnecessary third-party scripts
- use minimal permissions for deployment integrations

Never place a private API key in `VITE_*` expecting it to remain secret. Vite client environment variables are bundled into browser code.

---

# 25. Initial Product Roadmap

## Milestone 0 — Domain and infrastructure

- acquire project domain
- create GitHub repository
- create React/TypeScript/Vite project
- configure Cloudflare Pages
- deploy empty shell publicly

## Milestone 1 — First useful product

- homepage
- simulation library navigation
- Projectile Motion
- Run/Pause/Reset
- parameter controls
- responsive canvas
- basic measurements
- one graph
- concise explanation
- About page
- basic Books page

Launch publicly after this milestone.

## Milestone 2 — Improve scientific experience

- Earth/Moon/Mars comparison
- equation panel
- velocity vectors
- better graphing
- shareable URLs for parameter values
- polished mobile layout

## Milestone 3 — Simulation library

Add:

1. Vector Addition
2. Simple Pendulum
3. Standing Waves
4. Wave Interference
5. Doppler Effect
6. Electric Field
7. Orbital Mechanics
8. Double Pendulum
9. Harmonic Oscillator
10. Particle in a Box

Order may change based on interest and implementation value.

## Milestone 4 — Content ecosystem

- Instagram launch/rebrand
- presentation mode
- repeatable Reel templates
- contextual book recommendations
- learning paths
- SEO landing pages

## Milestone 5 — Community/product features

Only if justified by usage:

- accounts
- favorites
- saved experiments
- shareable collections
- analytics
- feedback
- newsletter
- contribution system

---

# 26. Definition of Done for a Simulation

A simulation is considered ready for public release when:

- [ ] physical assumptions are documented
- [ ] equations are correct
- [ ] units are shown
- [ ] controls have valid ranges
- [ ] Run/Pause/Reset work reliably
- [ ] animation does not leak resources
- [ ] desktop layout works
- [ ] tablet/mobile layout is usable
- [ ] core math has tests
- [ ] loading is fast
- [ ] explanation is concise and useful
- [ ] at least one visual or numerical learning aid exists
- [ ] related learning/book material is connected when appropriate
- [ ] page has a stable shareable URL

---

# 27. Assistant Behavior When Using This Skill

When helping build VT Field Lab:

1. Start from the current repository state.
2. Determine the smallest useful next milestone.
3. Explain architectural decisions only when they materially matter.
4. Provide complete, runnable code rather than disconnected snippets when implementing a feature.
5. Keep files small and responsibilities clear.
6. Prefer exact commands.
7. Mention where each file belongs.
8. Preserve existing working behavior.
9. Avoid speculative infrastructure.
10. Test physics/math separately from rendering.
11. Identify scientific assumptions explicitly.
12. Keep the visual direction consistent with a professional scientific lab.
13. Consider whether a new feature can generate useful social content.
14. Consider whether a book/reference connection makes sense.
15. Treat deployment as part of the feature, not an afterthought.

When several implementation choices are valid, prefer the one that:

1. gets the feature working sooner,
2. keeps scientific code testable,
3. keeps hosting inexpensive,
4. minimizes future migration cost.

---

# 28. Immediate Starting Task

When beginning from an empty repository, the first implementation sequence should be:

```text
1. Create Vite React TypeScript project
2. Run locally
3. Add minimal VT Field Lab shell
4. Add application routing
5. Create Projectile Motion model
6. Add unit tests for model
7. Create Canvas renderer
8. Add Run/Pause/Reset
9. Add speed/angle/gravity controls
10. Add Earth/Moon/Mars presets
11. Add live measurements
12. Add one graph
13. Polish responsive layout
14. Push to GitHub
15. Deploy to Cloudflare Pages
16. Connect custom domain
```

Do not start by building authentication, databases, admin panels, or microservices.

---

# 29. Success Criterion for V1

The first public version succeeds when a person can visit the site, open **Projectile Motion**, modify physical parameters, press **Run**, observe a smooth and scientifically correct trajectory, understand what is happening, and feel motivated to explore another experiment.

Everything else is secondary until that experience works well.

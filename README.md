<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" />
</p>

# AI Daily Speech Maker

<!-- Badges -->
<p align="center">
  <img alt="Node" src="https://img.shields.io/badge/Node-20.x-339933?logo=node.js&logoColor=white" />
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-11-red?logo=nestjs" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma" />
  <img alt="License" src="https://img.shields.io/badge/License-UNLICENSED-lightgray" />
</p>

Automatically generates a concise daily stand-up speech for development teams using recorded activities and OpenAI.

## Table of Contents

- [Overview 🔍](#overview)
- [Key Features ✨](#key-features)
- [Tech Stack 🧱](#tech-stack)
- [Folder Structure 📂](#folder-structure-partial)
- [Speech Generation Flow 🔄](#speech-generation-flow)
- [Prompts & OpenAI 🧠](#prompts--openai)
- [Environment Configuration ⚙️](#environment-configuration)
- [Scripts 🛠️](#scripts)
- [Tests & Coverage ✅](#tests--coverage)
- [Code Quality 🧼](#code-quality)
- [Conventions 📏](#conventions)
- [Roadmap 🗺️](#roadmap)
- [Security 🔐](#security)
- [Troubleshooting 🩺](#troubleshooting)
- [License 📄](#license)
- [Author 👤](#author)

## Overview

The application gathers the day's activities (via Prisma) and builds a structured prompt for the OpenAI API to generate a short and objective summary, including whether there were impediments.

## Key Features

- Activity recording and retrieval
- Prompt generation in Portuguese (can be extended)
- Impediment identification string: "sem impedimentos" / "com impedimentos"
- Modular NestJS architecture
- Full TypeScript typings
- Unit + e2e tests (Jest)
- Prisma ORM with versioned migrations

## Tech Stack

NestJS, TypeScript, Prisma, PostgreSQL (Docker), OpenAI SDK, Jest, Supertest, ESLint, Prettier.

## Folder Structure (partial)

```
src/
  main.ts
  app.module.ts
  config/
    envs.config.ts
  modules/
    openai/
      prompts/
        activities.prompt.ts
    activity/
    user/
prisma/
  schema.prisma
  migrations/
test/
  app.e2e-spec.ts
```

## Speech Generation Flow

1. User registers activities.
2. Backend fetches activities for the current day.
3. activitiesPrompt serializes them and injects instructions (objective tone + impediment tag).
4. Prompt sent to OpenAI model.
5. Model returns speech text for stand-up.

## Prompts & OpenAI

Key file:
`src/modules/openai/prompts/activities.prompt.ts`
Generates:

- role: system
- Portuguese instructions
- Activities serialized via JSON.stringify
  Enforces a final tag: "sem impedimentos" or "com impedimentos".

## Environment Configuration

Create a `.env` from `.env.example` (if present):

```
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://user:pass@localhost:5432/ai_daily
NODE_ENV=development
PORT=3000
```

Align with `envs.config.ts`.

## Installation

```
pnpm install
pnpm run migrate
```

## Run

```
# development
pnpm run start:dev
# build
pnpm run build
# production
pnpm run start:prod
```

## Scripts

```
pnpm run test       # unit
pnpm run test:e2e   # e2e
pnpm run test:cov   # coverage
pnpm run lint       # lint + fix
pnpm run migrate    # prisma migrate dev + db push
```

## Tests & Coverage

- Jest for unit and e2e
- Coverage output in /coverage (HTML + lcov)
  Guidelines:
- File names: \*.spec.ts
- Avoid real network in unit tests
- Mock OpenAI interactions

## Code Quality

- ESLint + Prettier integrated
- Recommended CI steps: lint, test, test:cov (enforce threshold)

## Conventions

- Strict TypeScript
- Module folders lowercase (activity, openai)
- Standard NestJS layering (controllers, services)
- Suggested commit prefixes: feat / fix / chore / test / refactor / docs

## Roadmap

- [ ] Endpoint to directly generate speech
- [ ] Response caching per user/day
- [ ] Adjustable tone (formal/informal)
- [ ] Multi-language support
- [ ] Simple UI dashboard

## Security

- Do not log OPENAI_API_KEY
- Validate inputs (class-validator)
- Limit payload size (reduce prompt injection surface)

## Troubleshooting

| Issue             | Action                           |
| ----------------- | -------------------------------- |
| Migration fails   | Check DATABASE_URL               |
| OpenAI 401        | Verify OPENAI_API_KEY            |
| Hanging e2e tests | Ensure Prisma connections closed |

## License

UNLICENSED (adjust if needed).

## Author

Álvaro Souza

<hr />
<p align="center">Made with ⚡ + NestJS + OpenAI</p>

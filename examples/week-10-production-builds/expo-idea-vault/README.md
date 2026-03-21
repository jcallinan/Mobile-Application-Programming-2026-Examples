# Expo Idea Vault

Expo Idea Vault is a polished, local-first teaching example for week 10. The app demonstrates how to move from classroom-friendly development flows to production-minded build, backup, and release practices while keeping the codebase approachable for students.

## What this project demonstrates

- A feature-complete mobile workflow built with Expo and React Native.
- Local persistence using `expo-sqlite` for browser/device-friendly storage.
- Structured separation between screens, components, services, data, and utilities.
- Backup import/export using JSON so learners can reason about persistence and recovery.
- Development, preview, and production build workflows that align with EAS.

## Feature summary

Users can:

- start from a blank draft or choose a starter template
- refine an idea with title, problem, notes, market, revenue model, next step, and contact details
- rate ideas from 1 to 5
- save ideas locally
- duplicate an existing idea back into the draft form
- import a JSON backup
- export a JSON backup

## Documentation map

This project now includes a full documentation set in `docs/`:

1. [`docs/01-OVERVIEW.MD`](docs/01-OVERVIEW.MD) — architecture, responsibilities, and learning outcomes
2. [`docs/02-DEVELOPMENT-WORKFLOW.MD`](docs/02-DEVELOPMENT-WORKFLOW.MD) — install, run, debug, and classroom workflows
3. [`docs/03-RELEASE-OPERATIONS.MD`](docs/03-RELEASE-OPERATIONS.MD) — build, release, QA, and operational guidance
4. [`docs/04-DEMO-AND-SCREENSHOTS.MD`](docs/04-DEMO-AND-SCREENSHOTS.MD) — demo narrative, screenshots, and verification notes

## Quick start

```bash
npm install
npm run start
```

To open the browser-based preview used for classroom demos:

```bash
npx expo start --web
```

## Type-checking

```bash
npm run typecheck
```

## Build examples

### Local native debug builds

```bash
npx expo run:android
npx expo run:ios
```

### EAS preview build

```bash
eas build --platform android --profile preview
```

### EAS production builds

```bash
eas build --platform android --profile production
eas build --platform ios --profile production
```

## Key implementation areas

- `src/screens/IdeaVaultScreen.tsx` coordinates the user workflow.
- `src/components/` contains reusable UI sections.
- `src/services/ideaDatabase.ts` abstracts persistence.
- `src/services/ideaTransfer.ts` handles backup import/export.
- `src/utils/ideaBackup.ts` sanitizes and validates backup payloads.

## Best use in class

Use this app when you want students to compare:

- a clean Expo-first development experience
- a local-first data workflow
- the difference between debug and production build pipelines
- how modular folder structure improves maintainability in larger React Native projects

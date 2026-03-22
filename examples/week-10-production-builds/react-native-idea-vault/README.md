# React Native Idea Vault

React Native Idea Vault is the React Native CLI companion to the Expo example in week 10. It teaches the same local-first idea workflow while giving students a more native-toolchain-oriented project structure and release conversation.

## What this project demonstrates

- A multi-screen-scale React Native CLI application with modular source organization.
- Local persistence with SQLite through native libraries.
- JSON backup import/export patterns for restore and recovery scenarios.
- The distinction between Metro, debug builds, and release builds.
- How a product can stay maintainable even when it requires more native integration.

## Feature summary

Users can:

- pick a starter template or begin from scratch
- refine product notes, audience, moat, channel, pricing, and next experiment
- assign a 1-to-5 rating
- save ideas locally
- duplicate stored ideas back into the draft form
- export a JSON backup
- import a JSON backup

## Documentation map

This project now includes a full documentation set in `docs/`:

1. [`docs/01-OVERVIEW.MD`](docs/01-OVERVIEW.MD) — architecture, responsibilities, and release framing
2. [`docs/02-DEVELOPMENT-WORKFLOW.MD`](docs/02-DEVELOPMENT-WORKFLOW.MD) — install, Metro, native run, and validation guidance
3. [`docs/03-RELEASE-OPERATIONS.MD`](docs/03-RELEASE-OPERATIONS.MD) — Android/iOS release notes and operational checklist
4. [`docs/04-DEMO-AND-SCREENSHOTS.MD`](docs/04-DEMO-AND-SCREENSHOTS.MD) — screenshot evidence, demo script, and environment notes

## Quick start

```bash
npm install
npm start
```

This example now includes the native `android/` and `ios/` project folders required by the React Native CLI. You should run the native commands directly from this project root; `npx react-native eject` is not part of the React Native CLI workflow for this app.

The Android wrapper jar is downloaded automatically the first time you run `android/gradlew` or a React Native Android command that invokes it, so the repository can stay text-only.

To launch the native app after Metro is running:

```bash
npm run android
# or
npm run ios
```

## Type-checking

```bash
npm run typecheck
```

## Build examples

### Debug

```bash
npx react-native run-android
npx react-native run-ios
```

### Android release

```bash
cd android
./gradlew assembleRelease
./gradlew bundleRelease
```

### iOS release

```bash
npx react-native build-ios --mode Release
```

## Key implementation areas

- `src/screens/IdeaLabScreen.tsx` coordinates the workflow.
- `src/components/` contains the card-based UI building blocks.
- `src/services/ideaDatabase.ts` handles SQLite reads and writes.
- `src/services/ideaTransfer.ts` handles JSON import/export operations.
- `src/utils/ideaBackup.ts` validates imported backup content.


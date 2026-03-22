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

1. [`docs/OVERVIEW.MD`](docs/OVERVIEW.MD) — architecture, responsibilities, and release framing
2. [`docs/RELEASE-OPERATIONS.MD`](docs/RELEASE-OPERATIONS.MD) — Android/iOS release notes and operational checklist

## Quick start

```bash
npm install
npm start
```

## Android environment setup

Before running Android builds, point React Native and Gradle at a valid Android SDK installation. `ANDROID_SDK_ROOT` must reference an existing SDK directory or Gradle will stop before Kotlin compilation starts.

### Windows (PowerShell)

```powershell
$env:ANDROID_SDK_ROOT = "$env:LOCALAPPDATA\Android\Sdk"
$env:PATH = "$env:ANDROID_SDK_ROOT\platform-tools;$env:ANDROID_SDK_ROOT\emulator;$env:PATH"
```

To persist it for future shells, add the same value in **System Properties → Environment Variables** or run:

```powershell
setx ANDROID_SDK_ROOT "%LOCALAPPDATA%\Android\Sdk"
```

### macOS / Linux

```bash
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export PATH="$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$PATH"
```

You can also create `android/local.properties` with `sdk.dir=/absolute/path/to/Android/Sdk`, but keeping `ANDROID_SDK_ROOT` set is the most reliable option for React Native CLI tools.

## Running Metro and Android together

If port `8081` is already in use, either stop the existing Metro process or pick a different port consistently for both commands:

```bash
npm start -- --port 8082
npm run android -- --port 8082
```

If Metro is already running on the port you want, you can also skip starting a second packager process:

```bash
npm run android -- --no-packager --port 8081
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


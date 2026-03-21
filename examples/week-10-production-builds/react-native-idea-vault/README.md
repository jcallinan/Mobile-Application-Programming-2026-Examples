# React Native Idea Vault

This React Native CLI example mirrors the Expo app's functionality while using a distinct visual design and a more professional folder structure. The project separates screen composition, reusable components, starter data, SQLite access, and backup logic inside `src/`.

## Project structure

- `App.tsx`: small app entry point.
- `src/screens/`: screen-level composition.
- `src/components/`: reusable UI building blocks.
- `src/data/`: starter templates and empty draft state.
- `src/services/`: local SQLite and import/export services.
- `src/utils/`: backup parsing, sanitizing, and duplication helpers.

## Features

- Store ideas in a local SQLite database with:
  - title
  - notes
  - rating from 1 to 5
  - audience
  - competitive moat
  - acquisition channel
  - pricing model
  - next experiment
- Add data several ways:
  - manual form entry
  - starter templates
  - duplicate an existing idea back into the form
  - import a JSON backup
- Export the current database as JSON.
- Show a small `React Native` label in the interface.

## Local storage/import/export verification notes

The local-data workflow is separated into focused modules:

- `src/services/ideaDatabase.ts` manages SQLite table creation, inserts, loads, deletes, and full replacement on import.
- `src/services/ideaTransfer.ts` handles file picker import and JSON export.
- `src/utils/ideaBackup.ts` sanitizes backups and ensures the imported file is an array before data replacement.

## Install

```bash
npm install
```

## Run Metro

```bash
npm start
```

## Debug build examples

### Android debug build

```bash
npx react-native run-android
cd android && ./gradlew assembleDebug
```

### iOS debug build

```bash
npx react-native run-ios
```

## Production build examples

### Android release APK / AAB

```bash
cd android
./gradlew assembleRelease
./gradlew bundleRelease
```

### iOS release build

```bash
npx react-native build-ios --mode Release
```

## Import/export format

```json
[
  {
    "title": "Meal-prep delivery for finals week",
    "notes": "Offer focused exam-week meal bundles.",
    "rating": 5,
    "audience": "College students",
    "moat": "Fast campus delivery",
    "channel": "Instagram reels",
    "pricing": "$39 weekly pack",
    "nextExperiment": "Waitlist landing page"
  }
]
```

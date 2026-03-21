# Expo Idea Vault

This Expo app is a more professional example of a local-first product idea tracker. It uses a `src/` folder, separates the screen, components, data helpers, SQLite service, and import/export service, and is designed to show students how an app can evolve from development to production.

## Project structure

- `App.tsx`: small app entry point.
- `src/screens/`: screen-level composition.
- `src/components/`: reusable UI building blocks.
- `src/data/`: starter templates and empty draft state.
- `src/services/`: local database and import/export logic.
- `src/utils/`: backup parsing, sanitizing, and duplication helpers.

## Features

- Store ideas in a local SQLite database with:
  - title
  - problem
This Expo app helps a student or founder track potential business ideas in a local SQLite database.

## Features

- Create idea records with:
  - title
  - notes
  - rating from 1 to 5
  - target market
  - revenue model
  - next validation step
  - best contact or lead
- Add data several ways:
  - manual form entry
  - quick-add templates
  - duplicate an existing saved idea back into the draft form
  - import a JSON backup
- Export the current database as JSON.
- Show a small `Expo` label in the interface.

## Local storage/import/export verification notes

The app's storage workflow is organized into dedicated services:

- `src/services/ideaDatabase.ts` initializes and writes to the local SQLite database.
- `src/services/ideaTransfer.ts` imports JSON backups and exports JSON backups.
- `src/utils/ideaBackup.ts` sanitizes records and verifies the backup shape before replacing the database.
- Persist data locally with `expo-sqlite`.
- Import a JSON backup into the database.
- Export the current database to a JSON file.
- Show a small `Expo` tag in the interface so students can quickly identify the stack.

## Install

```bash
npm install
```

## Run in development

```bash
npm run start
```

Open the app in Expo Go or a simulator.

## Debug build examples

### Android debug flow

```bash
npx expo run:android
```

This generates the native Android project locally and installs a debug build.

### iOS debug flow

```bash
npx expo run:ios
```

This generates the native iOS project locally and runs a debug build in the simulator.

### Internal preview build with EAS

```bash
eas build --platform android --profile preview
```

That profile is defined in `eas.json` and is useful for a development client/internal test build.

## Production build examples

### Android production build

```bash
eas build --platform android --profile production
```

### iOS production build

```bash
eas build --platform ios --profile production
```

### Submit production build

```bash
eas submit --platform android --profile production
eas submit --platform ios --profile production
```

## Import/export format

The import/export feature uses a JSON array of idea objects. Example:

```json
[
  {
    "title": "Campus laundry pickup",
    "problem": "Students dislike carrying laundry across campus.",
    "notes": "Offer same-day pickup in residence halls.",
    "rating": 4,
    "market": "Dorm students",
    "revenueModel": "Per order fee",
    "nextStep": "Survey one dorm floor",
    "contact": "housing@example.edu"
  }
]
```

## Production build talking points

- Expo reduces native setup friction.
- EAS profiles make preview and production builds easy to explain.
- Import/export is useful for backups before releasing a production app.

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

## Install

```bash
npm install
```

## Run in development

```bash
npm run start
```

## Debug build examples

### Android debug flow

```bash
npx expo run:android
```

### iOS debug flow

```bash
npx expo run:ios
```

### Internal preview build with EAS

```bash
eas build --platform android --profile preview
```

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

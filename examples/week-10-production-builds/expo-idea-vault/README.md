# Expo Idea Vault

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

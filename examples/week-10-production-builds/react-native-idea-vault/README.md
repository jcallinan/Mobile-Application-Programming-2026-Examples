# React Native Idea Vault

This React Native CLI project solves the same business-idea problem as the Expo version, but with a brighter card-based interface so students can clearly compare the two apps.

## Features

- Store ideas in a local SQLite database.
- Track:
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

You can also open `ios/ReactNativeIdeaVault.xcworkspace` in Xcode and run the Debug scheme.

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

Or archive from Xcode using the Release configuration.

## Release checklist examples

- Add a signing key for Android release builds.
- Configure release signing in `android/app/build.gradle`.
- Configure iOS signing/capabilities in Xcode.
- Test import/export on a physical device before shipping.
- Verify that the JSON backup can be restored after reinstalling the app.

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
    "nextExperiment": "Waitlist landing page"
  }
]
```

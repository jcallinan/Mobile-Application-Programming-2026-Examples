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
  - next experiment
- Import a JSON backup into SQLite.
- Export the current database to a JSON file.
- Show a small `React Native` label in the UI.

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

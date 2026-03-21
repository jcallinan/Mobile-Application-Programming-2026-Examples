# Week 10: Production Builds

This week includes two mobile projects that solve the same problem in two different ecosystems:

- `expo-idea-vault`: an Expo app that stores potential business ideas in a local SQLite database and can import/export the database as JSON.
- `react-native-idea-vault`: a React Native CLI app with the same idea-tracking workflow, styled differently so students can compare both approaches.

## Learning goals

- Build and test a **debug** version of a mobile app.
- Prepare a **production/release** build.
- Compare what Expo and React Native CLI do differently.
- Practice persisting app data locally.
- Practice importing and exporting local app data.

## Projects

### 1. Expo project

Location: `examples/week-10-production-builds/expo-idea-vault`

Highlights:

- Uses `expo-sqlite` for local persistence.
- Uses `expo-document-picker`, `expo-file-system`, and `expo-sharing` for import/export.
- Includes `eas.json` profiles for preview and production builds.
- Shows a small `Expo` badge in the UI.

### 2. React Native project

Location: `examples/week-10-production-builds/react-native-idea-vault`

Highlights:

- Uses `react-native-sqlite-storage` for local persistence.
- Uses `react-native-document-picker`, `react-native-fs`, and `react-native-share` for import/export.
- Includes debug and release build commands for Android and iOS.
- Shows a small `React Native` badge in the UI.

## Suggested class discussion

- When is Expo the faster path?
- When do you need the flexibility of React Native CLI?
- What extra work is required for release builds?
- Why is import/export helpful for a small local-first app?

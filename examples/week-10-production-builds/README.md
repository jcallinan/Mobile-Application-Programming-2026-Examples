# Week 10: Production Builds

This week now includes two polished mobile examples that solve the same problem in two different ecosystems while using a more professional project structure:

- `expo-idea-vault`: an Expo app with `src/screens`, `src/components`, SQLite persistence, JSON import/export, and EAS build examples.
- `react-native-idea-vault`: a React Native CLI app with the same core workflow, a distinct UI, SQLite persistence, JSON import/export, and native debug/release build examples.

## Learning goals

- Build and test a **debug** version of a mobile app.
- Prepare a **production/release** build.
- Compare Expo and React Native CLI project organization.
- Practice persisting app data locally.
- Practice importing and exporting local app data.
- Break a larger app into reusable components and services.

## App requirements covered by both projects

Each app now lets students add idea data several ways:

- manual form entry
- starter templates
- duplicate an existing saved idea back into the draft form
- import a JSON backup

Each app also supports:

- local SQLite storage
- JSON export
- stack label in the UI (`Expo` or `React Native`)
- documented debug and production build commands

## Suggested class discussion

- How does a `src/components` structure improve maintainability?
- Which responsibilities belong in UI components vs. services?
- When is Expo the faster path?
- When do you need the flexibility of React Native CLI?
- What extra work is required for release builds?

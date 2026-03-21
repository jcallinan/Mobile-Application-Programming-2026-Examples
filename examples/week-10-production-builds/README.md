# Week 10: Production Builds

Week 10 now includes two polished mobile examples that solve the same local-first idea-tracking problem in different ecosystems while modeling a more professional project structure and release conversation.

## Included projects

- `expo-idea-vault` — an Expo app with modular source structure, local persistence, JSON import/export, and EAS build examples
- `react-native-idea-vault` — a React Native CLI app with the same core workflow, a distinct UI, SQLite persistence, JSON import/export, and native debug/release guidance

## Shared learning goals

Both projects are intended to help students:

- build and test a debug version of a mobile app
- understand the difference between development and production build workflows
- compare Expo and React Native CLI project structure
- practice local persistence with a realistic app workflow
- work with JSON import/export as a backup and restore mechanism
- reason about how larger mobile apps benefit from modular organization

## Shared product requirements

Each app supports:

- manual form entry
- starter templates
- duplication of saved ideas back into the draft form
- import of a JSON backup
- export of a JSON backup
- local persistence
- a platform badge in the UI so students can identify the stack quickly

## Documentation added in this update

Each project now includes a multi-file documentation set covering:

- architecture overview
- development workflow
- release operations
- screenshots and demo notes

Open the project-specific documentation from these entry points:

### Expo project

Location: `examples/week-10-production-builds/expo-idea-vault`

- [`expo-idea-vault/README.md`](expo-idea-vault/README.md)
- [`expo-idea-vault/docs/01-OVERVIEW.MD`](expo-idea-vault/docs/01-OVERVIEW.MD)
- [`expo-idea-vault/docs/02-DEVELOPMENT-WORKFLOW.MD`](expo-idea-vault/docs/02-DEVELOPMENT-WORKFLOW.MD)
- [`expo-idea-vault/docs/03-RELEASE-OPERATIONS.MD`](expo-idea-vault/docs/03-RELEASE-OPERATIONS.MD)
- [`expo-idea-vault/docs/04-DEMO-AND-SCREENSHOTS.MD`](expo-idea-vault/docs/04-DEMO-AND-SCREENSHOTS.MD)

### React Native project

Location: `examples/week-10-production-builds/react-native-idea-vault`

- [`react-native-idea-vault/README.md`](react-native-idea-vault/README.md)
- [`react-native-idea-vault/docs/01-OVERVIEW.MD`](react-native-idea-vault/docs/01-OVERVIEW.MD)
- [`react-native-idea-vault/docs/02-DEVELOPMENT-WORKFLOW.MD`](react-native-idea-vault/docs/02-DEVELOPMENT-WORKFLOW.MD)
- [`react-native-idea-vault/docs/03-RELEASE-OPERATIONS.MD`](react-native-idea-vault/docs/03-RELEASE-OPERATIONS.MD)
- [`react-native-idea-vault/docs/04-DEMO-AND-SCREENSHOTS.MD`](react-native-idea-vault/docs/04-DEMO-AND-SCREENSHOTS.MD)

## Suggested class discussion prompts

- How does a `src/components` structure improve maintainability?
- Which responsibilities belong in UI components versus services?
- When is Expo the faster path?
- When do you need the flexibility of React Native CLI?
- What extra work is required for release builds?
- Why are import/export flows useful even for small local-first apps?
- Which app would you choose for a classroom prototype versus a native-heavy product?

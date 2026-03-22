# React Native Idea Vault Development Workflow

## Install dependencies

```bash
npm install
```

## Start Metro

```bash
npm start
```

This starts the JavaScript bundler only. It does **not** mean the full application is rendered on screen yet.

That distinction is important in class because learners often assume the Metro URL is the app itself. In React Native CLI, Metro is the development server that feeds JavaScript to a native runtime.

## Launch the app on a target

This repository already contains the native `android/` and `ios/` folders expected by the React Native CLI, so no extra eject or prebuild step is needed.

On Android, the Gradle wrapper jar is fetched automatically on first use if it is not already present locally.

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

If you see `Android project not found`, confirm you are running the command from this directory and that the native folders were checked out with the project.

## Type-checking

```bash
npm run typecheck
```

## Recommended developer routine

1. Run `npm run typecheck`.
2. Start Metro with `npm start`.
3. Launch the preferred native target.
4. Verify template loading, draft editing, local save behavior, duplication, and backup flows.
5. Repeat the core workflow after any change to services or data shaping logic.

## Manual verification checklist

### Core workflow

- confirm starter templates load into the draft
- confirm the rating selector updates visual state
- confirm a local save adds a new card to the stored list
- confirm duplicate-to-draft still works from saved cards
- confirm delete removes the selected record cleanly

### Backup workflow

- confirm export writes a JSON file without crashing
- confirm import can read a valid backup
- confirm malformed import content produces a clear failure path
- confirm replaced data reloads correctly after import

### Teaching/demo readiness

- confirm the React Native badge stays visible
- confirm the card layout remains readable at projected sizes
- confirm the screen still tells a clear story even before any new saves are made

## Classroom framing


- Metro is necessary infrastructure.
- Native runtime launch is a separate step.
- Release builds require more explicit native ownership than the Expo counterpart.

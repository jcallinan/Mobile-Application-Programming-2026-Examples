# Expo Idea Vault Overview

## Purpose

Expo Idea Vault is a local-first mobile example built for teaching production-minded application structure without introducing unnecessary complexity. It gives students a realistic feature set while keeping the entry point, screen orchestration, and service boundaries easy to inspect.

## Primary learning outcomes

### Product outcomes

- persists meaningful user data locally
- restores that data from a portable backup format
- separates interface concerns from persistence and transfer logic
- remains understandable as it grows beyond a single-file demo

## Architectural summary

### Entry point

`App.tsx` only mounts `IdeaVaultScreen`, which makes the startup path easy to teach and test.

### Screen layer

`src/screens/IdeaVaultScreen.tsx` is the orchestration layer. It:

- initializes storage
- loads ideas into screen state
- computes summary metrics such as average rating
- wires form, template strip, and saved-idea list together
- coordinates import/export and user feedback

### Component layer

`src/components/` contains focused building blocks:

- `ScreenHeader` communicates the current data snapshot
- `TemplateStrip` speeds up first-run exploration
- `IdeaForm` handles drafting and backup actions
- `IdeaList` and `IdeaCard` present persisted records

This separation makes it easy to discuss responsibility boundaries and refactoring strategy.

### Service layer

`src/services/ideaDatabase.ts` owns storage concerns. In the browser preview it uses web-safe persistence, while the Expo environment still models the same database-oriented workflow students would use on device.

`src/services/ideaTransfer.ts` owns backup movement. That makes file-system and document-picker concerns independent from the screen UI.

### Utility layer

`src/utils/ideaBackup.ts` centralizes sanitization and payload validation. This is important pedagogically because students can see that import/export should never trust raw input blindly.

## User journey

A typical learner demo follows this sequence:

1. Open the app and review the seeded templates.
2. Load a template to show how scaffolding accelerates ideation.
3. Refine the draft with problem framing and validation details.
4. Save the record locally.
5. Duplicate a saved record back into the draft.
6. Export the idea set as JSON.
7. Re-import data to demonstrate continuity and recovery.

## Why this example is useful for week 10

This project is a strong bridge between introductory React Native work and professional build thinking. It introduces:

- modular architecture
- persistent storage
- file import/export
- environment-aware workflows
- release-oriented documentation

In other words, it feels more like a maintainable product and less like a one-off lab exercise.

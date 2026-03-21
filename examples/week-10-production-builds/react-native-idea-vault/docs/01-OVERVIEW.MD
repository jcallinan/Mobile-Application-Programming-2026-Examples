# React Native Idea Vault Overview

## Purpose

React Native Idea Vault exists to show the same product workflow as the Expo version while exposing students to a more explicit native toolchain. It is intentionally similar in feature set so class discussions can focus on engineering tradeoffs instead of product differences alone.

## Primary learning outcomes

Students should be able to discuss:

- why React Native CLI gives more direct access to native build tooling
- how SQLite-backed persistence fits into a structured application
- why Metro is necessary but not equivalent to a rendered application
- how to separate UI composition from native storage and file-transfer concerns

## Architectural summary

### Entry point

`App.tsx` mounts `IdeaLabScreen`, keeping the startup path compact and readable.

### Screen layer

`src/screens/IdeaLabScreen.tsx` owns the product flow. It:

- initializes the database
- refreshes ideas into component state
- calculates a top-rated summary metric
- routes user actions into save, delete, import, export, and duplicate workflows

### Component layer

The UI is intentionally brighter and more card-driven than the Expo version. This makes it easy to compare stack choices while still recognizing the same underlying responsibilities:

- header for high-level state
- templates for rapid starting points
- draft form for editing
- idea list for persisted records

### Service layer

`src/services/ideaDatabase.ts` handles SQLite creation, reads, writes, deletes, and replacement. This is the clearest place to discuss native persistence APIs and callback-driven flows.

`src/services/ideaTransfer.ts` handles document picking, file access, and sharing. That separation keeps native integration concerns out of the presentational components.

### Utility layer

`src/utils/ideaBackup.ts` sanitizes user-facing records and validates imported data. This demonstrates that even small apps benefit from centralized data hygiene rules.

## Product flow

A strong demo sequence is:

1. inspect seeded records
2. load a template into the draft form
3. adjust title or positioning details
4. save locally
5. export the resulting data
6. discuss how the same workflow would be validated before release

## Why this example matters

This project helps students see that professional mobile work is not only about UI code. It also includes:

- native dependency management
- Metro coordination
- database lifecycle concerns
- release-specific build commands
- clearer operational responsibilities during packaging and QA

# Expo Idea Vault Development Workflow

## Local setup

Install dependencies from the project directory:

```bash
npm install
```

Validate the TypeScript surface before class or before a release review:

```bash
npm run typecheck
```

## Recommended development flows

### Fastest classroom demo: Expo web

Use the browser preview when the goal is to discuss the UI, workflow, and architecture without depending on a mobile simulator.

```bash
npx expo start --web
```

This path is ideal for:

- projector demos
- quick walkthroughs of the form and template flow
- screen capture during documentation work
- verifying layout changes rapidly

### Device-oriented development

For a more native teaching experience, start Expo and open the project in Expo Go or a simulator.

```bash
npm run start
```

### Local native debug builds

When you want students to see how Expo can generate native projects locally, use:

```bash
npx expo run:android
npx expo run:ios
```

## Suggested developer routine

1. Run `npm run typecheck`.
2. Start the app with `npx expo start --web` for rapid feedback.
3. Verify form editing, template loading, duplication, and local save behavior.
4. Confirm backup export still succeeds after UI changes.
5. Before release teaching, review the EAS profiles in `eas.json`.

## Manual verification checklist

### Data entry and editing

- confirm a template loads into the draft form
- confirm the rating selector updates correctly
- confirm the reset action clears the draft
- confirm a saved item appears in the list after persistence

### Persistence and recovery

- confirm stored items still exist after reload in the web preview
- confirm export produces a JSON file
- confirm import rejects malformed content with a clear error
- confirm duplication pushes a saved idea back into the draft for editing

### Presentation

- confirm the header metrics update after new saves
- confirm the `Expo` badge remains visible
- confirm the dark theme remains legible on large classroom screens

## Teaching notes

This project is especially effective when you explain the tradeoff between convenience and control:

- Expo accelerates setup and demo velocity.
- Production conversations still matter even in a managed workflow.
- Services and utilities help teams scale features without filling the screen component with implementation details.

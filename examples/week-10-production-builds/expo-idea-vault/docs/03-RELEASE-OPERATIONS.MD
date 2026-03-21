# Expo Idea Vault Release Operations

## Release objective

The goal of this project is not only to run in development, but also to teach how a classroom prototype evolves into something that can be previewed, tested, and packaged professionally.

## Build profiles

The app includes EAS profile examples in `eas.json`. Those profiles support two common release conversations:

- **preview builds** for internal validation and instructor testing
- **production builds** for formal distribution-ready packaging

## Recommended build commands

### Preview / internal testing

```bash
eas build --platform android --profile preview
```

Use preview builds when you need:

- a shareable build for a teaching assistant or stakeholder
- a safer checkpoint before a production release
- parity between what students see and what a packaged app does

### Production builds

```bash
eas build --platform android --profile production
eas build --platform ios --profile production
```

## Pre-release quality checklist

Before cutting a release, verify:

- the draft form can save a new idea successfully
- exported JSON can be opened and inspected
- imported JSON restores expected records
- the list ordering still emphasizes stronger ideas first
- all key copy is readable in both simulator and browser preview
- app metadata in `app.json` still matches the intended release identity

## Operational risks to discuss with students

### Data integrity risk

Import flows can overwrite the current data set. That means teams should treat backup validation and user messaging as product responsibilities, not afterthoughts.

### Environment drift risk

A browser preview is helpful, but native packaging remains a different environment. Release verification should always include at least one native path.

### Build reproducibility risk

Production builds should use documented commands and stable package versions. Ad hoc release steps create avoidable confusion during grading, demos, or handoff.

## Suggested release talk track

When presenting this project, explain the release mindset in four stages:

1. **Develop** quickly with Expo web or Expo Go.
2. **Validate** the full workflow with local data and backup files.
3. **Package** the app using the correct EAS build profile.
4. **Review** what changed between a development run and a production build.

This sequence helps students connect architecture decisions to real deployment practice.

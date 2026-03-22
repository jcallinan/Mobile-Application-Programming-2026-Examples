# React Native Idea Vault Release Operations

## Release objective

This project is designed to support a serious discussion about what changes when a mobile app moves beyond day-to-day development and into reproducible packaging, validation, and release.

## Debug vs. release

Because this is a React Native CLI example, the native Android and iOS projects live in-repo and are part of the release surface area.

### Debug builds

Use debug builds when you need quick developer feedback and easier troubleshooting:

```bash
npx react-native run-android
npx react-native run-ios
```

### Android release artifacts

```bash
cd android
./gradlew assembleRelease
./gradlew bundleRelease
```

### iOS release builds

```bash
npx react-native build-ios --mode Release
```

## Pre-release checklist

Before creating a release artifact, verify:

- the database initializes correctly on a clean install
- seeded records render correctly
- new records persist after restart
- backup export produces usable JSON
- backup import restores expected ideas
- signing and environment configuration are set for the intended platform

## Operational risks to discuss

### Native dependency risk

Third-party native modules can introduce versioning, linking, or platform-specific behavior differences. That makes release validation more important than in a browser-based preview alone.

### Data replacement risk

Import flows that replace the current data set should be treated carefully. The product should communicate clearly when existing local data is about to be overwritten.

### Environment mismatch risk

A clean Metro startup is valuable, but it does not prove that Android or iOS release artifacts will package or behave correctly. Release confidence comes from native build verification.

## Suggested release talk track

1. Start Metro and explain what it does.
2. Run a debug build to show the iterative development loop.
3. Move to Gradle or Xcode release commands.
4. Explain signing, validation, and backup verification.
5. Compare the extra native responsibility with the Expo example.

## Instructor note

This app is most effective when positioned as a contrast case: the product workflow remains familiar, but the operational path to a real release is more hands-on and explicit.

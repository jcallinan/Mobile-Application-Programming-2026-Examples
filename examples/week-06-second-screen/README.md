# Week 6: Modern Navigation + Multi-Screen Apps (Expo, Feb 2026)

This folder replaces the old state-switching demo with a realistic, modern
React Native navigation architecture.

## What this example covers

- Root stack + bottom tabs + nested stacks
- Typed route params (TypeScript)
- Modal presentation from the root navigator
- Deep-link configuration for nested screens
- Shared state with Context across multiple screens
- Master-detail flow (`ShoppingList` -> `ShoppingItemDetails`)

## Run with current tooling

```bash
npx create-expo-app@latest week-06-navigation
cd week-06-navigation
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
```

Then copy this folder's files into the generated Expo project root.

Start the app:

```bash
npx expo start
```

## Suggested learning walkthrough

1. Start from `App.tsx` and see how providers wrap navigation.
2. Inspect `src/navigation/RootNavigator.tsx` for nested stacks + tabs.
3. Follow route typing in `src/types/navigation.ts`.
4. Observe shared context updates between list and details screens.
5. Test deep links:
   - `myapp://shopping`
   - `myapp://shopping/item/1`
   - `myapp://about`

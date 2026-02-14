# Week 6: Modern Navigation + Multi-Screen Apps

This folder replaces the old state-switching demo with a realistic, modern
React Native navigation architecture.

## What this example covers

- Root stack + bottom tabs + nested stacks
- Typed route params (TypeScript)
- Modal presentation from the root navigator
- Deep-link configuration for nested screens
- Shared state with Context across multiple screens
- Master-detail flow (`ShoppingList` -> `ShoppingItemDetails`)

## Run this example

From this folder, install dependencies and start Expo:

```bash
npm install
npm run start
```

## Walkthrough

1. Start from `App.tsx` and see how providers wrap navigation.
2. Inspect `src/navigation/RootNavigator.tsx` for nested stacks + tabs.
3. Follow route typing in `src/types/navigation.ts`.
4. Observe shared context updates between list and details screens.
5. Test deep links:
   - `myapp://shopping`
   - `myapp://shopping/item/1`
   - `myapp://about`

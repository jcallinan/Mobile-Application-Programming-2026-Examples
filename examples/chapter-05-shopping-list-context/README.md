# Chapter 5: Shopping List with Context + Hooks

This example shows a shopping list powered by React Context + hooks, updated
for current tooling.

## Run it quickly with modern React tooling

```bash
npx create-vite@latest shopping-list-context -- --template react
cd shopping-list-context
npm install
```

Then copy this folder's `src/*` files into the generated project's `src/`.

Finally run:

```bash
npm run dev
```

## What this example demonstrates

- Context provider for shared list state (`ShoppingListProvider`)
- Custom hook with safety guard (`useShoppingList`)
- Derived UI from state with add + toggle interactions
- Memoized context value to avoid unnecessary re-renders

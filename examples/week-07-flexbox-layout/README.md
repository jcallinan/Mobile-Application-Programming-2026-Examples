# Week 7: Improve Layout with Flexbox

This is now a **complete Expo + TypeScript project** focused on Flexbox layout patterns.
It includes reusable components, multiple screens, and examples of API calls you can
reuse for Assignment 6 and later projects.

## Included examples

### 1) Dashboard example
- Flex rows with different ratios (`flex: 2` and `flex: 1`)
- Aligned profile header (`alignItems`, `justifyContent`, `gap`)
- Card-style spacing and grouping

### 2) Book search + detail example (Open Library API)
- Search books with `fetch` from a free public API
- Display list results with reusable `BookListItem`
- Navigate to a detail screen and fetch additional metadata
- Demonstrates a simple master/detail flow without extra navigation libraries

### 3) Login API example (ReqRes free API)
- Demo login form using `https://reqres.in/api/login`
- Shows loading, error, and success token states
- Good reference for handling `POST` requests in React Native

## Easy navigation between examples

The app includes a reusable **tab-style button bar** (`ExampleTabBar`) at the top:
- Dashboard
- Book Search
- Login

This makes it easy to quickly switch examples during demos or class discussions.

## Project structure

```text
week-07-flexbox-layout/
├── App.tsx
├── app.json
├── babel.config.js
├── package.json
├── tsconfig.json
└── src/
    ├── components/
    │   ├── BookListItem.tsx
    │   ├── ExampleTabBar.tsx
    │   ├── ScreenContainer.tsx
    │   └── SectionTitle.tsx
    ├── screens/
    │   ├── BookDetailScreen.tsx
    │   ├── BookSearchScreen.tsx
    │   ├── DashboardScreen.tsx
    │   └── LoginExampleScreen.tsx
    └── types/
        └── index.ts
```

## Flexbox properties demonstrated

- `flexDirection`
- `flex`
- `flexWrap`
- `alignItems`
- `justifyContent`
- `gap`

## Run locally

From this directory (`examples/week-07-flexbox-layout`):

```bash
npm install
npm run start
```

You can then open Android, iOS, Expo Go, or Web from the Expo dev tools.

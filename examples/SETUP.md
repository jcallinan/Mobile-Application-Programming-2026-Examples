# Example setup (latest stable React + Expo)

Use the commands below to create fresh projects with the latest stable tooling,
then copy the example files from this repo into the generated projects.

## React web examples (React 18 via Vite)

```bash
npm create vite@latest my-react-example -- --template react
cd my-react-example
npm install
npm run dev
```

Copy the example `App.jsx` (and any supporting components) into the Vite project
`src/` folder.

## Expo / React Native examples (latest Expo SDK)

```bash
npx create-expo-app@latest my-expo-example
cd my-expo-example
npx expo start
```

Replace the generated `App.tsx` with the example `App.tsx` from this repo.

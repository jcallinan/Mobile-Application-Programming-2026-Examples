# Week 04 – State + Interaction: Lux Media Encyclopedia

This example replaces the original Week 04 materials with a single multi-tier Expo app. The UI layer captures media metadata, while a lightweight SQLite database stores the catalog locally. The project uses a simple structure with a `components/` directory to keep UI concerns modular.

## Highlights

- **Multi-tier architecture**: UI components → data access (SQLite) → persistent storage.
- **Reusable components**: `MediaForm`, `FilterBar`, and `MediaList` live in `/components`.
- **Persistence**: `expo-sqlite` stores entries on-device. The web build falls back to `localStorage`.
- **Feature set**: create, filter, favorite, rate, open links, and delete media entries.

## Concept

Imagine a “lux media encyclopedia” for a single user. Each entry captures a title, a link, a category, notes, a rating, and a favorite flag. Entries are stored in an on-device SQLite database so the list survives restarts.

## Running the Example

```bash
cd examples/week-04-state-interaction
npm install
npx expo start
```

Make sure `expo-sqlite` is available in your Expo SDK (it ships with the default Expo Go client).
On web, Expo does not provide SQLite, so the example automatically switches to `localStorage`.

## Suggested Exercises

1. Add a rating summary chart or average rating per category.
2. Add a “recently added” filter (last 7 days).
3. Create a separate `categories` table and enforce relational data.
4. Add a detail screen that shows the full notes and metadata.

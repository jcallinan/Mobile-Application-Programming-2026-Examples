# 🐾 CampusQuiz — University of Pittsburgh at Bradford

A React Native / Expo trivia quiz app built in the official Pitt Bradford brand colors
(**Navy #182854 · Gold #9A936B · Yellow #FFD700**).

Designed as a Week 11 demo for the Mobile App Development course at Pitt Bradford,
showcasing local SQLite authentication, animated UI, and a store-ready submission workflow.

---

## 📱 Features

| Feature | Details |
|---------|---------|
| **Local Auth** | SQLite login/register — no backend required |
| **TestFlight Ready** | Pre-seeded demo account: `testflight` / `demo1234` |
| **5 Quiz Categories** | Pitt Bradford, Computer Science, PA History, Science, General |
| **50 Questions** | 10 per category, randomly shuffled each game |
| **Timed Questions** | 15-second countdown per question with color-coded timer bar |
| **Animations** | Entrance stagger, press feedback, correct/wrong shake, score ring |
| **Leaderboard** | SQLite-backed personal high scores per category |
| **Fun Facts** | Educational fact revealed after every answer |

---

## 🗂 Project Structure

```
CampusQuiz/
├── app/                      # Expo Router screens (file = route)
│   ├── _layout.tsx           # Root stack navigator + DB init
│   ├── index.tsx             # Login / Register screen
│   ├── categories.tsx        # Category picker with personal bests
│   ├── quiz.tsx              # Gameplay screen (timer + answer reveal)
│   ├── score.tsx             # Results + animated score ring
│   └── leaderboard.tsx       # Top scores across all users
│
├── components/               # Reusable UI components
│   ├── PittButton.tsx        # Animated press button (4 variants)
│   ├── PittHeader.tsx        # Branded top header for all screens
│   ├── CategoryCard.tsx      # Pressable category tile with best score
│   ├── AnswerOption.tsx      # Answer button: idle/correct/wrong/disabled
│   ├── ProgressBar.tsx       # Animated fill progress bar
│   └── ScoreRing.tsx         # Circular animated score display
│
├── constants/
│   ├── theme.ts              # Colors, fonts, spacing, shadows — single source of truth
│   └── questions.ts          # All 50 questions + category definitions
│
├── database/
│   └── db.ts                 # expo-sqlite: tables, auth, quiz results, leaderboard
│
├── hooks/
│   └── useAuth.ts            # Lightweight global auth state hook
│
├── assets/                   # Place icon.png, splash.png, adaptive-icon.png here
│
├── app.json                  # Expo / EAS config
├── eas.json                  # EAS Build + Submit profiles
├── tsconfig.json
└── babel.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI (for store builds): `npm install -g eas-cli`

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npx expo start

# 3. Scan QR code with Expo Go (iOS/Android)
#    OR press 'i' for iOS Simulator / 'a' for Android Emulator
```

### Default Test Accounts

| Username | Password | Notes |
|----------|----------|-------|
| `testflight` | `demo1234` | Pre-seeded — required for Apple review |
| `panther` | `pittbradford` | Alternate demo account |

---

## 🏗 Building for the App Stores

### iOS (TestFlight)

```bash
# Log in to your Expo account
eas login

# Configure credentials (first time only)
eas credentials

# Build for TestFlight
eas build --platform ios --profile preview

# Submit to TestFlight
eas submit --platform ios
```

Fill in `eas.json` with your `appleId`, `ascAppId`, and `appleTeamId` before submitting.

### Android (Google Play Internal Track)

```bash
# Build AAB
eas build --platform android --profile preview

# Submit to Play Console internal track
eas submit --platform android
```

Place your `google-services-key.json` service account file in the project root.

---

## 🎨 Brand Colors

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![Navy](https://via.placeholder.com/12/182854/182854.png) | Navy | `#182854` | Background, headers, primary buttons |
| ![Gold](https://via.placeholder.com/12/9A936B/9A936B.png) | Gold | `#9A936B` | Borders, icons, secondary text |
| ![Yellow](https://via.placeholder.com/12/FFD700/FFD700.png) | Bright Yellow | `#FFD700` | Scores, highlights, CTA buttons |

---

## 🧩 Adding Questions

Open `constants/questions.ts` and add to any category's `questions` array:

```typescript
{
  id: 'upb-11',               // Unique — use category prefix + number
  question: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  answer: 0,                  // 0-based index of the correct option
  fact: 'Fun fact shown after the user answers.',
},
```

To add a whole new category, add an entry to the `CATEGORIES` array with a unique `id`, `title`, `icon` emoji, `color` hex, and `questions` array.

---

## 🔒 Security Notes

- Passwords are stored as **plain text** in SQLite — acceptable for this educational demo.
- For a production release, hash passwords with `expo-crypto` (SHA-256) or a proper
  bcrypt library before storing.
- The SQLite database file lives in the app's private document directory and is not
  accessible to other apps on the device.

---

## 📋 Screens Overview

| Screen | Route | Key Animations |
|--------|-------|----------------|
| Login | `/` (index) | Logo spring-in, form slide-up |
| Categories | `/categories` | Staggered card entrance (80ms delay each) |
| Quiz | `/quiz?categoryId=X` | Question slide, answer pop/shake, fact slide-up |
| Results | `/score` | Score ring fill, counter count-up |
| Leaderboard | `/leaderboard` | Row stagger entrance |

---

*Hail to Pitt! 🐾*

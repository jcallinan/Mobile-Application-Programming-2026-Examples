/**
 * _layout.tsx
 * Root layout for the CampusQuiz app using Expo Router.
 *
 * This file sets up:
 *  - The navigation stack with smooth slide transitions
 *  - The status bar appearance (light text on dark Pitt Navy background)
 *  - Global font loading via expo-font
 *  - The SQLite database initialization that runs once on app startup
 *
 * Expo Router treats every file in /app as a route. The <Stack> component
 * here acts as the host shell — individual screens opt in/out of header
 * visibility via their own <Stack.Screen options={}> declarations.
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { initDatabase } from '../database/db';
import { COLORS } from '../constants/theme';

// Keep the native splash screen visible until fonts are loaded and the DB
// is initialized. Without this call the splash would dismiss immediately.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load any custom fonts here. Currently using system fonts, but this
  // hook is the correct place to add e.g. Inter or Merriweather later.
  const [fontsLoaded] = useFonts({
    // Example: 'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      // Create the SQLite tables and seed the TestFlight demo user.
      // This is idempotent — safe to call on every launch.
      await initDatabase();

      if (fontsLoaded) {
        // Fonts loaded AND db ready — now we can hide the splash.
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  // While fonts are loading, render nothing (splash is still showing).
  if (!fontsLoaded) return null;

  return (
    <>
      {/*
       * StatusBar: 'light' = white icons/text, which reads well on the
       * Pitt Navy (#182854) header backgrounds used throughout the app.
       */}
      <StatusBar style="light" backgroundColor={COLORS.navy} />

      <Stack
        screenOptions={{
          // Default header style across all screens
          headerStyle: { backgroundColor: COLORS.navy },
          headerTintColor: COLORS.gold,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          // Slide animation — feels native on both iOS and Android
          animation: 'slide_from_right',
          // Hide the header by default; each screen shows it individually
          headerShown: false,
        }}
      >
        {/* ── Screens ───────────────────────────────────────────────── */}

        {/* Login / home screen */}
        <Stack.Screen name="index" options={{ title: 'Sign In' }} />

        {/* Quiz category picker */}
        <Stack.Screen name="categories" options={{ title: 'Choose a Category' }} />

        {/* Active quiz gameplay */}
        <Stack.Screen name="quiz" options={{ title: 'Quiz' }} />

        {/* Results / score breakdown */}
        <Stack.Screen name="score" options={{ title: 'Results' }} />

        {/* Personal high-score leaderboard */}
        <Stack.Screen name="leaderboard" options={{ title: 'Leaderboard' }} />
      </Stack>
    </>
  );
}

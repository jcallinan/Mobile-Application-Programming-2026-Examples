/**
 * app/categories.tsx  (Category Selection Screen)
 * ─────────────────────────────────────────────────────────────────────────────
 * Displays all available quiz categories as pressable cards.
 *
 * Features
 * ────────
 *   • Staggered entrance animation: each card slides in with a delay
 *   • Personal best scores loaded from SQLite for each category
 *   • Greeting that uses the logged-in username
 *   • Logout button in the header chip
 *
 * Data flow
 * ─────────
 *   1. On mount, read `currentUser` from the useAuth hook
 *   2. Query SQLite for personal bests in each category
 *   3. Pass bests as props to each CategoryCard
 *   4. On card press, navigate to /quiz?categoryId=<id>
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { CATEGORIES } from '../constants/questions';
import { getPersonalBest } from '../database/db';
import { useAuth } from '../hooks/useAuth';
import CategoryCard from '../components/CategoryCard';
import PittHeader from '../components/PittHeader';
import {
  COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOWS, DURATIONS
} from '../constants/theme';

// ─── Component ────────────────────────────────────────────────────────────────

export default function CategoriesScreen() {
  const { currentUser, signOut } = useAuth();

  // Map of categoryId → personal best percentage (or null)
  const [personalBests, setPersonalBests] = useState<Record<string, number | null>>({});

  // Each card has its own Animated.Value for the stagger entrance
  const cardAnims = useRef(
    CATEGORIES.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(30),
    }))
  ).current;

  // ── Load personal bests from SQLite on mount ──────────────────────────
  useEffect(() => {
    if (!currentUser) return;

    const bests: Record<string, number | null> = {};
    for (const cat of CATEGORIES) {
      const row = getPersonalBest(currentUser, cat.id);
      bests[cat.id] = row ? row.percentage : null;
    }
    setPersonalBests(bests);
  }, [currentUser]);

  // ── Staggered card entrance ───────────────────────────────────────────
  useEffect(() => {
    const animations = cardAnims.map((anim, index) =>
      // Each card starts 80ms after the previous one
      Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: DURATIONS.slow,
          delay: index * 80,
          useNativeDriver: true,
        }),
        Animated.spring(anim.translateY, {
          toValue: 0,
          useNativeDriver: true,
          speed: 14,
          bounciness: 4,
          delay: index * 80,
        }),
      ])
    );

    Animated.stagger(80, animations).start();
  }, []);

  // ── Navigation handlers ───────────────────────────────────────────────

  function handleCategoryPress(categoryId: string) {
    // Pass the categoryId as a URL query parameter
    router.push(`/quiz?categoryId=${categoryId}`);
  }

  function handleLogout() {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            signOut();
            router.replace('/');
          },
        },
      ]
    );
  }

  // ── Stats summary ─────────────────────────────────────────────────────
  const playedCount = Object.values(personalBests).filter(v => v !== null).length;
  const totalCount  = CATEGORIES.length;
  const avgScore    = playedCount > 0
    ? Math.round(
        Object.values(personalBests)
          .filter((v): v is number => v !== null)
          .reduce((a, b) => a + b, 0) / playedCount
      )
    : null;

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View style={styles.screen}>

      {/* ── Custom branded header ─────────────────────────────────────────── */}
      <PittHeader
        title="Categories"
        rightLabel={currentUser ?? undefined}
        onRightPress={handleLogout}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Greeting + stats row ─────────────────────────────────────────── */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>
            Welcome back, <Text style={styles.username}>{currentUser}</Text> 👋
          </Text>
          <Text style={styles.greetingSub}>
            Hail to Pitt! Choose a category to test your knowledge.
          </Text>

          {/* Mini stats chips */}
          <View style={styles.statsRow}>
            <View style={styles.statChip}>
              <Text style={styles.statValue}>{playedCount}</Text>
              <Text style={styles.statLabel}>Played</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statChip}>
              <Text style={styles.statValue}>{totalCount}</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statChip}>
              <Text style={styles.statValue}>
                {avgScore !== null ? `${avgScore}%` : '—'}
              </Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
          </View>
        </View>

        {/* ── Category cards ────────────────────────────────────────────────── */}
        {CATEGORIES.map((category, index) => (
          <Animated.View
            key={category.id}
            style={{
              opacity: cardAnims[index].opacity,
              transform: [{ translateY: cardAnims[index].translateY }],
            }}
          >
            <CategoryCard
              category={category}
              onPress={cat => handleCategoryPress(cat.id)}
              personalBest={personalBests[category.id] ?? null}
            />
          </Animated.View>
        ))}

        {/* ── Leaderboard shortcut ──────────────────────────────────────────── */}
        <TouchableOpacity
          style={styles.leaderboardBtn}
          onPress={() => router.push('/leaderboard')}
          accessibilityRole="button"
          accessibilityLabel="View leaderboard"
        >
          <Text style={styles.leaderboardIcon}>🏆</Text>
          <Text style={styles.leaderboardText}>View Leaderboard</Text>
          <Text style={styles.leaderboardArrow}>›</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING.xxxl,
  },

  // Greeting
  greetingSection: {
    marginBottom: SPACING.xl,
    paddingTop: SPACING.base,
  },
  greeting: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  username: {
    color: COLORS.yellow,
  },
  greetingSub: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    ...SHADOWS.sm,
  },
  statChip: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONTS.extraBold,
    color: COLORS.yellow,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.navyLight,
    marginVertical: SPACING.xs,
  },

  // Leaderboard button
  leaderboardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.navyLight,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    marginTop: SPACING.sm,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gold,
    ...SHADOWS.sm,
  },
  leaderboardIcon: {
    fontSize: 24,
  },
  leaderboardText: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    fontWeight: FONTS.semiBold,
    color: COLORS.gold,
  },
  leaderboardArrow: {
    fontSize: 24,
    color: COLORS.gold,
    fontWeight: FONTS.bold,
  },
});

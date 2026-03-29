/**
 * app/leaderboard.tsx  (Leaderboard Screen)
 * ─────────────────────────────────────────────────────────────────────────────
 * Displays top scores across all users for each category.
 *
 * Data source: the `quiz_results` SQLite table, queried via `getTopScores()`
 * which groups by username + category and returns the best score for each
 * combination (see database/db.ts for the query).
 *
 * Animations
 * ──────────
 *   • Row entrance: staggered slide-in + fade for the top 10 rows
 *   • Medal emojis for ranks 1–3
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { getTopScores, QuizResultRow } from '../database/db';
import { getCurrentUser } from '../hooks/useAuth';
import PittHeader from '../components/PittHeader';
import PittButton from '../components/PittButton';
import {
  COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOWS, DURATIONS
} from '../constants/theme';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMedal(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `${rank}.`;
}

function getScoreColor(pct: number): string {
  if (pct >= 80) return COLORS.correct;
  if (pct >= 60) return COLORS.yellow;
  return COLORS.wrong;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LeaderboardScreen() {
  const [rows, setRows] = useState<QuizResultRow[]>([]);
  const currentUser = getCurrentUser();

  // One Animated.Value pair per row for staggered entrance
  const rowAnims = useRef<Array<{ opacity: Animated.Value; x: Animated.Value }>>([]).current;

  // ── Load data on mount ────────────────────────────────────────────────────
  useEffect(() => {
    const data = getTopScores(20);
    setRows(data);

    // Create anim refs for however many rows we got
    data.forEach((_, i) => {
      if (!rowAnims[i]) {
        rowAnims[i] = {
          opacity: new Animated.Value(0),
          x:       new Animated.Value(40),
        };
      }
    });

    // Staggered entrance
    const anims = data.map((_, i) =>
      Animated.parallel([
        Animated.timing(rowAnims[i].opacity, {
          toValue: 1,
          duration: DURATIONS.normal,
          delay: i * 60,
          useNativeDriver: true,
        }),
        Animated.spring(rowAnims[i].x, {
          toValue: 0,
          useNativeDriver: true,
          speed: 18,
          bounciness: 4,
          delay: i * 60,
        }),
      ])
    );
    Animated.stagger(60, anims).start();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View style={styles.screen}>

      <PittHeader
        title="Leaderboard"
        showBack
        onBack={() => router.back()}
        rightLabel={currentUser ?? undefined}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Hero banner ───────────────────────────────────────────────────── */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>🏆 Top Scores</Text>
          <Text style={styles.bannerSub}>Best score per user per category</Text>
        </View>

        {/* ── Empty state ───────────────────────────────────────────────────── */}
        {rows.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎓</Text>
            <Text style={styles.emptyTitle}>No scores yet</Text>
            <Text style={styles.emptyText}>
              Complete a quiz to be the first on the leaderboard!
            </Text>
            <PittButton
              label="Start Playing"
              onPress={() => router.replace('/categories')}
              variant="gold"
              icon="🚀"
              fullWidth={false}
              style={styles.emptyBtn}
            />
          </View>
        )}

        {/* ── Score rows ────────────────────────────────────────────────────── */}
        {rows.map((row, index) => {
          const isCurrentUser = row.username === currentUser;
          const anim = rowAnims[index];

          return (
            <Animated.View
              key={`${row.username}-${row.category_id}-${index}`}
              style={[
                styles.row,
                isCurrentUser && styles.rowHighlight,
                SHADOWS.sm,
                anim ? {
                  opacity: anim.opacity,
                  transform: [{ translateX: anim.x }],
                } : undefined,
              ]}
            >
              {/* Rank */}
              <Text style={[
                styles.rank,
                index < 3 ? styles.rankMedal : styles.rankNumber,
              ]}>
                {getMedal(index + 1)}
              </Text>

              {/* Username + category */}
              <View style={styles.info}>
                <Text style={[styles.username, isCurrentUser && styles.usernameSelf]}>
                  {row.username}
                  {isCurrentUser ? ' (you)' : ''}
                </Text>
                <Text style={styles.category}>{row.category_title}</Text>
              </View>

              {/* Score */}
              <View style={styles.scoreBlock}>
                <Text style={[styles.pct, { color: getScoreColor(row.percentage) }]}>
                  {row.percentage}%
                </Text>
                <Text style={styles.fraction}>
                  {row.score}/{row.total}
                </Text>
              </View>
            </Animated.View>
          );
        })}

        {/* ── Back button ───────────────────────────────────────────────────── */}
        <PittButton
          label="Back to Categories"
          onPress={() => router.replace('/categories')}
          variant="secondary"
          icon="🏠"
          style={styles.backBtn}
        />

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

  banner: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.gold,
    ...SHADOWS.md,
  },
  bannerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONTS.extraBold,
    color: COLORS.yellow,
    marginBottom: SPACING.xs,
  },
  bannerSub: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
    gap: SPACING.md,
  },
  emptyIcon: {
    fontSize: 60,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  emptyText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
  emptyBtn: {
    marginTop: SPACING.base,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.navyLight,
  },
  rowHighlight: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.navyLight,
  },

  rank: {
    width: 40,
    textAlign: 'center',
  },
  rankMedal: {
    fontSize: FONT_SIZES.xl,
  },
  rankNumber: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONTS.bold,
    color: COLORS.textMuted,
  },

  info: {
    flex: 1,
  },
  username: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  usernameSelf: {
    color: COLORS.yellow,
  },
  category: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  scoreBlock: {
    alignItems: 'flex-end',
  },
  pct: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONTS.extraBold,
  },
  fraction: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
  },

  backBtn: {
    marginTop: SPACING.lg,
  },
});

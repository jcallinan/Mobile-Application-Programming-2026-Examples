/**
 * app/score.tsx  (Results Screen)
 * ─────────────────────────────────────────────────────────────────────────────
 * Displays the quiz result with:
 *   • Animated ScoreRing that fills to the percentage
 *   • Grade badge (A / B / C / D / F) with appropriate color
 *   • Motivational message based on score
 *   • "Play Again" and "Choose Category" buttons
 *   • A scrollable breakdown of answers is intentionally NOT included here
 *     since individual question states weren't stored — a future enhancement
 *     would be to pass the full answer log as a route param.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { getCategoryById } from '../constants/questions';
import { getCurrentUser } from '../hooks/useAuth';
import ScoreRing from '../components/ScoreRing';
import PittButton from '../components/PittButton';
import PittHeader from '../components/PittHeader';
import {
  COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOWS, DURATIONS
} from '../constants/theme';

// ─── Grade helpers ────────────────────────────────────────────────────────────

interface Grade {
  letter: string;
  color:  string;
  msg:    string;
}

function getGrade(pct: number): Grade {
  if (pct >= 90) return { letter: 'A+', color: COLORS.correct,  msg: "Outstanding! You're a campus legend! 🌟" };
  if (pct >= 80) return { letter: 'A',  color: COLORS.correct,  msg: "Excellent work, Panther! 🐾" };
  if (pct >= 70) return { letter: 'B',  color: COLORS.yellow,   msg: "Great job! Keep studying! 📚" };
  if (pct >= 60) return { letter: 'C',  color: COLORS.yellow,   msg: "Not bad! You can do even better! 💪" };
  if (pct >= 50) return { letter: 'D',  color: COLORS.orange,   msg: "You passed, but there's room to grow! 🌱" };
  return               { letter: 'F',  color: COLORS.wrong,    msg: "Keep practicing — Hail to Pitt! 🏫" };
}

// Pitt gold-orange — we define it here since it's only used on this screen
const orange = '#FF9F0A';
(COLORS as any).orange = orange;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScoreScreen() {
  // ── Route params ──────────────────────────────────────────────────────────
  const params = useLocalSearchParams<{
    score: string;
    total: string;
    categoryId: string;
  }>();

  const score      = parseInt(params.score  ?? '0', 10);
  const total      = parseInt(params.total  ?? '10', 10);
  const percentage = Math.round((score / total) * 100);
  const category   = params.categoryId ? getCategoryById(params.categoryId) : null;
  const username   = getCurrentUser();
  const grade      = getGrade(percentage);

  // ── Entrance animations ───────────────────────────────────────────────────
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: DURATIONS.slow,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 12,
        bounciness: 6,
      }),
    ]).start();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View style={styles.screen}>

      <PittHeader
        title="Results"
        showBack={false}
        rightLabel={username ?? undefined}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >

          {/* ── Category label ────────────────────────────────────────────── */}
          {category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>
                {category.icon}  {category.title}
              </Text>
            </View>
          )}

          {/* ── Score ring ────────────────────────────────────────────────── */}
          <View style={styles.ringWrapper}>
            <ScoreRing
              percentage={percentage}
              score={score}
              total={total}
              size={200}
            />
          </View>

          {/* ── Grade badge ───────────────────────────────────────────────── */}
          <View style={[styles.gradeBadge, { backgroundColor: grade.color + '22', borderColor: grade.color }]}>
            <Text style={[styles.gradeLetter, { color: grade.color }]}>
              {grade.letter}
            </Text>
          </View>

          {/* ── Motivational message ──────────────────────────────────────── */}
          <Text style={styles.motivationText}>{grade.msg}</Text>

          {/* ── Stat chips ────────────────────────────────────────────────── */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{score}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{total - score}</Text>
              <Text style={styles.statLabel}>Wrong</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>

          {/* ── Action buttons ────────────────────────────────────────────── */}
          <View style={styles.buttonGroup}>
            <PittButton
              label="Play Again"
              onPress={() => {
                if (params.categoryId) {
                  router.replace(`/quiz?categoryId=${params.categoryId}`);
                }
              }}
              variant="gold"
              icon="🔄"
            />

            <PittButton
              label="Choose Category"
              onPress={() => router.replace('/categories')}
              variant="secondary"
              icon="🏠"
              style={styles.secondaryBtn}
            />

            <PittButton
              label="Leaderboard"
              onPress={() => router.push('/leaderboard')}
              variant="secondary"
              icon="🏆"
              style={styles.secondaryBtn}
            />
          </View>

        </Animated.View>
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
    alignItems: 'center',
  },

  categoryBadge: {
    backgroundColor: COLORS.navyLight,
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xs,
    alignSelf: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  categoryBadgeText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONTS.semiBold,
    color: COLORS.textSecondary,
  },

  ringWrapper: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },

  gradeBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.base,
    ...SHADOWS.md,
  },
  gradeLetter: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONTS.extraBold,
  },

  motivationText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONTS.semiBold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },

  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
    width: '100%',
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  statValue: {
    fontSize: FONT_SIZES.xxl,
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

  buttonGroup: {
    width: '100%',
    gap: SPACING.md,
  },
  secondaryBtn: {
    // No extra style needed — variant="secondary" handles it
  },
});

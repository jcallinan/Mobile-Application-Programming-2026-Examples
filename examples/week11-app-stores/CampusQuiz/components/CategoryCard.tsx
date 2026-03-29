/**
 * components/CategoryCard.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A pressable card displayed on the Category Selection screen.
 *
 * Each card shows:
 *   • A large emoji icon
 *   • The category title
 *   • The number of questions
 *   • The user's personal best percentage (if they've played before)
 *
 * Animation: The card scales up slightly on focus/hover and down on press,
 * using React Native's Animated API with the native driver for smooth 60fps.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Category } from '../constants/questions';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../constants/theme';

// ─── Props ────────────────────────────────────────────────────────────────────

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
  personalBest?: number | null;   // 0–100 percentage or null if never played
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CategoryCard({
  category,
  onPress,
  personalBest,
}: CategoryCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Press-in: scale down slightly
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  // Press-out: spring back with a tiny bounce
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  // ── Personal best badge color ─────────────────────────────────────────────
  // Green ≥ 80%, yellow 50–79%, red < 50%
  const getBadgeColor = (pct: number) => {
    if (pct >= 80) return COLORS.correct;
    if (pct >= 50) return COLORS.yellow;
    return COLORS.wrong;
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onPress(category)}
      accessibilityRole="button"
      accessibilityLabel={`${category.title} quiz, ${category.questions.length} questions`}
    >
      <Animated.View
        style={[
          styles.card,
          {
            borderLeftColor: category.color,
            transform: [{ scale: scaleAnim }],
          },
          SHADOWS.md,
        ]}
      >
        {/* ── Top row: icon + title ─────────────────────────────────────────── */}
        <View style={styles.topRow}>
          <View style={[styles.iconBadge, { backgroundColor: category.color }]}>
            <Text style={styles.icon}>{category.icon}</Text>
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.title}>{category.title}</Text>
            <Text style={styles.subtitle}>
              {category.questions.length} questions
            </Text>
          </View>
        </View>

        {/* ── Personal best chip ────────────────────────────────────────────── */}
        {personalBest != null ? (
          <View style={[styles.bestChip, { backgroundColor: getBadgeColor(personalBest) + '33' }]}>
            <Text style={[styles.bestText, { color: getBadgeColor(personalBest) }]}>
              Best: {personalBest}%
            </Text>
          </View>
        ) : (
          <View style={[styles.bestChip, { backgroundColor: COLORS.navyLight }]}>
            <Text style={[styles.bestText, { color: COLORS.textMuted }]}>
              Not played yet
            </Text>
          </View>
        )}

        {/* ── Right arrow indicator ────────────────────────────────────────── */}
        <Text style={styles.arrow}>›</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    borderLeftWidth: 4,   // The colored accent strip on the left edge
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 26,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  bestChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
  },
  bestText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONTS.semiBold,
  },
  arrow: {
    fontSize: 26,
    color: COLORS.gold,
    fontWeight: FONTS.bold,
    marginLeft: SPACING.xs,
  },
});

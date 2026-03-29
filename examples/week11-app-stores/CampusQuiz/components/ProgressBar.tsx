/**
 * components/ProgressBar.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * An animated horizontal progress bar used on the Quiz screen.
 *
 * The fill width animates smoothly from its previous value to the new value
 * every time the `progress` prop changes. This is achieved by:
 *   1. Storing the target progress in an Animated.Value
 *   2. Running Animated.timing to tween between values
 *   3. Using interpolate() to map 0–1 to a percentage width string
 *
 * Why not just set width directly?
 *   Animated values can be driven on the native thread (useNativeDriver).
 *   However, layout props like `width` cannot use the native driver — they
 *   must go through the JS thread. We use `useNativeDriver: false` here and
 *   accept the JS-driven animation since the bar is a simple element and the
 *   performance impact is negligible.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, FONTS, RADIUS, SPACING, DURATIONS } from '../constants/theme';

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProgressBarProps {
  /** 0.0 to 1.0 */
  progress: number;
  /** Current question number (1-based) */
  current: number;
  /** Total number of questions */
  total: number;
  /** Optional label string override */
  label?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProgressBar({ progress, current, total, label }: ProgressBarProps) {
  // Animated.Value starts at the initial progress so there's no "jump" from 0
  const animatedProgress = useRef(new Animated.Value(progress)).current;

  // Every time `progress` changes, animate to the new value
  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: DURATIONS.normal,   // 300ms smooth transition
      useNativeDriver: false,        // Layout props can't use native driver
    }).start();
  }, [progress]);

  // Map the 0–1 animated value to a '0%'–'100%' width string
  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',     // Don't go below 0% or above 100%
  });

  // Color the bar gold → green as user progresses through the quiz
  const fillColor = progress >= 0.8 ? COLORS.correct : COLORS.gold;

  return (
    <View style={styles.wrapper}>
      {/* ── Label row: "Question X of Y" ────────────────────────────────────── */}
      <View style={styles.labelRow}>
        <Text style={styles.labelText}>
          {label ?? `Question ${current} of ${total}`}
        </Text>
        <Text style={styles.percentText}>
          {Math.round(progress * 100)}%
        </Text>
      </View>

      {/* ── Track (gray background) + fill (animated gold) ──────────────────── */}
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: widthInterpolated,
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.base,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  labelText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: FONTS.medium,
  },
  percentText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gold,
    fontWeight: FONTS.semiBold,
  },
  track: {
    height: 8,
    backgroundColor: COLORS.navyLight,
    borderRadius: RADIUS.round,
    overflow: 'hidden',   // Clip the fill to the rounded track
  },
  fill: {
    height: '100%',
    borderRadius: RADIUS.round,
  },
});

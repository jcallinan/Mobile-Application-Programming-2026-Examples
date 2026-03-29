/**
 * components/ScoreRing.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * An animated circular score display used on the Results screen.
 *
 * Implementation approach
 * ───────────────────────
 * React Native doesn't have a built-in circular progress component, so we
 * build one using two half-circle "wedge" shapes:
 *
 *   The ring is drawn with a thick circular border (the track).
 *   We overlay a second View rotated to mask the unwanted portion.
 *
 * For simplicity and avoiding a native SVG dependency, we use a common
 * CSS-style technique:
 *   • A full circle with a colored border = the ring track
 *   • Positioned arc segments rotated to show the fill percentage
 *
 * The score number counts up from 0 to the final value using an
 * Animated.Value + interpolation, giving a satisfying "counting" effect.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, DURATIONS } from '../constants/theme';

// ─── Props ────────────────────────────────────────────────────────────────────

interface ScoreRingProps {
  /** 0–100 percentage */
  percentage: number;
  /** Correct answers count */
  score: number;
  /** Total questions */
  total: number;
  /** Diameter of the ring in pixels */
  size?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScoreRing({
  percentage,
  score,
  total,
  size = 180,
}: ScoreRingProps) {

  // ── Animated counter (score number counts up) ────────────────────────────
  const countAnim = useRef(new Animated.Value(0)).current;
  // Separate anim for the ring fill
  const ringAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Stagger: count the score number first, then fill the ring
    Animated.sequence([
      Animated.timing(ringAnim, {
        toValue: percentage,
        duration: DURATIONS.xslow,       // 800ms
        useNativeDriver: false,
      }),
      Animated.timing(countAnim, {
        toValue: score,
        duration: DURATIONS.slow,        // 500ms
        useNativeDriver: false,
      }),
    ]).start();
  }, [percentage, score]);

  // Interpolate the animated count to an integer string
  const countText = countAnim.interpolate({
    inputRange: [0, total],
    outputRange: ['0', String(total)],
  });

  // ── Ring color based on score ────────────────────────────────────────────
  const ringColor =
    percentage >= 80 ? COLORS.correct :
    percentage >= 50 ? COLORS.yellow  :
    COLORS.wrong;

  // ── Ring geometry ────────────────────────────────────────────────────────
  const thickness = size * 0.12;       // Border thickness = 12% of diameter
  const innerSize = size - thickness * 2;

  // Compute the rotation angle for the right half-circle clip
  // 0% → 0°, 50% → 90°, 100% → 180° (per half)
  const clampedPct = Math.min(100, Math.max(0, percentage));

  // Right arc: always visible up to 50%
  const rightDeg  = clampedPct >= 50
    ? 180
    : (clampedPct / 50) * 180;

  // Left arc: only visible when > 50%
  const leftDeg   = clampedPct > 50
    ? ((clampedPct - 50) / 50) * 180
    : 0;

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>

      {/* ── Track circle (background ring) ──────────────────────────────────── */}
      <View
        style={[
          styles.track,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: thickness,
            borderColor: COLORS.navyLight,
          },
        ]}
      />

      {/* ── Fill circles ─────────────────────────────────────────────────────
          We draw two half-circles. Each half is clipped to only show 180°.
          Rotating them into position traces the arc fill.

          Right half: covers 0–50% progress (0°–180° rotation)
          Left half:  covers 50–100% progress (0°–180° rotation)
      ──────────────────────────────────────────────────────────────────────── */}

      {/* Right fill arc */}
      <View style={[styles.halfContainer, styles.rightHalf]}>
        <View
          style={[
            styles.halfCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: thickness,
              borderColor: ringColor,
              transform: [{ rotate: `${rightDeg}deg` }],
            },
            styles.rightClip,
          ]}
        />
      </View>

      {/* Left fill arc (only rendered when score > 50%) */}
      {clampedPct > 50 && (
        <View style={[styles.halfContainer, styles.leftHalf]}>
          <View
            style={[
              styles.halfCircle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: thickness,
                borderColor: ringColor,
                transform: [{ rotate: `${leftDeg}deg` }],
              },
              styles.leftClip,
            ]}
          />
        </View>
      )}

      {/* ── Center content: percentage + label ──────────────────────────────── */}
      <View style={[styles.center, { width: innerSize, height: innerSize }]}>
        <Text style={[styles.percentageText, { color: ringColor }]}>
          {percentage}%
        </Text>
        <Animated.Text style={styles.scoreText}>
          {countText}
        </Animated.Text>
        <Text style={styles.totalText}>/ {total} correct</Text>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  track: {
    position: 'absolute',
  },
  halfContainer: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    overflow: 'hidden',
  },
  rightHalf: {
    right: 0,
  },
  leftHalf: {
    left: 0,
  },
  halfCircle: {
    position: 'absolute',
  },
  rightClip: {
    // Only show right half by positioning off to the right
    right: 0,
  },
  leftClip: {
    left: 0,
  },
  center: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 999,
  },
  percentageText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONTS.extraBold,
  },
  scoreText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  totalText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});

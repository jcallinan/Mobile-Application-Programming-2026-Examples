/**
 * components/AnswerOption.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A single tappable answer option on the Quiz screen.
 *
 * Visual states
 * ─────────────
 *   idle      — Navy surface, gold border on focus
 *   selected  — Pulsing highlight (before reveal)
 *   correct   — Green background with checkmark, scale-up animation
 *   wrong     — Red background with X mark, shake animation
 *   disabled  — Reduced opacity (when another option has been selected)
 *
 * Animation detail
 * ────────────────
 *   Correct: Animated.spring scale 1 → 1.03 → 1 (triumphant pop)
 *   Wrong:   Animated.sequence with translateX ±8 (shake / jitter effect)
 *   Both use useNativeDriver: true for smooth 60fps performance.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../constants/theme';

// ─── Props ────────────────────────────────────────────────────────────────────

export type AnswerState = 'idle' | 'selected' | 'correct' | 'wrong' | 'disabled';

interface AnswerOptionProps {
  /** The letter label: A, B, C, D */
  letter: string;
  /** The answer text */
  text: string;
  /** Current display state of this option */
  state: AnswerState;
  onPress: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AnswerOption({ letter, text, state, onPress }: AnswerOptionProps) {
  // Scale animation (used for 'correct' pop)
  const scaleAnim = useRef(new Animated.Value(1)).current;
  // Translate animation (used for 'wrong' shake)
  const shakeAnim = useRef(new Animated.Value(0)).current;
  // Press feedback scale (separate from state animations)
  const pressScale = useRef(new Animated.Value(1)).current;

  // ── Trigger animations when state changes ────────────────────────────────
  useEffect(() => {
    if (state === 'correct') {
      // Pop: scale up to 1.04 then spring back to 1
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.04,
          useNativeDriver: true,
          speed: 60,
          bounciness: 0,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
          bounciness: 8,
        }),
      ]).start();
    }

    if (state === 'wrong') {
      // Shake: rapid left-right oscillation
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8,  duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6,  duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0,  duration: 60, useNativeDriver: true }),
      ]).start();
    }
  }, [state]);

  // ── Press feedback (only in idle state) ──────────────────────────────────
  const handlePressIn = () => {
    if (state !== 'idle') return;
    Animated.spring(pressScale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  // ── Resolve styles based on state ────────────────────────────────────────
  const stateStyles = {
    idle: {
      container: { backgroundColor: COLORS.surface, borderColor: COLORS.neutral },
      letter:    { backgroundColor: COLORS.navyLight, color: COLORS.gold },
      text:      COLORS.textPrimary,
      badge:     null,
    },
    selected: {
      container: { backgroundColor: COLORS.navyLight, borderColor: COLORS.gold },
      letter:    { backgroundColor: COLORS.gold, color: COLORS.textDark },
      text:      COLORS.textPrimary,
      badge:     null,
    },
    correct: {
      container: { backgroundColor: COLORS.correctBg, borderColor: COLORS.correct },
      letter:    { backgroundColor: COLORS.correct, color: COLORS.white },
      text:      COLORS.white,
      badge:     '✓',
    },
    wrong: {
      container: { backgroundColor: COLORS.wrongBg, borderColor: COLORS.wrong },
      letter:    { backgroundColor: COLORS.wrong, color: COLORS.white },
      text:      COLORS.textSecondary,
      badge:     '✗',
    },
    disabled: {
      container: { backgroundColor: COLORS.surface, borderColor: COLORS.navyLight },
      letter:    { backgroundColor: COLORS.navyLight, color: COLORS.textMuted },
      text:      COLORS.textMuted,
      badge:     null,
    },
  }[state];

  const isInteractive = state === 'idle';

  return (
    <TouchableWithoutFeedback
      onPress={isInteractive ? onPress : undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="radio"
      accessibilityLabel={`Option ${letter}: ${text}`}
      accessibilityState={{ selected: state === 'selected' || state === 'correct' }}
    >
      <Animated.View
        style={[
          styles.container,
          stateStyles.container,
          {
            transform: [
              { scale: scaleAnim },
              { scale: pressScale },
              { translateX: shakeAnim },
            ],
          },
          // Only show shadow on interactive states
          state === 'idle' ? SHADOWS.sm : undefined,
        ]}
      >
        {/* ── Letter badge (A / B / C / D) ───────────────────────────────── */}
        <View style={[styles.letterBadge, { backgroundColor: stateStyles.letter.backgroundColor }]}>
          <Text style={[styles.letterText, { color: stateStyles.letter.color }]}>
            {letter}
          </Text>
        </View>

        {/* ── Answer text ────────────────────────────────────────────────── */}
        <Text
          style={[styles.answerText, { color: stateStyles.text }]}
          numberOfLines={3}
        >
          {text}
        </Text>

        {/* ── Correct / wrong feedback badge ─────────────────────────────── */}
        {stateStyles.badge ? (
          <Text style={[
            styles.feedbackBadge,
            { color: state === 'correct' ? COLORS.correct : COLORS.wrong },
          ]}>
            {stateStyles.badge}
          </Text>
        ) : null}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.md,
    minHeight: 64,
  },
  letterBadge: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  letterText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONTS.bold,
  },
  answerText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: FONTS.medium,
    lineHeight: 22,
  },
  feedbackBadge: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONTS.bold,
    flexShrink: 0,
  },
});

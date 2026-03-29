/**
 * components/PittButton.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A reusable, animated button component styled in the Pitt Bradford palette.
 *
 * Features
 * ────────
 *  • Animated scale-down on press using Animated.spring (native driver)
 *  • Three visual variants: 'primary' (navy/gold), 'secondary' (outlined),
 *    and 'danger' (red, for logout / destructive actions)
 *  • Optional loading spinner that replaces the label
 *  • Optional left/right icon via emoji or any text
 *  • Disabled state with reduced opacity
 *
 * Usage
 * ─────
 *   <PittButton label="Start Quiz" onPress={handleStart} />
 *   <PittButton label="Log Out" variant="danger" onPress={handleLogout} />
 *   <PittButton label="Loading..." loading />
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOWS, DURATIONS } from '../constants/theme';

// ─── Props ────────────────────────────────────────────────────────────────────

interface PittButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'gold';
  loading?: boolean;
  disabled?: boolean;
  icon?: string;        // Emoji or any string shown before the label
  iconRight?: string;   // Emoji shown after the label
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PittButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  style,
  textStyle,
  fullWidth = true,
}: PittButtonProps) {

  // ── Animation setup ──────────────────────────────────────────────────────────
  // scaleAnim drives the press-in / press-out scale effect.
  // Using the native driver (useNativeDriver: true) means the animation runs
  // on the UI thread, avoiding JS thread jank.
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,          // Scale down to 95% on press
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,             // Bounce back to 100%
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,          // Slight bounce on release
    }).start();
  };

  // ── Style resolution ─────────────────────────────────────────────────────────
  // Pick the correct color set based on the `variant` prop
  const variantStyle = {
    primary: {
      bg: COLORS.gold,
      border: COLORS.goldDark,
      text: COLORS.textDark,
    },
    secondary: {
      bg: COLORS.transparent,
      border: COLORS.gold,
      text: COLORS.gold,
    },
    danger: {
      bg: COLORS.wrong,
      border: '#C0392B',
      text: COLORS.white,
    },
    gold: {
      bg: COLORS.yellow,
      border: '#D4A500',
      text: COLORS.navyDark,
    },
  }[variant];

  const isInteractive = !disabled && !loading;

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={isInteractive ? onPress : undefined}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !isInteractive }}
    >
      {/* Wrap in Animated.View to apply the scale transform */}
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: variantStyle.bg,
            borderColor: variantStyle.border,
            transform: [{ scale: scaleAnim }],
            opacity: isInteractive ? 1 : 0.5,
            alignSelf: fullWidth ? 'stretch' : 'center',
          },
          SHADOWS.md,
          style,
        ]}
      >
        {loading ? (
          // ── Loading state: replace content with spinner ─────────────────────
          <ActivityIndicator
            size="small"
            color={variantStyle.text}
          />
        ) : (
          // ── Normal state: icon + label + optional right icon ────────────────
          <View style={styles.content}>
            {icon ? (
              <Text style={styles.icon}>{icon}</Text>
            ) : null}

            <Text
              style={[
                styles.label,
                { color: variantStyle.text },
                textStyle,
              ]}
            >
              {label}
            </Text>

            {iconRight ? (
              <Text style={styles.icon}>{iconRight}</Text>
            ) : null}
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONTS.bold,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  icon: {
    fontSize: FONT_SIZES.lg,
  },
});

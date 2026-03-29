/**
 * components/PittHeader.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable app header with Pitt Bradford branding.
 *
 * Used at the top of every screen as a custom replacement for the default
 * Expo Router/React Navigation header. Customizing the header here rather
 * than through screenOptions gives us more layout control (e.g. centered
 * logo + title, right-side username chip).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOWS, LAYOUT } from '../constants/theme';

// ─── Props ────────────────────────────────────────────────────────────────────

interface PittHeaderProps {
  title: string;
  /** Show a back-chevron button on the left */
  showBack?: boolean;
  onBack?: () => void;
  /** Text displayed in the right-side chip (usually the username) */
  rightLabel?: string;
  onRightPress?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PittHeader({
  title,
  showBack = false,
  onBack,
  rightLabel,
  onRightPress,
}: PittHeaderProps) {

  // On Android we need to add top padding to avoid the status bar
  const topPad = Platform.OS === 'android'
    ? (StatusBar.currentHeight ?? 24)
    : 0;

  return (
    <View style={[styles.container, { paddingTop: topPad + SPACING.md }]}>

      {/* ── Left: back button or Pitt Shield placeholder ─────────────────── */}
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backBtn}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        ) : (
          // Pitt shield emoji as a lightweight brand mark
          <View style={styles.shieldBadge}>
            <Text style={styles.shieldText}>🐾</Text>
          </View>
        )}
      </View>

      {/* ── Center: title ────────────────────────────────────────────────── */}
      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle}>Pitt Bradford</Text>
      </View>

      {/* ── Right: username chip or empty space ──────────────────────────── */}
      <View style={styles.right}>
        {rightLabel ? (
          <TouchableOpacity
            onPress={onRightPress}
            style={styles.userChip}
            accessibilityRole="button"
            accessibilityLabel={`Signed in as ${rightLabel}`}
          >
            <Text style={styles.userText} numberOfLines={1}>
              {rightLabel}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.navy,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.md,
    // Subtle gold bottom border as a brand accent
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gold,
  },
  left: {
    width: 56,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 80,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gold,
    fontWeight: FONTS.medium,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  backBtn: {
    padding: SPACING.xs,
  },
  backIcon: {
    fontSize: 32,
    color: COLORS.gold,
    fontWeight: FONTS.bold,
    lineHeight: 32,
  },
  shieldBadge: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.navyLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldText: {
    fontSize: 20,
  },
  userChip: {
    backgroundColor: COLORS.navyLight,
    borderRadius: RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.gold,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    maxWidth: 80,
  },
  userText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gold,
    fontWeight: FONTS.semiBold,
  },
  placeholder: {
    width: 56,
  },
});

/**
 * constants/theme.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for the entire CampusQuiz design system.
 *
 * All colors, spacing, font sizes, border radii, and shadow presets live
 * here. Import from this file — NEVER hard-code raw hex or numeric values
 * in component files. That way a future rebrand is a one-file change.
 *
 * Brand reference: University of Pittsburgh at Bradford
 *   Navy  — Pantone PMS 2767 C  |  #182854
 *   Gold  — Pantone PMS 2325 C  |  #9A936B
 *   Yellow— Pantone PMS 803 C   |  #FFFF00 (used sparingly as accent)
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Color Palette ────────────────────────────────────────────────────────────

export const COLORS = {
  // ── Pitt Bradford primary brand colors ──────────────────────────────────────
  navy:        '#182854',   // Primary background, headers, primary buttons
  navyLight:   '#1E3468',   // Slightly lighter navy for card backgrounds
  navyDark:    '#0F1A36',   // Deeper navy for shadows and overlays

  gold:        '#9A936B',   // Secondary text, borders, icon fills
  goldLight:   '#BDB785',   // Hover / pressed state of gold elements
  goldDark:    '#7A7455',   // Darker gold for text on light backgrounds

  yellow:      '#FFD700',   // Bright Pitt gold used for stars, highlights, CTA
  yellowLight: '#FFEC6E',   // Lighter variant for backgrounds

  // ── Surface & background ────────────────────────────────────────────────────
  background:  '#0D1B3E',   // Deep navy page background
  surface:     '#1A2F5E',   // Card / panel background
  surfaceAlt:  '#243A70',   // Alternate card (zebra stripe, hover)

  // ── Semantic status colors ───────────────────────────────────────────────────
  correct:     '#2ECC71',   // Correct answer feedback (green)
  correctBg:   '#1A4D35',   // Background tint for correct answer
  wrong:       '#E74C3C',   // Wrong answer feedback (red)
  wrongBg:     '#4D1A1A',   // Background tint for wrong answer
  neutral:     '#4A6FA5',   // Unanswered / inactive option

  // ── Text ────────────────────────────────────────────────────────────────────
  textPrimary:   '#FFFFFF',   // Main body text on dark backgrounds
  textSecondary: '#B0BAD4',   // Subtext, captions, meta
  textMuted:     '#6E80A8',   // Placeholder, disabled
  textDark:      '#0D1B3E',   // Text on light/gold backgrounds

  // ── Utility ─────────────────────────────────────────────────────────────────
  white:       '#FFFFFF',
  black:       '#000000',
  transparent: 'transparent',
  overlay:     'rgba(13, 27, 62, 0.85)',  // Modal / dimmer overlay
};


// ─── Typography ───────────────────────────────────────────────────────────────

export const FONTS = {
  // Font weight helpers (React Native uses string literals)
  regular:   '400' as const,
  medium:    '500' as const,
  semiBold:  '600' as const,
  bold:      '700' as const,
  extraBold: '800' as const,
};

export const FONT_SIZES = {
  xs:   11,
  sm:   13,
  md:   15,
  base: 16,
  lg:   18,
  xl:   22,
  xxl:  28,
  xxxl: 36,
  hero: 48,
};

export const LINE_HEIGHTS = {
  tight:  1.2,
  normal: 1.5,
  loose:  1.8,
};


// ─── Spacing ──────────────────────────────────────────────────────────────────
// Based on a 4-pt grid. Use multiples of 4 for consistent rhythm.

export const SPACING = {
  xs:   4,
  sm:   8,
  md:   12,
  base: 16,
  lg:   24,
  xl:   32,
  xxl:  48,
  xxxl: 64,
};


// ─── Border Radii ─────────────────────────────────────────────────────────────

export const RADIUS = {
  sm:     6,
  md:     10,
  lg:     16,
  xl:     24,
  round:  999,   // Fully circular (for badges, pills)
};


// ─── Shadows ──────────────────────────────────────────────────────────────────
// iOS uses shadowColor/offset/radius; Android uses elevation.
// Include both in every shadow preset.

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  lg: {
    shadowColor: COLORS.navyDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  glow: {
    // Gold "glow" effect used on selected/active elements
    shadowColor: COLORS.yellow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
};


// ─── Animation Durations ──────────────────────────────────────────────────────

export const DURATIONS = {
  fast:   150,   // Micro-interactions (button press)
  normal: 300,   // Standard transitions
  slow:   500,   // Page-level fades / slides
  xslow:  800,   // Progress bars, score counters
};


// ─── Layout ───────────────────────────────────────────────────────────────────

export const LAYOUT = {
  screenPadding:    SPACING.base,
  cardPadding:      SPACING.lg,
  headerHeight:     60,
  bottomTabHeight:  56,
};

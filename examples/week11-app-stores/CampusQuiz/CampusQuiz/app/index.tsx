/**
 * app/index.tsx  (Login Screen)
 * ─────────────────────────────────────────────────────────────────────────────
 * The first screen users see. Handles:
 *   • Login with username + password against the local SQLite database
 *   • A "Register" toggle that lets new users create an account
 *   • Animated entrance: elements slide in from below + fade in on mount
 *   • Field-level validation with friendly error messages
 *   • TestFlight-ready: the DB is pre-seeded with testflight / demo1234
 *
 * Navigation:
 *   On successful login → router.replace('/categories')
 *   replace() is used instead of push() so the back button from categories
 *   doesn't return here (the user is already authenticated).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { loginUser, registerUser } from '../database/db';
import { setCurrentUser } from '../hooks/useAuth';
import PittButton from '../components/PittButton';
import {
  COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOWS, DURATIONS
} from '../constants/theme';

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginScreen() {
  // ── Form state ───────────────────────────────────────────────────────────
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [confirmPw, setConfirmPw]   = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [showPw, setShowPw]         = useState(false);

  // ── Input refs (for keyboard "Next" focus chain) ─────────────────────────
  const passwordRef = useRef<TextInput>(null);
  const confirmRef  = useRef<TextInput>(null);

  // ── Entrance animations ──────────────────────────────────────────────────
  // Each major UI block slides up and fades in on mount
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(40)).current;
  const logoScale  = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    // Stagger: logo pops in first, then the form slides up
    Animated.sequence([
      // Logo scale-up
      Animated.spring(logoScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 12,
        bounciness: 10,
      }),
      // Form slide + fade
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: DURATIONS.slow,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          speed: 14,
          bounciness: 6,
        }),
      ]),
    ]).start();
  }, []);

  // ── Validation ───────────────────────────────────────────────────────────

  function validate(): string | null {
    if (!username.trim())          return 'Username is required.';
    if (username.trim().length < 3) return 'Username must be at least 3 characters.';
    if (!password)                  return 'Password is required.';
    if (password.length < 4)        return 'Password must be at least 4 characters.';
    if (isRegister && password !== confirmPw)
                                    return 'Passwords do not match.';
    return null;
  }

  // ── Submit handler ───────────────────────────────────────────────────────

  function handleSubmit() {
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    // Wrap in a tiny timeout so the loading spinner is visible for at least
    // one render cycle before the synchronous DB call blocks the thread.
    setTimeout(() => {
      if (isRegister) {
        // ── Registration path ──────────────────────────────────────────────
        const success = registerUser(username.trim(), password);
        if (success) {
          setCurrentUser(username.trim());
          router.replace('/categories');
        } else {
          setError('That username is already taken. Please choose another.');
        }
      } else {
        // ── Login path ────────────────────────────────────────────────────
        const user = loginUser(username.trim(), password);
        if (user) {
          setCurrentUser(user.username);
          router.replace('/categories');
        } else {
          setError('Incorrect username or password. Please try again.');
        }
      }
      setLoading(false);
    }, 100);
  }

  // ── Toggle between Login / Register modes ────────────────────────────────

  function toggleMode() {
    setIsRegister(prev => !prev);
    setError('');
    setConfirmPw('');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* ── Hero / Logo area ───────────────────────────────────────────────── */}
        <View style={styles.hero}>
          {/* Decorative background circle */}
          <View style={styles.heroBg} />

          {/* Animated Pitt logo badge */}
          <Animated.View
            style={[styles.logoBadge, { transform: [{ scale: logoScale }] }]}
          >
            <Text style={styles.logoEmoji}>🐾</Text>
          </Animated.View>

          <Text style={styles.appName}>CampusQuiz</Text>
          <Text style={styles.tagline}>University of Pittsburgh at Bradford</Text>
        </View>

        {/* ── Form card ──────────────────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
            SHADOWS.lg,
          ]}
        >
          {/* Form title */}
          <Text style={styles.formTitle}>
            {isRegister ? 'Create Account' : 'Sign In'}
          </Text>

          {/* Error banner */}
          {error ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>⚠  {error}</Text>
            </View>
          ) : null}

          {/* ── Username field ───────────────────────────────────────────────── */}
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={v => { setUsername(v); setError(''); }}
              placeholder="Enter username"
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </View>

          {/* ── Password field ───────────────────────────────────────────────── */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              ref={passwordRef}
              style={styles.input}
              value={password}
              onChangeText={v => { setPassword(v); setError(''); }}
              placeholder="Enter password"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry={!showPw}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType={isRegister ? 'next' : 'done'}
              onSubmitEditing={() =>
                isRegister ? confirmRef.current?.focus() : handleSubmit()
              }
            />
            {/* Show/hide password toggle */}
            <TouchableOpacity onPress={() => setShowPw(p => !p)} style={styles.eyeBtn}>
              <Text style={styles.eyeIcon}>{showPw ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>

          {/* ── Confirm password (registration only) ────────────────────────── */}
          {isRegister && (
            <>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  ref={confirmRef}
                  style={styles.input}
                  value={confirmPw}
                  onChangeText={v => { setConfirmPw(v); setError(''); }}
                  placeholder="Re-enter password"
                  placeholderTextColor={COLORS.textMuted}
                  secureTextEntry={!showPw}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
              </View>
            </>
          )}

          {/* ── Submit button ────────────────────────────────────────────────── */}
          <PittButton
            label={isRegister ? 'Create Account' : 'Sign In'}
            onPress={handleSubmit}
            loading={loading}
            variant="gold"
            icon={isRegister ? '✨' : '🎓'}
            style={styles.submitBtn}
          />

          {/* ── Toggle login / register ──────────────────────────────────────── */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
            </Text>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={styles.toggleLink}>
                {isRegister ? ' Sign In' : ' Register'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ── TestFlight hint (visible for review) ──────────────────────────── */}
        <View style={styles.testflightHint}>
          <Text style={styles.hintText}>
            🧪 TestFlight demo: testflight / demo1234
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.xxxl,
  },

  // Hero
  hero: {
    alignItems: 'center',
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.xl,
    position: 'relative',
  },
  heroBg: {
    position: 'absolute',
    top: 0,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.navyLight,
    opacity: 0.3,
  },
  logoBadge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.navy,
    borderWidth: 3,
    borderColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.base,
    ...SHADOWS.lg,
  },
  logoEmoji: {
    fontSize: 44,
  },
  appName: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONTS.extraBold,
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gold,
    marginTop: SPACING.xs,
    fontWeight: FONTS.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Form card
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.navyLight,
  },
  formTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.base,
    textAlign: 'center',
  },
  errorBanner: {
    backgroundColor: COLORS.wrongBg,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.wrong,
  },
  errorText: {
    color: COLORS.wrong,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONTS.medium,
  },

  // Inputs
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: FONTS.semiBold,
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.navyLight,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.neutral,
    paddingHorizontal: SPACING.md,
    height: 52,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    fontWeight: FONTS.regular,
  },
  eyeBtn: {
    padding: SPACING.xs,
  },
  eyeIcon: {
    fontSize: 18,
  },

  // Buttons
  submitBtn: {
    marginTop: SPACING.xl,
  },

  // Toggle
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.base,
  },
  toggleText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
  toggleLink: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONTS.bold,
  },

  // TestFlight hint
  testflightHint: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.navyLight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.navyDark,
    alignItems: 'center',
  },
  hintText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
});

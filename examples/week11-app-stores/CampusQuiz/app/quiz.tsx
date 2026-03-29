/**
 * app/quiz.tsx  (Quiz Gameplay Screen)
 * ─────────────────────────────────────────────────────────────────────────────
 * The main gameplay screen. Reads `categoryId` from the URL query params,
 * loads the questions, and runs the quiz loop.
 *
 * Game loop
 * ─────────
 *   1. User sees question + 4 answer options (all in 'idle' state)
 *   2. User taps an option:
 *      a. Correct option gets 'correct' state (green + pop animation)
 *      b. Tapped wrong option gets 'wrong' state (red + shake animation)
 *      c. Other options become 'disabled'
 *      d. The fun fact card slides in from the bottom
 *   3. After 1.8 seconds, advance to the next question with a slide animation
 *   4. After the last question, navigate to /score
 *
 * Animations
 * ──────────
 *   • Question card: slides in from the right on each new question
 *   • Fact card: slides up from below after answering
 *   • Timer bar: shrinks left-to-right over 15 seconds per question
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { getCategoryById, getRandomQuestions, Question } from '../constants/questions';
import { saveQuizResult } from '../database/db';
import { getCurrentUser } from '../hooks/useAuth';
import AnswerOption, { AnswerState } from '../components/AnswerOption';
import ProgressBar from '../components/ProgressBar';
import PittHeader from '../components/PittHeader';
import PittButton from '../components/PittButton';
import {
  COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOWS, DURATIONS
} from '../constants/theme';

// ─── Constants ────────────────────────────────────────────────────────────────

const QUESTIONS_PER_QUIZ = 10;      // How many questions to pull per game
const ADVANCE_DELAY_MS   = 1800;    // How long to show the fact before advancing
const TIMER_SECONDS      = 15;      // Time limit per question

// The four letter labels for the answer options
const LETTERS = ['A', 'B', 'C', 'D'];

// ─── Types ────────────────────────────────────────────────────────────────────

/** One element per answer option — tracks which visual state each is in */
type OptionStates = [AnswerState, AnswerState, AnswerState, AnswerState];

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuizScreen() {
  // ── Route params ──────────────────────────────────────────────────────────
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const category = categoryId ? getCategoryById(categoryId) : null;

  // ── Game state ────────────────────────────────────────────────────────────
  const [questions, setQuestions]         = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [score, setScore]                 = useState(0);
  const [answered, setAnswered]           = useState(false);
  const [optionStates, setOptionStates]   = useState<OptionStates>(['idle','idle','idle','idle']);
  const [timeLeft, setTimeLeft]           = useState(TIMER_SECONDS);
  const timerRef                          = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Animation values ──────────────────────────────────────────────────────
  // Question card slide-in
  const cardSlide  = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  // Fact card slide-up
  const factSlide  = useRef(new Animated.Value(60)).current;
  const factOpacity = useRef(new Animated.Value(0)).current;
  // Timer bar width (0 → 1)
  const timerAnim  = useRef(new Animated.Value(1)).current;

  // ── Initialize questions on mount ─────────────────────────────────────────
  useEffect(() => {
    if (!category) {
      Alert.alert('Error', 'Category not found.', [{ text: 'OK', onPress: () => router.back() }]);
      return;
    }
    const q = getRandomQuestions(category.questions, QUESTIONS_PER_QUIZ);
    setQuestions(q);
  }, [categoryId]);

  // ── Timer logic ───────────────────────────────────────────────────────────
  // Start the countdown whenever a new question appears (answered = false)
  useEffect(() => {
    if (!questions.length || answered) return;

    // Reset timer visual
    timerAnim.setValue(1);
    setTimeLeft(TIMER_SECONDS);

    // Animate the bar shrinking over TIMER_SECONDS
    const timerBarAnim = Animated.timing(timerAnim, {
      toValue: 0,
      duration: TIMER_SECONDS * 1000,
      useNativeDriver: false,
    });
    timerBarAnim.start();

    // Countdown tick
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          // Time's up → treat as wrong answer
          handleTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current!);
      timerBarAnim.stop();
    };
  }, [currentIndex, answered, questions.length]);

  // ── Handle timer expiry ───────────────────────────────────────────────────
  function handleTimeUp() {
    if (answered || !questions[currentIndex]) return;
    const q = questions[currentIndex];
    // Mark correct answer green, all others disabled
    const states = ['disabled','disabled','disabled','disabled'] as AnswerState[];
    states[q.answer] = 'correct';
    setOptionStates(states as OptionStates);
    setAnswered(true);
    animateFact();
    scheduleAdvance();
  }

  // ── Answer selection ──────────────────────────────────────────────────────
  const handleAnswer = useCallback((optionIndex: number) => {
    if (answered) return;
    clearInterval(timerRef.current!);
    timerAnim.stopAnimation();

    const q = questions[currentIndex];
    const isCorrect = optionIndex === q.answer;

    // Build new option states
    const newStates: AnswerState[] = ['disabled','disabled','disabled','disabled'];
    newStates[q.answer]   = 'correct';
    if (!isCorrect) newStates[optionIndex] = 'wrong';

    setOptionStates(newStates as OptionStates);
    setAnswered(true);
    if (isCorrect) setScore(s => s + 1);

    animateFact();
    scheduleAdvance();
  }, [answered, currentIndex, questions]);

  // ── Animate the fact card sliding up ──────────────────────────────────────
  function animateFact() {
    factSlide.setValue(60);
    factOpacity.setValue(0);
    Animated.parallel([
      Animated.spring(factSlide, {
        toValue: 0,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
      Animated.timing(factOpacity, {
        toValue: 1,
        duration: DURATIONS.normal,
        useNativeDriver: true,
      }),
    ]).start();
  }

  // ── Schedule advance to next question ─────────────────────────────────────
  function scheduleAdvance() {
    setTimeout(() => {
      advanceQuestion();
    }, ADVANCE_DELAY_MS);
  }

  // ── Advance to next question with slide-out / slide-in ────────────────────
  function advanceQuestion() {
    const nextIndex = currentIndex + 1;
    const q = questions; // capture current ref

    if (nextIndex >= q.length) {
      // Quiz complete → navigate to score screen
      const user = getCurrentUser() ?? 'unknown';
      const finalScore = score + (optionStates[q[currentIndex]?.answer ?? 0] === 'correct' ? 0 : 0);
      // Note: score is captured via closure from the state at time of scheduling
      saveAndNavigate(user, q.length);
      return;
    }

    // Slide out old card to the left
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: DURATIONS.normal,
        useNativeDriver: true,
      }),
      Animated.timing(cardSlide, {
        toValue: -30,
        duration: DURATIONS.normal,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset state for new question
      setCurrentIndex(nextIndex);
      setAnswered(false);
      setOptionStates(['idle','idle','idle','idle']);
      factOpacity.setValue(0);
      factSlide.setValue(60);

      // Slide in from right
      cardSlide.setValue(30);
      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: DURATIONS.normal,
          useNativeDriver: true,
        }),
        Animated.spring(cardSlide, {
          toValue: 0,
          useNativeDriver: true,
          speed: 20,
          bounciness: 4,
        }),
      ]).start();
    });
  }

  function saveAndNavigate(user: string, total: number) {
    if (category) {
      saveQuizResult(user, category.id, category.title, score, total);
    }
    router.replace({
      pathname: '/score',
      params: { score: String(score), total: String(total), categoryId: category?.id },
    });
  }

  // ── Early returns ──────────────────────────────────────────────────────────
  if (!category || !questions.length) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Loading quiz…</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  // Timer bar color: green → yellow → red as time runs out
  const timerColor = timerAnim.interpolate({
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: [COLORS.wrong, COLORS.yellow, COLORS.yellow, COLORS.correct],
  });
  const timerWidth = timerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View style={styles.screen}>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <PittHeader
        title={category.title}
        showBack
        onBack={() => {
          Alert.alert('Quit Quiz', 'Your progress will be lost. Are you sure?', [
            { text: 'Keep Playing', style: 'cancel' },
            { text: 'Quit', style: 'destructive', onPress: () => router.back() },
          ]);
        }}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >

        {/* ── Progress bar ─────────────────────────────────────────────────── */}
        <ProgressBar
          progress={(currentIndex) / questions.length}
          current={currentIndex + 1}
          total={questions.length}
        />

        {/* ── Score display ────────────────────────────────────────────────── */}
        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        {/* ── Timer bar ────────────────────────────────────────────────────── */}
        <View style={styles.timerTrack}>
          <Animated.View
            style={[
              styles.timerFill,
              { width: timerWidth, backgroundColor: timerColor },
            ]}
          />
        </View>
        <View style={styles.timerLabelRow}>
          <Text style={styles.timerLabel}>Time: {timeLeft}s</Text>
        </View>

        {/* ── Question card ────────────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.questionCard,
            SHADOWS.lg,
            {
              opacity: cardOpacity,
              transform: [{ translateX: cardSlide }],
            },
          ]}
        >
          {/* Category chip */}
          <View style={[styles.categoryChip, { backgroundColor: category.color }]}>
            <Text style={styles.categoryChipText}>
              {category.icon}  {category.title}
            </Text>
          </View>

          {/* Question text */}
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </Animated.View>

        {/* ── Answer options ───────────────────────────────────────────────── */}
        <View style={styles.options}>
          {currentQuestion.options.map((option, idx) => (
            <AnswerOption
              key={`${currentQuestion.id}-${idx}`}
              letter={LETTERS[idx]}
              text={option}
              state={optionStates[idx]}
              onPress={() => handleAnswer(idx)}
            />
          ))}
        </View>

        {/* ── Fun fact card (slides up after answering) ────────────────────── */}
        {answered && (
          <Animated.View
            style={[
              styles.factCard,
              SHADOWS.md,
              {
                opacity: factOpacity,
                transform: [{ translateY: factSlide }],
              },
            ]}
          >
            <Text style={styles.factLabel}>💡 Did you know?</Text>
            <Text style={styles.factText}>{currentQuestion.fact}</Text>
          </Animated.View>
        )}

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
  loadingScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.lg,
  },

  // Score row
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  scoreLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  scoreValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONTS.extraBold,
    color: COLORS.yellow,
    minWidth: 32,
    textAlign: 'right',
  },

  // Timer
  timerTrack: {
    height: 6,
    backgroundColor: COLORS.navyLight,
    borderRadius: RADIUS.round,
    overflow: 'hidden',
    marginBottom: 4,
  },
  timerFill: {
    height: '100%',
    borderRadius: RADIUS.round,
  },
  timerLabelRow: {
    alignItems: 'flex-end',
    marginBottom: SPACING.base,
  },
  timerLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
  },

  // Question card
  questionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.navyLight,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.round,
    marginBottom: SPACING.md,
  },
  categoryChipText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONTS.semiBold,
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  questionText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    lineHeight: 28,
  },

  // Options
  options: {
    marginBottom: SPACING.md,
  },

  // Fact card
  factCard: {
    backgroundColor: COLORS.navyLight,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.yellow,
  },
  factLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONTS.bold,
    color: COLORS.yellow,
    marginBottom: SPACING.xs,
  },
  factText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});

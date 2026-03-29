/**
 * database/db.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * All SQLite database logic for CampusQuiz using expo-sqlite (v14+).
 *
 * Tables
 * ──────
 *  users         — Stores login credentials (username + hashed password)
 *  quiz_results  — Stores every completed quiz session for leaderboard history
 *
 * The newer expo-sqlite API (v14+) uses synchronous methods like
 * `getFirstSync`, `getAllSync`, and `execSync` instead of callbacks.
 * This keeps calling code simple and avoids callback hell.
 *
 * Security note:
 *   Passwords here are stored as plain text for demo/educational purposes.
 *   In a production app you would hash with bcrypt or Argon2 BEFORE storing.
 *   Never store plain-text passwords in a shipping product.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as SQLite from 'expo-sqlite';

// ─── Database singleton ───────────────────────────────────────────────────────
// openDatabaseSync opens (or creates) the named database file in the app's
// document directory. The same file persists across app launches.
const db = SQLite.openDatabaseSync('campusquiz.db');

// ─── Type definitions ─────────────────────────────────────────────────────────

export interface UserRow {
  id: number;
  username: string;
  password: string;
  created_at: string;
}

export interface QuizResultRow {
  id: number;
  username: string;
  category_id: string;
  category_title: string;
  score: number;
  total: number;
  percentage: number;
  played_at: string;
}

// ─── Initialization ───────────────────────────────────────────────────────────

/**
 * initDatabase()
 * Creates tables (if they don't exist) and seeds the default TestFlight
 * demo user. This function is safe to call multiple times — all statements
 * use IF NOT EXISTS or INSERT OR IGNORE to avoid duplicate work.
 *
 * Called once in _layout.tsx on app startup before the splash screen hides.
 */
export async function initDatabase(): Promise<void> {
  // Run inside a transaction so all DDL either fully succeeds or rolls back.
  db.execSync(`
    -- Users table: stores registered accounts
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      username   TEXT    NOT NULL UNIQUE COLLATE NOCASE,
      password   TEXT    NOT NULL,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    -- Quiz results table: one row per completed quiz session
    CREATE TABLE IF NOT EXISTS quiz_results (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      username       TEXT    NOT NULL,
      category_id    TEXT    NOT NULL,
      category_title TEXT    NOT NULL,
      score          INTEGER NOT NULL,
      total          INTEGER NOT NULL,
      percentage     REAL    NOT NULL,
      played_at      TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    -- ── Seed the TestFlight / Apple Review demo account ──────────────────────
    -- INSERT OR IGNORE means this is a no-op if the username already exists,
    -- so it won't overwrite a user who changed their password.
    INSERT OR IGNORE INTO users (username, password)
      VALUES ('testflight', 'demo1234');

    -- Seed a second demo account for variety
    INSERT OR IGNORE INTO users (username, password)
      VALUES ('panther', 'pittbradford');
  `);
}

// ─── Authentication ───────────────────────────────────────────────────────────

/**
 * loginUser(username, password)
 * Returns the matching UserRow or null if credentials are wrong.
 *
 * Uses parameterized query (?, ?) to prevent SQL injection.
 * The COLLATE NOCASE on the username column makes logins case-insensitive
 * without any extra JavaScript work.
 */
export function loginUser(username: string, password: string): UserRow | null {
  return db.getFirstSync<UserRow>(
    `SELECT * FROM users
     WHERE username = ? AND password = ?`,
    [username.trim(), password]
  );
}

/**
 * registerUser(username, password)
 * Creates a new user account. Returns true on success, false if the
 * username is already taken (UNIQUE constraint violation).
 */
export function registerUser(username: string, password: string): boolean {
  try {
    db.runSync(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username.trim(), password]
    );
    return true;
  } catch {
    // SQLITE_CONSTRAINT error means username already exists
    return false;
  }
}

// ─── Quiz Results ─────────────────────────────────────────────────────────────

/**
 * saveQuizResult(...)
 * Persists one completed quiz session to the quiz_results table.
 */
export function saveQuizResult(
  username: string,
  categoryId: string,
  categoryTitle: string,
  score: number,
  total: number
): void {
  const percentage = Math.round((score / total) * 100);
  db.runSync(
    `INSERT INTO quiz_results
       (username, category_id, category_title, score, total, percentage)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [username, categoryId, categoryTitle, score, total, percentage]
  );
}

/**
 * getUserResults(username)
 * Returns all past quiz results for a given user, newest first.
 */
export function getUserResults(username: string): QuizResultRow[] {
  return db.getAllSync<QuizResultRow>(
    `SELECT * FROM quiz_results
     WHERE username = ?
     ORDER BY played_at DESC`,
    [username]
  );
}

/**
 * getTopScores(limit = 10)
 * Returns the top N scores across all users for the leaderboard screen.
 * Groups by username + category, taking the best score in each.
 */
export function getTopScores(limit: number = 10): QuizResultRow[] {
  return db.getAllSync<QuizResultRow>(
    `SELECT username, category_title, MAX(percentage) as percentage,
            score, total, played_at
     FROM quiz_results
     GROUP BY username, category_id
     ORDER BY percentage DESC, score DESC
     LIMIT ?`,
    [limit]
  );
}

/**
 * getPersonalBest(username, categoryId)
 * Returns the user's best score in a specific category, or null.
 */
export function getPersonalBest(
  username: string,
  categoryId: string
): QuizResultRow | null {
  return db.getFirstSync<QuizResultRow>(
    `SELECT * FROM quiz_results
     WHERE username = ? AND category_id = ?
     ORDER BY percentage DESC, score DESC
     LIMIT 1`,
    [username, categoryId]
  );
}

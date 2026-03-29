/**
 * hooks/useAuth.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom hook that manages the currently logged-in user throughout the app.
 *
 * Why a custom hook?
 *   React's useState only lives in one component. We need the logged-in user
 *   to be accessible from multiple screens (Quiz, Score, Leaderboard).
 *   This hook wraps a simple module-level variable that acts as global state
 *   without requiring Redux or Context — appropriate for a small app.
 *
 * For a larger app, consider replacing this with:
 *   - React Context + useContext
 *   - Zustand (lightweight global state)
 *   - Redux Toolkit
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useCallback } from 'react';

// ─── Module-level "global" state ──────────────────────────────────────────────
// This is a simple in-memory singleton. It works because React Native runs in
// a single JS thread and there is only ever one user session active.
// The variable persists across screen navigations but resets on app restart.

let _currentUser: string | null = null;
// Listener list so multiple hook instances stay in sync when user changes
const _listeners: Array<(user: string | null) => void> = [];

function setGlobalUser(user: string | null) {
  _currentUser = user;
  // Notify all hook instances (e.g. header in _layout + profile screen)
  _listeners.forEach(fn => fn(user));
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UseAuthReturn {
  /** The currently logged-in username, or null if not signed in */
  currentUser: string | null;
  /** Call after a successful loginUser() to set the session */
  signIn: (username: string) => void;
  /** Clears the session — call on logout */
  signOut: () => void;
  /** True if a user is currently logged in */
  isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<string | null>(_currentUser);

  // Register this component as a listener so it re-renders on user changes
  // triggered by other components
  useState(() => {
    const listener = (u: string | null) => setUser(u);
    _listeners.push(listener);
    return () => {
      const idx = _listeners.indexOf(listener);
      if (idx > -1) _listeners.splice(idx, 1);
    };
  });

  const signIn = useCallback((username: string) => {
    setGlobalUser(username);
  }, []);

  const signOut = useCallback(() => {
    setGlobalUser(null);
  }, []);

  return {
    currentUser: user,
    signIn,
    signOut,
    isAuthenticated: user !== null,
  };
}

// ─── Standalone helpers (for non-hook contexts) ───────────────────────────────

/** Read the current user without subscribing to changes */
export function getCurrentUser(): string | null {
  return _currentUser;
}

/** Set the user from outside a React component (e.g. after DB login check) */
export function setCurrentUser(username: string | null): void {
  setGlobalUser(username);
}

const FEEDBACK_STORAGE_KEY = 'week8_feedback_items';

export function loadFeedback() {
  const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFeedback(items) {
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(items));
}

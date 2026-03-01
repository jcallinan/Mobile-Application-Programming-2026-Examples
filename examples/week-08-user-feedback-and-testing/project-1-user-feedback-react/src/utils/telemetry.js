const TELEMETRY_KEY = 'student-feedback-telemetry-events';

function safeReadEvents() {
  try {
    const raw = localStorage.getItem(TELEMETRY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeWriteEvents(events) {
  localStorage.setItem(TELEMETRY_KEY, JSON.stringify(events));
}

export function loadTelemetryEvents() {
  return safeReadEvents();
}

export function clearTelemetryEvents() {
  safeWriteEvents([]);
}

export function trackEvent(name, details = {}) {
  const event = {
    id: crypto.randomUUID(),
    name,
    details,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    userAgent: navigator.userAgent,
  };

  const existing = safeReadEvents();
  const updated = [event, ...existing].slice(0, 100);
  safeWriteEvents(updated);

  const payload = JSON.stringify(event);

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/telemetry', payload);
  } else {
    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {
      // In this demo app we intentionally swallow network errors because
      // telemetry storage in localStorage remains available for teaching.
    });
  }

  return event;
}

export function downloadTelemetry(events) {
  const blob = new Blob([JSON.stringify(events, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'telemetry-events.json';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleString();
}

export default function TelemetryPanel({ events, onClear, onDownload }) {
  const eventCounts = events.reduce((counts, event) => {
    counts[event.name] = (counts[event.name] || 0) + 1;
    return counts;
  }, {});

  return (
    <section className="card">
      <h2>Telemetry</h2>
      <p className="hint">
        This optional telemetry demo tracks anonymous usage events such as page views, feedback
        submissions, and external link clicks.
      </p>

      <div className="telemetry-actions">
        <button type="button" onClick={onDownload} disabled={events.length === 0}>
          Export JSON
        </button>
        <button type="button" className="button-secondary" onClick={onClear}>
          Clear Events
        </button>
      </div>

      {events.length === 0 ? (
        <p>No telemetry events captured yet.</p>
      ) : (
        <>
          <p>Total Events: {events.length}</p>
          <ul className="telemetry-summary-list">
            {Object.entries(eventCounts).map(([name, count]) => (
              <li key={name}>
                <strong>{name}</strong>: {count}
              </li>
            ))}
          </ul>

          <details>
            <summary>Recent events</summary>
            <ul className="feedback-list">
              {events.slice(0, 10).map((event) => (
                <li key={event.id} className="feedback-item">
                  <div className="feedback-header">
                    <strong>{event.name}</strong>
                    <small>{formatDate(event.timestamp)}</small>
                  </div>
                  <small>{JSON.stringify(event.details)}</small>
                </li>
              ))}
            </ul>
          </details>
        </>
      )}
    </section>
  );
}

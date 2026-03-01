function formatDate(isoString) {
  return new Date(isoString).toLocaleString();
}

export default function FeedbackList({ items }) {
  return (
    <section className="card">
      <h2>Recent Feedback</h2>
      {items.length === 0 ? (
        <p>No feedback yet. Be the first to share your thoughts.</p>
      ) : (
        <ul className="feedback-list">
          {items.map((item) => (
            <li key={item.id} className="feedback-item">
              <div className="feedback-header">
                <strong>{item.name}</strong>
                <span>{item.rating} / 5</span>
              </div>
              <p>{item.comment}</p>
              <small>{formatDate(item.createdAt)}</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

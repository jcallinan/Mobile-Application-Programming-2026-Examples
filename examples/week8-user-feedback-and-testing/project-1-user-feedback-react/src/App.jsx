import { useMemo, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import { loadFeedback, saveFeedback } from './utils/storage';

export default function App() {
  const [feedbackItems, setFeedbackItems] = useState(loadFeedback);

  const averageRating = useMemo(() => {
    if (feedbackItems.length === 0) return 0;
    const total = feedbackItems.reduce((sum, item) => sum + item.rating, 0);
    return (total / feedbackItems.length).toFixed(1);
  }, [feedbackItems]);

  const addFeedback = (newFeedback) => {
    const updated = [newFeedback, ...feedbackItems];
    setFeedbackItems(updated);
    saveFeedback(updated);
  };

  return (
    <main className="container">
      <h1>Student Feedback Board</h1>
      <p className="subtitle">
        Collect quick feedback after each class and keep it saved in the browser.
      </p>

      <section className="stats-card">
        <h2>Summary</h2>
        <p>Total Responses: {feedbackItems.length}</p>
        <p>Average Rating: {averageRating} / 5</p>
      </section>

      <FeedbackForm onSubmit={addFeedback} />
      <FeedbackList items={feedbackItems} />
    </main>
  );
}

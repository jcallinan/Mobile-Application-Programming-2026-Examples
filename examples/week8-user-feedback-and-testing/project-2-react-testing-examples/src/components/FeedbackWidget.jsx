import { useState } from 'react';
import { calculateAverageRating } from '../utils';

export default function FeedbackWidget() {
  const [items, setItems] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const average = calculateAverageRating(items);

  const submitFeedback = (event) => {
    event.preventDefault();
    if (!comment.trim()) return;

    setItems((prev) => [...prev, { comment: comment.trim(), rating }]);
    setComment('');
    setRating(5);
  };

  return (
    <main>
      <h1>Feedback Widget</h1>
      <p data-testid="average-rating">Average: {average}</p>

      <form onSubmit={submitFeedback}>
        <label htmlFor="comment">Comment</label>
        <input
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />

        <button type="submit">Add Feedback</button>
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={`${item.comment}-${index}`}>
            {item.comment} ({item.rating}/5)
          </li>
        ))}
      </ul>
    </main>
  );
}

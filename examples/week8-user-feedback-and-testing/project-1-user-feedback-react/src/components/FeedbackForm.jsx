import { useState } from 'react';

const initialForm = {
  name: '',
  rating: 5,
  comment: '',
};

export default function FeedbackForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.comment.trim()) return;

    onSubmit({
      id: crypto.randomUUID(),
      name: form.name.trim() || 'Anonymous Student',
      rating: form.rating,
      comment: form.comment.trim(),
      createdAt: new Date().toISOString(),
    });

    setForm(initialForm);
  };

  return (
    <section className="card">
      <h2>Leave Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label>
          Name (optional)
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>

        <label>
          Rating
          <input
            type="range"
            min="1"
            max="5"
            name="rating"
            value={form.rating}
            onChange={handleChange}
          />
          <span>{form.rating} / 5</span>
        </label>

        <label>
          Comment
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="What went well? What should improve?"
            required
          />
        </label>

        <button type="submit">Submit Feedback</button>
      </form>
    </section>
  );
}

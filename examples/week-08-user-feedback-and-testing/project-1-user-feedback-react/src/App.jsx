import { useEffect, useMemo, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import TelemetryPanel from './components/TelemetryPanel';
import { loadFeedback, saveFeedback } from './utils/storage';
import {
  clearTelemetryEvents,
  downloadTelemetry,
  loadTelemetryEvents,
  trackEvent,
} from './utils/telemetry';

const feedbackChannels = [
  {
    title: 'Email the Developer',
    description:
      'Prefer writing a full message? Send details, screenshots, or ideas directly via email.',
    actionLabel: 'Send Email',
    href: 'mailto:developer@example.com?subject=Student%20Feedback%20Board%20Feedback',
  },
  {
    title: 'Report a Bug',
    description:
      'Found something broken? Open an issue and include steps to reproduce the problem.',
    actionLabel: 'Open Bug Form',
    href: 'https://github.com/jcallinan/Mobile-Application-Programming-2026-Examples/issues/new?template=bug_report.md',
  },
  {
    title: 'Request a Feature',
    description:
      'Have an idea for improvement? Share new feature suggestions with examples.',
    actionLabel: 'Suggest Feature',
    href: 'https://github.com/jcallinan/Mobile-Application-Programming-2026-Examples/issues/new?template=feature_request.md',
  },
  {
    title: 'Quick Poll (Anonymous)',
    description:
      'Use a short survey for instant anonymous input when students are short on time.',
    actionLabel: 'Open Poll Example',
    href: 'https://forms.gle/example-feedback-form',
  },
];

export default function App() {
  const [feedbackItems, setFeedbackItems] = useState(loadFeedback);
  const [telemetryEvents, setTelemetryEvents] = useState(loadTelemetryEvents);

  useEffect(() => {
    trackEvent('page_view', { page: 'student-feedback-board' });
    setTelemetryEvents(loadTelemetryEvents());
  }, []);

  const averageRating = useMemo(() => {
    if (feedbackItems.length === 0) return 0;
    const total = feedbackItems.reduce((sum, item) => sum + item.rating, 0);
    return (total / feedbackItems.length).toFixed(1);
  }, [feedbackItems]);

  const addFeedback = (newFeedback) => {
    const updated = [newFeedback, ...feedbackItems];
    setFeedbackItems(updated);
    saveFeedback(updated);

    trackEvent('feedback_submitted', {
      rating: newFeedback.rating,
      hasName: newFeedback.name !== 'Anonymous Student',
      commentLength: newFeedback.comment.length,
    });
    setTelemetryEvents(loadTelemetryEvents());
  };

  const handleChannelClick = (channel) => {
    trackEvent('feedback_channel_clicked', {
      channelTitle: channel.title,
      channelHref: channel.href,
    });
    setTelemetryEvents(loadTelemetryEvents());
  };

  const handleClearTelemetry = () => {
    clearTelemetryEvents();
    setTelemetryEvents([]);
  };

  const handleDownloadTelemetry = () => {
    downloadTelemetry(telemetryEvents);
    trackEvent('telemetry_exported', {
      exportedCount: telemetryEvents.length,
    });
    setTelemetryEvents(loadTelemetryEvents());
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

      <section className="card">
        <h2>Other Ways to Share Feedback</h2>
        <p className="hint">
          Not everyone wants to use the in-app form. Offer multiple channels so students can
          choose what feels easiest.
        </p>
        <ul className="channel-list">
          {feedbackChannels.map((channel) => (
            <li key={channel.title} className="channel-item">
              <h3>{channel.title}</h3>
              <p>{channel.description}</p>
              <a
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleChannelClick(channel)}
              >
                {channel.actionLabel}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <TelemetryPanel
        events={telemetryEvents}
        onClear={handleClearTelemetry}
        onDownload={handleDownloadTelemetry}
      />

      <FeedbackList items={feedbackItems} />
    </main>
  );
}

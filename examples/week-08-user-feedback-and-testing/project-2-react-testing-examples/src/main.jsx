import React from 'react';
import { createRoot } from 'react-dom/client';
import FeedbackWidget from './components/FeedbackWidget';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FeedbackWidget />
  </React.StrictMode>
);

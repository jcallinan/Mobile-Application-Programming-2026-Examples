import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedbackWidget from '../components/FeedbackWidget';

describe('FeedbackWidget (integration/component test)', () => {
  test('accepts user input and renders added feedback', async () => {
    const user = userEvent.setup();
    render(<FeedbackWidget />);

    await user.type(screen.getByLabelText(/comment/i), 'Great lecture');
    await user.clear(screen.getByLabelText(/rating/i));
    await user.type(screen.getByLabelText(/rating/i), '4');
    await user.click(screen.getByRole('button', { name: /add feedback/i }));

    expect(screen.getByText('Great lecture (4/5)')).toBeInTheDocument();
    expect(screen.getByTestId('average-rating')).toHaveTextContent('Average: 4');
  });
});

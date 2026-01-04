import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  it('increments the count when clicked', () => {
    render(<Counter initial={2} />);
    const button = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(button);

    expect(screen.getByTestId('count')).toHaveTextContent('3');
  });
});

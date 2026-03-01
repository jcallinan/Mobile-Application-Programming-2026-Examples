import { render, screen } from '@testing-library/react';
import InstructorGreeting from '../components/InstructorGreeting';

vi.mock('../api', () => ({
  fetchInstructorName: vi.fn().mockResolvedValue('Prof. Rivera'),
}));

describe('InstructorGreeting (mock test)', () => {
  test('renders mocked instructor name', async () => {
    render(<InstructorGreeting />);

    expect(screen.getByText(/hello, loading/i)).toBeInTheDocument();
    expect(await screen.findByText('Hello, Prof. Rivera!')).toBeInTheDocument();
  });
});

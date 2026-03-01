import { render } from '@testing-library/react';
import ProfileCard from '../components/ProfileCard';

describe('ProfileCard (snapshot test)', () => {
  test('matches snapshot', () => {
    const { container } = render(
      <ProfileCard name="Ada Lovelace" course="Mobile Application Programming" />
    );

    expect(container).toMatchSnapshot();
  });
});

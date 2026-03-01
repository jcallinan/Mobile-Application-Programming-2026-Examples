import { calculateAverageRating } from '../utils';

describe('calculateAverageRating (unit test)', () => {
  test('returns 0 when no feedback exists', () => {
    expect(calculateAverageRating([])).toBe(0);
  });

  test('returns average rating rounded to one decimal', () => {
    const input = [{ rating: 5 }, { rating: 4 }, { rating: 3 }];
    expect(calculateAverageRating(input)).toBe(4);
  });
});

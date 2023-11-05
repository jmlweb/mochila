import { complement } from './complement';

describe('complement', () => {
  const isEven = (n: number) => n % 2 === 0;
  const isOdd = complement(isEven);

  it('returns a function that returns the opposite of the predicate', () => {
    expect(isOdd(3)).toBe(true);
    expect(isOdd(2)).toBe(false);
  });
});

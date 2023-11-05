import { none } from './none';

describe('none', () => {
  it('returns true if no elements satisfy the predicate', () => {
    expect(none((x: number) => x > 2)([1, 2])).toBe(true);
  });
  it('returns false if any element satisfies the predicate', () => {
    expect(none((x: number) => x > 2)([1, 2, 3])).toBe(false);
  });
  it('returns true if the array is empty', () => {
    expect(none((x: number) => x > 2)([])).toBe(true);
  });
});

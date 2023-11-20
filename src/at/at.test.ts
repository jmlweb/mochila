import { at } from './at';

describe('at', () => {
  it('returns the element at the specified index', () => {
    const result = at(1)([1, 2, 3] as const);
    expect(result).toBe(2);
  });

  it('returns undefined if the index is out of bounds', () => {
    const result = at(3)([1, 2, 3] as const);
    expect(result).toBe(undefined);
  });

  it('works with negative numbers', () => {
    const result = at(-1)([1, 2, 3] as const);
    expect(result).toBe(3);
  });
});

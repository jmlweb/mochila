import { parsePosition } from './parsePosition';

describe('parsePosition', () => {
  it('returns the given position if it is positive', () => {
    expect(parsePosition(0)([1, 2, 3])).toBe(0);
    expect(parsePosition(1)([1, 2, 3])).toBe(1);
    expect(parsePosition(2)([1, 2, 3])).toBe(2);
  });

  it('returns the given position plus the length of the source if it is negative', () => {
    expect(parsePosition(-1)([1, 2, 3])).toBe(2);
    expect(parsePosition(-2)([1, 2, 3])).toBe(1);
    expect(parsePosition(-3)([1, 2, 3])).toBe(0);
  });
});

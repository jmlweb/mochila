import { prop } from './prop';

describe('prop', () => {
  it('returns the value of the given key', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(prop('a')(obj)).toBe(1);
    expect(prop('b')(obj)).toBe(2);
    expect(prop('c')(obj)).toBe(3);
  });
  it('returns undefined if the key does not exist', () => {
    const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
    expect(prop('d')(obj)).toBeUndefined();
  });
});

import { values } from './values';

describe('values', () => {
  it('returns an array of values', () => {
    const result = values({ a: 1, b: 2 } as const);
    expect(result).toEqual([1, 2]);
  });
  it('returns an empty array if the object is empty', () => {
    const result = values({} as const);
    expect(result).toEqual([]);
  });
  it('returns an array of values with mixed types', () => {
    const result = values({ a: 1, b: '2', c: true } as const);
    expect(result).toEqual([1, '2', true]);
  });
});

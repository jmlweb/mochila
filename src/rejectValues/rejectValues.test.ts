import { rejectValues } from './rejectValues';

describe('rejectValues', () => {
  it('should return a function that filters out values from a source array', () => {
    const rejectBooleans = rejectValues([true]);
    const source = [true, false, 1, 'a', false, 2, 'b', true, 3, 'c'] as const;
    const result = rejectBooleans(source);

    expect(result).toEqual([false, 1, 'a', false, 2, 'b', 3, 'c']);
  });

  it('should work with empty arrays', () => {
    const rejectBooleans = rejectValues([true]);
    const source = [] as const;
    const result = rejectBooleans(source);

    expect(result).toEqual([]);
  });
});

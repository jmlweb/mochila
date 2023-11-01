import { compact } from './compact';

describe('compact', () => {
  it('should remove null and undefined values', () => {
    const source = [1, null, 2, undefined, 3] as const;
    const result = compact(source);
    expect(result).toEqual([1, 2, 3]);
  });
});

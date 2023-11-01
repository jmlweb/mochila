import { reject } from './reject';

describe('reject', () => {
  it('rejects the items in the array matching the predicate', () => {
    const isEven = (n: number) => n % 2 === 0;
    expect(reject(isEven)([1, 2, 3, 4, 5])).toEqual([1, 3, 5]);
  });
});

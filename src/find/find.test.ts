import { find } from './find';

describe('find', () => {
  it('returns the first item that matches the predicate', () => {
    const source = [1, 2, 3, 4, 5];
    const predicate = (item: number) => item % 2 === 0;

    const actual = find(predicate)(source);

    expect(actual).toBe(2);
  });

  it('returns undefined if no item matches the predicate', () => {
    const source = [1, 2, 3, 4, 5];
    const predicate = (item: number) => item > 5;

    const actual = find(predicate)(source);

    expect(actual).toBeUndefined();
  });
});

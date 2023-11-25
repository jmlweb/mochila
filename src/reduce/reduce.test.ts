import { reduce } from './reduce';

describe('reduce', () => {
  it('should reduce an array', () => {
    const source = [1, 2, 3];
    const reducer = (acc: number, curr: number) => acc + curr;
    const expected = 6;
    const actual = reduce(0, reducer)(source);
    expect(actual).toEqual(expected);
  });

  it('should reduce an array of strings', () => {
    const source = ['a', 'b', 'c'];
    const reducer = (acc: string, curr: string) => acc + curr;
    const expected = 'abc';
    const actual = reduce('', reducer)(source);
    expect(actual).toEqual(expected);
  });

  it('should reduce an array of strings to a number', () => {
    const source = ['a', 'b', 'c'];
    const reducer = (acc: number, curr: string) => acc + curr.length;
    const expected = 3;
    const actual = reduce(0, reducer)(source);
    expect(actual).toEqual(expected);
  });
});

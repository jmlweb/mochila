import { pipe } from './pipe';

describe('pipe', () => {
  const add = (x: number) => (y: number) => x + y;
  const multiply = (x: number) => (y: number) => x * y;
  const divide = (x: number) => (y: number) => y / x;

  const add5 = add(5);
  const multiplyBy2 = multiply(2);
  const divideBy5 = divide(5);

  it('should pipe functions properly', () => {
    const piped = pipe(divideBy5, add5, multiplyBy2);

    expect(piped(10)).toBe(14);
  });

  it('should infer types properly', () => {
    const strLength = (str: string) => str.length;

    const piped = pipe(strLength, add5, multiplyBy2, (x) => [x]);

    expect(piped('hello')).toEqual([20]);
  });
});

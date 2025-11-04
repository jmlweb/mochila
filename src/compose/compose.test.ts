import { compose } from './compose';

describe('compose', () => {
  test('composes two functions right-to-left', () => {
    const add = (x: number) => x + 1;
    const multiply = (x: number) => x * 2;

    const composed = compose(add, multiply);
    expect(composed(5)).toBe(11); // multiply(5) = 10, add(10) = 11
  });

  test('composes three functions right-to-left', () => {
    const add = (x: number) => x + 1;
    const multiply = (x: number) => x * 2;
    const square = (x: number) => x * x;

    const composed = compose(add, multiply, square);
    // square(3) = 9, multiply(9) = 18, add(18) = 19
    expect(composed(3)).toBe(19);
  });

  test('works with string functions', () => {
    const toUpperCase = (x: string) => x.toUpperCase();
    const exclaim = (x: string) => `${x}!`;
    const reverse = (x: string) => x.split('').reverse().join('');

    const composed = compose(reverse, toUpperCase, exclaim);
    expect(composed('hello')).toBe('!OLLEH'); // exclaim('hello') = 'hello!', toUpperCase = 'HELLO!', reverse = '!OLLEH'
  });

  test('works with single function', () => {
    const double = (x: number) => x * 2;
    const composed = compose(double);

    expect(composed(5)).toBe(10);
  });

  test('order is right-to-left', () => {
    const increment = (x: number) => x + 1;
    const double = (x: number) => x * 2;

    // Right-to-left: double first, then increment
    const rightToLeft = compose(increment, double);
    expect(rightToLeft(5)).toBe(11); // double(5) = 10, increment(10) = 11

    // For comparison, left-to-right would be different
    const leftToRight = (x: number) => double(increment(x));
    expect(leftToRight(5)).toBe(12); // increment(5) = 6, double(6) = 12
  });

  test('works with identity function', () => {
    const identity = (x: number) => x;
    const add = (x: number) => x + 1;

    const composed = compose(add, identity);
    expect(composed(5)).toBe(6);
  });

  test('works with more functions', () => {
    const add1 = (x: number) => x + 1;
    const mul2 = (x: number) => x * 2;
    const sub3 = (x: number) => x - 3;
    const div2 = (x: number) => x / 2;

    const composed = compose(add1, mul2, sub3, div2);
    // div2(10) = 5, sub3(5) = 2, mul2(2) = 4, add1(4) = 5
    expect(composed(10)).toBe(5);
  });

  test('preserves function type', () => {
    const fn1 = (x: string) => x.toUpperCase();
    const fn2 = (x: string) => `[${x}]`;

    const composed = compose(fn1, fn2);
    expect(typeof composed).toBe('function');
    expect(composed('hello')).toBe('[HELLO]');
  });

  test('can be reused', () => {
    const double = (x: number) => x * 2;
    const add = (x: number) => x + 10;

    const composed = compose(add, double);

    expect(composed(5)).toBe(20); // double(5) = 10, add(10) = 20
    expect(composed(3)).toBe(16); // double(3) = 6, add(6) = 16
  });

  test('works with pure functions', () => {
    const reverseString = (s: string) => s.split('').reverse().join('');
    const lowerCase = (s: string) => s.toLowerCase();
    const trim = (s: string) => s.trim();

    const composed = compose(lowerCase, reverseString, trim);
    expect(composed('  HELLO  ')).toBe('olleh');
  });
});

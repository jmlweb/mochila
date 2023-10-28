import { constant } from './constant';

describe('constant', () => {
  it('should return a function that returns the value passed to constant', () => {
    const value = 'value';
    const fn = constant(value);
    expect(fn()).toBe(value);
  });
  it('should work for wrapping functions', () => {
    const fn = () => 2;
    const wrapped = constant(fn);
    expect(wrapped()).toBe(fn);
  });
});

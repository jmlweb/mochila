import { clone } from './clone';

describe('clone', () => {
  it('should clone arrays', () => {
    const array = [1, 2, 3];
    const result = clone(array);
    expect(result).toEqual(array);
    expect(result).not.toBe(array);
  });

  it('should clone objects', () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = clone(object);
    expect(result).toEqual(object);
    expect(result).not.toBe(object);
  });

  it('should clone functions', () => {
    const multiplyByTwo = (x: number) => x * 2;
    const cloned = clone(multiplyByTwo);
    expect(cloned(2)).toBe(4);
    expect(cloned).not.toBe(multiplyByTwo);
  });

  it('should return primitives', () => {
    expect(clone(1)).toBe(1);
    expect(clone('a')).toBe('a');
    expect(clone(true)).toBe(true);
    expect(clone(undefined)).toBe(undefined);
    expect(clone(null)).toBe(null);
  });
});

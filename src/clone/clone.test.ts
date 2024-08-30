import { clone } from './clone';

describe('clone', () => {
  it('should clone arrays', () => {
    const array = [1, 2, 3];
    const result = clone(array);
    expect(result).toEqual(array);
    expect(result).not.toBe(array);
  });

  it('should clone dates', () => {
    const date = new Date('2021-01-01');
    const result = clone(date);
    expect(result).toEqual(date);
    expect(result).not.toBe(date);
  });

  it('should clone regular expressions', () => {
    const regex = /abc/gi;
    const result = clone(regex);
    expect(result).toEqual(regex);
    expect(result).not.toBe(regex);
  });

  it('should clone plain objects', () => {
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

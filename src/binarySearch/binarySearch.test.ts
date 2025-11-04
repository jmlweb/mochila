import { binarySearch } from './binarySearch';

describe('binarySearch', () => {
  test('finds element in sorted array', () => {
    const compare = (x: unknown) => (x as number) - 5;
    const result = binarySearch(compare)([1, 3, 5, 7, 9]);

    expect(result).toBe(2);
  });

  test('returns negative insertion point when not found', () => {
    const compare = (x: number) => x - 4;
    const result = binarySearch(compare)([1, 3, 5, 7, 9]);

    expect(result).toBe(-3);
  });

  test('finds first element', () => {
    const compare = (x: number) => x - 1;
    const result = binarySearch(compare)([1, 3, 5, 7, 9]);

    expect(result).toBe(0);
  });

  test('finds last element', () => {
    const compare = (x: number) => x - 9;
    const result = binarySearch(compare)([1, 3, 5, 7, 9]);

    expect(result).toBe(4);
  });

  test('handles single element array', () => {
    const compare = (x: number) => x - 5;
    expect(binarySearch(compare)([5])).toBe(0);

    const compare2 = (x: number) => x - 3;
    expect(binarySearch(compare2)([5])).toBe(-1);
  });

  test('handles empty array', () => {
    const compare = (x: number) => x - 5;
    const result = binarySearch(compare)([]);

    expect(result).toBe(-1);
  });

  test('works with strings', () => {
    const compare = (x: string) => x.localeCompare('dog');
    const result = binarySearch(compare)(['ant', 'cat', 'dog', 'elephant']);

    expect(result).toBe(2);
  });

  test('returns insertion point for string not found', () => {
    const compare = (x: string) => x.localeCompare('cow');
    const result = binarySearch(compare)(['ant', 'cat', 'dog', 'elephant']);

    expect(result).toBe(-3);
  });

  test('works with objects using custom comparison', () => {
    interface Item {
      id: number;
    }

    const compare = (x: Item) => x.id - 3;
    const result = binarySearch(compare)([
      { id: 1 },
      { id: 3 },
      { id: 5 },
      { id: 7 },
    ]);

    expect(result).toBe(1);
  });

  test('handles large sorted array', () => {
    const large = Array.from({ length: 1000 }, (_, i) => i * 2);
    const compare = (x: number) => x - 500;
    const result = binarySearch(compare)(large);

    expect(result).toBe(250);
  });

  test('works with negative numbers', () => {
    const compare = (x: number) => x - -5;
    const result = binarySearch(compare)([-9, -7, -5, -3, -1]);

    expect(result).toBe(2);
  });

  test('insertion point for value before first element', () => {
    const compare = (x: number) => x - 0;
    const result = binarySearch(compare)([1, 3, 5, 7, 9]);

    expect(result).toBe(-1);
  });

  test('insertion point for value after last element', () => {
    const compare = (x: number) => x - 10;
    const result = binarySearch(compare)([1, 3, 5, 7, 9]);

    expect(result).toBe(-6);
  });
});

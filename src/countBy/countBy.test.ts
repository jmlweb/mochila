import { countBy } from './countBy';

describe('countBy', () => {
  test('should work for strings', () => {
    const source = ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'];
    const result = countBy((value: string) => value)(source);
    expect(result).toEqual({
      a: 3,
      b: 3,
      c: 3,
    });
  });

  test('should work for booleans', () => {
    const source = [0, 1, true, {}, '', false, null];
    const result = countBy(<T>(x: T) => Boolean(x))(source);
    expect(result).toEqual({
      true: 3,
      false: 4,
    });
  });

  test('should work for numbers', () => {
    const source = [
      'Our',
      'first',
      'project',
      'Freepik',
      'was',
      'founded',
      'in',
      '2010',
      'by',
      'brothers',
      'Alejandro',
      'and',
      'Pablo',
      'Blanes',
      'along',
      'with',
      'their',
      'friend',
      'Joaquín',
      'Cuenca',
      'founder',
      'of',
      'Panoramio',
      'acquired',
      'by',
      'Google',
    ];
    const result = countBy((value: string) => value.length)(source);
    expect(result).toEqual({
      '2': 4,
      '3': 3,
      '4': 2,
      '5': 4,
      '6': 4,
      '7': 5,
      '8': 2,
      '9': 2,
    });
  });
  describe('should return an empty object for empty array', () => {
    test('for strings', () => {
      const source: string[] = [];
      const result = countBy((value: string) => value)(source);
      expect(result).toEqual({});
    });
    test('for numbers', () => {
      const source: number[] = [];
      const result = countBy((value: number) => value)(source);
      expect(result).toEqual({});
    });
    test('for booleans', () => {
      const source: boolean[] = [];
      const result = countBy((value: boolean) => value)(source);
      expect(result).toEqual({});
    });
  });
});

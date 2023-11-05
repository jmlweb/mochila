import { groupBy } from './groupBy';

describe('groupBy', () => {
  test('should work for booleans', () => {
    const source = [0, 1, true, {}, '', false, null] as const;
    const result = groupBy(Boolean)(source);
    expect(result).toEqual({
      true: [1, true, {}],
      false: [0, '', false, null],
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
    const result = groupBy((value: string) => value.length)(source);
    expect(result).toEqual({
      2: ['in', 'by', 'of', 'by'],
      3: ['Our', 'was', 'and'],
      4: ['2010', 'with'],
      5: ['first', 'Pablo', 'along', 'their'],
      6: ['Blanes', 'friend', 'Cuenca', 'Google'],
      7: ['project', 'Freepik', 'founded', 'Joaquín', 'founder'],
      8: ['brothers', 'acquired'],
      9: ['Alejandro', 'Panoramio'],
    });
  });
});

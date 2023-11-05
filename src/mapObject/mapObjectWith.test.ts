import { toString } from '../toString';
import { mapObjectWith } from './mapObjectWith';

describe('mapObjectWith', () => {
  it('should map object values preserving keys', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    const result = mapObjectWith(obj)((value: number) => value + 1);

    expect(result).toEqual({
      a: 2,
      b: 3,
    });
  });

  it('should work with mixed type values', () => {
    const obj = {
      a: 1,
      b: '2',
    };

    const result = mapObjectWith(obj)((value: string | number) =>
      typeof value === 'number' ? value + 1 : value + '1',
    );

    expect(result).toEqual({
      a: 2,
      b: '21',
    });
  });

  it('should work with generics', () => {
    const obj = {
      a: 1,
      b: '2',
    } as const;

    const result = mapObjectWith(obj)(toString);

    expect(result).toEqual({
      a: '1',
      b: '2',
    });
  });
});

import { toString } from '../toString';
import { mapObject } from './mapObject';

describe('mapObject', () => {
  it('should map object values preserving keys', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    const result = mapObject((value: number) => value + 1)(obj);

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

    const result = mapObject((value: string | number) =>
      typeof value === 'number' ? value + 1 : value + '1',
    )(obj);

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

    const result = mapObject(toString<1 | '2'>)(obj);

    expect(result).toEqual({
      a: '1',
      b: '2',
    });
  });
});

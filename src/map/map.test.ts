import { toString } from '../toString';
import { map } from './map';

describe('map', () => {
  it('should map an array of numbers to strings', () => {
    const result = map(toString)([1, 2, 3] as const);
    expect(result).toEqual(['1', '2', '3']);
  });
});

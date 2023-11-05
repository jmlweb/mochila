import { toString } from '../toString';
import { mapWith } from './mapWith';

describe('mapWith', () => {
  it('should map an array of numbers to strings', () => {
    const result = mapWith([1, 2, 3] as const)(toString);
    expect(result).toEqual(['1', '2', '3']);
  });
});

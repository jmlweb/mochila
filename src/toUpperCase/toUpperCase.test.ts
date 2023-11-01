import { toUpperCase } from './toUpperCase';

describe('toUpperCase', () => {
  it('converts a string to uppercase', () => {
    expect(toUpperCase('hello')).toEqual('HELLO');
  });
  it('should work with empty strings', () => {
    expect(toUpperCase('')).toEqual('');
  });
});

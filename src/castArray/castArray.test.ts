import { castArray } from './castArray';

describe('castArray', () => {
  it('casts a value to an array', () => {
    expect(castArray('hello')).toEqual(['hello']);
  });
  it('should work with empty strings', () => {
    expect(castArray('')).toEqual(['']);
  });
  it('should work with arrays', () => {
    expect(castArray(['hello'])).toEqual(['hello']);
  });
});

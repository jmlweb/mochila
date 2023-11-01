import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('capitalizes a string', () => {
    expect(capitalize('hello')).toEqual('Hello');
  });
  it('should work with empty strings', () => {
    expect(capitalize('')).toEqual('');
  });
});

import { toLowerCase } from './toLowerCase';

describe('toLowerCase', () => {
  it('converts a string to lowercase', () => {
    expect(toLowerCase('HELLO')).toEqual('hello');
  });
  it('should work with empty strings', () => {
    expect(toLowerCase('')).toEqual('');
  });
});

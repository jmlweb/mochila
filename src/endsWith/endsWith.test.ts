import { endsWith } from './endsWith';

describe('endsWith', () => {
  it('should return the same results than the native function for strings if the searched string is found', () => {
    const search = 'c';
    const fromIndex = 1;
    const source = 'abc';
    expect(endsWith(search, fromIndex)(source)).toBe(
      source.endsWith(search, fromIndex),
    );
  });
  it('should return the same results than the native function for strings if the searched string is not found', () => {
    const search = 'b';
    const fromIndex = 1;
    const source = 'abc';
    expect(endsWith(search, fromIndex)(source)).toBe(
      source.endsWith(search, fromIndex),
    );
  });
  it('should return true if the string ends with the search string', () => {
    const endsWithFoo = endsWith('foo');
    expect(endsWithFoo('barfoo')).toBe(true);
  });
  it('should return false if the string does not end with the search string', () => {
    const endsWithFoo = endsWith('foo');
    expect(endsWithFoo('foobar')).toBe(false);
  });
  it('should return false if the search is not a string, even if the source is a string', () => {
    const endsWith2 = endsWith(2 as unknown as string);
    expect(endsWith2('002')).toBe(false);
  });
  it('should return true if the array ends with the search element', () => {
    const endsWithFoo = endsWith('foo');
    expect(endsWithFoo(['bar', 'foo'])).toBe(true);
  });
  it('should return false if the array does not end with the search element', () => {
    const endsWithFoo = endsWith('foo');
    expect(endsWithFoo(['foo', 'bar'])).toBe(false);
  });
  it('should take position into account for strings', () => {
    const endsWithFoo = endsWith('foo', 3);
    expect(endsWithFoo('fooo')).toBe(true);
    expect(endsWithFoo('foooo')).toBe(true);
    expect(endsWithFoo('foo')).toBe(true);
    expect(endsWithFoo('ofoo')).toBe(false);
  });
  it('should take position into account for arrays', () => {
    const endsWithFoo = endsWith('foo', 1);
    expect(endsWithFoo(['foo'])).toBe(true);
    expect(endsWithFoo(['foo', 'bar'])).toBe(true);
    expect(endsWithFoo(['foo', 'bar', 'baz'])).toBe(true);
    expect(endsWithFoo(['bar', 'foo'])).toBe(false);
  });
});

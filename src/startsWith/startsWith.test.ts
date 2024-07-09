import { startsWith } from './startsWith';

describe('startsWith', () => {
  it('should return true if the string starts with the search string', () => {
    const startsWithFoo = startsWith('foo');
    expect(startsWithFoo('foobar')).toBe(true);
  });
  it('should return false if the string does not start with the search string', () => {
    const startsWithFoo = startsWith('foo');
    expect(startsWithFoo('barfoo')).toBe(false);
  });
  it('should return false if the search is not a string, even if the source is a string', () => {
    const startsWith2 = startsWith(2 as unknown as string);
    expect(startsWith2('200')).toBe(false);
  });
  it('should return true if the array starts with the search element', () => {
    const startsWithFoo = startsWith('foo');
    expect(startsWithFoo(['foo', 'bar'])).toBe(true);
  });
  it('should return false if the array does not start with the search element', () => {
    const startsWithFoo = startsWith('foo');
    expect(startsWithFoo(['bar', 'foo'])).toBe(false);
  });
  it('should take position into account for strings', () => {
    const startsWithFoo = startsWith('foo', 1);
    expect(startsWithFoo('foobar')).toBe(false);
    expect(startsWithFoo('bfoo')).toBe(true);
  });
  it('should take position into account for arrays', () => {
    const startsWithFoo = startsWith('foo', 1);
    expect(startsWithFoo(['foo', 'bar'])).toBe(false);
    expect(startsWithFoo(['bar', 'foo'])).toBe(true);
  });
  it('should resemble the native startsWith method for strings', () => {
    const startsWithFoo = startsWith('foo');
    expect(startsWithFoo('foobar')).toBe('foobar'.startsWith('foo'));
  });
  it('should resemble the native startsWith method for strings', () => {
    const startsWithOo = startsWith('oo', 1);
    expect(startsWithOo('foobar')).toBe('foobar'.startsWith('oo', 1));
  });
});

import { path } from './path';

describe('path', () => {
  it('returns a function that extracts the value at the given path from an object', () => {
    const obj = { a: { b: { c: 1 } } } as const;
    const a = path('a.b.c')(obj);
    expect(a).toBe(1);
    const b = path('a.s')(obj);
    expect(b).toBeUndefined();
  });
  it('works with only one key', () => {
    const obj = { a: 1 } as const;
    const a = path('a')(obj);
    expect(a).toBe(1);
    const b = path('b')(obj);
    expect(b).toBeUndefined();
  });
  it('handles paths with double dots', () => {
    const obj = { a: { b: { c: 1 } } } as const;
    const result = path('a..b.c')(obj);
    expect(result).toBe(1);
  });
  it('handles paths ending with dot', () => {
    const obj = { a: { b: { c: 1 } } } as const;
    const result = path('a.b.')(obj);
    expect(result).toEqual({ c: 1 });
  });
  it('handles paths starting with dot', () => {
    const obj = { a: { b: { c: 1 } } } as const;
    const result = path('.a.b')(obj);
    expect(result).toEqual({ c: 1 });
  });
  it('handles empty path string', () => {
    const obj = { a: 1 } as const;
    const result = path('')(obj);
    expect(result).toBeUndefined();
  });
});

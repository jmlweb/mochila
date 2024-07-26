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
});

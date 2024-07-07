import { makeIsDeepEqual } from './makeIsDeepEqual';

describe('makeIsDeepEqual', () => {
  const isDeepEqual = makeIsDeepEqual();

  it('returns true for equal primitives', () => {
    expect(isDeepEqual(1)(1)).toBe(true);
    expect(isDeepEqual('a')('a')).toBe(true);
    expect(isDeepEqual(true)(true)).toBe(true);
    expect(isDeepEqual(null)(null)).toBe(true);
    expect(isDeepEqual(undefined)(undefined)).toBe(true);
  });
  it('returns false for different primitives', () => {
    expect(isDeepEqual(1)(2)).toBe(false);
    expect(isDeepEqual('a')('b')).toBe(false);
    expect(isDeepEqual(true)(false)).toBe(false);
    expect(isDeepEqual(null)(undefined)).toBe(false);
  });
  it('returns true for equal arrays', () => {
    expect(isDeepEqual([1, 2, 3])([1, 2, 3])).toBe(true);
  });
  it('returns false for different arrays', () => {
    expect(isDeepEqual([1, 2, 3])([1, 2, 4])).toBe(false);
  });
  it('returns true for equal objects', () => {
    expect(isDeepEqual({ a: 1, b: [1, 2] })({ a: 1, b: [1, 2] })).toBe(true);
  });
  it('returns false for different objects', () => {
    expect(isDeepEqual({ a: 1, b: [1, 2] })({ a: 1, b: [1, 3] })).toBe(false);
  });
  it('returns true for equal dates', () => {
    expect(isDeepEqual(new Date('2021-01-01'))(new Date('2021-01-01'))).toBe(
      true,
    );
  });
  it('returns false for different dates', () => {
    expect(isDeepEqual(new Date('2021-01-01'))(new Date('2021-01-02'))).toBe(
      false,
    );
  });
  it('returns true for equal regexps', () => {
    expect(isDeepEqual(/a/g)(/a/g)).toBe(true);
  });
  it('returns false for different regexps', () => {
    expect(isDeepEqual(/a/g)(/b/g)).toBe(false);
  });
  it('works with deeply nested structures', () => {
    expect(
      isDeepEqual({ a: { b: { c: [1, 2, 3] } } })({
        a: { b: { c: [1, 2, 3] } },
      }),
    ).toBe(true);
  });
  it('compares null and undefined strictly if the option is active', () => {
    expect(isDeepEqual(null)(undefined)).toBe(false);
  });
  it('does not compare null and undefined strictly if the option is inactive', () => {
    const isDeepEqualWithoutStrictNullComparison = makeIsDeepEqual({
      strictNullComparison: false,
    });
    expect(isDeepEqualWithoutStrictNullComparison(null)(undefined)).toBe(true);
  });
  it('should return true for NaN values', () => {
    expect(isDeepEqual(NaN)(NaN)).toBe(true);
  });
  it('ignores the _owner property if the option is active', () => {
    expect(
      isDeepEqual({
        $$typeof: Symbol.for('react.element'),
        _owner: 'one',
        props: { a: 'a' },
      })({
        $$typeof: Symbol.for('react.element'),
        _owner: 'two',
        props: { a: 'a' },
      }),
    ).toBe(true);
  });
  it('does not ignore the _owner property if the option is inactive', () => {
    const isDeepEqualWithoutOptimization = makeIsDeepEqual({
      optimizeForReact: false,
    });
    expect(
      isDeepEqualWithoutOptimization({
        $$typeof: Symbol.for('react.element'),
        _owner: 'one',
        props: { a: 'a' },
      })({
        $$typeof: Symbol.for('react.element'),
        _owner: 'two',
        props: { a: 'a' },
      }),
    ).toBe(false);
  });
  it('should return false once the depth has been reached', () => {
    const isDeepEqualWithDepth = makeIsDeepEqual({
      maxDepth: 2,
    });
    expect(
      isDeepEqualWithDepth({ a: { b: { c: [1, 2, 3] } } })({
        a: { b: { c: [1, 2, 3] } },
      }),
    ).toBe(false);
  });
  it('should return false if constructors are different', () => {
    expect(isDeepEqual(new Date())(new RegExp('2021-01-01'))).toBe(false);
  });
});

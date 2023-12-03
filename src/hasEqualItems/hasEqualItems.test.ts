import { hasEqualItems } from './hasEqualItems';

describe('hasEqualItems', () => {
  it('should return true if all the items are equal', () => {
    expect(hasEqualItems([1, 1, 1])).toBe(true);
    expect(hasEqualItems(['a', 'a'])).toBe(true);
    expect(hasEqualItems(['a', 'a', 'a'])).toBe(true);
    expect(hasEqualItems([true, true, true])).toBe(true);
    const obj = {};
    expect(hasEqualItems([obj, obj])).toBe(true);
    const arr: string[] = [];
    expect(hasEqualItems([arr, arr, arr])).toBe(true);
  });
  it('should return false otherwise', () => {
    expect(hasEqualItems([1, 2, 3])).toBe(false);
    expect(hasEqualItems([1, 2, 2])).toBe(false);
    expect(hasEqualItems(['a', 'b'])).toBe(false);
    expect(hasEqualItems(['a', 'b', 'c'])).toBe(false);
    expect(hasEqualItems(['a', 'a', 'c'])).toBe(false);
    expect(hasEqualItems(['a', 'a', 'a', 'c'])).toBe(false);
    expect(hasEqualItems([true, false, true])).toBe(false);
    expect(hasEqualItems([{}, {}])).toBe(false);
    expect(hasEqualItems([[], [], []])).toBe(false);
  });
});

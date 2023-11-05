import { areEqualItems } from './areEqualItems';

describe('areEqualItems', () => {
  it('should return true if all the items are equal', () => {
    expect(areEqualItems([1, 1, 1])).toBe(true);
    expect(areEqualItems(['a', 'a'])).toBe(true);
    expect(areEqualItems(['a', 'a', 'a'])).toBe(true);
    expect(areEqualItems([true, true, true])).toBe(true);
    const obj = {};
    expect(areEqualItems([obj, obj])).toBe(true);
    const arr: string[] = [];
    expect(areEqualItems([arr, arr, arr])).toBe(true);
  });
  it('should return false otherwise', () => {
    expect(areEqualItems([1, 2, 3])).toBe(false);
    expect(areEqualItems([1, 2, 2])).toBe(false);
    expect(areEqualItems(['a', 'b'])).toBe(false);
    expect(areEqualItems(['a', 'b', 'c'])).toBe(false);
    expect(areEqualItems(['a', 'a', 'c'])).toBe(false);
    expect(areEqualItems(['a', 'a', 'a', 'c'])).toBe(false);
    expect(areEqualItems([true, false, true])).toBe(false);
    expect(areEqualItems([{}, {}])).toBe(false);
    expect(areEqualItems([[], [], []])).toBe(false);
  });
});

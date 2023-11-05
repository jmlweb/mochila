import { hasRepeatedItems } from './hasRepeatedItems';

describe('hasRepeatedItems', () => {
  it('should return true if the array has repeated items', () => {
    expect(hasRepeatedItems([1, 2, 3, 4, 5, 1])).toBe(true);
    expect(hasRepeatedItems(['a', 'b', 'c', 'd', 'e', 'a'])).toBe(true);
    expect(hasRepeatedItems([true, false, true, false])).toBe(true);
  });

  it('should return false if the array does not have repeated items', () => {
    expect(hasRepeatedItems([1, 2, 3, 4, 5])).toBe(false);
    expect(hasRepeatedItems(['a', 'b', 'c', 'd', 'e'])).toBe(false);
    expect(hasRepeatedItems([true, false])).toBe(false);
  });

  it('should return false if the array is empty or has just 1 position', () => {
    expect(hasRepeatedItems([])).toBe(false);
    expect(hasRepeatedItems([1])).toBe(false);
  });
});

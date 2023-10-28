import { isTupleable } from './isTupleable';

describe('isTupleable', () => {
  it('should return true when the array has 2 elements', () => {
    const result = isTupleable([1, 2]);
    expect(result).toBe(true);
  });
});

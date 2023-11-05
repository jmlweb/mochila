import { modulo } from './modulo';

describe('modulo', () => {
  it('should return the remainder of a division', () => {
    expect(modulo(5)(2)).toBe(1);
  });
});

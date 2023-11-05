import { includesItems } from './includesItems';

describe('includesItems', () => {
  it('should return true if all items are included', () => {
    const searched = [1, 2, 3];
    const source = [1, 2, 3, 4, 5];

    expect(includesItems(searched)(source)).toBe(true);
  });

  it('should return true if searched is empty', () => {
    const searched: number[] = [];
    const source = [1, 2, 3, 4, 5];

    expect(includesItems(searched)(source)).toBe(true);
  });
  it('should return false if source is empty', () => {
    const searched = [1, 2, 3];
    const source: number[] = [];

    expect(includesItems(searched)(source)).toBe(false);
  });
  it('should return true if both, source and searched are empty', () => {
    const searched: number[] = [];
    const source: number[] = [];

    expect(includesItems(searched)(source)).toBe(true);
  });
});

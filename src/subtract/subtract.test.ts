import { subtract } from './subtract';

describe('subtract', () => {
  it('should subtract the second argument from the first one', () => {
    expect(subtract(4)(2)).toEqual(2);
  });
});

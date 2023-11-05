import { divide } from './divide';

describe('divide', () => {
  it('should divide the first argument by the second', () => {
    expect(divide(4)(2)).toEqual(2);
  });
});

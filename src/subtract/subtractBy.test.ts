import { subtractBy } from './subtractBy';

describe('subtractBy', () => {
  it('should subtract the first argument from the second one', () => {
    expect(subtractBy(2)(4)).toEqual(2);
  });
});

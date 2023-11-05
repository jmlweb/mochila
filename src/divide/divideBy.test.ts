import { divideBy } from './divideBy';

describe('divideBy', () => {
  it('should divide the second argument by the first one', () => {
    expect(divideBy(2)(4)).toEqual(2);
  });
});

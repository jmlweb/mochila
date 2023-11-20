import { join } from './join';

describe('join', () => {
  it('joins the elements of an array into a string using a specified separator', () => {
    expect(join(',')([1, 2, 3])).toBe('1,2,3');
  });
});

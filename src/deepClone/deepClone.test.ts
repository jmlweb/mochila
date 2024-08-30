import { deepClone } from './deepClone';

describe('deepClone', () => {
  it('performs a deep clone of an object containing arrays', () => {
    const a = { value: [1, 2, 3] };
    const b = deepClone(a);
    b.value[0] = 4;
    expect(a).toEqual({ value: [1, 2, 3] });
    expect(b).toEqual({ value: [4, 2, 3] });
    expect(a).not.toBe(b);
    expect(a.value).not.toBe(b.value);
  });
  it('works with non nested values', () => {
    const a = new Date('2021-01-01');
    const b = deepClone(a);
    expect(a).toEqual(b);
    expect(a).not.toBe(b);
  });
});

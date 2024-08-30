import { defaultTo } from './defaultTo';

describe('defaultTo function', () => {
  it('should return the default value when the value is null', () => {
    const defaultValue = 'default';
    const value = null;
    const result = defaultTo(defaultValue)(value);
    expect(result).toBe(defaultValue);
  });
  it('should return the default value when the value is undefined', () => {
    const defaultValue = 'default';
    const value = undefined;
    const result = defaultTo(defaultValue)(value);
    expect(result).toBe(defaultValue);
  });
  it('should return the value when the value is not null or undefined', () => {
    const defaultValue = 'default';
    const value = 'value';
    const result = defaultTo(defaultValue)(value);
    expect(result).toBe(value);
  });
});

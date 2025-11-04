import { snakeCase } from './snakeCase';

describe('snakeCase', () => {
  test('converts camelCase to snake_case', () => {
    expect(snakeCase('helloWorld')).toBe('hello_world');
    expect(snakeCase('fooBarBaz')).toBe('foo_bar_baz');
  });

  test('converts PascalCase to snake_case', () => {
    expect(snakeCase('HelloWorld')).toBe('hello_world');
    expect(snakeCase('FooBarBaz')).toBe('foo_bar_baz');
  });

  test('converts kebab-case to snake_case', () => {
    expect(snakeCase('hello-world')).toBe('hello_world');
    expect(snakeCase('foo-bar-baz')).toBe('foo_bar_baz');
  });

  test('converts space separated to snake_case', () => {
    expect(snakeCase('hello world')).toBe('hello_world');
    expect(snakeCase('foo bar baz')).toBe('foo_bar_baz');
  });

  test('handles mixed case', () => {
    expect(snakeCase('HELLO_WORLD')).toBe('hello_world');
    expect(snakeCase('HelloWorld Test')).toBe('hello_world_test');
  });

  test('preserves already snake_case strings', () => {
    expect(snakeCase('hello_world')).toBe('hello_world');
    expect(snakeCase('foo_bar_baz')).toBe('foo_bar_baz');
  });

  test('handles single word', () => {
    expect(snakeCase('hello')).toBe('hello');
    expect(snakeCase('HELLO')).toBe('hello');
  });

  test('handles empty string', () => {
    expect(snakeCase('')).toBe('');
  });

  test('handles leading/trailing separators', () => {
    expect(snakeCase('-hello-world')).toBe('_hello_world');
    expect(snakeCase('_hello_world_')).toBe('_hello_world_');
  });

  test('handles consecutive separators', () => {
    expect(snakeCase('hello---world')).toBe('hello_world');
    expect(snakeCase('hello   world')).toBe('hello_world');
  });

  test('handles numbers in strings', () => {
    expect(snakeCase('helloWorld2')).toBe('hello_world2');
    expect(snakeCase('TestCase123')).toBe('test_case123');
  });

  test('handles consecutive capitals', () => {
    expect(snakeCase('HTTPSConnection')).toBe('h_t_t_p_s_connection');
    expect(snakeCase('XMLParser')).toBe('x_m_l_parser');
  });
});

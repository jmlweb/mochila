import { kebabCase } from './kebabCase';

describe('kebabCase', () => {
  test('converts camelCase to kebab-case', () => {
    expect(kebabCase('helloWorld')).toBe('hello-world');
    expect(kebabCase('fooBarBaz')).toBe('foo-bar-baz');
  });

  test('converts PascalCase to kebab-case', () => {
    expect(kebabCase('HelloWorld')).toBe('hello-world');
    expect(kebabCase('FooBarBaz')).toBe('foo-bar-baz');
  });

  test('converts underscore_case to kebab-case', () => {
    expect(kebabCase('hello_world')).toBe('hello-world');
    expect(kebabCase('foo_bar_baz')).toBe('foo-bar-baz');
  });

  test('converts space separated to kebab-case', () => {
    expect(kebabCase('hello world')).toBe('hello-world');
    expect(kebabCase('foo bar baz')).toBe('foo-bar-baz');
  });

  test('handles mixed case', () => {
    expect(kebabCase('HELLO_WORLD')).toBe('hello-world');
    expect(kebabCase('HelloWorld Test')).toBe('hello-world-test');
  });

  test('preserves already kebab-case strings', () => {
    expect(kebabCase('hello-world')).toBe('hello-world');
    expect(kebabCase('foo-bar-baz')).toBe('foo-bar-baz');
  });

  test('handles single word', () => {
    expect(kebabCase('hello')).toBe('hello');
    expect(kebabCase('HELLO')).toBe('hello');
  });

  test('handles empty string', () => {
    expect(kebabCase('')).toBe('');
  });

  test('handles leading/trailing separators', () => {
    expect(kebabCase('_hello_world_')).toBe('hello-world');
    expect(kebabCase('-hello-world-')).toBe('hello-world');
  });

  test('handles consecutive separators', () => {
    expect(kebabCase('hello___world')).toBe('hello-world');
    expect(kebabCase('hello   world')).toBe('hello-world');
  });

  test('handles numbers in strings', () => {
    expect(kebabCase('helloWorld2')).toBe('hello-world2');
    expect(kebabCase('TestCase123')).toBe('test-case123');
  });

  test('handles consecutive capitals', () => {
    expect(kebabCase('HTTPSConnection')).toBe('httpsconnection');
    expect(kebabCase('XMLParser')).toBe('xmlparser');
  });
});

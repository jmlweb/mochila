import { camelCase } from './camelCase';

describe('camelCase', () => {
  test('converts hyphen-separated to camelCase', () => {
    expect(camelCase('hello-world')).toBe('helloWorld');
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
  });

  test('converts underscore-separated to camelCase', () => {
    expect(camelCase('hello_world')).toBe('helloWorld');
    expect(camelCase('foo_bar_baz')).toBe('fooBarBaz');
  });

  test('converts space-separated to camelCase', () => {
    expect(camelCase('hello world')).toBe('helloWorld');
    expect(camelCase('foo bar baz')).toBe('fooBarBaz');
  });

  test('converts PascalCase to camelCase', () => {
    expect(camelCase('HelloWorld')).toBe('helloworld');
    expect(camelCase('FooBarBaz')).toBe('foobarbaz');
  });

  test('handles mixed separators', () => {
    expect(camelCase('hello-world_foo bar')).toBe('helloWorldFooBar');
    expect(camelCase('test_case-name foo')).toBe('testCaseNameFoo');
  });

  test('preserves already camelCase strings', () => {
    expect(camelCase('helloWorld')).toBe('helloworld');
    expect(camelCase('fooBarBaz')).toBe('foobarbaz');
  });

  test('handles single word', () => {
    expect(camelCase('hello')).toBe('hello');
    expect(camelCase('HELLO')).toBe('hello');
  });

  test('handles empty string', () => {
    expect(camelCase('')).toBe('');
  });

  test('handles leading separators', () => {
    expect(camelCase('-hello-world')).toBe('HelloWorld');
    expect(camelCase('_hello_world')).toBe('HelloWorld');
  });

  test('handles trailing separators', () => {
    expect(camelCase('hello-world')).toBe('helloWorld');
    expect(camelCase('hello_world')).toBe('helloWorld');
  });

  test('handles consecutive separators', () => {
    expect(camelCase('hello---world')).toBe('helloWorld');
    expect(camelCase('hello___world')).toBe('helloWorld');
    expect(camelCase('hello   world')).toBe('helloWorld');
  });

  test('handles numbers in strings', () => {
    expect(camelCase('hello-world2')).toBe('helloWorld2');
    expect(camelCase('test_case_123')).toBe('testCase123');
  });

  test('handles special cases', () => {
    expect(camelCase('i-am-ready')).toBe('iAmReady');
    expect(camelCase('HTTPSConnection')).toBe('httpsconnection');
  });

  test('converts uppercase strings to lowercase', () => {
    expect(camelCase('HELLO')).toBe('hello');
    expect(camelCase('HELLO_WORLD')).toBe('helloWorld');
  });
});

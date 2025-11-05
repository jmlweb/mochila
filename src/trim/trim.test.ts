import { trim } from './trim';

describe('trim', () => {
  test('removes leading and trailing spaces', () => {
    expect(trim('  hello world  ')).toBe('hello world');
  });

  test('removes only leading spaces', () => {
    expect(trim('  hello world')).toBe('hello world');
  });

  test('removes only trailing spaces', () => {
    expect(trim('hello world  ')).toBe('hello world');
  });

  test('handles no whitespace', () => {
    expect(trim('hello')).toBe('hello');
  });

  test('handles empty string', () => {
    expect(trim('')).toBe('');
  });

  test('handles only spaces', () => {
    expect(trim('   ')).toBe('');
  });

  test('removes tabs and newlines', () => {
    expect(trim('\t\nhello\n\t')).toBe('hello');
  });

  test('preserves internal spaces', () => {
    expect(trim('  hello   world  ')).toBe('hello   world');
  });

  test('handles special whitespace characters', () => {
    expect(trim('\u00A0hello\u00A0')).toBe('hello');
  });

  test('single character with spaces', () => {
    expect(trim('  a  ')).toBe('a');
  });
});

import { every } from './every';

describe('every', () => {
  test('must return true when all elements pass the predicate', () => {
    const isPositive = every((x: number) => x > 0);
    expect(isPositive([1, 2, 3])).toBe(true);
    expect(isPositive([5, 10, 100])).toBe(true);
  });

  test('must return false when any element does not pass the predicate', () => {
    const isPositive = every((x: number) => x > 0);
    expect(isPositive([1, 2, -1])).toBe(false);
    expect(isPositive([-1, 0, 1])).toBe(false);
    expect(isPositive([0, 1, 2])).toBe(false);
  });

  test('must return true for an empty array', () => {
    const isPositive = every((x: number) => x > 0);
    expect(isPositive([])).toBe(true);
  });

  test('must work with string predicates', () => {
    const isLongerThan2 = every((s: string) => s.length > 2);
    expect(isLongerThan2(['hello', 'world', 'test'])).toBe(true);
    expect(isLongerThan2(['hi', 'hello'])).toBe(false);
  });

  test('must work with boolean predicates', () => {
    const isTrue = every((x: boolean) => x === true);
    expect(isTrue([true, true, true])).toBe(true);
    expect(isTrue([true, false, true])).toBe(false);
  });

  test('must work with object predicates', () => {
    interface User {
      name: string;
      age: number;
    }
    const isAdult = every((u: User) => u.age >= 18);
    expect(
      isAdult([
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
      ]),
    ).toBe(true);
    expect(
      isAdult([
        { name: 'Charlie', age: 17 },
        { name: 'David', age: 20 },
      ]),
    ).toBe(false);
  });

  test('must be curryable', () => {
    const isEven = (x: number) => x % 2 === 0;
    const allEven = every(isEven);

    expect(allEven([2, 4, 6])).toBe(true);
    expect(allEven([2, 4, 5])).toBe(false);
  });

  test('must work with readonly arrays', () => {
    const isPositive = every((x: number) => x > 0);
    const readonlyArr: readonly number[] = [1, 2, 3];
    expect(isPositive(readonlyArr)).toBe(true);
  });

  test('must preserve array type through predicate', () => {
    interface Item {
      id: number;
    }
    const hasId = every((item: Item) => item.id > 0);
    const items: readonly Item[] = [{ id: 1 }, { id: 2 }];
    expect(hasId(items)).toBe(true);
  });

  test('must evaluate all elements', () => {
    let callCount = 0;
    const countCalls = every((x: number) => {
      callCount++;
      return x > 0;
    });

    countCalls([1, 2, 3]);
    expect(callCount).toBe(3);
  });

  test('must short-circuit on first false (implementation detail)', () => {
    // Note: Array.prototype.every does short-circuit, but testing this
    // helps ensure the native behavior is preserved
    let callCount = 0;
    const countCalls = every((x: number) => {
      callCount++;
      return x > 0;
    });

    const result = countCalls([1, -1, 2]);
    expect(result).toBe(false);
    expect(callCount).toBe(2); // Should stop after finding first false
  });

  test('must work with complex predicates', () => {
    interface Product {
      name: string;
      price: number;
      inStock: boolean;
    }
    const isAvailable = every((p: Product) => p.price > 0 && p.inStock);
    expect(
      isAvailable([
        { name: 'A', price: 10, inStock: true },
        { name: 'B', price: 20, inStock: true },
      ]),
    ).toBe(true);
    expect(
      isAvailable([
        { name: 'A', price: 10, inStock: true },
        { name: 'B', price: 0, inStock: false },
      ]),
    ).toBe(false);
  });
});

/**
 * Applies a reducer function to each element of the array from right to left, accumulating a single result.
 *
 * @param starter - The initial value for the accumulator.
 * @param reducer - A function that takes an accumulator and the current element, and returns a new accumulator value.
 */
export const reduceRight =
  <V, T>(starter: V, reducer: (acc: V, curr: T) => V) =>
  (source: ReadonlyArray<T>): V =>
    source.reduceRight(reducer, starter);

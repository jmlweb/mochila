/**
 * Clamps a number between a minimum and maximum value.
 *
 * @category Number
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A function that takes a number and returns the clamped value.
 *
 * @example
 * ```ts
 * clamp(0, 10)(15); Output: 10
 * clamp(0, 10)(-5); Output: 0
 * clamp(0, 10)(5); Output: 5
 * ```
 */
export const clamp = (min: number, max: number) => (value: number) =>
  Math.max(min, Math.min(max, value));

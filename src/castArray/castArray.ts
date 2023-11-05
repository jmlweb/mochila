/**
 * Casts a value to an array if it's not already an array.
 * @template T The type of the item of the array.
 * @param {T | T[]} x The value to cast to an array, or an array wrapping the value.
 * @returns {T[]} An array wrapping the value.
 */
export const castArray = <T>(x: T | T[]) => (Array.isArray(x) ? x : [x]);

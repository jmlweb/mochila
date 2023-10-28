export const isBoolean = <T>(x: T): x is Extract<T, boolean> =>
  typeof x === 'boolean';

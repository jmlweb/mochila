export const isNumber = <T>(x: T): x is Extract<T, number> =>
  typeof x === 'number';

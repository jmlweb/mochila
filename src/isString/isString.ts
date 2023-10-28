export const isString = <T>(x: T): x is Extract<T, string> =>
  typeof x === 'string';

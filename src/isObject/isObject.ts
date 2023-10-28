export const isObject = <T>(x: T): x is Extract<T, object> =>
  typeof x === 'object' && x !== null;

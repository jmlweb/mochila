export const isArray = <T>(x: T): x is Extract<T, ReadonlyArray<unknown>> => {
  return Array.isArray(x);
};

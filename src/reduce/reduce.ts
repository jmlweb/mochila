export const reduce =
  <V, T>(starter: V, reducer: (acc: V, curr: T) => V) =>
  (source: ReadonlyArray<T>): V =>
    source.reduce(reducer, starter);

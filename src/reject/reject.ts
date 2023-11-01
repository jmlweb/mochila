export const reject =
  <V>(fn: (x: V) => boolean) =>
  (source: ReadonlyArray<V>) =>
    source.filter((x) => !fn(x));

interface Filter {
  <T, V>(
    fn: (x: V) => x is Extract<V, T>,
  ): (source: ReadonlyArray<V>) => Extract<V, T>[];
  <V>(fn: (x: V) => boolean): <T extends V>(source: ReadonlyArray<V>) => T[];
}

export const filter: Filter =
  <V>(fn: (x: V) => boolean) =>
  <T extends V>(source: ReadonlyArray<V>) =>
    source.filter(fn) as T[];

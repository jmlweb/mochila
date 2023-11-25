export const indexOf =
  (value: unknown, fromIndex?: number) => (source: ReadonlyArray<unknown>) =>
    source.indexOf(value, fromIndex);

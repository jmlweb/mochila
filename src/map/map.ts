export const map =
  <From, To>(transformation: (x: From) => To) =>
  (source: ReadonlyArray<From> | From[]) =>
    source.map(transformation);

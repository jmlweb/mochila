export const at =
  <P extends number>(position: P) =>
  <S extends ReadonlyArray<unknown>>(source: S): S[number] | undefined =>
    source.at(position);

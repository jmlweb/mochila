export const capitalize = <S extends string>(x: S) =>
  (x.charAt(0).toUpperCase() + x.slice(1)) as Capitalize<S>;

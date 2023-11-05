export const toUpperCaseL = (s: string) => s.toUpperCase();

export const toUpperCase = <S extends string>(s: S) =>
  toUpperCaseL(s) as Uppercase<S>;

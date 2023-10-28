export const isNonNullable = <T>(x: T): x is NonNullable<T> => x != null;

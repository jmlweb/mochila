export const isDate = <T>(x: T): x is Extract<T, Date> => x instanceof Date;

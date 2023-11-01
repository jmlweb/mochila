export const castArray = <T>(x: T | T[]) => (Array.isArray(x) ? x : [x]);

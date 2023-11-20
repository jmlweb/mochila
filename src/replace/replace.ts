export const replace =
  (searchValue: string | RegExp, replaceValue: string) =>
  (str: string): string =>
    str.replace(searchValue, replaceValue);

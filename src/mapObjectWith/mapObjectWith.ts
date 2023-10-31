export const mapObjectWith =
  <From, Source extends Record<string, From>>(source: Source) =>
  <To>(transformation: (x: Source[keyof Source]) => To) =>
    Object.fromEntries(
      Object.entries(source).map(([key, val]) => [
        key,
        transformation(val as Source[keyof Source]),
      ]),
    ) as {
      [K in keyof Source]: To;
    };

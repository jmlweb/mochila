export const mapObject =
  <From, To>(transformation: (x: From) => To) =>
  <K extends string>(obj: Record<K, From>) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        key,
        transformation(val as From),
      ]),
    ) as Record<K, To>;

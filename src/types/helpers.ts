export type Assertion<R> = (x: unknown) => asserts x is R;

export type SubTypeOr<A, B> = A extends B ? A : B;

export type IsExtending<A, B> = A extends B ? true : false;

export type IfElse<B extends boolean, T, F> = B extends false ? F : T;

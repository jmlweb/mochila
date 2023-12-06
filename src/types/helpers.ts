/**
 * Produces a function that asserts that the given argument is of type `R`
 *
 * @category Type Helper
 */
export type Assertion<R> = (x: unknown) => asserts x is R;

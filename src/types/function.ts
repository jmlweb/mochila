/**
 * Represents a function that takes any number of arguments and returns any value.
 *
 * @category Function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFn = (...args: any[]) => any;

/**
 * Represents a function that takes no arguments and returns `V`
 *
 * @category Function
 */
export type Constant<V> = () => V;

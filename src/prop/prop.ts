import { UnknownRecord } from '../types';

/**
 * Returns the specified property of an object.
 *
 * @category Object
 *
 * @example
 * ```
 * prop('name')({ name: 'John', surname: 'Doe' }) // 'John'
 * prop('age')({ name: 'John', surname: 'Doe' } as Record<string, string>) // undefined
 * ```
 */

export const prop =
  <K extends string>(key: K) =>
  <O extends UnknownRecord<string>>(obj: O) =>
    obj[key];

import { FeatureSelector, IterableNonNullable } from './types';

/**
 * with data key
 * @param getter
 */
export function safety<D, K extends keyof D>(getter: K): (data: D | null) => D[K] | null;

export function safety<D, K extends keyof D, F extends NonNullable<D[K]>>(
  getter: K,
  fallback: F
): (data: D | null) => F;

/**
 * with one argument
 */
export function safety<D, P>(
  getter: FeatureSelector<IterableNonNullable<D>, P>
): FeatureSelector<D | null, P | null>;

export function safety<D, P, F extends NonNullable<P> = NonNullable<P>>(
  getter: FeatureSelector<IterableNonNullable<D>, P>,
  fallback: F
): FeatureSelector<D | null, F>;

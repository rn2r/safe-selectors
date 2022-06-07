import {
  FeatureSelector,
  FeatureSelectorWith2Args,
  FeatureSelectorWithManyArgs,
  IterableNonNullable,
} from './types';
import { isAnyNullable } from './utils';

/**
 * With Data Key and without infer
 * @param getter
 */
function safety<V extends any = any, D extends object = object>(
  getter: string | number
): FeatureSelector<D | null, V | null>;

function safety<V extends any, D extends object = object>(
  getter: string | number,
  fallback: V
): FeatureSelector<D | null, V>;

/**
 * with data key
 * @param getter
 */
function safety<D extends object, K extends keyof D = keyof D>(
  getter: K
): FeatureSelector<D | null, D[K] | null>;

function safety<D, K extends keyof D, F extends NonNullable<D[K]>>(
  getter: K,
  fallback: F
): FeatureSelector<D | null, F>;

/**
 * with one argument
 */
function safety<D, P>(
  getter: FeatureSelector<IterableNonNullable<D>, P>
): FeatureSelector<D | null, P | null>;

function safety<D, P, F extends NonNullable<P> = NonNullable<P>>(
  getter: FeatureSelector<IterableNonNullable<D>, P>,
  fallback: F
): FeatureSelector<D | null, F>;

/**
 * with two args
 */
function safety<D1, D2, P>(
  getter: FeatureSelectorWith2Args<IterableNonNullable<D1>, IterableNonNullable<D2>, P>
): FeatureSelectorWith2Args<D1 | null, D2 | null, P | null>;

function safety<D1, D2, P, F extends NonNullable<P> = NonNullable<P>>(
  getter: FeatureSelectorWith2Args<IterableNonNullable<D1>, IterableNonNullable<D2>, P>,
  fallback: F
): FeatureSelectorWith2Args<D1 | null, D2 | null, F>;

/*
 * todo: add more args
 */
function safety<V extends any = any, A extends any[] = any[]>(
  selector: string | number | FeatureSelectorWithManyArgs<A, V>,
  fallback?: V
) {
  return function (...args: A) {
    if (isAnyNullable(args)) return fallback === undefined ? null : fallback;
    if (typeof selector === 'function') {
      try {
        const result = selector(...args);
        if (result !== null && result !== undefined) return result;
        return fallback === undefined ? null : fallback;
      } catch {
        return fallback === undefined ? null : fallback;
      }
    }

    const onlyArg = args[0];
    const result = onlyArg[selector];
    if (result !== null && result !== undefined) return result;
    return fallback === undefined ? null : fallback;
  };
}

export { safety };

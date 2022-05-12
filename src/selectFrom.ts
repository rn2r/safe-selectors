import {
  FeatureSelector,
  FeatureSelectorWith2Args,
  FeatureSelectorWith3Args,
  FeatureSelectorWith4Args,
  FeatureSelectorWith5Args,
} from './types';

export function selectFrom<R, C, K extends keyof C>(
  rootSelector: FeatureSelector<R, C>,
  statePart: K
): FeatureSelector<R, C[K]>;
export function selectFrom<R, C, P>(
  rootSelector: FeatureSelector<R, C>,
  featureSelector: FeatureSelector<C, P>
): FeatureSelector<R, P>;
export function selectFrom<R, C1, C2, P>(
  rootSelector1: FeatureSelector<R, C1>,
  rootSelector2: FeatureSelector<R, C2>,
  featureSelector: FeatureSelectorWith2Args<C1, C2, P>
): FeatureSelector<R, P>;

export function selectFrom<R, C1, C2, C3, P>(
  rootSelector1: FeatureSelector<R, C1>,
  rootSelector2: FeatureSelector<R, C2>,
  rootSelector3: FeatureSelector<R, C3>,
  featureSelector: FeatureSelectorWith3Args<C1, C2, C3, P>
): FeatureSelector<R, P>;

export function selectFrom<R, C1, C2, C3, C4, P>(
  rootSelector1: FeatureSelector<R, C1>,
  rootSelector2: FeatureSelector<R, C2>,
  rootSelector3: FeatureSelector<R, C3>,
  rootSelector4: FeatureSelector<R, C4>,
  featureSelector: FeatureSelectorWith4Args<C1, C2, C3, C4, P>
): FeatureSelector<R, P>;

export function selectFrom<R, C1, C2, C3, C4, C5, P>(
  rootSelector1: FeatureSelector<R, C1>,
  rootSelector2: FeatureSelector<R, C2>,
  rootSelector3: FeatureSelector<R, C3>,
  rootSelector4: FeatureSelector<R, C4>,
  rootSelector5: FeatureSelector<R, C5>,
  featureSelector: FeatureSelectorWith5Args<C1, C2, C3, C4, C5, P>
): FeatureSelector<R, P>;

export function selectFrom<R, C, P>(...args: any[]): FeatureSelector<R, P> {
  const featureSelectorOrPart = args.pop();

  if (typeof featureSelectorOrPart === 'string') {
    // The first argument is the only rootSelector selector
    const rootSelector = args[0] as FeatureSelector<R, C>;
    return (rootState: R) => {
      const featureState = rootSelector(rootState) as Record<string, any>;
      // Returnung the specified prop from feature state
      return featureState[featureSelectorOrPart];
    };
  }

  return (rootState: R) => {
    // Performing all functions to obtain all feature states
    const values = args.map((selector) => selector(rootState));
    // Passing the states to the selector
    return featureSelectorOrPart(...values);
  };
}

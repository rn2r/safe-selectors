import {
  FeatureSelector,
  FeatureSelectorWith2Args,
  FeatureSelectorWith3Args,
  FeatureSelectorWith4Args,
  FeatureSelectorWith5Args,
  FeatureSelectorWithManyArgs,
} from '../types/featureSelector';

export function selectFrom<R, C, P>(
  rootSelector: (featureState: R) => C,
  featureSelector: (featureState: C) => P
): (featureState: R) => P;

export function selectFrom<R, C1, C2, P>(
  rootSelector1: (featureState: R) => C1,
  rootSelector2: (featureState: R) => C2,
  featureSelector: (featureState1: C1, featureState2: C2) => P
): (featureState: R) => P;

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

export function selectFrom<R, A, C, P>(
  rootSelector: FeatureSelectorWith2Args<R, A, C>,
  featureSelector: FeatureSelector<C, P>
): FeatureSelectorWith2Args<R, A, P>;

export function selectFrom<R, A, C1, C2, P>(
  rootSelector1: FeatureSelectorWith2Args<R, A, C1>,
  rootSelector2: FeatureSelectorWith2Args<R, A, C2>,
  featureSelector: FeatureSelectorWith2Args<C1, C2, P>
): FeatureSelectorWith2Args<R, A, P>;

export function selectFrom<R, A, C1, C2, C3, P>(
  rootSelector1: FeatureSelectorWith2Args<R, A, C1>,
  rootSelector2: FeatureSelectorWith2Args<R, A, C2>,
  rootSelector3: FeatureSelectorWith2Args<R, A, C3>,
  featureSelector: FeatureSelectorWith3Args<C1, C2, C3, P>
): FeatureSelectorWith2Args<R, A, P>;

export function selectFrom<R, A, C1, C2, C3, C4, P>(
  rootSelector1: FeatureSelectorWith2Args<R, A, C1>,
  rootSelector2: FeatureSelectorWith2Args<R, A, C2>,
  rootSelector3: FeatureSelectorWith2Args<R, A, C3>,
  rootSelector4: FeatureSelectorWith2Args<R, A, C4>,
  featureSelector: FeatureSelectorWith4Args<C1, C2, C3, C4, P>
): FeatureSelectorWith2Args<R, A, P>;

export function selectFrom<R, A, C1, C2, C3, C4, C5, P>(
  rootSelector1: FeatureSelectorWith2Args<R, A, C1>,
  rootSelector2: FeatureSelectorWith2Args<R, A, C2>,
  rootSelector3: FeatureSelectorWith2Args<R, A, C3>,
  rootSelector4: FeatureSelectorWith2Args<R, A, C4>,
  rootSelector5: FeatureSelectorWith2Args<R, A, C5>,
  featureSelector: FeatureSelectorWith5Args<C1, C2, C3, C4, C5, P>
): FeatureSelectorWith2Args<R, A, P>;

export function selectFrom<R, A, P>(
  ...args: [...FeatureSelectorWith2Args<R, A, any>[], FeatureSelectorWithManyArgs<any[], P>]
): FeatureSelectorWith2Args<R, A, P> {
  // todo add checks
  // todo add possibility to pass more then two parameters
  return (rootState: R, params: A) => {
    const combiner = args.pop() as FeatureSelectorWithManyArgs<any[], P>;

    // Performing all functions to obtain all feature states
    const values = args.map((selector) => selector(rootState, params));
    // Passing the states to the selector
    return combiner(...values);
  };
}

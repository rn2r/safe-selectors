/**
 * A function that receives (or transforms) a part of the state.
 */
export type FeatureSelector<F1, R> = (...args: [F1]) => R;
/**
 * Feature Selectors with many args
 */

export type FeatureSelectorWith2Args<F1, F2, R> = (...args: [F1, F2]) => R;
export type FeatureSelectorWith3Args<F1, F2, F3, R> = (...args: [F1, F2, F3]) => R;
export type FeatureSelectorWith4Args<F1, F2, F3, F4, R> = (...args: [F1, F2, F3, F4]) => R;
export type FeatureSelectorWith5Args<F1, F2, F3, F4, F5, R> = (...args: [F1, F2, F3, F4, F5]) => R;
export type FeatureSelectorWithManyArgs<A extends any[], R> = (...featureStates: A) => R;

/**
 * A function that creates different types of FeatureSelector.
 */
export interface SelectorCreator<F, S> {
  /**
   * Creating a Selector.
   * A selector that will return the argument "as is".
   */
  (): FeatureSelector<F, S>;
  /**
   * Creating a Selector.
   * The selector that will apply the function to the argument
   *  @param innerSelector The function that will be applied to the argument
   */
  <P>(innerSelector: FeatureSelector<S, P>): FeatureSelector<F, P>;
}

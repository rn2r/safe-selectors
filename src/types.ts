/**
 * A function that receives (or transforms) a part of the state.
 */
export interface FeatureSelector<F, R> {
  (fetatureState: F): R;
}

export interface FeatureSelectorWith2Args<F1, F2, R> {
  (fetatureState1: F1, fetatureState2: F2): R;
}

export interface FeatureSelectorWith3Args<F1, F2, F3, R> {
  (fetatureState1: F1, fetatureState2: F2, featureState3: F3): R;
}

export interface FeatureSelectorWith4Args<F1, F2, F3, F4, R> {
  (fetatureState1: F1, fetatureState2: F2, featureState3: F3, featureState4: F4): R;
}

export interface FeatureSelectorWith5Args<F1, F2, F3, F4, F5, R> {
  (
    fetatureState1: F1,
    fetatureState2: F2,
    featureState3: F3,
    featureState4: F4,
    featureState5: F5
  ): R;
}

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
  /**
   * Creating a Selector.
   * The selector will get the specified prop from the argument
   */
  <K extends keyof S>(prop: K): FeatureSelector<F, S[K]>;
}

/**
 * todo add description
 */
export type IterableNonNullable<D> = D extends Record<string, any>
  ? D extends Date
    ? Date
    : {
        [K in keyof D]-?: IterableNonNullable<D[K]>;
      }
  : NonNullable<D>;

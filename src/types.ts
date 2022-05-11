/**
 * A function that receives (or transforms) a part of the state.
 */
export interface FeatureSelector<F, R> {
  (fetatureState: F): R;
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

import {
  FeatureSelector,
  FeatureSelectorWith2Args,
  FeatureSelectorWith3Args,
  FeatureSelectorWith4Args,
  FeatureSelectorWith5Args,
  FeatureSelectorWith6Args,
  FeatureSelectorWith7Args,
  FeatureSelectorWith8Args,
} from './featureSelector';
import { Nil } from './nil';

export type DefaultSupposedValue = any;
export type DefaultSupposedFallback = null;

export type IsInitialNotSafe<V> = (value: V, index: number) => boolean;

export type IsResultNotSafe = (result: any) => boolean;

export type IsErrorSafe<E extends Error = Error> = (error: E) => boolean;

export type InputValue<IL extends boolean, SIV, GIV> = IL extends true ? SIV : GIV;

export type OutputValue<OL extends boolean, CR extends boolean, SOV, EGOV, GOV> = CR extends true
  ? GOV
  : OL extends true
  ? SOV
  : EGOV;

export type OutputValueWithImplicitFallback<
  OL extends boolean,
  CR extends boolean,
  SOV,
  EGOV,
  GOV
> = CR extends true ? GOV | SOV : OL extends true ? SOV : EGOV | SOV;

export type OutputValueWithExplicitFallback<
  OL extends boolean,
  CR extends boolean,
  SOV,
  EGOV,
  GOV,
  EGF,
  GF
> = CR extends true ? GOV | GF : OL extends true ? SOV : EGOV | EGF;

/**
 * Recursive exclusion of all possible nullable and optional values.
 */
export type IterableNonNullable<D> = D extends Record<string, any>
  ? D extends Date
    ? Date
    : {
        [K in keyof D]-?: IterableNonNullable<D[K]>;
      }
  : NonNullable<D>;

export interface Safety<SI, SO, IL extends boolean, OL extends boolean, CR extends boolean> {
  /**
   * One argument, implicit fallback
   */
  <IV1 extends SI, GOV, EOV extends SO>(
    getter: FeatureSelector<
      IterableNonNullable<InputValue<IL, SI, IV1>>,
      OutputValue<OL, CR, SO, EOV, GOV>
    >
  ): FeatureSelector<Nil<IV1>, OutputValueWithImplicitFallback<OL, CR, SO, EOV, GOV>>;

  /**
   * One argument, explicit fallback
   */
  <IV1 extends SI, GOV, EOV extends SO, GF, EGF extends SO>(
    getter: FeatureSelector<
      IterableNonNullable<InputValue<IL, SI, IV1>>,
      OutputValue<OL, CR, SO, EOV, GOV>
    >,
    fallback: OutputValue<OL, CR, SO, EGF, GF>
  ): FeatureSelector<Nil<IV1>, OutputValueWithExplicitFallback<OL, CR, SO, EOV, GOV, EGF, GF>>;

  /**
   * Two arguments, implicit fallback
   */
  <IV1 extends SI, IV2 extends SI, GOV, EOV extends SO>(
    getter: FeatureSelectorWith2Args<
      IterableNonNullable<InputValue<IL, SI, IV1>>,
      IterableNonNullable<InputValue<IL, SI, IV2>>,
      OutputValue<OL, CR, SO, EOV, GOV>
    >
  ): FeatureSelectorWith2Args<
    Nil<IV1>,
    Nil<IV2>,
    OutputValueWithImplicitFallback<OL, CR, SO, EOV, GOV>
  >;

  /**
   * Two arguments, explicit fallback
   */
  <IV1 extends SI, IV2 extends SI, GOV, EOV extends SO, GF, EGF extends SO>(
    getter: FeatureSelectorWith2Args<
      IterableNonNullable<InputValue<IL, SI, IV1>>,
      IterableNonNullable<InputValue<IL, SI, IV2>>,
      OutputValue<OL, CR, SO, EOV, GOV>
    >,
    fallback: OutputValue<OL, CR, SO, EGF, GF>
  ): FeatureSelectorWith2Args<
    Nil<IV1>,
    Nil<IV2>,
    OutputValueWithExplicitFallback<OL, CR, SO, EOV, GOV, EGF, GF>
  >;

  /**
   * Three arguments, implicit fallback
   */
  <IV1 extends SI, IV2 extends SI, IV3 extends SI, GOV, EOV extends SO>(
    getter: FeatureSelectorWith3Args<
      IterableNonNullable<InputValue<IL, SI, IV1>>,
      IterableNonNullable<InputValue<IL, SI, IV2>>,
      IterableNonNullable<InputValue<IL, SI, IV3>>,
      OutputValue<OL, CR, SO, EOV, GOV>
    >
  ): FeatureSelectorWith3Args<
    Nil<IV1>,
    Nil<IV2>,
    Nil<IV3>,
    OutputValueWithImplicitFallback<OL, CR, SO, EOV, GOV>
  >;

  /**
   * Three arguments, explicit fallback
   */
  <IV1 extends SI, IV2 extends SI, IV3 extends SI, GOV, EOV extends SO, GF, EGF extends SO>(
    getter: FeatureSelectorWith3Args<
      IterableNonNullable<InputValue<IL, SI, IV1>>,
      IterableNonNullable<InputValue<IL, SI, IV2>>,
      IterableNonNullable<InputValue<IL, SI, IV3>>,
      OutputValue<OL, CR, SO, EOV, GOV>
    >,
    fallback: OutputValue<OL, CR, SO, EGF, GF>
  ): FeatureSelectorWith3Args<
    Nil<IV1>,
    Nil<IV2>,
    Nil<IV3>,
    OutputValueWithExplicitFallback<OL, CR, SO, EOV, GOV, EGF, GF>
  >;

  /**
   * Four arguments, implicit fallback
   */
  <IV1 extends SI, IV2 extends SI, IV3 extends SI, IV4 extends SI, GOV, EOV extends SO>(
    getter: FeatureSelectorWith4Args<
      IterableNonNullable<InputValue<IL, SI, IV1>>,
      IterableNonNullable<InputValue<IL, SI, IV2>>,
      IterableNonNullable<InputValue<IL, SI, IV3>>,
      IterableNonNullable<InputValue<IL, SI, IV4>>,
      OutputValue<OL, CR, SO, EOV, GOV>
    >
  ): FeatureSelectorWith4Args<
    Nil<IV1>,
    Nil<IV2>,
    Nil<IV3>,
    Nil<IV4>,
    OutputValueWithImplicitFallback<OL, CR, SO, EOV, GOV>
  >;

  /**
   * Four arguments, explicit fallback
   */
  <
    IV1 extends SI,
    IV2 extends SI,
    IV3 extends SI,
    IV4 extends SI,
    GOV,
    EOV extends SO,
    GF,
    EGF extends SO
  >(
    getter: FeatureSelectorWith4Args<
      IterableNonNullable<InputValue<IL, SI, IV1>>,
      IterableNonNullable<InputValue<IL, SI, IV2>>,
      IterableNonNullable<InputValue<IL, SI, IV3>>,
      IterableNonNullable<InputValue<IL, SI, IV4>>,
      OutputValue<OL, CR, SO, EOV, GOV>
    >,
    fallback: OutputValue<OL, CR, SO, EGF, GF>
  ): FeatureSelectorWith4Args<
    Nil<IV1>,
    Nil<IV2>,
    Nil<IV3>,
    Nil<IV4>,
    OutputValueWithExplicitFallback<OL, CR, SO, EOV, GOV, EGF, GF>
  >;

  /**
   * Five arguments, implicit fallback
   */
  <
    IV1 extends SI,
    IV2 extends SI,
    IV3 extends SI,
    IV4 extends SI,
    IV5 extends SI,
    GOV,
    EOV extends SO
  >(
    getter: FeatureSelectorWith5Args<
      IterableNonNullable<InputValue<IL, SI, IV1>>,
      IterableNonNullable<InputValue<IL, SI, IV2>>,
      IterableNonNullable<InputValue<IL, SI, IV3>>,
      IterableNonNullable<InputValue<IL, SI, IV4>>,
      IterableNonNullable<InputValue<IL, SI, IV5>>,
      OutputValue<OL, CR, SO, EOV, GOV>
    >
  ): FeatureSelectorWith5Args<
    Nil<IV1>,
    Nil<IV2>,
    Nil<IV3>,
    Nil<IV4>,
    Nil<IV5>,
    OutputValueWithImplicitFallback<OL, CR, SO, EOV, GOV>
  >;

  /**
   * Five arguments, explicit fallback
   */
  <
    IV1 extends SI,
    IV2 extends SI,
    IV3 extends SI,
    IV4 extends SI,
    IV5 extends SI,
    GOV,
    EOV extends SO,
    GF,
    EGF extends SO
  >(
    getter: FeatureSelectorWith5Args<
      IterableNonNullable<InputValue<IL, SI, IV1>>,
      IterableNonNullable<InputValue<IL, SI, IV2>>,
      IterableNonNullable<InputValue<IL, SI, IV3>>,
      IterableNonNullable<InputValue<IL, SI, IV4>>,
      IterableNonNullable<InputValue<IL, SI, IV5>>,
      OutputValue<OL, CR, SO, EOV, GOV>
    >,
    fallback: OutputValue<OL, CR, SO, EGF, GF>
  ): FeatureSelectorWith5Args<
    Nil<IV1>,
    Nil<IV2>,
    Nil<IV3>,
    Nil<IV4>,
    Nil<IV5>,
    OutputValueWithExplicitFallback<OL, CR, SO, EOV, GOV, EGF, GF>
  >;

  /**
   * Six arguments, implicit fallback
   */
   <
   IV1 extends SI,
   IV2 extends SI,
   IV3 extends SI,
   IV4 extends SI,
   IV5 extends SI,
   IV6 extends SI,
   GOV,
   EOV extends SO
 >(
   getter: FeatureSelectorWith6Args<
     IterableNonNullable<InputValue<IL, SI, IV1>>,
     IterableNonNullable<InputValue<IL, SI, IV2>>,
     IterableNonNullable<InputValue<IL, SI, IV3>>,
     IterableNonNullable<InputValue<IL, SI, IV4>>,
     IterableNonNullable<InputValue<IL, SI, IV5>>,
     IterableNonNullable<InputValue<IL, SI, IV6>>,
     OutputValue<OL, CR, SO, EOV, GOV>
   >
 ): FeatureSelectorWith6Args<
   Nil<IV1>,
   Nil<IV2>,
   Nil<IV3>,
   Nil<IV4>,
   Nil<IV5>,
   Nil<IV6>,
   OutputValueWithImplicitFallback<OL, CR, SO, EOV, GOV>
 >;

  /**
   * Six arguments, explicit fallback
   */
   <
   IV1 extends SI,
   IV2 extends SI,
   IV3 extends SI,
   IV4 extends SI,
   IV5 extends SI,
   IV6 extends SI,
   GOV,
   EOV extends SO,
   GF,
   EGF extends SO
 >(
   getter: FeatureSelectorWith6Args<
     IterableNonNullable<InputValue<IL, SI, IV1>>,
     IterableNonNullable<InputValue<IL, SI, IV2>>,
     IterableNonNullable<InputValue<IL, SI, IV3>>,
     IterableNonNullable<InputValue<IL, SI, IV4>>,
     IterableNonNullable<InputValue<IL, SI, IV5>>,
     IterableNonNullable<InputValue<IL, SI, IV6>>,
     OutputValue<OL, CR, SO, EOV, GOV>
   >,
   fallback: OutputValue<OL, CR, SO, EGF, GF>
 ): FeatureSelectorWith6Args<
   Nil<IV1>,
   Nil<IV2>,
   Nil<IV3>,
   Nil<IV4>,
   Nil<IV5>,
   Nil<IV6>,
   OutputValueWithExplicitFallback<OL, CR, SO, EOV, GOV, EGF, GF>
 >;

  /**
   * Seven arguments, implicit fallback
   */
   <
   IV1 extends SI,
   IV2 extends SI,
   IV3 extends SI,
   IV4 extends SI,
   IV5 extends SI,
   IV6 extends SI,
   IV7 extends SI,
   GOV,
   EOV extends SO
 >(
   getter: FeatureSelectorWith7Args<
     IterableNonNullable<InputValue<IL, SI, IV1>>,
     IterableNonNullable<InputValue<IL, SI, IV2>>,
     IterableNonNullable<InputValue<IL, SI, IV3>>,
     IterableNonNullable<InputValue<IL, SI, IV4>>,
     IterableNonNullable<InputValue<IL, SI, IV5>>,
     IterableNonNullable<InputValue<IL, SI, IV6>>,
     IterableNonNullable<InputValue<IL, SI, IV7>>,
     OutputValue<OL, CR, SO, EOV, GOV>
   >
 ): FeatureSelectorWith7Args<
   Nil<IV1>,
   Nil<IV2>,
   Nil<IV3>,
   Nil<IV4>,
   Nil<IV5>,
   Nil<IV6>,
   Nil<IV7>,
   OutputValueWithImplicitFallback<OL, CR, SO, EOV, GOV>
 >;

  /**
   * Seven arguments, explicit fallback
   */
   <
   IV1 extends SI,
   IV2 extends SI,
   IV3 extends SI,
   IV4 extends SI,
   IV5 extends SI,
   IV6 extends SI,
   IV7 extends SI,
   GOV,
   EOV extends SO,
   GF,
   EGF extends SO
 >(
   getter: FeatureSelectorWith7Args<
     IterableNonNullable<InputValue<IL, SI, IV1>>,
     IterableNonNullable<InputValue<IL, SI, IV2>>,
     IterableNonNullable<InputValue<IL, SI, IV3>>,
     IterableNonNullable<InputValue<IL, SI, IV4>>,
     IterableNonNullable<InputValue<IL, SI, IV5>>,
     IterableNonNullable<InputValue<IL, SI, IV6>>,
     IterableNonNullable<InputValue<IL, SI, IV7>>,
     OutputValue<OL, CR, SO, EOV, GOV>
   >,
   fallback: OutputValue<OL, CR, SO, EGF, GF>
 ): FeatureSelectorWith7Args<
   Nil<IV1>,
   Nil<IV2>,
   Nil<IV3>,
   Nil<IV4>,
   Nil<IV5>,
   Nil<IV6>,
   Nil<IV7>,
   OutputValueWithExplicitFallback<OL, CR, SO, EOV, GOV, EGF, GF>
 >;


  /**
   * Eight arguments, implicit fallback
   */
   <
   IV1 extends SI,
   IV2 extends SI,
   IV3 extends SI,
   IV4 extends SI,
   IV5 extends SI,
   IV6 extends SI,
   IV7 extends SI,
   IV8 extends SI,
   GOV,
   EOV extends SO
 >(
   getter: FeatureSelectorWith8Args<
     IterableNonNullable<InputValue<IL, SI, IV1>>,
     IterableNonNullable<InputValue<IL, SI, IV2>>,
     IterableNonNullable<InputValue<IL, SI, IV3>>,
     IterableNonNullable<InputValue<IL, SI, IV4>>,
     IterableNonNullable<InputValue<IL, SI, IV5>>,
     IterableNonNullable<InputValue<IL, SI, IV6>>,
     IterableNonNullable<InputValue<IL, SI, IV7>>,
     IterableNonNullable<InputValue<IL, SI, IV8>>,
     OutputValue<OL, CR, SO, EOV, GOV>
   >
 ): FeatureSelectorWith8Args<
   Nil<IV1>,
   Nil<IV2>,
   Nil<IV3>,
   Nil<IV4>,
   Nil<IV5>,
   Nil<IV6>,
   Nil<IV7>,
   Nil<IV8>,
   OutputValueWithImplicitFallback<OL, CR, SO, EOV, GOV>
 >;

  /**
   * Eight arguments, explicit fallback
   */
   <
   IV1 extends SI,
   IV2 extends SI,
   IV3 extends SI,
   IV4 extends SI,
   IV5 extends SI,
   IV6 extends SI,
   IV7 extends SI,
   IV8 extends SI,
   GOV,
   EOV extends SO,
   GF,
   EGF extends SO
 >(
   getter: FeatureSelectorWith8Args<
     IterableNonNullable<InputValue<IL, SI, IV1>>,
     IterableNonNullable<InputValue<IL, SI, IV2>>,
     IterableNonNullable<InputValue<IL, SI, IV3>>,
     IterableNonNullable<InputValue<IL, SI, IV4>>,
     IterableNonNullable<InputValue<IL, SI, IV5>>,
     IterableNonNullable<InputValue<IL, SI, IV6>>,
     IterableNonNullable<InputValue<IL, SI, IV7>>,
     IterableNonNullable<InputValue<IL, SI, IV8>>,
     OutputValue<OL, CR, SO, EOV, GOV>
   >,
   fallback: OutputValue<OL, CR, SO, EGF, GF>
 ): FeatureSelectorWith8Args<
   Nil<IV1>,
   Nil<IV2>,
   Nil<IV3>,
   Nil<IV4>,
   Nil<IV5>,
   Nil<IV6>,
   Nil<IV7>,
   Nil<IV8>,
   OutputValueWithExplicitFallback<OL, CR, SO, EOV, GOV, EGF, GF>
 >;
}


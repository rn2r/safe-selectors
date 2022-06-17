import {
  FeatureSelector,
  FeatureSelectorWith2Args,
  FeatureSelectorWithManyArgs,
  PreparedSelection,
  PreparedSelectionWith2Args,
  PreparedSelectionWithManyArgs,
} from '../types/featureSelector';
import { selectFrom } from '../selectFrom';
import { forward } from '../forward';

export function prepareSelection<F1>(): PreparedSelection<F1, F1>;

export function prepareSelection<F1, R>(
  storedSelector: FeatureSelector<F1, R>
): PreparedSelection<F1, R>;

export function prepareSelection<F1, F2, R>(
  storedSelector: FeatureSelectorWith2Args<F1, F2, R>
): PreparedSelectionWith2Args<F1, F2, R>;

export function prepareSelection<A extends any[], R>(
  storedSelector: FeatureSelectorWithManyArgs<A, R>
): PreparedSelectionWithManyArgs<A, R>;

export function prepareSelection<A extends any[], R>(
  storedSelector?: FeatureSelectorWithManyArgs<A, R>
) {
  return <FR>(innerFeatureSelector?: FeatureSelector<R, FR>) =>
    selectFrom(storedSelector || (forward as any), innerFeatureSelector || (forward as any));
}

import {
  DefaultSupposedFallback,
  DefaultSupposedValue,
  IsErrorSafe,
  IsInitialNotSafe,
  IsResultNotSafe,
  Safety,
} from '../types/safety';
import { FeatureSelectorWithManyArgs } from '../types/featureSelector';
import { isAnyNotSafe, UncaughtInSafetyError } from '../utils';
import {
  DEFAULT_FALLBACK,
  DEFAULT_IS_ERROR_SAFE,
  DEFAULT_IS_INITIAL_NOT_SAFE,
  DEFAULT_IS_RESULT_NOT_SAFE,
} from './defaultParameters';

export function constructSafety<
  SupposedInputValue = DefaultSupposedValue,
  SupposedOutputValue = DefaultSupposedFallback,
  IsSupposedInputValueLocked extends boolean = false,
  IsSupposedOutputValueLocked extends boolean = false,
  CanRedefineSupposedOutputValue extends boolean = true
>(params: {
  fallback: SupposedOutputValue;
  isInitialNotSafe: IsInitialNotSafe<SupposedInputValue>;
  isErrorSafe?: IsErrorSafe;
  isResultNotSafe?: IsResultNotSafe;
}): Safety<
  SupposedInputValue,
  SupposedOutputValue,
  IsSupposedInputValueLocked,
  IsSupposedOutputValueLocked,
  CanRedefineSupposedOutputValue
> {
  const { fallback: initialFallback, isInitialNotSafe, isResultNotSafe, isErrorSafe } = params;
  return function safety<SelectedValues extends any[], Result extends any>(
    selector: FeatureSelectorWithManyArgs<SelectedValues, Result>,
    fallback = initialFallback as Result
  ) {
    return function getResult(...selectedValues: SelectedValues) {
      if (isAnyNotSafe(isInitialNotSafe, selectedValues)) return fallback;
      try {
        const result = selector(...selectedValues);
        if (isResultNotSafe === undefined || !isResultNotSafe(result)) return result;
        return fallback;
      } catch (error) {
        if (error instanceof Error && isErrorSafe !== undefined && isErrorSafe(error)) {
          return fallback;
        }
        throw new UncaughtInSafetyError(error);
      }
    };
  };
}

export const safety = constructSafety({
  fallback: DEFAULT_FALLBACK,
  isErrorSafe: DEFAULT_IS_ERROR_SAFE,
  isInitialNotSafe: DEFAULT_IS_INITIAL_NOT_SAFE,
  isResultNotSafe: DEFAULT_IS_RESULT_NOT_SAFE,
});

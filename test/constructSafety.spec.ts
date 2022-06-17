import {
  constructSafety,
  DEFAULT_FALLBACK,
  DEFAULT_IS_INITIAL_NOT_SAFE,
  DEFAULT_IS_RESULT_NOT_SAFE,
  IsInitialNotSafe,
  IsResultNotSafe,
} from '../src';
import { UncaughtInSafetyError } from '../src/utils';

describe('constructSafety', () => {
  const fallback = DEFAULT_FALLBACK;
  let isInitialNotSafe: IsInitialNotSafe<any>;
  let isResultNotSafe: IsResultNotSafe;

  beforeEach(() => {
    isInitialNotSafe = DEFAULT_IS_INITIAL_NOT_SAFE;
    isResultNotSafe = DEFAULT_IS_RESULT_NOT_SAFE;
  });

  test('should return function', () => {
    expect(
      constructSafety({
        fallback,
        isInitialNotSafe,
      })
    ).toBeInstanceOf(Function);
  });

  test('safetyGetter should return passed fallback', () => {
    const currentFallback = {};
    const safety = constructSafety<any, typeof currentFallback>({
      fallback: currentFallback,
      isInitialNotSafe,
      isResultNotSafe,
    });
    const getData = safety((value: any) => value.prop);
    expect(getData({})).toBe(currentFallback);
  });

  describe('the number of "isInitialNotSafe" calls must be equal to the number of arguments passed to the safetyGetter', () => {
    const MAX_ARGUMENTS_LENGTH = 25;
    const spyIsInitialNotSafe = jest.fn(isInitialNotSafe);
    const safety = constructSafety({ fallback, isInitialNotSafe: spyIsInitialNotSafe });
    const getData = safety((...args: any[]) => args.length);

    afterEach(() => {
      spyIsInitialNotSafe.mockClear();
    });

    for (
      let numberOfArguments = 0;
      numberOfArguments <= MAX_ARGUMENTS_LENGTH;
      numberOfArguments += 1
    ) {
      test(`number of arguments: ${numberOfArguments}`, () => {
        const randomArgs = Array(numberOfArguments).fill(undefined).map(Math.random) as [any];
        getData(...randomArgs);

        randomArgs.forEach((arg, currentArgIndex) => {
          expect(spyIsInitialNotSafe).toHaveBeenNthCalledWith(
            currentArgIndex + 1,
            arg,
            currentArgIndex
          );
        });
      });
    }
  });

  test('should execute the "isResultNotSafe" function if it was passed ', () => {
    const spyIsResultNotSafe = jest.fn(isResultNotSafe);
    const safety = constructSafety({
      fallback,
      isInitialNotSafe,
      isResultNotSafe: spyIsResultNotSafe,
    });
    const value = { data: '' };
    const getData = safety(({ data }: typeof value) => data);
    getData(value);
    expect(spyIsResultNotSafe).toHaveBeenCalledTimes(1);
    expect(spyIsResultNotSafe).toHaveBeenNthCalledWith(1, value.data);
  });

  test('should execute the "isErrorSafe" function if it was passed ', () => {
    const spyIsErrorSafe = jest.fn((_error: any) => false);
    const safety = constructSafety({
      fallback,
      isInitialNotSafe,
      isResultNotSafe,
      isErrorSafe: spyIsErrorSafe,
    });
    const error = new Error();
    const getData = safety(() => {
      throw error;
    });
    expect(() => getData({})).toThrow(UncaughtInSafetyError);
    expect(spyIsErrorSafe).toHaveBeenCalledTimes(1);
    expect(spyIsErrorSafe).toHaveBeenNthCalledWith(1, error);
  });

  test.todo('tests for possible errors (if incorrect arguments are passed)');
});

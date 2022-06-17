import { IsErrorSafe, IsInitialNotSafe, IsResultNotSafe } from '../types/safety';

export const DEFAULT_FALLBACK = null;

export const DEFAULT_IS_INITIAL_NOT_SAFE: IsInitialNotSafe<any> = function (value) {
  return value === undefined || value === null;
};

export const DEFAULT_IS_ERROR_SAFE: IsErrorSafe = function (error) {
  return error.constructor === TypeError;
};

export const DEFAULT_IS_RESULT_NOT_SAFE: IsResultNotSafe = function (result) {
  return result === undefined || result === null;
};

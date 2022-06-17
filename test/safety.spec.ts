import { safety } from '../src';

describe('default safety', () => {
  const MAX_ARGUMENTS_LENGTH = 25;
  for (
    let numberOfArguments = 0;
    numberOfArguments <= MAX_ARGUMENTS_LENGTH;
    numberOfArguments += 1
  ) {
    describe(`number of arguments: ${numberOfArguments}`, () => {
      const randomArgs = Array(numberOfArguments).fill(undefined).map(Math.random) as [any];

      test('The arg-function should work as usual, if it does not return null', () => {
        const selector = (...args: any[]) => args.length;
        const getData = safety(selector);

        expect(getData(...randomArgs)).toEqual(selector(...randomArgs));
      });

      test('The arg-function should return null, if it return undefined', () => {
        const selector = (..._args: any[]) => undefined;
        const getData = safety(selector);

        expect(getData(...randomArgs)).toBeNull();
      });

      test('The arg-function should return fallback, if it return undefined and fallback has been passed', () => {
        const fallback = {};
        const selector = (..._args: any[]) => undefined;
        const getData = safety(selector, fallback);

        expect(getData(...randomArgs)).toBe(fallback);
      });

      test('The arg-function should return null, if it throw TypeError', () => {
        const selector = (...args: any[]) => (args.length as any).undefinedProp;
        const getData = safety(selector);

        expect(getData(...randomArgs)).toBeNull();
      });

      test('The arg-function should return fallback, if it throw TypeError and fallback has been passed', () => {
        const fallback = {};
        const selector = (...args: any[]) => (args.length as any).undefinedProp;
        const getData = safety(selector, fallback);

        expect(getData(...randomArgs)).toBe(fallback);
      });

      test('The arg-function should return null, if any argument would be null', () => {
        const selector = (...args: any[]) => args.length;
        const getData = safety(selector);
        const randomIndex = Math.floor(Math.random() * randomArgs.length);
        const currentRandomArgs = [...randomArgs] as [any];
        currentRandomArgs[randomIndex] = null;

        expect(getData(...currentRandomArgs)).toBeNull();
      });

      test('The arg-function should return null, if any argument would be undefined', () => {
        const selector = (...args: any[]) => args.length;
        const getData = safety(selector);
        const randomIndex = Math.floor(Math.random() * randomArgs.length);
        const currentRandomArgs = [...randomArgs] as [any];
        currentRandomArgs[randomIndex] = undefined;

        expect(getData(...currentRandomArgs)).toBeNull();
      });

      test('The arg-function should return fallback, if any argument would be null  and fallback has been passed', () => {
        const fallback = {};
        const selector = (...args: any[]) => args.length;
        const getData = safety(selector, fallback);
        const randomIndex = Math.floor(Math.random() * randomArgs.length);
        const currentRandomArgs = [...randomArgs] as [any];
        currentRandomArgs[randomIndex] = null;

        expect(getData(...currentRandomArgs)).toBe(fallback);
      });

      test('The arg-function should return fallback, if any argument would be undefined  and fallback has been passed', () => {
        const fallback = {};
        const selector = (...args: any[]) => args.length;
        const getData = safety(selector, fallback);
        const randomIndex = Math.floor(Math.random() * randomArgs.length);
        const currentRandomArgs = [...randomArgs] as [any];
        currentRandomArgs[randomIndex] = undefined;

        expect(getData(...currentRandomArgs)).toBe(fallback);
      });
    });
  }
});

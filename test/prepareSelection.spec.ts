import { prepareSelection } from '../src';

describe('prepareSelection', () => {
  const data = { foo: 'bar' };
  describe('one argument', () => {
    test('prepared selector should return passed data, if none arguments passed to both of prepareSelection and prepareSelectionCreator', () => {
      const preparedSelectorCreator = prepareSelection<typeof data>();
      const getData = preparedSelectorCreator();
      expect(getData(data)).toBe(data);
    });
    test('prepared selector should return result of function passed to preparedSelectorCreator, if none arguments passed to prepareSelection and function passed to prepareSelectionCreator', () => {
      const preparedSelectorCreator = prepareSelection<typeof data>();
      const getFoo = preparedSelectorCreator(({ foo }) => foo);
      expect(getFoo(data)).toEqual(data.foo);
    });
    test('prepared selector should return result of function passed to prepareSelection, if function passed to prepareSelection and none arguments passed to prepareSelectionCreator', () => {
      const preparedSelectorCreator = prepareSelection<typeof data, string>(({ foo }) => foo);
      const getFoo = preparedSelectorCreator();
      expect(getFoo(data)).toBe(data.foo);
    });
    test('prepared selector should return result of composition of functions passed to prepareSelection and preparedSelectorCreator, if function passed to both of prepareSelection and prepareSelectionCreator', () => {
      const preparedSelectorCreator = prepareSelection<typeof data, string>(({ foo }) => foo);
      const getFooLength = preparedSelectorCreator((str) => str.length);
      expect(getFooLength(data)).toEqual(data.foo.length);
    });
  });

  describe('many arguments', () => {
    const MAX_ARGUMENTS_LENGTH = 2;
    for (let argumentsLength = 2; argumentsLength <= MAX_ARGUMENTS_LENGTH; argumentsLength += 1) {
      describe(`arguments length: ${argumentsLength}`, () => {
        const randomArgs = Array(argumentsLength).fill(undefined).map(Math.random) as [any];
        test('prepared selector should return result of function passed to prepareSelection, if none arguments passed to prepareSelectionCreator', () => {
          const preparedSelectorCreator = prepareSelection<any[], number>((...args) => args.length);
          const preparedSelector = preparedSelectorCreator();
          expect(preparedSelector(...randomArgs)).toBe(randomArgs.length);
        });
        test('prepared selector should return result of composition of functions passed to prepareSelection and preparedSelectorCreator, if function passed to prepareSelectionCreator', () => {
          const preparedSelectorCreator = prepareSelection<any[], number>((...args) => args.length);
          const preparedSelector = preparedSelectorCreator((length) => length.toString());
          expect(preparedSelector(...randomArgs)).toBe(randomArgs.length.toString());
        });
      });
    }
  });
});

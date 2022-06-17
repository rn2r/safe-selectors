import { selectFrom } from '../src';

type FeatureToSelect = 'feature';
type DataObj = { [K in FeatureToSelect]: FeatureToSelect };

describe('selectFrom', () => {
  const MAX_ROOT_SELECTORS_LENGTH = 25;

  const featureToSelect: FeatureToSelect = 'feature';
  const dataObj: DataObj = { [featureToSelect]: featureToSelect };
  const rootSelector = (state: DataObj) => state[featureToSelect];
  const rootSelectorWithTwoArgs = (state: DataObj, feature: keyof DataObj) => state[feature];
  const featureSelector = (...args: any[]) => args.length;

  const spyRootSelector = jest.fn(rootSelector);
  const spyRootSelectorWithTwoArgs = jest.fn(rootSelectorWithTwoArgs);
  const spyFeatureSelector = jest.fn(featureSelector);

  const clearSpyInfo = () => {
    spyRootSelector.mockClear();
    spyRootSelectorWithTwoArgs.mockClear();
    spyFeatureSelector.mockClear();
  };

  describe('with one argument in selectors', () => {
    for (
      let rootSelectorsLength = 1;
      rootSelectorsLength <= MAX_ROOT_SELECTORS_LENGTH;
      rootSelectorsLength += 1
    ) {
      describe(`number of selectors: ${rootSelectorsLength}`, () => {
        let result: number;

        beforeAll(() => {
          const args = Array(rootSelectorsLength)
            .fill(spyRootSelector)
            .concat(spyFeatureSelector) as [typeof spyRootSelector, typeof spyFeatureSelector];
          const selector = selectFrom(...args);
          result = selector(dataObj);
        });

        afterAll(clearSpyInfo);

        test('should work', () => {
          expect(result).toBe(rootSelectorsLength);
        });

        test(`should execute rootSelector ${rootSelectorsLength} times`, () => {
          expect(spyRootSelector).toBeCalledTimes(rootSelectorsLength);
        });

        test('should execute rootSelector with argument passed to created selector', () => {
          expect(spyRootSelector).toHaveBeenNthCalledWith(rootSelectorsLength, dataObj, undefined);
        });

        test('should execute featureSelector once', () => {
          expect(spyFeatureSelector).toHaveBeenCalledTimes(1);
        });

        test('should execute featureSelector with returning values from rootSelectors', () => {
          const feature = rootSelector(dataObj);
          const featureRepeat = Array(rootSelectorsLength).fill(feature);
          expect(spyFeatureSelector).toHaveBeenNthCalledWith(1, ...featureRepeat);
        });
      });
    }
  });

  describe('with two arguments in selectors', () => {
    for (
      let rootSelectorsLength = 1;
      rootSelectorsLength <= MAX_ROOT_SELECTORS_LENGTH;
      rootSelectorsLength += 1
    ) {
      describe(`number of selectors: ${rootSelectorsLength}`, () => {
        let result: number;

        beforeAll(() => {
          const args = Array(rootSelectorsLength)
            .fill(spyRootSelectorWithTwoArgs)
            .concat(spyFeatureSelector) as [
            typeof spyRootSelectorWithTwoArgs,
            typeof spyFeatureSelector
          ];
          const selector = selectFrom(...args);
          result = selector(dataObj, featureToSelect);
        });

        afterAll(clearSpyInfo);

        test('should work', () => {
          expect(result).toBe(rootSelectorsLength);
        });

        test(`should execute rootSelector ${rootSelectorsLength} times`, () => {
          expect(spyRootSelectorWithTwoArgs).toBeCalledTimes(rootSelectorsLength);
        });

        test('should execute rootSelector with arguments passed to created selector', () => {
          expect(spyRootSelectorWithTwoArgs).toHaveBeenNthCalledWith(
            rootSelectorsLength,
            dataObj,
            featureToSelect
          );
        });

        test('should execute featureSelector once', () => {
          expect(spyFeatureSelector).toHaveBeenCalledTimes(1);
        });

        test('should execute featureSelector with returning values from rootSelectors', () => {
          const feature = spyRootSelectorWithTwoArgs(dataObj, featureToSelect);
          const featureRepeat = Array(rootSelectorsLength).fill(feature);
          expect(spyFeatureSelector).toHaveBeenNthCalledWith(1, ...featureRepeat);
        });
      });
    }
  });
});

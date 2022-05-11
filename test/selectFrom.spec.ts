import { selectFrom } from '../src/selectFrom'

describe('forward', () => {

    const rootState = {
        feature1: 1,
        feature2: [1, 2, 3],
        feature3: 'string',
        feature4: false,
        feature5: { value1: 1, value2: 2 }
    }

    const getFeature1 = (state: typeof rootState) => state.feature1;
    const getFeature2 = (state: typeof rootState) => state.feature2;
    const getFeature3 = (state: typeof rootState) => state.feature3;
    const getFeature4 = (state: typeof rootState) => state.feature4;
    const getFeature5 = (state: typeof rootState) => state.feature5;



    test('should work with passed prop', () => {
        const selector = selectFrom(getFeature5, 'value1');
        expect(selector(rootState)).toBe(rootState.feature5.value1);
    });

    test('should work with one selector', () => {
        const selector = selectFrom(getFeature5, ({ value1 }) => value1);
        expect(selector(rootState)).toBe(rootState.feature5.value1);
    });

    test('should work with two selectors', () => {
        const selector = selectFrom(getFeature1, getFeature2, (f1, f2) => {
            const {feature1, feature2} = rootState;
            return f1 === feature1 && f2 === feature2;
        });
        expect(selector(rootState)).toBeTruthy();
    });

    test('should work with three selectors', () => {
        const selector = selectFrom(getFeature1, getFeature2, getFeature3, (f1, f2, f3) => {
            const {feature1, feature2, feature3} = rootState;
            return f1 === feature1 && f2 === feature2 && f3 === feature3;
        });
        expect(selector(rootState)).toBeTruthy();
    });

    test('should work with four selectors', () => {
        const selector = selectFrom(getFeature1, getFeature2, getFeature3, getFeature4, (f1, f2, f3, f4) => {
            const {feature1, feature2, feature3, feature4} = rootState;
            return f1 === feature1 && f2 === feature2 && f3 === feature3 && f4 === feature4;
        });
        expect(selector(rootState)).toBeTruthy();
    });

    test('should work with five selectors', () => {
        const selector = selectFrom(getFeature1, getFeature2, getFeature3, getFeature4, getFeature5, (f1, f2, f3, f4, f5) => {
            const {feature1, feature2, feature3, feature4, feature5} = rootState;
            return f1 === feature1 && f2 === feature2 && f3 === feature3 && f4 === feature4 && f5 === feature5;
        });
        expect(selector(rootState)).toBeTruthy();
    })
})
import { forward } from '../src/forward'

describe('forward', () => {
    test('should return passed number', () => {
        const number = 1;
        expect(forward(number)).toBe(number);
    })
    
    test('should return passed string', () => {
        const string = 'string';
        expect(forward(string)).toBe(string);
    })

    test('should return passed boolean', () => {
        const boolean = true;
        expect(forward(boolean)).toBe(boolean);
    })

    test('should return passed null', () => {
        expect(forward(null)).toBeNull();
    })

    test('should return passed undefined', () => {
        expect(forward()).toBeUndefined()
    })

    test('should return passed object', () => {
        const object = {}
        expect(forward(object)).toBe(object);
    })

    test('should return passed array', () => {
        const array: any[] = []
        expect(forward(array)).toBe(array);
    })

    test('should return passed function', () => {
        const fn = () => {}
        expect(forward(fn)).toBe(fn);
    })
})
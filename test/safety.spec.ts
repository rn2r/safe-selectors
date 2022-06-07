import { safety } from '../src/safety';

describe('safety', () => {
  test('[KEY] The arg-function should work as usual, if it doesnot return null', () => {
    const keyToSelect = 'key';
    const dataObj = { [keyToSelect]: keyToSelect };
    const getData = safety(keyToSelect);

    expect(getData(dataObj)).toEqual(keyToSelect);
  });

  test('[KEY] The arg-function should return null, if it return undefined', () => {
    const keyToSelect = 'key';
    const dataObj = {};
    const getData = safety(keyToSelect);

    expect(getData(dataObj)).toBeNull();
  });

  test('[KEY] The arg-function should return fallback, if it return undefined and fallback has been passed', () => {
    const keyToSelect = 'key';
    const dataObj = {};
    const getData = safety(keyToSelect, keyToSelect);

    expect(getData(dataObj)).toEqual(keyToSelect);
  });

  test('[Fn] The arg-function should work as usual, if it doesnot return null', () => {
    const keyToSelect = 'key';
    const dataObj = { keyToSelect };
    const selector = ({ keyToSelect }: typeof dataObj) => keyToSelect;
    const getData = safety(selector);

    expect(getData(dataObj)).toEqual(keyToSelect);
  });

  test('[Fn] The arg-function should return null, if it return undefined', () => {
    const dataObj = {};
    const selector = ({ keyToSelect }: any) => keyToSelect;
    const getData = safety(selector);

    expect(getData(dataObj)).toBeNull();
  });

  test('[Fn] The arg-function should return fallback, if it return undefined and fallback has been passed', () => {
    const fallback = 'key';
    const dataObj = {};
    const selector = ({ keyToSelect }: any) => keyToSelect;
    const getData = safety(selector, fallback);

    expect(getData(dataObj)).toEqual(fallback);
  });

  test('[2Fn] The arg-function should work as usual, if it doesnot return null', () => {
    const firstKey = 'first';
    const secondKey = 'second';
    const dataObj = { firstKey, secondKey };
    const selector1 = ({ firstKey }: typeof dataObj, { secondKey }: typeof dataObj) =>
      firstKey + secondKey;
    const getData = safety(selector1);

    expect(getData(dataObj, dataObj)).toEqual(firstKey + secondKey);
  });

  test('[2Fn] The arg-function should return null, if it return undefined', () => {
    const firstKey = 'first';
    const secondKey = 'second';
    const dataObj = { firstKey, secondKey };
    const selector = ({ firstKey }: any, { secondKey }: any) => firstKey + secondKey;
    const getData = safety(selector);

    expect(getData(dataObj, undefined)).toBeNull();
  });

  test('[2Fn] The arg-function should return fallback, if it return undefined and fallback has been passed', () => {
    const firstKey = 'first';
    const secondKey = 'second';
    const dataObj = { firstKey, secondKey };
    const selector = ({ firstKey }: any, { secondKey }: any) => firstKey + secondKey;
    const getData = safety(selector, firstKey);

    expect(getData(undefined, undefined)).toEqual(firstKey);
  });
});

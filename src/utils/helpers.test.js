import {
  getAllUniqueWords,
  uniqueArray,
  keyObjects,
} from './helpers';

describe('Helper utility functions', () => {
  it('gets all unique words from a string and returns them in array', () => {
    let str = '  Foobar baz bar foo bar  qux, foo foobar ';
    expect(getAllUniqueWords(str)).toEqual(['foobar', 'baz', 'bar', 'foo', 'qux']);
    str = '     ';
    expect(getAllUniqueWords(str)).toEqual([]);
    expect(getAllUniqueWords()).toEqual([]);
  });

  it('returns unique values array with option to discard empty strings', () => {
    const arr1 = [1, 2, 2, 3, 'a', 'a', 'b', ' ', ' ', '', ''];
    expect(uniqueArray(arr1, true)).toEqual([1, 2, 3, 'a', 'b', ' ', '']);
    expect(uniqueArray(arr1)).toEqual([1, 2, 3, 'a', 'b']);
  });

  it('it transforms array into object with specified key and optional value', () => {
    const arr2 = [
      { key: '1', value: 1 },
      { key: '2', value: 2 },
      { key: '3', value: 3, foo: 'bar' },
    ];
    expect(keyObjects(arr2, 'key', 'value')).toEqual({ 1: 1, 2: 2, 3: 3 });
    expect(keyObjects(arr2, 'key')).toEqual({
      1: { key: '1', value: 1 },
      2: { key: '2', value: 2 },
      3: { key: '3', value: 3, foo: 'bar' },
    });
  });
});

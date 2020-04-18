import { convertType, parseParamsIntoObject, updateQueryParams } from './UrlQueryParamsManager';

describe('UrlQueryParamsManager utils', () => {
  it('keys can be written to and parsed from url', () => {
    const params = new URLSearchParams();
    params.append('stringKey', 'hello world');
    params.append('keyToDelete', 'hello world');
    params.append('retainedKey', 'hello world');
    params.append('stringListKey[]', 'listItem1');
    params.append('stringListKey[]', 'listItem2');

    updateQueryParams(
      params,
      {
        stringKey: 'goodbye world',
        keyToDelete: null,
        stringListKey: ['listItem3', 'listItem4'],
        numberKey: 1,
        stringNumberKey: '1',
        numberListKey: [1, 2, 3],
      },
      false,
    );

    const paramsObject = parseParamsIntoObject(params, {}, ['numberKey', 'numberListKey']);

    const expectedParams = {
      stringKey: 'goodbye world',
      keyToDelete: '',
      stringListKey: ['listItem3', 'listItem4'],
      numberKey: 1,
      stringNumberKey: '1',
      numberListKey: [1, 2, 3],
      retainedKey: 'hello world',
    };

    expect(paramsObject).toEqual(expectedParams);
  });

  it('should convert the value if the key is in numberKeys', () => {
    const key = 'location';
    const numberKeys = ['location'];
    const value = '1';

    const convertedValue = convertType(value, key, numberKeys);
    expect(convertedValue).toEqual(1);
  });

  it('should prefix the key with filter prefix and convert the value', () => {
    const key = 'filter_location';
    const numberKeys = ['location'];
    const value = '1';

    const convertedValue = convertType(value, key, numberKeys);
    expect(convertedValue).toEqual(1);
  });

  it('should not convert the value if the key is not in numberKeys', () => {
    const key = 'location';
    const numberKeys = ['department'];
    const value = '1';

    const convertedValue = convertType(value, key, numberKeys);
    expect(convertedValue).toEqual('1');
  });

  it('should not convert the value if the numberKeys is empty', () => {
    const key = 'location';
    const numberKeys = [] as string[];
    const value = '1';

    const convertedValue = convertType(value, key, numberKeys);
    expect(convertedValue).toEqual('1');
  });
});

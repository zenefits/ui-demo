import addPermissionsReducer from './permissionsRedux';

describe('addPermissionsReducer', () => {
  it('should add permissions reducer to given reducers map', () => {
    const map = {
      foo: () => {},
    };

    const newMap = addPermissionsReducer(map);
    expect(newMap.foo).toBe(map.foo);
    expect(typeof (newMap as any).permissions).toBe('function');
  });
});

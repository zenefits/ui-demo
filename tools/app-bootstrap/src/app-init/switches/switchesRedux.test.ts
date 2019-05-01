import addSwitchesReducer from './switchesRedux';

describe('addSwitchesReducer', () => {
  it('should add switches reducer to given reducers map', () => {
    const map = {
      foo: () => {},
    };

    const newMap = addSwitchesReducer(map);

    expect(newMap.foo).toBe(map.foo);
    expect(typeof (newMap as any).switches).toBe('function');
  });
});

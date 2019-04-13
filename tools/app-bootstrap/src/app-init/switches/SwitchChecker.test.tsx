import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { addSwitchesReducer, setSwitchesAction } from '../../..';
import SwitchChecker from './SwitchChecker';

describe('SwitchChecker component', () => {
  it('should add switches to wrapped component', () => {
    const switchValue = 'abc';
    const store = createStore(combineReducers(addSwitchesReducer({})));

    store.dispatch(
      setSwitchesAction({
        foo: switchValue,
      } as any),
    );

    const renderedString = '123';

    const renderedFoo = mount(
      <Provider store={store}>
        <SwitchChecker switch={'foo' as any}>
          <div>{renderedString}</div>
        </SwitchChecker>
      </Provider>,
    );

    expect(renderedFoo.html().includes(renderedString)).toBe(true);

    const renderedBar = mount(
      <Provider store={store}>
        <SwitchChecker switch={'bar' as any}>
          <div>{renderedString}</div>
        </SwitchChecker>
      </Provider>,
    );

    expect(renderedBar.html()).toBe(null);
  });
});

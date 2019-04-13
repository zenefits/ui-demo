import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import withSwitches, { WithSwitchesProps } from './withSwitches';
import { addSwitchesReducer, setSwitchesAction } from '../../..';

describe('withSwitches HOC', () => {
  it('should add switches to wrapped component', () => {
    const switchValue = 'abc';
    const store = createStore(combineReducers(addSwitchesReducer({})));

    store.dispatch(
      setSwitchesAction({
        foo: switchValue,
      } as any),
    );

    interface OwnProps {}

    class MyComponent extends Component<OwnProps & WithSwitchesProps> {
      render() {
        return <div>{(this.props.switches as any).foo}</div>;
      }
    }

    const MyComponentWithSwitches = withSwitches<OwnProps>()(MyComponent);

    const rendered = mount(
      <Provider store={store}>
        <MyComponentWithSwitches />
      </Provider>,
    );

    expect(
      rendered
        .find(MyComponent)
        .html()
        .includes(switchValue),
    ).toBe(true);
  });
});

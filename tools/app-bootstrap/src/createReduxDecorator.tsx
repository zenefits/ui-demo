import React from 'react';
import createReduxProvider from './createReduxProvider';

export default function createReduxDecorator(reducers = {}) {
  const [Provider, props] = createReduxProvider(reducers);
  return storyFn => <Provider {...props}>{storyFn()}</Provider>;
}

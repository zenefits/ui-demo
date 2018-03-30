import React from 'react';

export default function createReduxDecorator(reducers = {}, createReduxProvider) {
  const [Provider, props] = createReduxProvider({ reducers });
  return storyFn => <Provider {...props}>{storyFn()}</Provider>;
}

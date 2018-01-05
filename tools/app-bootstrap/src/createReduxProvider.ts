import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider, Store } from 'react-redux';

export interface ReduxProviderFactoryOptions {
  reducers?: { [key: string]: any };
  middleware?: any[];
  composeFn?: (any) => any;
}

export declare type ReduxProviderFactoryResult = [typeof Provider, { store: Store<{}> }];

export default function createReduxProvider({
  reducers = { foo: (state = {}) => state },
  middleware = [],
  composeFn,
}: ReduxProviderFactoryOptions = {}): ReduxProviderFactoryResult {
  const composeEnhancers = composeFn || compose;
  const resultMiddleware = [].concat(middleware);
  const store = createStore(combineReducers(reducers), {}, composeEnhancers(applyMiddleware(...resultMiddleware)));
  return [Provider, { store }];
}

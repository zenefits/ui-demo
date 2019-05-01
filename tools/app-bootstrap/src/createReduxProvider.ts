import { applyMiddleware, combineReducers, compose, createStore, Reducer } from 'redux';
import { Provider, Store } from 'react-redux';

import { setStore } from './getStore';

export interface ReduxProviderFactoryOptions {
  reducers?: { [key: string]: any } | Reducer<any>;
  middleware?: any[];
  composeFn?: (p: any) => any;
}

export type ReduxProviderFactoryResult = [typeof Provider, { store: Store<{}> }];

export default function createReduxProvider(params: ReduxProviderFactoryOptions = {}): ReduxProviderFactoryResult {
  const { reducers = { foo: (state = {}) => state }, middleware = [], composeFn } = params;
  const composeEnhancers = composeFn || compose;
  const resultMiddleware = middleware.slice();
  const finalReducer: Reducer<any> =
    typeof reducers === 'function' ? (reducers as Reducer<any>) : combineReducers(reducers);

  const store = createStore(finalReducer, {}, composeEnhancers(applyMiddleware(...resultMiddleware)));

  setStore(store);

  return [Provider, { store }];
}

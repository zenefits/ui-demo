import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider, Store } from 'react-redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export default function createReduxProvider(reducers = {}, middleware = []): [typeof Provider, { store: Store<{}> }] {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const resultMiddleware = [].concat(middleware);
  const store = createStore(combineReducers(reducers), {}, composeEnhancers(applyMiddleware(...resultMiddleware)));
  return [Provider, { store }];
}

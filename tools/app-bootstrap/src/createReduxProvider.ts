import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export default function createReduxProvider(reducers = {}, middleware = []): [typeof Provider, {}] {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const resultMiddleware = [].concat(middleware);
  const store = createStore(combineReducers(reducers), {}, composeEnhancers(applyMiddleware(...resultMiddleware)));
  return [Provider, { store }];
}

import { combineReducers, createStore } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
// @ts-ignore
import createReduxProxy from 'react-cosmos-redux-proxy';

import { addPermissionsReducer } from 'z-frontend-app-bootstrap';

// import { devToolsEnhancer } from 'redux-devtools-extension';

const reducers = addPermissionsReducer({
  form: reduxFormReducer, // mounted under "form"
});

const configureStore = (initialState: any) => createStore(combineReducers(reducers), initialState);

export default () =>
  createReduxProxy({
    createStore: (state: any) => configureStore(state),
  });

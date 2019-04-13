import { createLocaleReducer, createReduxDecorator } from 'z-frontend-app-bootstrap';

const reducers = {
  // NOTE: avoiding dep on redux-form
  // we can probably live without this (maybe should just delete FormRedux.stories)
  // form: formReducer,
};

const reduxDecorator = createReduxDecorator({
  reducers: {
    ...reducers,
    locale: createLocaleReducer('en'),
  },
});

export default reduxDecorator;

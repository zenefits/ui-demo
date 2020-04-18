import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { withErrorBoundary } from 'z-frontend-app-bootstrap';

import People from './People';

export default withErrorBoundary()(() => (
  <Switch>
    <Route path="/people" exact component={People} />
  </Switch>
));

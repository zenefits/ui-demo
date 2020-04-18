import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { withErrorBoundary } from 'z-frontend-app-bootstrap';

import Objects from './Objects';
import ObjectRoutes from './object/ObjectRoutes';

export default withErrorBoundary()(() => (
  <Switch>
    <Route path="/objects" exact component={Objects} />
    <Route path="/objects/:objectId" component={ObjectRoutes} />
  </Switch>
));

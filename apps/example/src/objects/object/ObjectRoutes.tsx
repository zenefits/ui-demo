import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { withErrorBoundary } from 'z-frontend-app-bootstrap';

import Edit from './edit/Edit';

export default withErrorBoundary()(() => (
  <Switch>
    <Route path="/objects/new" component={Edit} />
    <Route path="/objects/:objectId/edit" strict component={Edit} />
    <Route path="/objects/:objectId" component={Edit} />
  </Switch>
));

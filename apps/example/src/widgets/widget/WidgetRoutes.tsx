import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Edit from './Edit';

export default () => (
  <Switch>
    <Route path="/widgets/new" component={Edit} />
  </Switch>
);

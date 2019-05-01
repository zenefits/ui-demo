import React from 'react';
import { Route, Switch } from 'react-router-dom';

import WidgetRoutes from './widget/WidgetRoutes';

export default () => (
  <Switch>
    <Route path="/widgets/:widgetId" component={WidgetRoutes} />
  </Switch>
);

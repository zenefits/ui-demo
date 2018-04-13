import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Article from './Article';
import Edit from './edit/Edit';

export default () => (
  <Switch>
    <Route path="/articles/:articleId/edit" component={Edit} />
    <Route path="/articles/:articleId" component={Article} />
  </Switch>
);

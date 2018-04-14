import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ArticleRoutes from './article/ArticleRoutes';
import Articles from './Articles';

export default () => (
  <Switch>
    <Route path="/articles" exact component={Articles} />
    <Route path="/articles/:articleId" component={ArticleRoutes} />
  </Switch>
);

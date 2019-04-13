import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Robots from './Robots';
import Robot from './Robot';

export default () => (
  <Switch>
    <Route path="/robots" exact component={Robots} />
    <Route path="/robots/:robotId" exact render={props => <Robot {...props} />} />
    <Route path="/robots/:robotId/edit" render={props => <Robot {...props} editMode />} />
  </Switch>
);

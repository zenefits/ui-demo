import React from 'react';

import EmberRouteLink from './EmberRouteLink';

export default () => (
  <EmberRouteLink to="employeeProfile" routeParams={[1]} target="_blank">
    Employee Profile
  </EmberRouteLink>
);

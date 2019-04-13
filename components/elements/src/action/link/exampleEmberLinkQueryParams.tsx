import React from 'react';

import EmberRouteLink from './EmberRouteLink';

export default () => (
  <EmberRouteLink to="search" queryParams={{ q: 'FSA', start: 0 }} target="_blank">
    Search "FSA"
  </EmberRouteLink>
);

import React, { FunctionComponent } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { useDocumentTitle } from '../title/useDocumentTitle';

type SectionRouteProps = {
  title?: string;
} & RouteProps;

const SectionRoute: FunctionComponent<SectionRouteProps> = ({ title, ...routeProps }) => {
  useDocumentTitle(title);

  return <Route {...routeProps} />;
};

export default SectionRoute;

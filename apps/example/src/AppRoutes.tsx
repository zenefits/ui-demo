import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Text } from 'zbase';
import { NavBar, TopNavBar } from 'z-frontend-forms';
import { ProductNavContainer, ProductPageContainer } from 'z-frontend-layout';

import Overview from './overview/Overview';
import ArticlesRoutes from './articles/ArticlesRoutes';

const Fragment = (React as any).Fragment;

class AppRouters extends Component<{}> {
  render() {
    return (
      <Fragment>
        <TopNavBar productTitleKey="nav.productTitle" productTitleDefault="Example app" />

        <ProductNavContainer>
          <NavBar mode="product">
            <NavBar.RouterNavLink to="/overview">
              <Text textKey="nav.overview" textDefault="Overview" />
            </NavBar.RouterNavLink>
            <NavBar.RouterNavLink to="/articles">
              <Text textKey="nav.articles" textDefault="Articles" />
            </NavBar.RouterNavLink>
          </NavBar>
        </ProductNavContainer>

        <ProductPageContainer>
          <Switch>
            <Route path="/overview" component={Overview} />
            <Route path="/articles" component={ArticlesRoutes} />
            <Redirect to="/overview" />
          </Switch>
        </ProductPageContainer>
      </Fragment>
    );
  }
}

export default AppRouters;

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { TextInline } from 'zbase';
import { NavBar, ProductNavContainer, ProductPageContainer, TopNavBar } from 'z-frontend-layout';

import Overview from './overview/Overview';
import ArticlesRoutes from './articles/ArticlesRoutes';
import WidgetsRoutes from './widgets/WidgetsRoutes';

class AppRouters extends Component<{}> {
  render() {
    return (
      <>
        <TopNavBar productTitleKey="nav.productTitle" productTitleDefault="Example app" />

        <ProductNavContainer>
          <NavBar mode="product">
            <NavBar.RouterNavLink to="/overview">
              <TextInline textKey="nav.overview" textDefault="Overview" />
            </NavBar.RouterNavLink>
            <NavBar.RouterNavLink to="/articles">
              <TextInline textKey="nav.articles" textDefault="Articles" />
            </NavBar.RouterNavLink>
            <NavBar.RouterNavLink to="/widgets">
              <TextInline textKey="nav.widgets" textDefault="Widgets" />
            </NavBar.RouterNavLink>
          </NavBar>
        </ProductNavContainer>

        <ProductPageContainer>
          <Switch>
            <Route path="/overview" component={Overview} />
            <Route path="/articles" component={ArticlesRoutes} />
            <Route path="/widgets" component={WidgetsRoutes} />
            <Redirect to="/overview" />
          </Switch>
        </ProductPageContainer>
      </>
    );
  }
}

export default AppRouters;

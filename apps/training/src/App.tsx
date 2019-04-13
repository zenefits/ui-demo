import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { NavBar, ProductNavContainer, ProductPageContainer, TopNavBar } from 'z-frontend-layout';

import RobotRoutes from './RobotRoutes';
import Overview from './Overview';

interface AppProps {}

class App extends Component<AppProps> {
  render() {
    return (
      <>
        <TopNavBar productTitleDefault="Training" />

        <ProductNavContainer>
          <NavBar mode="product">
            <NavBar.RouterNavLink to="/overview">Overview</NavBar.RouterNavLink>
            <NavBar.RouterNavLink to="/robots">Robots</NavBar.RouterNavLink>
          </NavBar>
        </ProductNavContainer>

        <ProductPageContainer>
          <Switch>
            <Route exact path="/overview" component={Overview} />
            <Route path="/robots" component={RobotRoutes} />
            <Redirect to="/overview" />
          </Switch>
        </ProductPageContainer>
      </>
    );
  }
}

export default App;

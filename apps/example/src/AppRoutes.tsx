import React, { Component } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { TextInline } from 'zbase';
import { NavBar, ProductNavContainer, ProductPageContainer, TopNavBar } from 'z-frontend-layout';
import { SectionRoute } from 'z-frontend-app-bootstrap';

import Overview from './overview/Overview';
import ObjectsRoutes from './objects/ObjectsRoutes';
import PeopleRoutes from './people/PeopleRoutes';
import Company from './company/Company';
import AvatarUpload from './people/AvatarUpload';

class AppRouters extends Component<{}> {
  render() {
    return (
      <>
        {/**
          Use this Route with TopNavBar pattern if you want to show a company name in TopNavBar.
          Otherwise you can use TopNavBar without using Route or passing companyId.
          Function passed to children gets called whether the path matches or not.
          https://reacttraining.com/react-router/web/api/Route/children-func
          */}
        <Route
          path="/company/:companyId"
          children={({ match }: RouteComponentProps<{ companyId?: string }>) => {
            return (
              <TopNavBar
                productTitleKey="nav.productTitle"
                productTitleDefault="Example app"
                companyId={match && match.params.companyId}
                showInbox
                useClientHamburgerContent
              />
            );
          }}
        />

        <ProductNavContainer>
          <NavBar mode="product">
            <NavBar.RouterNavLink to="/overview">
              <TextInline textKey="nav.overview" textDefault="Overview" />
            </NavBar.RouterNavLink>
            <NavBar.RouterNavLink to="/people">
              <TextInline textKey="nav.people" textDefault="People" />
            </NavBar.RouterNavLink>
            <NavBar.RouterNavLink to="/objects">
              <TextInline textKey="nav.objects" textDefault="Objects" />
            </NavBar.RouterNavLink>
          </NavBar>
        </ProductNavContainer>

        <ProductPageContainer>
          <Switch>
            <SectionRoute path="/overview" component={Overview} />
            <SectionRoute path="/people" component={PeopleRoutes} title="People" />
            <SectionRoute path="/objects" component={ObjectsRoutes} title="Objects" />
            <SectionRoute path="/company/:companyId" component={Company} />
            <SectionRoute path="/avatar" component={AvatarUpload} />
            <Redirect to="/overview" />
          </Switch>
        </ProductPageContainer>
      </>
    );
  }
}

export default AppRouters;

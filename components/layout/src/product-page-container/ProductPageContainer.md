A container for the **product page routes**. Usually being used together with ProductNavContainer component.

#### Usage

- Should be wrapping all product page routes at the top level of an app
- Should be placed after TopNavBar and ProductNavContainer

#### Examples

Used in the standard entry point for an app (AppRoutes file)

```jsx static
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { TextInline } from 'zbase';

import { NavBar, ProductPageContainer, TopNavBar } from '../../index';
import ProductNavContainer from './ProductNavContainer';

export default () => (
  <>
    <TopNavBar productTitleKey="nav.productTitle" productTitleDefault="Example app" />

    <ProductNavContainer>{/* product nav links */}</ProductNavContainer>

    <ProductPageContainer>
      <Switch>
        <Route path="/overview" component={() => <div>overview</div>} />
        <Route path="/articles" component={() => <div>articles</div>} />
        <Redirect to="/overview" />
      </Switch>
    </ProductPageContainer>
  </>
);
```

#### Related

- [ProductNavContainer](#!/ProductNavContainer) Product nav bar of the app
- [NavBar](#!/NavBar) A menu component with navigation links
- [TopNavBar](#!/TopNavBar) The top fixed menu

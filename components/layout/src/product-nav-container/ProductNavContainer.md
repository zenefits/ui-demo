A container for the **product nav bar**, makes product nav fixed. Usually being used together with ProductPageContainer component.

#### Usage

- Should be wrapping NavBar component at the top level of an app,
- Should be placed after TopNavBar and before ProductPageContainer

#### Examples

Used in the standard entry point for an app (AppRoutes file)

```jsx static
import React from 'react';

import { TextInline } from 'zbase';

import { NavBar, ProductPageContainer, TopNavBar } from '../../index';
import ProductNavContainer from './ProductNavContainer';

export default () => (
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
      </NavBar>
    </ProductNavContainer>

    <ProductPageContainer>{/* app routes */}</ProductPageContainer>
  </>
);
```

#### Related

- [ProductPageContainer](#!/ProductPageContainer) A container component for product routes
- [NavBar](#!/NavBar) A menu component with navigation links
- [TopNavBar](#!/TopNavBar) The top fixed menu

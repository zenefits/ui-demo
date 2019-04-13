The top navigation bar component

#### Usage

- Should be at the top level of the app (AppRoutes file)
- Should be placed before ProductNavContainer

#### Examples

```jsx noeditor
<StorybookExample selectedKind="layout|TopNavBar" selectedStory="default" height="100px" />
```

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

    <ProductPageContainer>{/* app routes */}</ProductPageContainer>
  </>
);
```

#### Implementation Notes

- Adding children to TopNavBar will hide omni search

#### Related

- [ProductNavContainer](#!/ProductNavContainer) Product nav bar of the app
- [ProductPageContainer](#!/ProductPageContainer) A container component for product routes
- [NavBar](#!/NavBar) A menu component with navigation links

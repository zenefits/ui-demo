A container providing a fixed layout for product navigation links.

#### Usage

- Should wrap the NavBar component at the top level of an app
- Should be placed after TopNavBar and before ProductPageContainer

#### Examples

Used in the standard entry point for an app (AppRoutes file)

```jsx static
export default () => (
  <>
    <TopNavBar productTitleKey="nav.productTitle" productTitleDefault="Example app" />

    <ProductNavContainer>
      <NavBar mode="product">
        <NavBar.RouterNavLink to="/overview">
          <TextInline textKey="nav.overview" textDefault="Overview" />
        </NavBar.RouterNavLink>
        <NavBar.RouterNavLink to="/people">
          <TextInline textKey="nav.people" textDefault="People" />
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

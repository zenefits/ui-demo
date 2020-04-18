A container providing basic layout for product page content.

#### Usage

- Should wrap all product page routes at the top level of an app
- Should be placed after TopNavBar and ProductNavContainer

#### Examples

Used in the standard entry point for an app (AppRoutes file)

```jsx static
export default () => (
  <>
    <TopNavBar productTitleKey="nav.productTitle" productTitleDefault="Example app" />

    <ProductNavContainer>{/* product nav links */}</ProductNavContainer>

    <ProductPageContainer>
      <Switch>
        <SectionRoute path="/overview" component={Overview} />
        <SectionRoute path="/people" component={PeopleRoutes} title="People" />
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
- [SectionRoute](#!/SectionRoute)

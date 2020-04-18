A wrapper for page routing that also updates the document title.

This is a thin wrapper around react-router's `<Route>`.

#### Usage

- Use instead of Route for major sections of an app.
- The `title` should match the navbar tab. Each page need not have a unique title (for now).

#### Examples

In the following example, pages under `/overview` will have a default title of "App - Zenefits", where "App" is the title specified in `locales.js`. Pages under `/people` will have a title of "People - App - Zenefits".

```jsx static
<Switch>
  <SectionRoute path="/overview" component={Overview} />
  <SectionRoute path="/people" component={PeopleRoutes} title="People" />
  <Redirect to="/overview" />
</Switch>
```

#### Related

- [ProductPageContainer](#!/ProductPageContainer)

See also [Providing descriptive titles for Web pages](https://www.w3.org/WAI/WCAG21/Techniques/general/G88.html).

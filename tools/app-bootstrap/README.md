# z-frontend-app-bootstrap

This package includes providers that can be added to your react app. It currently includes the following providers:

- Redux
- GraphQL (Apollo)
- Router v4
- Hot reloading

## Installation

Add the dependency `z-frontend-app-bootstrap` to your app's `package.json`:

```
  "dependencies": {
    ...
    "z-frontend-app-bootstrap": "*",
    ...
  },
```

Run `lerna bootstrap` at the root of your app to install node dependencies.

## Development

In your app, you can add any or all of the providers as follows:

```
import { createReduxProvider, createApolloClient, createRouterProvider } from 'z-frontend-app-bootstrap';
import renderApp from 'z-frontend-render-app';

renderApp({
  App,
  providers: [createReduxProvider({ reducers }), createApolloClient(), createRouterProvider()],
  hotReloadCallback: renderApp => {
    module.hot.accept('./App', () => {
      renderApp(App);
    });
  },
});
```

`renderApp` is a function that accepts a settings configuration object with the following known parameters:

- `App`: any; Component for your application
- `element?`: HTMLElement; Optional element to specify the container to render the app;
  If nothing is specified, will default to element with id `appRoot`
- `providers`: any[]; Array of any providers to include
- `hotReloadCallback`: Function; Callback for hot reloading

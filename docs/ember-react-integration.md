This guide is about embedding React apps inside the yp3 Ember app.

### Getting started

The embedded React app does not need any special configuration in z-frontend.
Put your app in `z-frontend/apps` as you would a stand-alone app.

To embed the React app in Ember, use the React-app component in Ember.
Pass the name of your z-frontend app as the appName argument

```js static
{{react-app appName="my-app"}}
```

### Routes

Because the Ember and React applications will be sharing the same router, it is important that
the React route names match routes that are recognized by Ember. Ember routes are declared in
`yourPeople3/static/js/eager/router.js`.

### Running locally

To run your application locally, you will need to have local running instance of both yp3 and
your React app. In order for your embedded React app to load properly when running locally,
the client-app must be accessed through the React port. For example, if your React app port
number is 3020, then you should go to `localhost:3020/dashboard` to access the Ember app.

You may also access the React app as you would any other React app -- by running `yarn start`
and accessing `localhost:$PORT/app/$APP_NAME`.

### Conditional logic

If some part of your application needs to behave differently when operating in Ember vs as a
stand-alone app, you may check `window.__WITHIN_EMBER_APP__`.

In this example, this property is used to control whether the Ember top and product navs
should be shown:

```js static
{
  !window.__WITHIN_EMBER_APP__ && <TopNavBar productTitleKey="nav.productTitle" productTitleDefault="Reports Beta" />;
}

{
  !window.__WITHIN_EMBER_APP__ && (
    <ProductNavContainer>
      <NavBar mode="product">
        <NavBar.RouterNavLink to="/payroll/reports-beta">
          <TextInline textKey="nav.reportsbeta" textDefault="Reports" />
          <Badge color="negation.b" textKey="( BETA )" bg="grayscale.white" p={0} />
        </NavBar.RouterNavLink>
        <NavBar.RouterNavLink to="/payroll/settings/general-ledger">
          <TextInline textKey="nav.gl" textDefault="GL" />
        </NavBar.RouterNavLink>
        <NavBar.RouterNavLink to="/payroll/settings/401k">
          <TextInline textKey="nav.401k" textDefault="401k" />
        </NavBar.RouterNavLink>
      </NavBar>
    </ProductNavContainer>
  );
}
```

### Accessing deployed shas

To load a specific React app deployment when within Ember, you can include the deploy sha in
the URL. The sha should be specified as a query param after `dashboard` and before the
`#`.

```js static
https://secure.zenefits.com/dashboard?sha=SHA_GOES_HERE#/
```

### Sending messages

If the embedded React app needs to communicate with Ember, there is a messaging
system that allows doing so.

Note this is an advanced feature that is not needed in most cases. It should NOT be used to send data that could be retrieved via graphql.

#### Sending messages to React

To send a message to React, first define a callback using `subscribeToEmberMessage`, which is imported
from `z-frontend-app-bootstrap`.

```jsx static
class MyComponent extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    subscribeToEmberMessage(MY_MESSAGE_TYPE, (payload) => {
      ...
    });
  }
}
```

In Ember, the message can be sent using `window.sendMessageToReact`. When sending messages,
you must provide the app name and message type. A payload may be passed to the React callback
as well.

```js static
window.sendMessageToReact('myApp', MY_MESSAGE_TYPE, payload);
```

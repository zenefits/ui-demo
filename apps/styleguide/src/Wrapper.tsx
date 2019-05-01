import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';

import { ThemeProvider } from 'z-frontend-theme';
import { NotificationProvider } from 'z-frontend-elements';

const exampleMessages = {
  'homepage.hello': 'Greetings, {name}!',
  'status.ended': 'Ended',
  'employees.title': 'Employees',
  'reviews.assigned.none': 'No assigned reviews',
  'reviews.assigned.one': '{count} assigned review',
  'reviews.assigned.other': '{count} assigned reviews',
};

// wrapper for each example
// overrides https://github.com/styleguidist/react-styleguidist/blob/master/src/client/rsg-components/Wrapper/Wrapper.js
export default class Wrapper extends Component {
  render() {
    return (
      <IntlProvider locale="en" messages={exampleMessages}>
        <ThemeProvider>
          <NotificationProvider>{this.props.children}</NotificationProvider>
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';

import { ThemeProvider } from 'z-frontend-theme';

const exampleMessages = {
  'homepage.hello': 'Greetings, {name}!',
  'status.ended': 'Ended',
  'employees.title': 'Employees',
};

export default class Wrapper extends Component {
  render() {
    return (
      <IntlProvider locale="en" messages={exampleMessages}>
        <ThemeProvider>{this.props.children}</ThemeProvider>
      </IntlProvider>
    );
  }
}

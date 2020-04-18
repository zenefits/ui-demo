import React from 'react';
import { IntlProvider } from 'react-intl';

import { ThemeProvider } from '../index';

const defaultMessages = { foo: 'bar' };
const locale = 'en';

type MountOptions = {
  locale?: string;
  messages?: { [key: string]: string };
};

export function mount(children: React.ReactNode, options: MountOptions = {}) {
  // TODO: fix cy.mount types
  // see https://github.com/bahmutov/cypress-react-unit-test/issues/55
  // @ts-ignore
  return cy.mount(
    <IntlProvider locale={options.locale || locale} messages={options.messages || defaultMessages}>
      <ThemeProvider>{children}</ThemeProvider>
    </IntlProvider>,
  );
}

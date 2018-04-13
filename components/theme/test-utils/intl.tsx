import React from 'react';
import { intlShape, IntlProvider } from 'react-intl';
import { mount, render } from 'enzyme';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { ThemeProvider } from '../index';

/**
 * Helper utils for testing components that depend on i18n and (possibly) theme.
 * Approach based on https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#enzyme
 */

// another approach we could try: mock react-intl at jest level
// https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#jest-mock

const defaultMessages = { foobar: 'baz' };
const locale = 'en';

function withIntl(fn, children, provider, { context = {}, childContextTypes = {} } = {}) {
  const intl = provider.getChildContext().intl;
  return fn(React.cloneElement(children, { intl }), {
    context: Object.assign({}, context, { intl }),
    childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes),
  });
}

function getThemeContext(children, intlProvider) {
  const wrapped = withIntl(mount, <ThemeProvider>{children}</ThemeProvider>, intlProvider);
  return wrapped
    .find(SCThemeProvider)
    .instance()
    .getChildContext();
}

function getIntlProvider(options: intlOptions) {
  const messages = options.messages || defaultMessages;
  return options.intlProvider || new IntlProvider({ locale, messages }, {});
}

type intlOptions = {
  intlProvider?: any;
  messages?: any;
  context?: any;
  childContextTypes?: any;
};

export function mountWithIntl(children, options: intlOptions = {}) {
  const intlProvider = getIntlProvider(options);
  return withIntl(mount, children, intlProvider, options);
}

export function mountWithThemeIntl(children, options: intlOptions = {}) {
  const intlProvider = getIntlProvider(options);
  const combinedContext = { ...getThemeContext(children, intlProvider), ...intlProvider.getChildContext() };
  const combinedContextTypes = { ...SCThemeProvider.childContextTypes, intl: intlShape };

  return mountWithIntl(children, {
    intlProvider,
    context: combinedContext,
    childContextTypes: combinedContextTypes,
  });
}

export function renderWithIntl(children, options: intlOptions = {}) {
  const intlProvider = getIntlProvider(options);
  return withIntl(render, children, intlProvider, options);
}

export function renderWithThemeIntl(children, options: intlOptions = {}) {
  const intlProvider = getIntlProvider(options);
  const combinedContext = { ...getThemeContext(children, intlProvider), ...intlProvider.getChildContext() };
  return renderWithIntl(children, { context: combinedContext });
}

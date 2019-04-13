import React, { ReactElement } from 'react';
import { intlShape, IntlProvider } from 'react-intl';
import { mount, render, shallow } from 'enzyme';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { ThemeProvider } from '../index';

const defaultMessages = { foobar: 'baz' };
const locale = 'en';

// using example from https://github.com/styled-components/jest-styled-components#theming

/*
Use when styled-components v4 update happens

function getIntlThemeContextParams(options: IntlProvider.Props = {}) {
  const messages = options.messages || defaultMessages;
  const intlProviderInstance = shallow(
    <IntlProvider locale={locale} {...options} messages={messages}>
      <div>empty</div>
    </IntlProvider>,
  ).instance();
  const intlContext = (intlProviderInstance as any).getChildContext();

  return {
    context: {
      ...intlContext,
    },
    childContextTypes: {
      intl: intlShape,
    },
  };
}

export function mountWithThemeIntl(children: ReactElement<any>, options: IntlProvider.Props = {}) {
  return mountWithTheme(children, getIntlThemeContextParams(options));
}

export function renderWithThemeIntl(children: ReactElement<any>, options: IntlProvider.Props = {}) {
  return renderWithTheme(children, getIntlThemeContextParams(options));
}
*/

function getIntlThemeContextParams(options: IntlProvider.Props = {}) {
  const themeProviderInstance = shallow(<ThemeProvider />)
    .dive()
    .instance();
  const themeContext = (themeProviderInstance as any).getChildContext();

  const messages = options.messages || defaultMessages;
  const intlProviderInstance = shallow(
    <IntlProvider locale={locale} {...options} messages={messages}>
      <div>empty</div>
    </IntlProvider>,
  ).instance();
  const intlContext = (intlProviderInstance as any).getChildContext();

  return {
    context: {
      ...themeContext,
      ...intlContext,
    },
    childContextTypes: {
      ...SCThemeProvider.childContextTypes,
      intl: intlShape,
    },
  };
}

export function mountWithThemeIntl(children: ReactElement<any>, options: IntlProvider.Props = {}) {
  return mount(children, getIntlThemeContextParams(options));
}

export function renderWithThemeIntl(children: ReactElement<any>, options: IntlProvider.Props = {}) {
  return render(children, getIntlThemeContextParams(options));
}

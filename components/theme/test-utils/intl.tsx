import React, { ReactElement } from 'react';
import { intlShape, IntlProvider } from 'react-intl';
import { shallow } from 'enzyme';

import { mountEnzymeWithTheme, renderEnzymeWithTheme } from './theme';

const defaultMessages = { foobar: 'baz' };
const locale = 'en';

// using example from https://github.com/styled-components/jest-styled-components#theming

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

/** @deprecated */
export function mountEnzymeWithThemeIntl(children: ReactElement<any>, options: IntlProvider.Props = {}) {
  return mountEnzymeWithTheme(children, getIntlThemeContextParams(options));
}

/** @deprecated */
export function renderEnzymeWithThemeIntl(children: ReactElement<any>, options: IntlProvider.Props = {}) {
  return renderEnzymeWithTheme(children, getIntlThemeContextParams(options));
}

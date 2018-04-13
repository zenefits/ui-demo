import React from 'react';
import 'jest-styled-components';

import { mountWithThemeIntl, renderWithThemeIntl } from 'z-frontend-theme/test-utils/intl';

import { A } from './index';

const messages = {
  greeting: 'Hello {name}',
};

describe('Text', () => {
  it('should render an `<a>`', () => {
    const rendered = renderWithThemeIntl(<A>anchor</A>);
    expect(rendered.is('a')).toBe(true);
  });

  it('should include an href', () => {
    const rendered = renderWithThemeIntl(<A href="foo.com">anchor</A>);
    expect(rendered.attr('href')).toBe('foo.com');
  });

  it('should respect util props', () => {
    const mounted = mountWithThemeIntl(<A p={123}>anchor</A>);
    expect(mounted).toHaveStyleRule('padding', '123px');
  });

  it('should respect i18n props', () => {
    const mounted = mountWithThemeIntl(<A textKey="greeting" textValues={{ name: 'David' }} />, { messages });
    expect(mounted.text()).toBe('Hello David');
  });

  it('should respect i18n default message', () => {
    const mounted = mountWithThemeIntl(<A textKey="na" textDefault="Salutations" />, { messages });
    expect(mounted.text()).toBe('Salutations');
  });
});

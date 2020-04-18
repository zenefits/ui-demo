import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithThemeIntl, renderEnzymeWithThemeIntl } from 'z-frontend-theme/test-utils/intl';

import { A } from './index';

const messages = {
  greeting: 'Hello {name}',
};

describe('Text', () => {
  it('should render an `<a>`', () => {
    const rendered = renderEnzymeWithThemeIntl(<A>anchor</A>);
    expect(rendered.is('a')).toBe(true);
  });

  it('should include an href', () => {
    const rendered = renderEnzymeWithThemeIntl(<A href="foo.com">anchor</A>);
    expect(rendered.attr('href')).toBe('foo.com');
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithThemeIntl(<A p={123}>anchor</A>);
    expect(mounted).toHaveStyleRule('padding', '123px');
  });

  it('should respect i18n props', () => {
    const mounted = mountEnzymeWithThemeIntl(<A textKey="greeting" textValues={{ name: 'David' }} />, { messages });
    expect(mounted.text()).toBe('Hello David');
  });

  it('should respect i18n default message', () => {
    const mounted = mountEnzymeWithThemeIntl(<A textKey="na" textDefault="Salutations" />, { messages });
    expect(mounted.text()).toBe('Salutations');
  });
});

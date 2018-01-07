import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { ThemeProvider } from '../index';

export function mountWithTheme(children) {
  const root = mount(<ThemeProvider>{children}</ThemeProvider>) as any;
  return mount(children, {
    context: root
      .find(SCThemeProvider)
      .instance()
      .getChildContext(),
    childContextTypes: SCThemeProvider.childContextTypes,
  });
}

export function renderWithTheme(children) {
  return render(<ThemeProvider>{children}</ThemeProvider>);
}

export function shallowWithTheme(children) {
  return shallow(<ThemeProvider>{children}</ThemeProvider>).dive();
}

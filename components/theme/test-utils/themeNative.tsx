import React, { ReactElement } from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '../native';

export function renderWithTheme(children: ReactElement<any>) {
  return renderer.create(<ThemeProvider>{children}</ThemeProvider>);
}

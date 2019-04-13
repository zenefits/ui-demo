import React from 'react';

import { ZFrontendThemeProvider } from './web/ThemeProvider';

export default function themeDecorator(storyFn: Function) {
  return <ZFrontendThemeProvider>{storyFn()}</ZFrontendThemeProvider>;
}

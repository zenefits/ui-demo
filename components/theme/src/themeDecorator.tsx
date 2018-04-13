import React from 'react';

import { ZFrontendThemeProvider } from './web/ThemeProvider';

export default function themeDecorator(storyFn) {
  return <ZFrontendThemeProvider>{storyFn()}</ZFrontendThemeProvider>;
}

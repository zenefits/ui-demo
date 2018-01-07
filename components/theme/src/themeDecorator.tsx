import React from 'react';
import { ZFrontendThemeProvider } from './ThemeProvider';

export default function themeDecorator(storyFn) {
  return <ZFrontendThemeProvider>{storyFn()}</ZFrontendThemeProvider>;
}

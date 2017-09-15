import React from 'react';
import ThemeProvider from './ThemeProvider';

export default function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>;
}

import { theme } from 'z-frontend-theme';

// pre-requisite for viewports addon to work:
// import { withViewport } from '@storybook/addon-viewport';
// ...
// .addDecorator(withViewport())

const breakpointDeviceMap: { [key: number]: string } = {
  // viewport addon widths: https://github.com/storybooks/storybook/blob/master/addons/viewport/src/shared/index.js
  0: 'iphone6', // 320
  1: 'ipad', // 768
  2: 'ipad12p', // 1024
  3: 'responsive',
};

function breakpointInPx(index: number) {
  // breakpoints are in ems by default
  return theme.breakpoints[index] * 16 - 1;
}

export function setViewports(viewports: number[]) {
  if (!viewports || !viewports.length) {
    throw new Error('invalid viewports specified');
  }
  if (viewports.length > 3) {
    console.warn('Chromatic will capture a snapshot for each viewport specified. Are you sure you need so many?');
  }
  const deviceKeyForViewportAddon = breakpointDeviceMap[viewports[0]];
  const chromaticWidths = viewports.map(breakpointInPx);
  return {
    // set default viewport in the storybook UI
    viewport: deviceKeyForViewportAddon,
    // chromatic will capture a snapshot for each viewport width provided http://docs.chromaticqa.com/viewports
    chromatic: { viewports: chromaticWidths },
  };
}

// Avoid visual test flakiness for components with animation http://docs.chromaticqa.com/delay
const halfSecond = 500;
export const addScreenshotDelay = { chromatic: { delay: halfSecond } };

export const skipVisualTest = { chromatic: { disable: true } };

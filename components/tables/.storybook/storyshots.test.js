import initStoryshots from '@storybook/addon-storyshots';
import 'jest-styled-components';

// polyfill
window.URLSearchParams = class URLSearchParams {
  get() {}
};

initStoryshots({
  configPath: __dirname,
});

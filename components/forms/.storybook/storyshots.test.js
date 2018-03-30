import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';
import 'jest-styled-components';

const createNodeMock = element => {
  return document.createElement(element.type);
};

window.cancelAnimationFrame = () => {};
initStoryshots({
  configPath: __dirname,
  test: snapshotWithOptions({
    createNodeMock,
  }),
});

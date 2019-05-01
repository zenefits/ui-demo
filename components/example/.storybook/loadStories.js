// @ts-check
import { setupStorybook } from 'z-frontend-storybook-config';

export default function loadStories() {
  setupStorybook();

  const req = require.context('../src', true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

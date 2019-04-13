// @ts-check
import { setupStorybook } from 'z-frontend-storybook-config';

export default function loadStories() {
  setupStorybook();

  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}

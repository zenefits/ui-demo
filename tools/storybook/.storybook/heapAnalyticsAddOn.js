// Initializes heap analytics event properties
import addons from '@storybook/addons';
import { setEventProperties, trackEvent } from 'z-frontend-app-bootstrap';

addons.register('storybook/heap-analytics', api => {
  setEventProperties();

  // Manually trigger an event on story change
  api.onStory((kind, story) => {
    trackEvent('View story', { kind, story });
  });
});

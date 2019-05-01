// @ts-ignore
import { addDecorator, storiesOf } from '@storybook/react';
// @ts-ignore
import { withOptions } from '@storybook/addon-options';

import { themeDecorator } from 'z-frontend-theme';

import routerDecorator from './routerDecorator';
import intlDecorator from './intlDecorator';
import reduxDecorator from './reduxDecorator';
import apolloMockDecorator from './apolloDecorator';

export function setupStorybook(options = {}) {
  addDecorator(
    // supported options: https://github.com/storybooks/storybook/tree/master/addons/options
    // don't forget to enable options by adding to `addons.js` file
    withOptions({
      hierarchySeparator: '/',
      hierarchyRootSeparator: /\|/, // allow headers
      ...options,
    }),
  );
  addDecorator(routerDecorator);
  addDecorator(intlDecorator);
  addDecorator(reduxDecorator);
  addDecorator(apolloMockDecorator);
  addDecorator(themeDecorator);
}

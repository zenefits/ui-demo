// import { stripHash } from './urlUtils';
import {
  awaitMessage,
  handleMessages,
  sendParentMessage,
  MessagePayloads_INITIALIZE_SUBROUTE,
  MessagePayloads_INTERNAL_NAVIGATION,
  MESSAGE_TYPES,
} from './messages';

import { findRouteByPublicUrl } from './routes';
import routes from './configuredRoutes';

function testWithinIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

export async function createRouterConnection({ setUpRouteListener, handleRouteChange }: any) {
  watchNavigation();
  await connectToParent();
  setUpRouteListener(pushRouteToParent);
  watchInitialization(handleRouteChange);
  watchRouteChange(handleRouteChange);
}
export const isWithinIframe = testWithinIframe();

export const connectToParent = async () => {
  const interval = setInterval(() => {
    sendParentMessage(MESSAGE_TYPES.CHILD_LISTENING);
  }, 100);

  await awaitMessage(MESSAGE_TYPES.CONNECTION_ESTABLISHED);
  clearInterval(interval);
};

export const pushRouteToParent = (route: string) => {
  sendParentMessage(MESSAGE_TYPES.INTERNAL_NAVIGATION, { fragment: route });
};

export const watchInitialization = (cb: (fragment: string) => null) => {
  handleMessages([
    {
      type: MESSAGE_TYPES.INITIALIZE_SUBROUTE,
      callback: ({ fragment }: MessagePayloads_INITIALIZE_SUBROUTE) => {
        cb(fragment);
        sendParentMessage(MESSAGE_TYPES.CHILD_INITIALIZATION_COMPLETE);
      },
    },
  ]);
};

export const watchRouteChange = (cb: (fragment: string) => null) => {
  handleMessages([
    {
      type: MESSAGE_TYPES.INTERNAL_NAVIGATION,
      callback: ({ fragment }: MessagePayloads_INTERNAL_NAVIGATION) => {
        cb(fragment);
      },
    },
  ]);
};

export const watchNavigation = () => {
  window.addEventListener('click', e => {
    const target = e.target as HTMLLinkElement;
    if (target.href) {
      if (findRouteByPublicUrl(routes, target.href)) {
        e.preventDefault();
        sendParentMessage(MESSAGE_TYPES.INTER_APP_NAVIGATION, { url: target.href });
      } else if ((target.getAttribute('href') || '')[0] !== '/') {
        // If link href starts with '/' it is likely is a link managed by
        // the app's memory router.  In this case, we don't need to do anything.

        // Alternatively, it may be a link to another page on our domain
        // (not managed by the iframe router or the app's router)
        // In this case, it will be caught on unload and send UNEXPECTED_NAVIGATION message

        // Otherwise, trigger an external navigation on the parent
        e.preventDefault();
        sendParentMessage(MESSAGE_TYPES.EXTERNAL_NAVIGATION, { url: target.href });
      }
    }
  });

  window.addEventListener('unload', () => {
    // Page is about to load a new page
    // We need to reapply this navigation on the parent.
    // To avoid an ugly transition, tell parent to hide this iframe
    sendParentMessage(MESSAGE_TYPES.UNEXPECTED_NAVIGATION);
  });
};

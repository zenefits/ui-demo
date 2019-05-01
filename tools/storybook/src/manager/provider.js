/* globals __STORYBOOK_IFRAME_URL__ */
// This extends the base storybook provider to set a custom iframe url. We use this to reference an iframe.html:<revision> file.

// Using the legacy api since it doesn't seem totally clear yet how relative urls should be handled https://github.com/nodejs/node/issues/12682
import url from 'url';
import { cloneElement } from 'react';
import ReactProvider from '@storybook/core/dist/client/manager/provider';

export default class ReactProviderWithIframeUrl extends ReactProvider {
  renderPreview(selectedKind, selectedStory) {
    const element = super.renderPreview(selectedKind, selectedStory);
    if (!__STORYBOOK_IFRAME_URL__) {
      return element;
    }

    const parsedUrl = url.parse(element.props.url);
    parsedUrl.pathname = __STORYBOOK_IFRAME_URL__;
    return cloneElement(element, { url: url.format(parsedUrl) });
  }
}

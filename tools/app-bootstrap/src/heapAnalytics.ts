import 'z-frontend-global-types';

declare global {
  interface Window {
    heap: any;
  }
}

export function setEventProperties() {
  if (typeof window.heap !== 'undefined') {
    window.heap.addEventProperties({ 'App name': __APP_NAME__ });
  }
}

export function trackEvent(eventName: string, eventData: Object = {}) {
  if (typeof window.heap !== 'undefined') {
    window.heap.track(eventName, eventData);
  }
}

declare global {
  interface Window {
    sendActionToEmber: (appName: string, type: string, payload: any) => void;
    registerReactMessageHandler: (appName: string, type: string, payload: any) => void;
  }
}

export const sendActionToEmber = (type: string, payload: any) => {
  if (window.__WITHIN_EMBER_APP__) {
    window.sendActionToEmber(__APP_NAME__, type, payload);
  }
};

export const subscribeToEmberMessage = (type: string, callback: any) => {
  if (window.__WITHIN_EMBER_APP__) {
    window.registerReactMessageHandler(__APP_NAME__, type, callback);
  }
};

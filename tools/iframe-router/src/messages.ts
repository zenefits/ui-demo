export enum MESSAGE_TYPES {
  // Fired when from child to parent when app changes route internally
  // Or from parent to child on applicable back navigations
  INTERNAL_NAVIGATION = 'INTERNAL_NAVIGATION',
  // Fired when a child app navigates to an app managed by the router
  INTER_APP_NAVIGATION = 'INTER_APP_NAVIGATION',
  // Fired when one child app follows a link to a page that is not internal
  // and not an app managed by the router
  EXTERNAL_NAVIGATION = 'EXTERNAL_NAVIGATION',
  // Fired before unload from child to parent to handle unexpected navigation
  UNEXPECTED_NAVIGATION = 'UNEXPECTED_NAVIGATION',
  // Fired from child to parent when a child app is ready to receive messages from parent
  CHILD_LISTENING = 'CHILD_LISTENING',
  // Fired from parent to child upon receiving CHILD_LISTENING message
  CONNECTION_ESTABLISHED = 'CONNECTION_ESTABLISHED',
  // Fired from parent to child when a child is initialized with a subroute
  INITIALIZE_SUBROUTE = 'INITIALIZE_SUBROUTE',
  // Fired from child and parent after initial subroute is successfully loaded
  CHILD_INITIALIZATION_COMPLETE = 'CHILD_INITIALIZATION_COMPLETE',
}

export function sendMessage(destination: Window, type: MESSAGE_TYPES, payload?: MessagePayloads_Union) {
  const message = { type, payload };
  destination.postMessage(message, '*');
}

export function sendParentMessage(type: MESSAGE_TYPES, payload?: MessagePayloads_Union) {
  sendMessage(window.parent, type, payload);
}

export interface MessagePayloads_INTERNAL_NAVIGATION {
  fragment: string;
}

export interface MessagePayloads_INITIALIZE_SUBROUTE {
  fragment: string;
}

export interface MessagePayloads_EXTERNAL_NAVIGATION {
  url: string;
}

export interface MessagePayloads_INTER_APP_NAVIGATION {
  url: string;
}

export type MessagePayloads_Union =
  | MessagePayloads_INTERNAL_NAVIGATION
  | MessagePayloads_INITIALIZE_SUBROUTE
  | MessagePayloads_EXTERNAL_NAVIGATION
  | MessagePayloads_INTER_APP_NAVIGATION;

export interface MessageHandler {
  type: MESSAGE_TYPES;
  callback: (payload?: MessagePayloads_Union) => void;
}

export function handleMessages(messageHandlers: MessageHandler[]) {
  window.addEventListener('message', e => {
    const { type, payload } = e.data;
    messageHandlers.forEach(messageHandler => {
      if (messageHandler.type === type) {
        messageHandler.callback(payload);
      }
    });
  });
}

export function awaitMessage(type: MESSAGE_TYPES) {
  return new Promise(resolve => {
    handleMessages([
      {
        type,
        callback: resolve,
      },
    ]);
  });
}

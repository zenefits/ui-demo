import { Store } from 'redux';

let store: Store<any>;

export function getStore() {
  return store;
}

export const setStore = (storeToSet: Store<any>) => {
  if (store) {
    throw new Error('store has been set already');
  }
  store = storeToSet;
};

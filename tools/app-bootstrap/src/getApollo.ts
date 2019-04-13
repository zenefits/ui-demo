import { ApolloClient } from 'apollo-client';

let apolloClient: ApolloClient<any> | null;

export function getApollo() {
  if (!apolloClient) {
    throw new Error('apollo client has not been set yet');
  }
  return apolloClient;
}

export function resetApolloClient() {
  apolloClient = null;
}

export function setApolloClient(client: ApolloClient<any>) {
  if (apolloClient) {
    throw new Error('apollo client has been set already');
  }
  apolloClient = client;
}

export function resetApolloClientForTesting(client: ApolloClient<any>) {
  apolloClient = null;
  setApolloClient(client);
}

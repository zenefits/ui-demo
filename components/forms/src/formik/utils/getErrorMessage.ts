import { GraphqlErrorResponse } from 'z-frontend-app-bootstrap';

export const defaultErrorMessage = 'There was an error while talking to the server.';

export default (errorObj: GraphqlErrorResponse | string): string => {
  if (typeof errorObj === 'string') {
    return errorObj.length <= 500 ? errorObj : 'Oops, something went wrong. Please try again later.';
  }
  return defaultErrorMessage;
};

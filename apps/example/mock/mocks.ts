// http://dev.apollodata.com/tools/graphql-tools/mocking.html#Customizing-mocks
import { MockList } from 'z-frontend-app-bootstrap';

let idSoFar = 0;
export const mocks = {
  // Scalar Types
  ID: () => (idSoFar += 1),
  Int: () => 233,
  Float: () => 2.33,
  String: () => 'Hello World',

  // Types
  Company: () => ({
    name: () => 'Zenefits',
    employees: () => new MockList([10, 100]),
  }),
};

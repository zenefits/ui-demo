import faker from 'faker';

// http://dev.apollodata.com/tools/graphql-tools/mocking.html#Customizing-mocks
import { MockList } from 'z-frontend-app-bootstrap/mocks';

let idSoFar = 0;
export default {
  // Scalar Types
  ID: () => (idSoFar += 1),
  Int: () => 233,
  Float: () => 2.33,
  String: () => 'Hello World',
  Date: () => faker.date.recent(),
  DateTime: () => faker.date.recent(),
  JSON: () => ({ foo: 'this is a mock for JSON type', bar: 123, a: { b: 'c', d: ['e', 'f', 433, { g: 'h' }] } }),

  // Types
  Company: () => ({
    name: () => 'Mocked Company',
    employees: () => new MockList([10, 100]),
  }),
  dashboard: () => ({
    switches: () => ({ beamer2_killswitch: true }),
  }),
};

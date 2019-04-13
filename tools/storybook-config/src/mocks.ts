import faker from 'faker';
// http://dev.apollodata.com/tools/graphql-tools/mocking.html#Customizing-mocks
let idSoFar = 0;

export const mocks = {
  // Scalar Types
  ID: () => (idSoFar += 1),
  Int: () => 233,
  Float: () => 2.33,
  String: () => 'Hello World',
  Date: () => faker.date.recent(),
  DateTime: () => faker.date.recent(),
  JSON: () => ({ foo: 'this is a mock for JSON type', bar: 123, a: { b: 'c', d: ['e', 'f', 433, { g: 'h' }] } }),

  all_employee: () => ({
    first_name: 'David',
    last_name: 'Hirtle',
    photoUrl: 'https://robohash.org/hirtle.png?size=200x200',
  }),

  user: () => ({
    first_name: 'David',
    last_name: 'Hirtle',
  }),

  flow: () => ({
    id: 123,
  }),
};

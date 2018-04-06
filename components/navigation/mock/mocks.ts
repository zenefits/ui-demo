// http://dev.apollodata.com/tools/graphql-tools/mocking.html#Customizing-mocks
let idSoFar = 0;

export const mocks = {
  // Scalar Types
  ID: () => (idSoFar += 1),
  Int: () => 233,
  Float: () => 2.33,
  String: () => 'Hello World',

  all_employee: () => ({
    first_name: 'David',
    last_name: 'Hirtle',
    photoUrl: 'https://robohash.org/hirtle.png?size=200x200',
  }),

  user: () => ({
    first_name: 'David',
    last_name: 'Hirtle',
  }),
};

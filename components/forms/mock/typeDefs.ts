export const typeDefs = `
  type SampleUserResponse {
    id: ID!,
    createdAt: String,
  }

  type Dashboard {
    company: Company,
    employee: Employee,
  }

  type Company {
    id: ID!,
    name: String!,
    employees: [Employee],
  }

  type Employee {
    id: ID!,
    first_name: String,
    last_name: String,
  }

  type Query {
    dashboard(id: ID!): Dashboard
  }

  type Mutation {
    submitUser(username: String!, email: String!) : SampleUserResponse
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

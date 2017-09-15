export const typeDefs = `
type Query {
  dashboard(id: ID!): Dashboard
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
`;

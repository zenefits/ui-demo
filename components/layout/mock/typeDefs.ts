export const typeDefs = `
  type Dashboard {
    employee: all_employee,
  }

  type zenefits_employee {
    user: user,
  }

  type all_employee {
    id: ID!,
    first_name: String,
    last_name: String,
    photoUrl: String,
  }

  type user {
    first_name: String,
    last_name: String
  }

  type Query {
    dashboard(id: ID!): Dashboard
    currentZenefitsEmployee: zenefits_employee
  }
  schema {
    query: Query
  }
`;

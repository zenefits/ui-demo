export const typeDefs = `
  type Dashboard {
    id: ID
    employee: AllEmployee
    company: Company
  }

  type ZenefitsEmployee {
    user: user
  }

  type Company {
    id: ID!,
    name: String!,
    employees: [AllEmployee],
  }

  type AllEmployee {
    id: ID!,
    first_name: String,
    last_name: String,
    photoUrl: String,
  }

  type user {
    first_name: String,
    last_name: String
  }

  type Flow {
    id: ID
    name: String
    dispatcherArgs: String
    version_id: Int
    isComplete: Boolean
    sections: [FlowSection]
    isActive: Boolean
    resource_uri: String
  }

  type FlowError {
    id: ID
    code: String
    section: FlowSection
    field: String
    mustChangeValue: String
    reasonCode: String
    isActive: Boolean
    resource_uri: String
  }

  type FlowSection {
    id: ID
    index: Int
    isReady: Boolean
    errors: [FlowError]
    name: String
    tag: String
    dispatcherArgs: String
    isEntered: Boolean
    entered: Int
    isComplete: Boolean
    flow: Flow
    isActive: Boolean
    resource_uri: String
  }

  input FlowSectionUpdate {
    isEntered: Boolean
    isComplete: Boolean
  }

  type SampleUserResponse {
    id: ID!,
    createdAt: String,
  }

  type Query {
    dashboard: Dashboard
    currentZenefitsEmployee: ZenefitsEmployee
    enrollmentFlow: Flow
    flow(id: ID!): Flow
    dynamicFlow: Flow
    flowWithMatchingNames: Flow
  }

  type Mutation {
    updateFlowSection(flowSectionId: ID!, flowSectionUpdate: FlowSectionUpdate!): FlowSection
    addFamilyStep(familySize: Int!): Boolean
    submitUser(username: String!, email: String!) : SampleUserResponse
    loginUser(email: String!, password: String!) : SampleUserResponse
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

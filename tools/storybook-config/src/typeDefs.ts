export const typeDefs = `

  scalar JSON
  scalar DateTime

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

  type Datagrid {
    id: ID!

    """
    File category used for uploading file
    """
    category: String!

    """
    A list of supported columns
    """
    columnConfiguration: [ColumnConfiguration!]!

    """
    An array of column mappings and value mappings
    """
    columnMappings: [DatagridColumnMapping!]!

    """
    Raw data from imported file. Example:
    [
      {
          'firstName': 'Alex',
          'lastName': 'Honnold',
          'empType': 'CW',
          'age': '33',
          'location': '',
           ...
      },
      ...
    ]
    Every row object has all the columns. If a cell is empty in the imported file, the value will be ''
    """
    importedRows: [JSON!]!

    """
    a previous url for current user
    """
    previousUrl: String

    """
    secure file key for the uploaded file
    """
    uploadedFileKey: String

    """
    data for editable table and review
    """
    rows: [DatagridRow!]!
    status: DatagridStatus!
    scenario: DatagridScenario!
    isUploadedFileTemplate: Boolean!
    templateUrl: String!
  }

  type DatagridColumnCategory {
    key: String!
    label: String!
  }

  type DatagridColumnMapping {
    timestamp: DateTime!
    systemColumnId: ID!
    importedColumnName: String!
    valueMappings: [DatagridValueMapping!]!
  }

  input DatagridColumnMappingInput {
    systemColumnId: ID!
    importedColumnName: String!
    valueMappings: [DatagridValueMappingInput!]!
  }

  enum DatagridColumnType {
    addressCity
    addressCountry
    addressState
    addressStreet1
    addressStreet2
    addressZip
    boolean
    date
    decimal
    email
    integer
    money
    phone
    string
  }

  type DatagridColumnValidation {
    key: String!
    type: String!
    message: String!
    meta: JSON
  }

  """
  TODO: this type is used as the return type placeholder for all data grid related mutations,
  once we figure out what data to return for all mutations, this should be removed
  """
  type DatagridMutationResponse {
    success: Boolean
  }

  type DatagridRow {
    id: ID!
    datagridId: ID!
    timestamp: DateTime!
    data: JSON!

    """
    contentId is an optional field on each row that could hold the primary key of the record we are keeping on the row
    E.g. in company onboarding, contentId will be the employeeId. This will be useful for fetching records using employee
    IDs in O(1) instead of going through all the rows and compare employeeIds.
    """
    contentId: ID

    """
    errors
    """
    errors: JSON
  }

  input DatagridRowInput {
    id: ID
    timestamp: DateTime
    data: JSON!
  }

  enum DatagridScenario {
    companySetupAddYourPeople
  }

  enum DatagridStatus {
    initial
    mappingColumns
    mappingValues
    editingData
    review

    """
    When a data grid is submitted, the backend process can be expensive and time consuming, so we have 'processing' and
    'processed' to indicate the progress
    """
    processing
    processed

    """
    TODO: doc needed here
    """
    readOnly
  }

  type DatagridValueMapping {
    systemValue: String!
    importedValues: [String!]!
  }

  input DatagridValueMappingInput {
    systemValue: String!
    importedValues: [String!]!
  }

  type ColumnConfiguration {
    id: ID!
    label: String!
    type: DatagridColumnType!

    """
    Predefined values for a column
    """
    values: [ColumnConfigValue!]!
    category: DatagridColumnCategory!
    subCategory: String
    columnMappingPlaceholder: String
    valuePlaceholder: String
    description: String
    fixed: Boolean!
    validations: [DatagridColumnValidation!]!
  }

  type ColumnConfigValue {
    value: String!
    label: String!
  }

  enum ColumnConfigValueFilter {
    mappedColumns
    allColumns
  }


  type Query {
    dashboard: Dashboard
    currentZenefitsEmployee: ZenefitsEmployee
    enrollmentFlow: Flow
    flow(id: ID!): Flow
    dynamicFlow: Flow
    flowWithMatchingNames: Flow
    datagrid(id: ID!): Datagrid!
  }

  type Mutation {
    updateFlowSection(flowSectionId: ID!, flowSectionUpdate: FlowSectionUpdate!): FlowSection
    addFamilyStep(familySize: Int!): Boolean
    submitUser(username: String!, email: String!) : SampleUserResponse
    loginUser(email: String!, password: String!) : SampleUserResponse
    saveDatagridRows(datagridId: ID!, rows: [DatagridRowInput!]!): [DatagridRow!]!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

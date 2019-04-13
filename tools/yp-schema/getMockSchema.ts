import { buildClientSchema, DocumentNode } from 'graphql';
import { addMockFunctionsToSchema, addResolveFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';

interface JsonSchema {
  data: any;
}

export default function getMockSchema(schemaSource: string | JsonSchema | DocumentNode, resolvers: any, mocks: any) {
  let schema;
  if (typeof schemaSource === 'string' || !(schemaSource as JsonSchema).data) {
    // schemaSource from .graphql file as a string or as a graphql document (gql loader result)
    schema = makeExecutableSchema({
      resolvers,
      typeDefs: schemaSource as DocumentNode,
    });
  } else {
    // schemaSource from .json file (result of introspection query)
    schema = buildClientSchema((schemaSource as JsonSchema).data);
    addResolveFunctionsToSchema(schema, resolvers);
  }

  if (mocks) {
    addMockFunctionsToSchema({
      schema,
      mocks,
      preserveResolvers: true,
    });
  }

  return schema;
}

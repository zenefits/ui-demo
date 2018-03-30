import { buildClientSchema } from 'graphql';
import { addMockFunctionsToSchema, addResolveFunctionsToSchema } from 'graphql-tools';

export default function getMockSchema(jsonSchema, resolvers, mocks) {
  const schema = buildClientSchema(jsonSchema.data);
  addResolveFunctionsToSchema(schema, resolvers);

  if (mocks) {
    addMockFunctionsToSchema({
      schema,
      mocks,
      preserveResolvers: true,
    });
  }

  return schema;
}

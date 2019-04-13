import gql from 'graphql-tag';
import * as ts from 'typescript';
import { buildSchema } from 'graphql';

import { generateTypes, getSchemaPaths } from './index';
import getMockSchema from './getMockSchema';
import checkQueryEntitiesForId from './checkQueryEntitiesForId';

const fs = require('fs');

interface RunAppSchemaTestsOptions {
  appPath: string;
  gqlSchema: any;
  queryTypes: any;
  fragmentTypes: any;
  resolvers: any;
  mocks: any;
  createApolloClient: any;
  typesToSkip?: string[];
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoQueryEntityErrors: () => R;
    }
  }
}

expect.extend({
  toHaveNoQueryEntityErrors(received) {
    if (!received.length) {
      return {
        message: () => 'No query entity errors',
        pass: true,
      };
    } else {
      return {
        message: () =>
          `When querying gql entities you must include 'id' if the schema has an id. The following query paths need an id added:\n ${received
            .map((path: string[]) => path.join('.'))
            .join('\n')}`,
        pass: false,
      };
    }
  },
});

export default function runAppSchemaTests({
  appPath,
  gqlSchema,
  queryTypes,
  fragmentTypes,
  resolvers,
  mocks,
  createApolloClient,
  typesToSkip,
}: RunAppSchemaTestsOptions) {
  const schema = buildSchema(gqlSchema);

  it('mock schema does not throw', () => {
    const schema = getMockSchema(gqlSchema, resolvers, mocks);
    expect(!!schema).toBe(true);
  });

  it('should not throw when run generateTypes', async () => {
    const schemaPaths = getSchemaPaths(appPath);
    const result = await generateTypes({
      files: [__dirname + '/testFile.ts'],
      schemaPath: fs.existsSync(schemaPaths.graphqlPath) ? schemaPaths.graphqlPath : schemaPaths.jsonPath,
      generateDocuments: true,
      generateSchemaTypes: true,
    });
    // console.log('result', result);
    expect(!!result).toBe(true);
  });

  it('should work with apollo in mock mode', async () => {
    const [, { client }] = createApolloClient({
      fragmentTypes,
      mockConfig: {
        gqlSchema,
        mocks,
        resolvers,
      },
    });

    const queryResult = await client.query({
      query: gql`
        query {
          dashboard {
            id
            company {
              id
              name
            }
          }
        }
      `,
    });

    expect(queryResult.data.dashboard.company.id).toBeTruthy();
    expect(queryResult.data.dashboard.company.name).toBeTruthy();
  });

  it('should include an id on queries for entities whose schema has one', () => {
    const quertyTypesAST = ts.createSourceFile('index.ts', queryTypes, ts.ScriptTarget.ES2015, true);

    const errors = checkQueryEntitiesForId(quertyTypesAST, schema, typesToSkip);
    expect(errors).toHaveNoQueryEntityErrors();
  });
}

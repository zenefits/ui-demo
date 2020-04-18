import gql from 'graphql-tag';
import * as ts from 'typescript';
import { buildSchema, validate } from 'graphql';

import { generateTypes, getSchemaPaths } from './index';
import getMockSchema from './getMockSchema';
import checkQueryEntitiesForId from './checkQueryEntitiesForId';
import defaultMocks from './mock/mocks';
import defaultResolvers from './mock/resolvers';
import { fetchProductionSchema, getGraphqlQueriesAST } from './gqlUtils';

const fs = require('fs');

interface RunAppSchemaTestsOptions {
  appPath: string;
  gqlSchema: any;
  queryTypes: any;
  fragmentTypes: any;
  resolvers?: any;
  mocks?: any;
  createApolloClient: any;
  typesToSkip?: string[];
  gqlErrorWhitelist?: string[];
  missingQueryIdPathWhitelist?: string[];
}

declare global {
  // eslint-disable-next-line no-redeclare
  namespace jest {
    interface Matchers<R, T> {
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
  createApolloClient,
  typesToSkip,
  gqlErrorWhitelist = [],
  missingQueryIdPathWhitelist = [],
  mocks = defaultMocks,
  resolvers = defaultResolvers,
}: RunAppSchemaTestsOptions) {
  const schema = buildSchema(gqlSchema);

  it('mock schema does not throw', () => {
    const schema = getMockSchema(gqlSchema, resolvers, mocks);
    expect(!!schema).toBe(true);
  });

  it('should not throw when run generateTypes', async () => {
    const schemaPaths = getSchemaPaths(appPath);
    const result = await generateTypes({
      files: [`${__dirname}/testFile.ts`],
      schemaPath: fs.existsSync(schemaPaths.graphqlPath) ? schemaPaths.graphqlPath : schemaPaths.jsonPath,
      generateDocuments: true,
      generateSchemaTypes: true,
    });
    // console.log('result', result);
    expect(!!result).toBe(true);
  });

  it('should work with apollo in mock mode', async () => {
    const client = createApolloClient({
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
    const queryTypesAST = ts.createSourceFile('index.ts', queryTypes, ts.ScriptTarget.ES2015, true);

    let errors = checkQueryEntitiesForId(queryTypesAST, schema, typesToSkip);
    if (missingQueryIdPathWhitelist) {
      errors = errors.filter(path => !missingQueryIdPathWhitelist.includes(path.join('.')));
    }
    expect(errors).toHaveNoQueryEntityErrors();
  });

  it('should validate against yp3 production schema', async () => {
    const graphqlAST = await getGraphqlQueriesAST(appPath);
    if (!graphqlAST) {
      return;
    }

    const schema = await fetchProductionSchema();
    const errors = validate(schema, graphqlAST);

    const uniqueErrors = [...new Set(errors.map(error => error.toString()))];
    const reportedErrors = uniqueErrors.filter(message => !gqlErrorWhitelist.includes(message));
    expect(reportedErrors).toHaveLength(0);
  });
}

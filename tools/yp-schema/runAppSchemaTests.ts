import gql from 'graphql-tag';

import { generateTypes, getSchemaPaths } from './index';
import getMockSchema from './getMockSchema';

export default function runAppSchemaTests({
  appPath,
  jsonSchema,
  fragmentTypes,
  resolvers,
  mocks,
  createApolloClient,
}) {
  it('mock schema does not throw', () => {
    const schema = getMockSchema(jsonSchema, resolvers, mocks);
    expect(!!schema).toBe(true);
  });

  it('should not throw when run generateTypes', async () => {
    const result = await generateTypes({
      files: [__dirname + '/testFile.ts'],
      schemaPath: getSchemaPaths(appPath).jsonPath,
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
        jsonSchema,
        mocks,
        resolvers,
      },
    });

    const queryResult = await client.query({
      query: gql`
        query allQuery {
          allFilms {
            edges {
              node {
                title
              }
            }
          }
        }
      `,
    });

    expect(queryResult.data.allFilms.edges[0].node.title).toBeTruthy();
  });
}

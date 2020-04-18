import fs from 'fs';
import fetch from 'node-fetch';
import { buildClientSchema, introspectionQuery, DocumentNode, GraphQLSchema } from 'graphql';
import glob from 'glob';
import { promisify } from 'util';
import { flatMap } from 'lodash';
import gql from 'graphql-tag';

const readFile = promisify(fs.readFile);
const globAsync = promisify(glob);

let schemaCache: GraphQLSchema | null = null;

export function fetchProductionSchema() {
  console.time('schema');
  if (schemaCache) {
    console.timeEnd('schema');
    return schemaCache;
  }

  // tslint:disable-next-line:ban
  return fetch(`https://<graphql>`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: 'zenefits.com',
    },
    body: JSON.stringify({ query: introspectionQuery }),
  })
    .then(result => result.json())
    .then(json => {
      schemaCache = buildClientSchema(json.data);
      console.timeEnd('schema');
      return schemaCache;
    });
}

export async function getGraphqlQueriesAST(appPath: string): Promise<DocumentNode | null> {
  // check all .ts and .tsx files except tests and stories
  const filesToCheck = await globAsync(`src/**/!(*.test|*.spec|*.stories).ts?(x)`, {
    cwd: appPath,
    ignore: ['node_modules/**', 'dist/**'],
  });
  const extractedGraphql = await Promise.all(filesToCheck.map(extractGraphqlFromFile));
  const graphqlToCheck = flatMap(extractedGraphql); // remove empty
  console.log(`found ${graphqlToCheck.length} graphql snippets`);
  if (!graphqlToCheck.length) {
    return null;
  }

  // combine all the graphql before evaluating to support interpolated fragments
  const prepared = graphqlToCheck.join('\n').replace(/\$\{\w+\}/g, '');
  return gql(prepared);
}

const gqlTagRegex = /gql`([^`]+)`/g;

function getGqlGroups(source: string) {
  const groups = [];

  let match = gqlTagRegex.exec(source);
  while (match) {
    groups.push(match[1]);
    match = gqlTagRegex.exec(source);
  }

  return groups;
}

async function extractGraphqlFromFile(filePath: string) {
  const contents = await readFile(filePath);
  const source = contents.toString();
  const graphqlSource = getGqlGroups(source);
  if (!graphqlSource.length) {
    return [];
  }

  return graphqlSource;
}

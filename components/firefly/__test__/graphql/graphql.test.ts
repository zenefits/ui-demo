import { createApolloClient } from 'z-frontend-app-bootstrap';
import runAppSchemaTests from 'z-frontend-yp-schema/runAppSchemaTests';

import mocks from '../../mock/mocks';
import resolvers from '../../mock/resolvers';
const fs = require('fs');
const path = require('path');
const gqlSchema = fs.readFileSync(path.join(__dirname, '../../schema/schema.generated.graphql')).toString();
const queryTypes = fs.readFileSync(path.join(__dirname, '../../src/gqlTypes.d.ts')).toString();
const fragmentTypes = require('../../schema/fragmentTypes.json');

describe('ExampleApp Graphql Schema', () => {
  runAppSchemaTests({
    createApolloClient,
    queryTypes,
    fragmentTypes,
    gqlSchema,
    mocks,
    resolvers,
    appPath: __dirname + '/../../',
  });
});

import { createApolloClient } from 'z-frontend-app-bootstrap';
import runAppSchemaTests from 'z-frontend-yp-schema/runAppSchemaTests';

import mocks from '../../mock/mocks';
import resolvers from '../../mock/resolvers';
const jsonSchema = require('../../schema/schema.json');
const fragmentTypes = require('../../schema/fragmentTypes.json');

describe('ExampleApp Graphql Schema', () => {
  runAppSchemaTests({
    createApolloClient,
    fragmentTypes,
    jsonSchema,
    mocks,
    resolvers,
    appPath: __dirname + '/../../',
  });
});

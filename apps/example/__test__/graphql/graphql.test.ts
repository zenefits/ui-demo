import { createApolloClient } from 'z-frontend-app-bootstrap';
import runAppSchemaTests from 'z-frontend-yp-schema/runAppSchemaTests';

const fs = require('fs');
const path = require('path');

const gqlSchema = fs.readFileSync(path.join(__dirname, '../../schema/schema.generated.graphql')).toString();
const fragmentTypes = require('../../schema/fragmentTypes.json');

const queryTypes = fs.readFileSync(path.join(__dirname, '../../src/gqlTypes.d.ts')).toString();

describe('ExampleApp Graphql Schema', () => {
  runAppSchemaTests({
    createApolloClient,
    fragmentTypes,
    gqlSchema,
    queryTypes,
    appPath: `${__dirname}/../../`,
  });
});

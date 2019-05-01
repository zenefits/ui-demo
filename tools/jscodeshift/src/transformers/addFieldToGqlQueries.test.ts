// @ts-ignore
import { defineInlineTest } from 'jscodeshift/dist/testUtils';
import fs from 'fs';
import path from 'path';

import addIdToGqlQueries from './addFieldToGqlQueries';

// NOTE we need to use defineInline test because defineTest assumes that your transformer is a js file in a specific location

const input = fs.readFileSync(path.join(__dirname, '../../fixtures/addFieldToGqlQueries.input.ts')).toString();
const expectedOutput = fs
  .readFileSync(path.join(__dirname, '../../fixtures/addFieldToGqlQueries.output.ts'))
  .toString();

describe('addIdToGqlQueries', () => {
  defineInlineTest(addIdToGqlQueries, { fieldName: 'id', entityName: 'dashboard' }, input, expectedOutput);
});

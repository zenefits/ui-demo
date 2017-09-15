const rule = require('./no-app-imports-in-addon');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parser: 'babel-eslint' });
ruleTester.run('no-app-imports-in-addon', rule, {
  valid: [
    {
      code: 'import f from "./../sdfs";',
    },
    {
      code: 'import * as f from "other-module/sdfs";',
    },
    {
      code: 'import { ds } from "other-module";',
    },
  ],

  invalid: [
    {
      code: 'import f from "client-app/sdfdsf/sdf";',
      errors: [{ message: '' }],
    },
  ],
});

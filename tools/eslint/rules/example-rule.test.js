const rule = require('./example-rule');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('example-rule', rule, {
  valid: [
    {
      code: 'var notFoo = true',
    },
  ],

  invalid: [
    {
      code: 'var foo = true',
      errors: [{ message: 'foo var are not allowed' }],
    },
  ],
});

import { getPrefixSuffixForCurrency } from './getPrefixSuffixForCurrency';

test('should display the $ symbol when currency code is USD', () => {
  const amount = '123456';
  const code = 'USD';

  const { prefix } = getPrefixSuffixForCurrency(code, amount);
  expect(prefix).toBe('$');
});

test('should display the € symbol when currency code is EUR', () => {
  const amount = '123456';
  const code = 'EUR';

  const { prefix } = getPrefixSuffixForCurrency(code, amount);
  expect(prefix).toBe('€');
});

test('should display the symbol when the input is a string', () => {
  const amount = '123456';
  const code = 'USD';

  const { prefix } = getPrefixSuffixForCurrency(code, amount);
  expect(prefix).toBe('$');
});

test('should display the symbol when the input is a number', () => {
  const amount = 123456;
  const code = 'USD';

  const { prefix } = getPrefixSuffixForCurrency(code, amount);
  expect(prefix).toBe('$');
});

test('should display the symbol when the input has minus sign', () => {
  const amount = -123456;
  const code = 'USD';

  const { prefix } = getPrefixSuffixForCurrency(code, amount);
  expect(prefix).toBe('$');
});

test('should display the symbol when the input is string and has minus sign', () => {
  const amount = '-123456';
  const code = 'USD';

  const { prefix } = getPrefixSuffixForCurrency(code, amount);
  expect(prefix).toBe('$');
});

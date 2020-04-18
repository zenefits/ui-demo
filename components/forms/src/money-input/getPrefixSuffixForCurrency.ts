// code should be of the format ISO 4217 currency codes
// https://www.iso.org/iso-4217-currency-codes.html
export const getPrefixSuffixForCurrency = (code: string, amount: any) => {
  const formatedCurrency = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: code,
  }).formatToParts(Number.parseInt(amount, 10));
  let prefix;
  if (formatedCurrency[0].type === 'minusSign') {
    prefix = formatedCurrency[1].value;
  } else {
    prefix = formatedCurrency[0].value;
  }

  const suffix =
    formatedCurrency[formatedCurrency.length - 1].type === 'currency' &&
    formatedCurrency[formatedCurrency.length - 1].value;
  return {
    prefix,
    suffix,
  };
};

import { range } from 'lodash';

const digit = /\d/i; // including `i` to avoid webpack issue (see https://github.com/zenefits/z-frontend/pull/3507)
const letter = /[a-z]/i; // keep insensitive to improve usability: lazy users may be confused when they cannot type lower
const letterOrDigit = /[a-z\d]/i;

function digits(count: number) {
  return range(count).map(() => /\d/i);
}

export function zip(rawValue: string) {
  const mask: (string | RegExp)[] = digits(5);
  // if long, assume ZIP+4
  return rawValue.length <= 5 ? mask : mask.concat(['-', digit, digit, digit, digit]);
}

function brazilianPostalCode(rawValue: string) {
  const mask: (string | RegExp)[] = digits(5);
  return rawValue.length <= 5 ? mask : mask.concat(['-', digit, digit, digit]);
}

function ukPostalCode(rawValue: string) {
  // variable length 6-8 characters is tricky... be permissive
  return [letter, letterOrDigit, /[ a-z\d]/i, /[ a-z\d]/i, /[ a-z\d]/i, letterOrDigit, letter, letter];
}

function canadianPostalCode(rawValue: string) {
  const lettersInitial = /[ABCEGHJKLMNPRSTVXY]/i;
  const lettersLater = /[ABCEGHJKLMNPRSTVWXYZ]/i; // allows W and Z

  const mask: Mask = [lettersInitial, digit, lettersLater];
  return rawValue.length <= 3 ? mask : mask.concat(' ', digit, lettersLater, digit);
}

function irelandPostalCode(rawValue: string) {
  const mask: Mask = [letter, digit, /[w\d]/i]; // digit or W
  return rawValue.length <= 3 ? mask : mask.concat(' ', letterOrDigit, letterOrDigit, letterOrDigit, letterOrDigit);
}

type Mask = Function | (string | RegExp)[];

// careful: being strict here may hurt usability in some complicated formats
// it may be easier to maintain these if we just used standard regex, but react-text-mask does not support this
export const postalCodes: { [key: string]: Mask } = {
  US: zip,
  IN: digits(6),
  SG: digits(6),
  CA: canadianPostalCode,
  GB: ukPostalCode,
  AU: digits(4),
  DE: digits(5),
  FR: digits(5),
  NL: digits(4).concat([letter, letter]),
  IE: irelandPostalCode,
  BR: brazilianPostalCode,
};

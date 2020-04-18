export const US_PHONE_FORMAT = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;

export function isUSPhoneNumber(value: string): boolean {
  const leadingPlus = value[0] === '+';
  const unmaskedInput = value.replace(/\(|\)| |\+|-/g, '');
  return unmaskedInput.length <= 10 && !leadingPlus;
}

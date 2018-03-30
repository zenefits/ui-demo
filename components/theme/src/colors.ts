const sunsetOrange = '#FF5745';
const navyBlue = '#123466';
const botticelli = '#D6DEE9';
const turquoise = '#2FCDD0';
const morningGlory = '#8BDDDF';
const iceberg = '#D3F3F3';

const black = '#000';
const mirage = '#1C2534';
const shuttleGray = '#53616E';
const regentGray = '#8D9BA7';
const submarine = '#B4BDC5';
const iron = '#DBDFE3';
const fog = '#f3f3f3';
const white = '#FFF';

const pacificBlue = '#009BC0';
const deepCerulean = '#0081AA';
const chathamsBlue = '#144E6F';
const bossanova = '#4E2E5E';
const eden = '#155457';
const verdunGreen = '#3B7101';
const sushi = '#84C341';
const caper = '#C3EB9B';
const riceFlower = '#F0FFE0';
const monza = '#C00316';
const vividTangerine = '#FF897C';
const yourPink = '#FFCBC6';
const bridesmaid = '#FEF1F0';
const spicyMustard = '#6F5D0F';
const festival = '#FDE66B';
const lemonChiffon = '#FFF9CD';

const rhino = '#303162';
const bismark = '#446384';
const chathamsBlue2 = '#133F61';
const bostonBlue = '#3998AA';
const easternBlue = '#26A5A8';
const elm = '#1E7C7F';

const primaryHover = '#F25341';
const primaryActive = '#E64F3E';
const defaultNormal = '#D6DEE9';
const defaultHover = '#C8D0DB';
const defaultActive = '#BCC4CF';

export const avatarColors = {
  'avatar.a': rhino,
  'avatar.b': bossanova,
  'avatar.c': bismark,
  'avatar.d': chathamsBlue2,
  'avatar.e': bostonBlue,
  'avatar.f': easternBlue,
  'avatar.g': elm,
  'avatar.h': eden,
};

export const colorsMap = {
  'primary.a': sunsetOrange,

  'secondary.a': navyBlue,
  'secondary.b': botticelli,
  'secondary.c': fog,

  'tertiary.a': turquoise,
  'tertiary.b': morningGlory,
  'tertiary.c': iceberg,

  'grayscale.black': black,
  'grayscale.white': white,
  'grayscale.a': black,
  'grayscale.b': mirage,
  'grayscale.c': shuttleGray,
  'grayscale.d': regentGray,
  'grayscale.e': submarine,
  'grayscale.f': iron,
  'grayscale.g': white,

  'link.normal': pacificBlue,
  'link.hover': deepCerulean,
  'link.active': chathamsBlue,

  'auxiliary.a': bossanova,
  'auxiliary.b': eden,

  'affirmation.a': verdunGreen,
  'affirmation.b': sushi,
  'affirmation.c': caper,
  'affirmation.d': riceFlower,

  'negation.a': monza,
  'negation.b': vividTangerine,
  'negation.c': yourPink,
  'negation.d': bridesmaid,

  'caution.a': spicyMustard,
  'caution.b': festival,
  'caution.c': lemonChiffon,

  'button.defaultNormal': defaultNormal,
  'button.defaultHover': defaultHover,
  'button.defaultActive': defaultActive,
  'button.primaryHover': primaryHover,
  'button.primaryActive': primaryActive,
  'button.primaryNormal': sunsetOrange,

  ...avatarColors,
};

export declare type ColorString = keyof (typeof colorsMap) | 'inherit' | 'initial' | 'transparent';

/**
 * Get the color value by the color name
 * Example: getColor('grayscale.a') returns #1C2534 ("mirage" color)
 * @param color ColorString (e.g. "grayscale.b")
 */
export function getColor(color: ColorString) {
  return colorsMap[color];
}

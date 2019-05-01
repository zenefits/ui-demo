// Overview of theme colors: http://ui.zenefits.com/#!/Color

const sunsetOrange = '#FF5745';
const navyBlue = '#123466';
const botticelli = '#D6DEE9';
const catskillWhite = '#F1F7F9';
const turquoise = '#2FCDD0';
const morningGlory = '#8BDDDF';
const iceberg = '#D3F3F3';

const black = '#000';
// const mirage = '#1C2534';
// const shuttleGray = '#53616E';
// const regentGray = '#8D9BA7';
// const submarine = '#B4BDC5';
// const iron = '#DBDFE3';
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

const rawUmber = '#885500';
const corn = '#DDAA00';
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

const mineShaft = '#333';
const emperor = '#555';
const boulder = '#777';
const dustyGray = '#999';
const alto = '#DDD';
const fog = '#f3f3f3';

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

export type ColorString =
  | 'primary.a'
  | 'secondary.a'
  | 'secondary.b'
  | 'secondary.c'
  | 'tertiary.a'
  | 'tertiary.b'
  | 'tertiary.c'
  | 'grayscale.b'
  | 'grayscale.c'
  | 'grayscale.d'
  | 'grayscale.e'
  | 'grayscale.f'
  | 'grayscale.g'
  | 'grayscale.white'
  | 'grayscale.black'
  | 'text.dark'
  | 'text.default'
  | 'text.light'
  | 'text.off'
  | 'link.normal'
  | 'link.hover'
  | 'link.active'
  | 'auxiliary.a'
  | 'auxiliary.b'
  | 'affirmation.a'
  | 'affirmation.b'
  | 'affirmation.c'
  | 'affirmation.d'
  | 'negation.a'
  | 'negation.b'
  | 'negation.c'
  | 'negation.d'
  | 'caution.a'
  | 'caution.b'
  | 'caution.c'
  | 'caution.d'
  | 'button.defaultNormal'
  | 'button.defaultHover'
  | 'button.defaultActive'
  | 'button.primaryHover'
  | 'button.primaryActive'
  | 'button.primaryNormal'
  | 'avatar.a'
  | 'avatar.b'
  | 'avatar.c'
  | 'avatar.d'
  | 'avatar.e'
  | 'avatar.f'
  | 'avatar.g'
  | 'avatar.h'
  | 'inherit'
  | 'initial'
  | 'transparent';

export const colorsMap: { [key in ColorString]: string } = {
  'primary.a': sunsetOrange,

  'secondary.a': navyBlue,
  'secondary.b': botticelli,
  'secondary.c': catskillWhite,

  'tertiary.a': turquoise,
  'tertiary.b': morningGlory,
  'tertiary.c': iceberg,

  'grayscale.b': mineShaft, // previously: mirage #1C2534
  'grayscale.c': emperor, // previously: shuttleGray #53616E
  'grayscale.d': boulder, // previously: regentGray #8D9BA7
  'grayscale.e': dustyGray, // previously: submarine #B4BDC5
  'grayscale.f': alto, // previously: iron #DBDFE3
  'grayscale.g': fog,
  'grayscale.white': white,
  'grayscale.black': black,

  'text.dark': mineShaft, // grayscale.b
  'text.default': emperor, // grayscale.c
  'text.light': boulder, // grayscale.d
  'text.off': dustyGray, // grayscale.e

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

  'caution.a': rawUmber,
  'caution.b': corn,
  'caution.c': festival,
  'caution.d': lemonChiffon,

  'button.defaultNormal': defaultNormal,
  'button.defaultHover': defaultHover,
  'button.defaultActive': defaultActive,
  'button.primaryHover': primaryHover,
  'button.primaryActive': primaryActive,
  'button.primaryNormal': sunsetOrange,

  ...avatarColors,

  inherit: 'inherit',
  initial: 'initial',
  transparent: 'transparent',
};

/**
 * Get the color value by the color name
 * Example: getColor('primary.a') returns #FF5745
 * @param color ColorString (e.g. "primary.a")
 */
export function getColor(color: ColorString) {
  return colorsMap[color];
}

import 'z-frontend-global-types';
import { px } from 'rebass/dist/util';
import get from 'lodash/get';
import { rgba } from 'polished';
import { ColorString } from './colors';
import { theme } from './theme';

export const space = (index: number) => props => px(findInTheme(index, props, 'space'));
export const buttonSpace = (index: number) => props => px(findInTheme(index, props, 'buttonSpace'));
export const fontSizes = (index: number) => props => px(findInTheme(index, props, 'fontSizes'));
export const fontStyles = (key: string) => props => findInTheme(key, props, 'fontStyles');
export const heights = (key: string) => props => px(findInTheme(key, props, 'heights'));
export const icon = (key: string) => props => findInTheme(key, props, 'icons');
export const zIndex = (key: keyof (typeof theme.zIndex)) => props => findInTheme(key, props, 'zIndex');
export const radius = props => px(props.theme.radius);
export const depth = (index: number) => props => findInTheme(index, props, 'depths');

export const color = (path: ColorString, opacity?: number) => props => {
  const found = get(props.theme.colors, path);
  if (__DEVELOPMENT__ && !found) {
    // TODO: figure out if we want to allow #fff or "white", in that case just
    // check that they didn't use . (`&& path.indexOf('.') !== -1`)
    throw new Error(`referenced undefined color "${path}"`);
  }
  if (opacity) {
    return rgba(found || path, opacity);
  }
  return found || path;
};

function findInTheme(key, props, themeKey) {
  const found = get(props.theme[themeKey], key);
  if (__DEVELOPMENT__ && !found) {
    throw new Error(`referenced undefined ${themeKey} "${key}"`);
  }
  return found;
}

const rebassProps = {
  bg: true,
  color: true,
  f: true,
  fontSize: true,
  m: true,
  mb: true,
  ml: true,
  mr: true,
  mt: true,
  mx: true,
  my: true,
  p: true,
  pb: true,
  pl: true,
  pr: true,
  pt: true,
  px: true,
  py: true,
  w: true,
  width: true,
};

export function isRebassProp(key): boolean {
  return rebassProps.hasOwnProperty(key);
}

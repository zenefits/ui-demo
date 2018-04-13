import get from 'lodash/get';
import { rgba } from 'polished';

import 'z-frontend-global-types';

import { ColorString } from './colors';
import zIndexValues from './zIndex';

const px = val => {
  if (typeof val === 'number') {
    return val + 'px';
  }
  return val;
};

export const buttonSpace = (index: number) => props => px(findInTheme(index, props, 'buttonSpace'));
export const fontSizes = (index: number) => props => px(findInTheme(index, props, 'fontSizes'));
export const fontStyles = (key: string) => props => findInTheme(key, props, 'fontStyles');
export const heights = (key: string) => props => px(findInTheme(key, props, 'heights'));
export const icon = (key: string) => props => findInTheme(key, props, 'icons');
export const zIndex = (key: keyof (typeof zIndexValues)) => props => findInTheme(key, props, 'zIndex');
export const radius = props => px(props.theme.radius);
export const depth = (index: number) => props => findInTheme(index, props, 'depths');

export const space = (index: number, strict: boolean = true) => props => {
  const result = px(findInTheme(Math.abs(index), props, 'space', strict));
  return result && index < 0 ? '-' + result : result;
};

const globalColorValues = ['inherit', 'initial', 'transparent'];

export const color = (path: ColorString, opacity?: number) => props => {
  if (globalColorValues.includes(path)) {
    // not in palette, but useful
    return path;
  }
  const found = props.theme.colors[path];
  if (__DEVELOPMENT__ && (found === null || found === undefined)) {
    throw new Error(`referenced undefined color "${path}"`);
  }
  if (opacity) {
    return rgba(found, opacity);
  }
  return found;
};

function findInTheme(key, props, themeKey, strict: boolean = true) {
  const found = (props.theme[themeKey] && props.theme[themeKey][key]) || get(props.theme[themeKey], key);
  if (__DEVELOPMENT__ && (found === null || found === undefined) && strict) {
    throw new Error(`referenced undefined ${themeKey} "${key}"`);
  }
  return found;
}

// unfold one-level map with keys with dots (`{ "heading.xxl": { ... } }`)
// to a nested map (`{ heading: { xxl: {...} } }`)
export function convertToNestedMap(data) {
  const result = {};
  Object.keys(data).forEach(longKey => {
    const arr = longKey.split('.');
    arr.reduce((acc, v, i) => {
      if (i === arr.length - 1) {
        acc[v] = data[longKey];
        return acc;
      }
      if (!acc[v]) {
        acc[v] = {};
      }
      return acc[v];
    }, result);
  });
  return result;
}

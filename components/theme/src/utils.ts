import get from 'lodash/get';
import { rgba } from 'polished';

import 'z-frontend-global-types';

import { ColorString } from './colors';
import zIndexValues from './zIndex';
import { ThemeInterfaceCommon } from './themeCommon';

export const px = (val: number | string) => {
  if (typeof val === 'number') {
    return `${val}px`;
  }
  return val;
};

type ThemeProps = { theme: ThemeInterfaceCommon };

function findInTheme(
  key: string | number,
  props: ThemeProps,
  themeKey: keyof ThemeInterfaceCommon,
  strict: boolean = true,
) {
  const found = (props.theme[themeKey] && (props.theme[themeKey] as any)[key]) || get(props.theme[themeKey], key);
  if (__DEVELOPMENT__ && (found === null || found === undefined) && strict) {
    throw new Error(`referenced undefined ${themeKey} "${key}"`);
  }
  return found;
}

export function buttonSpace<TProps extends ThemeProps>(index: number) {
  return (props: TProps) => px(findInTheme(index, props, 'buttonSpace'));
}

export function fontSizes<TProps extends ThemeProps>(index: number) {
  return (props: TProps) => px(findInTheme(index, props, 'fontSizes'));
}

export function fontStyles<TProps extends ThemeProps>(key: string) {
  return (props: TProps) => findInTheme(key, props, 'fontStyles');
}

export function heights<TProps extends ThemeProps>(key: string) {
  return (props: TProps) => px(findInTheme(key, props, 'heights'));
}

export function icon<TProps extends ThemeProps>(key: string) {
  return (props: TProps) => findInTheme(key, props, 'icons');
}

export function zIndex<TProps extends ThemeProps>(key: keyof typeof zIndexValues) {
  return (props: TProps) => findInTheme(key, props, 'zIndex');
}

export function radius<TProps extends ThemeProps>() {
  return (props: TProps) => px(props.theme.radius);
}

export function depth<TProps extends ThemeProps>(index: number | 'header') {
  if (index === 'header') {
    return (props: TProps) => {
      const headerIndex = props.theme['depths'].length - 1;
      return findInTheme(headerIndex, props, 'depths');
    };
  }
  return (props: TProps) => findInTheme(index, props, 'depths');
}

export function space<TProps extends ThemeProps>(index: number, strict: boolean = true) {
  return (props: TProps) => {
    const result = px(findInTheme(Math.abs(index), props, 'space', strict));
    return result && index < 0 ? `-${result}` : result;
  };
}

const globalColorValues = ['inherit', 'initial', 'transparent'];

export function color<TProps extends ThemeProps>(path: ColorString, opacity?: number) {
  return (props: TProps): string => {
    if (path === null) {
      return ''; // eg when breakpoints specified with null
    }
    if (globalColorValues.includes(path as string)) {
      // not in palette, but useful
      return path as string;
    }
    const found = props.theme.colors[path];
    if (__DEVELOPMENT__ && (found === null || found === undefined)) {
      throw new Error(`referenced undefined color "${path}"`);
    }
    if (opacity !== undefined) {
      return rgba(found, opacity);
    }
    return found;
  };
}

// unfold one-level map with keys with dots (`{ "heading.xxl": { ... } }`)
// to a nested map (`{ heading: { xxl: {...} } }`)
export function convertToNestedMap(data: { [key: string]: any }): { [key: string]: { [key: string]: string } } {
  const result = {};
  Object.keys(data).forEach(longKey => {
    const arr = longKey.split('.');
    arr.reduce((acc: { [key: string]: {} }, v, i) => {
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

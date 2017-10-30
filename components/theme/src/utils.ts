import { idx, px } from 'rebass/dist/util';
import get from 'lodash/get';

export const space = (index: number) => props => px(idx(['space', index], props.theme));
export const color = (path: string) => props => get(props.theme.colors, path) || path;

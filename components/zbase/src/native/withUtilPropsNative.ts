import { getColor, styled, ThemeInterface } from 'z-frontend-theme/native';

import withUtilProps, { ResultComponentProps, WithUtilPropsOptions } from '../withUtilProps';
import { PropsMap } from '../commonTypes';
import { StyledTagNative, UtilProps as AllUtilProps, UtilTypeBorder } from './types';

export type FlexOnlyAdditionalProps = {
  /**
   * When flex is a positive number, it makes the component flexible and it will be sized proportional to its flex value.
   * So a component with flex set to 2 will take twice the space as a component with flex set to 1.
   *
   * When flex is 0, the component is sized according to width and height and it is inflexible.
   * When flex is -1, the component is normally sized according width and height. However, if there's not enough space,
   * the component will shrink to its minWidth and minHeight.
   */
  flex?: number;
};

export const flexOnlyPropsMap: PropsMap = {
  flex: { cssName: 'flex' },
};

export type ResultNativeComponentProps<
  ComponentProps,
  AdditionalProps = {},
  UtilProps = AllUtilProps
> = ResultComponentProps<ComponentProps, AdditionalProps, UtilProps>;

export default function withWebUtilProps<ComponentProps, AdditionalProps = {}, UtilProps = AllUtilProps>(
  options: WithUtilPropsOptions<ComponentProps, AdditionalProps, UtilProps, ThemeInterface>,
) {
  return withUtilProps<ComponentProps, AdditionalProps, UtilProps, ThemeInterface, StyledTagNative>({
    ...options,
    styled,
  });
}

function getBorderHelper(side?: string) {
  return (propValue: boolean, props: UtilTypeBorder) => {
    if (!propValue) {
      return '';
    }
    const borderSelectorStart = side ? `border-${side}` : 'border';
    const selectors = [
      `${borderSelectorStart}-color: ${props.borderColor ? getColor(props.borderColor) : ''};`,
      `${borderSelectorStart}-width: 1px;`,
      `border-style: solid;`, // native does not support border-<side>-style for some reason
    ];
    return selectors.join('\n');
  };
}

export const borderPropsMap: PropsMap = {
  border: getBorderHelper(),
  borderTop: getBorderHelper('top'),
  borderRight: getBorderHelper('right'),
  borderBottom: getBorderHelper('bottom'),
  borderLeft: getBorderHelper('left'),
  // borderColor: supported via getBorderHelper()
  // when needed: borderWidth, borderRadius, borderStyle
};

import { HTMLAttributes, TimeHTMLAttributes } from 'react';

import { ThemeInterface } from 'z-frontend-theme';
import { fontStyles, color } from 'z-frontend-theme/utils';

import withUtilProps, { WithUtilPropsOptions, ResultComponentProps } from '../withUtilProps';
import { PropsMap } from '../commonTypes';
import { UtilProps as AllUtilProps } from './types';

export type DivProps = HTMLAttributes<HTMLDivElement>;
export type SpanProps = HTMLAttributes<HTMLSpanElement>;
export type TimeElProps = TimeHTMLAttributes<HTMLTimeElement>;

export type ResultWebComponentProps<
  ComponentProps,
  AdditionalProps = {},
  UtilProps = AllUtilProps
> = ResultComponentProps<ComponentProps, AdditionalProps, UtilProps>;

export default function withWebUtilProps<ComponentProps, AdditionalProps = {}, UtilProps = AllUtilProps>(
  options: WithUtilPropsOptions<ComponentProps, AdditionalProps, UtilProps, ThemeInterface> = {},
) {
  return withUtilProps<ComponentProps, AdditionalProps, UtilProps, ThemeInterface>({
    ...options,
    additionalUtilsPropsMap: {
      fontStyle: (propValue, props) => fontStyles(propValue)(props),
    },
  });
}

function getBorderHelper(side?: string) {
  return (propValue: boolean, props) => {
    if (!propValue) {
      return;
    }
    const borderSelectorStart = side ? `border-${side}` : 'border';
    const selectors = [
      `${borderSelectorStart}-color: ${color(props.borderColor)(props)};`,
      `${borderSelectorStart}-width: 1px;`,
      `${borderSelectorStart}-style: solid;`,
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

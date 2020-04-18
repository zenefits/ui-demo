import { HTMLAttributes } from 'react';

import { css, IconNameString } from 'z-frontend-theme';
import { fontSizes } from 'z-frontend-theme/utils';

import withUtilPropsWeb, { ResultWebComponentProps } from '../withUtilPropsWeb';
import { makeDummyComponentForDocs } from '../docsUtil';

export const iconFontSizeMap = {
  xsmall: 0,
  small: 1,
  medium: 2,
  large: 4,
  xlarge: 5,
  xxlarge: 7,
};

export type IconSize = keyof typeof iconFontSizeMap;

type AdditionalProps = {
  /** Name of the icon to display. Available list: http://zavoloklom.github.io/material-design-iconic-font/icons.html */
  iconName: IconNameString;
  /** Should the icon spin continuously? */
  spin?: boolean;
  /** Size of the icon. Omit to match the inherited font size. */
  s?: IconSize;
};

export type IconProps = ResultWebComponentProps<HTMLAttributes<HTMLSpanElement>, AdditionalProps>;

const fontSizeHelper = (props: any) => props.s && fontSizes((iconFontSizeMap as any)[props.s]);
// inherit font-size and color
export const iconStyle = css`
  font-family: ${props => props.theme.iconFont};
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  font-size: ${fontSizeHelper};
  text-rendering: auto;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  ${(props: any) => props.spin && 'animation: zbase-spin 1.5s infinite linear;'}

  ::before {
    content: '${(props: any) => props.theme.icons[props.iconName]}';
  }

  @keyframes zbase-spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export const IconForDocs = makeDummyComponentForDocs<IconProps>();
IconForDocs.displayName = 'Icon';

export default withUtilPropsWeb<HTMLAttributes<HTMLSpanElement>, AdditionalProps>({
  additionalCss: iconStyle,
})('i');

import { HTMLAttributes } from 'react';
import { css } from 'z-frontend-theme';
import withUtilPropsWeb, { ResultWebComponentProps } from './withUtilPropsWeb';

type AdditionalProps = {
  iconName: string;
  spin?: boolean;
};

export type IconProps = ResultWebComponentProps<HTMLAttributes<HTMLSpanElement>, AdditionalProps>;

export const iconStyle = css`
  @keyframes zbase-spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  ::after {
    display: inline-block;
    font-family: ${props => props.theme.iconFont};
    text-align: center;
    content: '${(props: any) => props.theme.icons[props.iconName]}';
    ${(props: any) => props.spin && 'animation: zbase-spin 1.5s infinite linear;'}
  }
`;

export default withUtilPropsWeb<HTMLAttributes<HTMLSpanElement>, AdditionalProps>({
  additionalCss: iconStyle,
})('span');

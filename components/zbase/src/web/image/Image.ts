import { ImgHTMLAttributes } from 'react';

import { css } from 'z-frontend-theme';

import withWebUtilProps, { ResultWebComponentProps } from '../withUtilPropsWeb';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {}

export type ImageProps = ResultWebComponentProps<ImgProps>;

export default withWebUtilProps<ImgProps>({
  displayName: 'Image',
  defaultUtilProps: {
    height: 'auto',
  },
  additionalCss: css`
    display: block;
    max-width: 100%;
  `,
})('img');

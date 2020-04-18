import { ImgHTMLAttributes } from 'react';

import { css } from 'z-frontend-theme';

import withWebUtilProps, { ResultWebComponentProps } from '../withUtilPropsWeb';
import { makeDummyComponentForDocs } from '../docsUtil';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  loading?: 'lazy' | 'eager';
}

// Loading is a new attribute supported in chrome https://web.dev/native-lazy-loading
export type ImageProps = ResultWebComponentProps<ImgProps>;

type AdditionalImageProps = {
  alt: string; // require alt for accessibility purposes
};

export const ImageForDocs = makeDummyComponentForDocs<ImageProps>();
ImageForDocs.displayName = 'Image';

export default withWebUtilProps<ImgProps, AdditionalImageProps>({
  displayName: 'Image',
  defaultUtilProps: {
    height: 'auto',
  },
  additionalCss: css`
    display: block;
    max-width: 100%;
  `,
})('img');

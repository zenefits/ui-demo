import { HTMLAttributes } from 'react';

import { utilHocFactory, UtilPropsWeb } from './utilHocFactory';

export default function generateUtilcomponents<ThemeInterface>(styled, css) {
  const withUtilProps = utilHocFactory<UtilPropsWeb, ThemeInterface>(styled, css, true);

  const Box = withUtilProps<HTMLAttributes<HTMLDivElement>, { flex?: string }>({
    additionalPropsMap: {
      flex: { css: 'flex' },
    },
  })(styled.div);

  interface FlexProps {
    flex?: string;
    justify?: 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between';
    align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    row?: boolean;
    wrap?: boolean;
  }

  const flexPropsMap = {
    flex: { css: 'flex' },
    justify: { css: 'justify-content' },
    align: { css: 'align-items' },
    column: { css: 'flex-direction', value: column => (column ? 'column' : 'row') },
    direction: { css: 'flex-direction' },
    wrap: { css: 'flex-wrap', value: wrap => (wrap ? 'wrap' : 'nowrap') },
  };

  const Flex = withUtilProps<HTMLAttributes<HTMLDivElement>, FlexProps>({
    additionalPropsMap: flexPropsMap,
    additionalCss: css`
      display: flex;
    `,
  })(styled.div);

  return {
    Flex,
    Box,
  };
}

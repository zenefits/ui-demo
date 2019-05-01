import { styled } from 'z-frontend-theme';
import { Box, BoxProps, Flex, FlexProps } from 'zbase';
import { space } from 'z-frontend-theme/utils';

type AppContentContainerFlexProps = FlexProps & { isFullWidth?: boolean };

export const AppContentContainerFlex = styled<AppContentContainerFlexProps>(Flex)`
  max-width: ${props => (props.isFullWidth ? 'none' : '1200px')};
  margin: ${props => (props.isFullWidth ? '0 32px' : '0 auto')};
  padding-left: ${space(3)};
  padding-right: ${space(3)};
`;

export type AppContentContainerBoxProps = BoxProps & { isFullWidth?: boolean };

export const AppContentContainerBox = styled<AppContentContainerBoxProps>(Box)`
  max-width: ${props => (props.isFullWidth ? 'none' : '1200px')};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${space(3)};
  padding-right: ${space(3)};
`;

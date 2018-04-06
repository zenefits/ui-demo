import { styled } from 'z-frontend-theme';
import { Box, Flex } from 'zbase';
import { space } from 'z-frontend-theme/utils';

export const AppContentContainerFlex = styled(Flex)`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${space(3)};
  padding-right: ${space(3)};
` as typeof Flex;

export const AppContentContainerBox = styled(Box)`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${space(3)};
  padding-right: ${space(3)};
`;

import { Box } from 'zbase';
import { radius } from 'z-frontend-theme/utils';
import { styled, ColorString } from 'z-frontend-theme';

const StyledContainer = styled(Box)`
  overflow: visible;
  border-radius: ${radius()};
`;

StyledContainer.defaultProps = {
  bg: 'grayscale.white' as ColorString,
};

export default StyledContainer;

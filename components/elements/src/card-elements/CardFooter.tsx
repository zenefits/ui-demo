import { styled } from 'z-frontend-theme';
import { Box } from 'zbase';
import { space } from 'z-frontend-theme/utils';

const Footer = styled(Box)`
  padding: ${space(3)} ${space(4)};
  font-weight: ${props => props.theme.weights[1]};
`;

Footer.defaultProps = {
  fontSize__deprecated__doNotUse: 1,
  p: 2,
};
export default Footer;

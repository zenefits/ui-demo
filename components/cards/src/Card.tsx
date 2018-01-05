import { styled } from 'z-frontend-theme';
import { Panel, Box, PanelFooter, PanelHeader } from 'rebass';
import { color, space } from 'z-frontend-theme/src/utils';
import { RebassProps } from 'z-rebass-types';

const CardComponent = styled<RebassProps<{}>>(Panel)`
  border: 1px solid ${color('grayscale.f')};
  background: ${color('grayscale.g')};
  margin-bottom: ${space(3)};
  overflow: visible;
`;

const Header = styled<RebassProps<{}>>(PanelHeader)`
  border-bottom: 1px solid;
  border-color: ${color('grayscale.f')};
  padding: ${space(3)} ${space(4)};
`;

interface RowProps {
  padded?: boolean;
  borderBottom?: boolean;
}

const Row = styled<RebassProps<{}> & RowProps>(Box)`
  border-bottom: 1px solid ${color('grayscale.f')};
  padding-top: ${props => (props.padded ? space(3)(props) : '0px')};
  padding-left: ${props => (props.padded ? space(4)(props) : '0px')};
  padding-right: ${props => (props.padded ? space(4)(props) : '0px')};
  padding-bottom: ${space(5)};
  ${props => (props.borderBottom ? '' : `:last-of-type { border-bottom: none; }`)};
`;

Row.defaultProps = { padded: true };

const Footer = styled<RebassProps<{}>>(PanelFooter)`
  border-top: 1px solid;
  border-color: ${color('grayscale.f')};
  padding: ${space(3)} ${space(4)};

  header + & {
    border-top: none;
  }
`;

declare type Card = typeof CardComponent & {
  Header: typeof Header;
  Row: typeof Row;
  Footer: typeof Footer;
};

const Card = CardComponent as Card;
Card.Header = Header;
Card.Row = Row;
Card.Footer = Footer;

export default Card;

import React from 'react';
import { styled, ColorString } from 'z-frontend-theme';
import { Box, BoxProps } from 'zbase';
import { color, space, radius } from 'z-frontend-theme/utils';

const Header = styled<BoxProps>(Box)`
  font-weight: ${props => props.theme.weights[1]};
`;

Header.defaultProps = {
  borderBottom: true,
  f: 2,
  py: 3,
  px: 4,
};

// FIXME: these props will not be documented because the tool only finds one component per file (Card in this case)
export interface RowProps {
  /** does the row have extra padding? */
  padded?: boolean; // TODO: remove in favor of `p` util prop
}

const Row = styled<BoxProps & RowProps>(Box)`
  &:last-of-type {
    border-bottom: none;
  }

  padding-top: ${props => (props.padded ? space(4) : '0px')};
  padding-left: ${props => (props.padded ? space(4) : '0px')};
  padding-right: ${props => (props.padded ? space(4) : '0px')};
  padding-bottom: ${space(5)};
`;

Row.defaultProps = {
  borderBottom: true,
  padded: true,
};

const Footer = styled(Box)`
  padding: ${space(3)} ${space(4)};
  font-weight: ${props => props.theme.weights[1]};
`;

Footer.defaultProps = {
  f: 1,
  p: 2,
};

const StyledCard = styled(Box)`
  border: 1px solid ${color('grayscale.f')};
  margin-bottom: ${space(3)};
  overflow: visible;
  border-radius: ${radius};
`;

StyledCard.defaultProps = {
  bg: 'grayscale.g' as ColorString,
};

/**
 * A component to flexibly group related content.
 */
class Card extends React.Component<BoxProps> {
  static defaultProps = {
    bg: 'grayscale.g' as ColorString,
  };
  static Header = Header;
  static Row = Row;
  static Footer = Footer;
  render() {
    return <StyledCard {...this.props} />;
  }
}

export default Card;

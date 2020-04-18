import React from 'react';

import { ColorString } from 'z-frontend-theme';
import { BoxProps } from 'zbase';
import { CardContainer, CardFooter, CardHeader, CardRow } from 'z-frontend-elements';

/**
 * A component to flexibly group related content.
 */
class Card extends React.Component<BoxProps> {
  static defaultProps = {
    bg: 'grayscale.white' as ColorString,
    border: true,
    mb: 3,
  };

  static Header = CardHeader;

  static Row = CardRow;

  static Footer = CardFooter;

  render() {
    return <CardContainer data-testid="Card" {...this.props} />;
  }
}

export default Card;

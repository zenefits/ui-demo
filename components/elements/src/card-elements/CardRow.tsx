import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';
import { Box, BoxProps } from 'zbase';

// FIXME: these props will not be documented because the tool only finds one component per file (Card in this case)
export interface RowProps {
  /** does the row have extra padding? */
  padded?: boolean; // for backwards-compatibility only
}

const Row = styled(Box)<BoxProps & RowProps>`
  &:last-of-type {
    border-bottom: none;
  }

  ${(props: any) => (!props.padded ? 'padding-top: 0px; padding-right: 0px; padding-left: 0px;' : '')};
`;

function paddingHelper(props: CardRowProps) {
  const { p, px, py, ...rest } = props;
  const flattenedProps = { ...rest };
  if (p !== undefined) {
    flattenedProps.pt = p;
    flattenedProps.pb = p;
    flattenedProps.pl = p;
    flattenedProps.pr = p;
  }
  if (px !== undefined) {
    flattenedProps.pl = px;
    flattenedProps.pr = px;
  }
  if (py !== undefined) {
    flattenedProps.pt = py;
    flattenedProps.pb = py;
  }
  return flattenedProps;
}

type CardRowProps = BoxProps & RowProps;

class CardRow extends Component<CardRowProps> {
  static defaultProps = {
    borderBottom: true,
    pt: 4,
    pl: 4,
    pr: 4,
    pb: 5,
    padded: true,
  };

  render() {
    return <Row {...paddingHelper(this.props)} />;
  }
}

export default CardRow;

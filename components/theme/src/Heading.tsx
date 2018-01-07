import React, { Component, HTMLAttributes } from 'react';
import { styled } from './ThemeProvider';
import { fontStyles } from './utils';
import { fontStyleTagMap } from './fonts';
import { RebassOnlyProps } from 'z-rebass-types';
import { Heading as RebassHeading } from 'rebass';

export declare type HeadingProps = RebassOnlyProps & HTMLAttributes<HTMLHeadingElement> & { fontStyle?: string };
// 'fontStyle' precedes 'is', if neither 'fontStyle' or 'is' is specified, will fall back to default style headings.xl

const styles = props =>
  props.fontStyle
    ? fontStyles(props.fontStyle)
    : props.is ? fontStyles(fontStyleTagMap[props.is]) : fontStyles('headings.xl');

const StyledHeading = styled<HeadingProps>(RebassHeading)`
  ${styles};
`;

class Heading extends Component<HeadingProps> {
  render() {
    return <StyledHeading {...this.props} />;
  }
}
export default Heading;

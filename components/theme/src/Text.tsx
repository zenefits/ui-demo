import React, { Component, HTMLAttributes } from 'react';
import { styled } from './ThemeProvider';
import { fontStyles } from './utils';
import { fontStyleTagMap } from './fonts';
import { RebassOnlyProps } from 'z-rebass-types';
import { Text as RebassText } from 'rebass';

export declare type TextProps = RebassOnlyProps &
  HTMLAttributes<HTMLElement> & { fontStyle?: string; align?: string; caps?: boolean; bold?: boolean };
// 'fontStyle' precedes 'is', if neither 'fontStyle' or 'is' is specified, will fall back to default style paragraphs.m

const styles = props =>
  props.fontStyle
    ? fontStyles(props.fontStyle)
    : props.is ? fontStyles(fontStyleTagMap[props.is]) : fontStyles('paragraphs.m');

const StyledText = styled<TextProps>(RebassText)`
  ${styles};
`;

class Text extends Component<TextProps> {
  render() {
    return <StyledText {...this.props} />;
  }
}
export default Text;

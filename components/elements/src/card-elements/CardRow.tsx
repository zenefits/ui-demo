import { styled } from 'z-frontend-theme';
import { Box, BoxProps } from 'zbase';

// FIXME: these props will not be documented because the tool only finds one component per file (Card in this case)
export interface RowProps {
  /** does the row have extra padding? */
  padded?: boolean; // TODO: remove padded={false} in favor of `pt={0} px={0}`
}

const Row = styled<BoxProps & RowProps>(Box)`
  &:last-of-type {
    border-bottom: none;
  }

  ${(props: any) => (!props.padded ? 'padding-top: 0px; padding-right: 0px; padding-left: 0px;' : '')};
`;

Row.defaultProps = {
  borderBottom: true,
  pt: 4,
  px: 4,
  pb: 5,
  padded: true,
};

export default Row;

import React, { Component } from 'react';
import { Arrow } from 'react-popper';

import { getColor, styled, ColorString } from 'z-frontend-theme';
import { Box } from 'zbase';
import { radius, space } from 'z-frontend-theme/utils';

import { PlacementProp } from './BasePopper';

type ArrowedPopperContainerStylingProps = {
  bg: ColorString;
  color: ColorString;
};

type ArrowedPopperContainerProps = ArrowedPopperContainerStylingProps & {
  useDefaultPopperContainer?: boolean;
  dataPlacement: PlacementProp;
  showArrow?: boolean;
};

const StyledPopperContainer = styled(Box)`
  margin: ${space(2)};
  border-radius: ${radius()};
  box-shadow: 0 2px 8px 0 rgba(18, 52, 102, 0.2), 0 0 0 1px rgba(18, 52, 102, 0.15);
`;

const StyledContainer = styled<ArrowedPopperContainerStylingProps>(
  ({ bg, ...rest }: ArrowedPopperContainerStylingProps) => <Box {...rest} />,
)`
  display: inline;

  .popper-arrow {
    height: 0;
    width: 0;
    position: absolute;
    display: inline-block;
  }

  .popper-arrow::before,
  .popper-arrow::after {
    content: '';
    display: block;
    border: 5px solid transparent;
    position: absolute;
    height: 0;
    width: 0;
  }

  &[data-placement^='right'] {
    > .popper-arrow {
      left: ${space(2)};
    }

    > .popper-arrow::before {
      border-right-color: rgba(18, 52, 102, 0.2);
      right: 1px;
      top: -5px;
    }

    > .popper-arrow::after {
      border-right-color: ${props => `${getColor(props.bg)}`};
      right: 0;
      top: -5px;
    }
  }

  &[data-placement^='bottom'] {
    > .popper-arrow {
      top: ${space(2)};
    }

    > .popper-arrow::before {
      border-bottom-color: rgba(18, 52, 102, 0.2);
      bottom: 1px;
      left: -5px;
    }

    > .popper-arrow::after {
      border-bottom-color: ${props => `${getColor(props.bg)}`};
      bottom: 0;
      left: -5px;
    }
  }

  &[data-placement^='left'] {
    > .popper-arrow {
      right: ${space(2)};
    }

    > .popper-arrow::before {
      border-left-color: rgba(18, 52, 102, 0.2);
      left: 1px;
      top: -5px;
    }

    > .popper-arrow::after {
      border-left-color: ${props => `${getColor(props.bg)}`};
      left: 0;
      top: -5px;
    }
  }

  &[data-placement^='top'] {
    > .popper-arrow {
      bottom: ${space(2)};
    }

    > .popper-arrow::before {
      border-top-color: rgba(18, 52, 102, 0.2);
      top: 1px;
      left: -5px;
    }

    > .popper-arrow::after {
      border-top-color: ${props => `${getColor(props.bg)}`};
      left: -5px;
    }
  }
`;

class ArrowedPopperContainer extends Component<ArrowedPopperContainerProps> {
  static defaultProps = {
    useDefaultPopperContainer: true,
    showArrow: true,
  };
  render() {
    const { dataPlacement, showArrow, bg, ...props } = this.props;
    return (
      <StyledContainer data-placement={dataPlacement} bg={bg} {...props}>
        {showArrow && <Arrow className="popper-arrow" />}
        {this.props.useDefaultPopperContainer ? (
          <StyledPopperContainer bg={bg}>{this.props.children}</StyledPopperContainer>
        ) : (
          this.props.children
        )}
      </StyledContainer>
    );
  }
}

export default ArrowedPopperContainer;

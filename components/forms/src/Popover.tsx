import React, { Component } from 'react';
import { Manager, Target, Popper, Arrow } from 'react-popper';
import { styled } from 'z-frontend-theme';
import { Flex } from 'rebass';
import { color, space, radius, depth } from 'z-frontend-theme/src/utils';

interface Props {
  event: 'click' | 'hover';
  targetBody?: React.ReactNode;
  placement?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'left-start'
    | 'left-end'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end';
  // custom flip seems to only work if the first item in the array matches the placement
  flip?: [

      | 'left'
      | 'right'
      | 'top'
      | 'bottom'
      | 'left-start'
      | 'left-end'
      | 'top-start'
      | 'top-end'
      | 'right-start'
      | 'right-end'
      | 'bottom-start'
      | 'bottom-end'
  ];
  showArrow?: boolean;
  showPopover?: boolean;
}

interface State {
  isVisible: boolean;
}

export const StyledPopperContainer = styled(Flex)`
  margin: ${space(2)};
  border-radius: ${radius};
  background-color: ${color('grayscale.white')};
  box-shadow: ${depth(2)};
`;

const StyledContainer = styled(Flex)`
  .popper-arrow {
    height: 0;
    width: 0;
    border-style: solid;
    position: absolute;
  }

  .popper[data-placement^='right'] {
    .popper-arrow {
      border-width: 5px 5px 5px 0;
      border-color: transparent ${color('grayscale.a')} transparent transparent;
    }
  }

  .popper[data-placement^='top'] {
    .popper-arrow {
      border-width: 5px 5px 0 5px;
      border-color: ${color('grayscale.a')} transparent transparent transparent;
      bottom: 0;
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  .popper[data-placement^='left'] {
    .popper-arrow {
      border-width: 5px 0 5px 5px;
      border-color: transparent transparent transparent ${color('grayscale.a')};
      right: 0;
      margin-left: 0;
      margin-right: 0;
    }
  }

  .popper[data-placement^='bottom'] {
    .popper-arrow {
      border-width: 0 5px 5px 5px;
      border-color: transparent transparent ${color('grayscale.a')} transparent;
    }
  }
`;

class Popover extends Component<Props, State> {
  static defaultProps = {
    placement: 'left',
    flip: [],
  };

  targetEl: HTMLElement;
  popperEl: HTMLElement;
  documentEventHandlers: [string, (any) => void][];
  constructor(props) {
    super(props);
    this.state = { isVisible: props.showPopover || false };

    this.documentEventHandlers = [
      ['mousedown', this.onOuterAction],
      ['touchstart', this.onOuterAction],
      ['click', this.onOuterAction],
    ];
  }

  componentWillMount() {
    this.documentEventHandlers.forEach(([eventName, handlerFn]) => {
      window.document.addEventListener(eventName, handlerFn);
    });
  }
  componentWillUnmount() {
    this.documentEventHandlers.forEach(([eventName, handlerFn]) => {
      window.document.removeEventListener(eventName, handlerFn);
    });
  }

  togglePopover = (isVisible?: boolean) => {
    if (this.state.isVisible === isVisible) {
      return;
    }
    this.setState({ isVisible: isVisible == null ? !this.state.isVisible : isVisible });
  };

  onTargetClick = e => {
    if (this.props.event === 'click') {
      e.preventDefault();
      this.togglePopover();
    }
  };

  onOuterAction = e => {
    if (!this.targetEl.contains(e.target) && (!this.popperEl || !this.popperEl.contains(e.target))) {
      this.togglePopover(false);
    }
  };

  onMouseOver = e => {
    if (this.props.event === 'hover') {
      e.preventDefault();
      this.togglePopover();
    }
  };

  onMouseOut = e => {
    if (this.props.event === 'hover') {
      e.preventDefault();
      this.togglePopover(false);
    }
  };

  getModifiers = () => {
    const { flip } = this.props;
    const flipModifiers = { enabled: true };
    if (flip && flip.length > 0) {
      flipModifiers['behavior'] = flip;
    }
    const modifiers = { flip: flipModifiers };
    return modifiers;
  };

  render() {
    const { children, targetBody, placement } = this.props;

    return (
      <Manager>
        <Target
          onClick={this.onTargetClick}
          innerRef={targetEl => {
            this.targetEl = targetEl;
          }}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {targetBody}
        </Target>
        {this.state.isVisible && (
          <StyledContainer>
            <Popper
              className="popper"
              placement={placement}
              modifiers={this.getModifiers()}
              innerRef={popperEl => {
                this.popperEl = popperEl;
              }}
            >
              {this.props.showArrow && <Arrow className="popper-arrow" />}
              <StyledPopperContainer>{children}</StyledPopperContainer>
            </Popper>
          </StyledContainer>
        )}
      </Manager>
    );
  }
}

export default Popover;

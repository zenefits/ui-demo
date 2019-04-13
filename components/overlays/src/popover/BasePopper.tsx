import React, { cloneElement, Component, CSSProperties, ReactChild } from 'react';
import * as ReactDOM from 'react-dom';
import { IPopperChildrenProps, Manager, Popper, Target } from 'react-popper';

import { zIndex } from 'z-frontend-theme/utils';
import { Box } from 'zbase';
import { styled } from 'z-frontend-theme';

type FlipProp =
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

export type PlacementProp =
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

export interface PopperChildProps {
  style: CSSProperties;
  'data-placement': PlacementProp;
}

export interface BasePopperProps {
  /**
   * Show popover content when the user clicks or hovers on the target element
   */
  event: 'click' | 'hover';
  /**
   * The target which must be clicked or hovered over to view the popover
   */
  targetBody?: React.ReactElement<any>;
  /**
   * Where the popover is placed in relation to the target
   * @default left
   */
  placement?: PlacementProp;
  /**
   * A list of placements to try rendering the popover in if there is not enough room in the primary placement
   */
  flip?: FlipProp[];
  /**
   * Show an arrow from the poppover pointing to the target
   * @default false
   */
  showArrow?: boolean;
  /**
   * Whether or not the popover should be visible
   * @default false
   */
  showPopover?: boolean;
  /**
   * Inject a wrapping element for the popover content. Used by tooltip to modify popover styling.
   */
  children: ((popperChildProps: IPopperChildrenProps, isVisible: boolean, closePopper: () => void) => ReactChild);
}

interface State {
  isVisible: boolean;
}

interface TargetRefProps<T> {
  setTargetRef: ((instance: TargetRef) => void);
}

type TargetRef = Element | Text;

class TargetRefManager extends Component<TargetRefProps<any>> {
  targetRef?: TargetRef;

  componentDidMount() {
    this.targetRef = ReactDOM.findDOMNode(this);
    this.props.setTargetRef(this.targetRef);
  }

  componentDidUpdate() {
    const targetRef = ReactDOM.findDOMNode(this);

    if (this.targetRef !== targetRef) {
      this.targetRef = targetRef;
      this.props.setTargetRef(this.targetRef);
    }
  }

  componentWillUnmount() {
    this.targetRef = null;
    this.props.setTargetRef(null);
  }

  render() {
    return this.props.children;
  }
}

// In the case where no target body is passed in just use an empty div
const EmptyTarget = <Box />;

const StyledPopperContainer = styled(Box)`
  display: inline;

  .popper {
    z-index: ${zIndex('popover')};
  }
`;

class BasePopover extends Component<BasePopperProps, State> {
  static defaultProps = {
    placement: 'left',
    flip: [] as any[],
  };

  targetEl: TargetRef;
  popperEl: HTMLElement;
  documentEventHandlers: [string, (e: any) => void][];
  targetElEventHandlers: [string, (e: any) => void][];

  constructor(props: BasePopperProps) {
    super(props);
    this.state = { isVisible: props.showPopover || false };
    this.documentEventHandlers = [
      ['mousedown', this.onOuterAction],
      ['touchstart', this.onOuterAction],
      ['click', this.onOuterAction],
    ];
    this.targetElEventHandlers = [
      ['mouseout', this.onMouseOut],
      ['mouseover', this.onMouseOver],
      ['click', this.onTargetClick],
      ['focus', this.onFocus],
      ['blur', this.onBlur],
      ['keydown', this.onKeyDown],
    ];
    this.setTargetEl = this.setTargetEl.bind(this);
  }

  componentWillReceiveProps(nextProps: BasePopperProps) {
    if (this.props.showPopover !== nextProps.showPopover) {
      this.setState({ isVisible: nextProps.showPopover });
    }
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
    this.removeTargetElListeners();
  }

  togglePopover = (isVisible?: boolean) => {
    if (this.state.isVisible === isVisible) {
      return;
    }
    this.setState({ isVisible: isVisible == null ? !this.state.isVisible : isVisible });
  };

  onTargetClick = (e: any) => {
    if (this.props.event === 'click') {
      e.preventDefault();
      this.togglePopover();
    }
  };

  onOuterAction = (e: any) => {
    if (
      !this.targetEl.contains(e.target) &&
      (this.popperEl && !this.popperEl.contains(e.target) && document.body.contains(e.target))
    ) {
      this.togglePopover(false);
    }
  };

  onMouseOver = (e: any) => {
    if (this.props.event === 'hover') {
      e.preventDefault();
      this.togglePopover();
    }
  };

  onMouseOut = (e: any) => {
    if (this.props.event === 'hover') {
      e.preventDefault();
      this.togglePopover(false);
    }
  };

  onFocus = (e: any) => {
    if (this.props.event === 'hover') {
      e.preventDefault();
      this.togglePopover();
    }
  };

  onBlur = (e: any) => {
    if (this.props.event === 'hover') {
      e.preventDefault();
      this.togglePopover(false);
    }
  };

  onKeyDown = (e: any) => {
    // Enter key
    if (this.props.event === 'click' && e.keyCode === 13) {
      e.preventDefault();
      this.togglePopover();
    }
  };

  getModifiers = () => {
    const { flip } = this.props;
    const flipModifiers: any = { enabled: true };
    if (flip && flip.length > 0) {
      flipModifiers['behavior'] = flip;
    }
    const modifiers = { flip: flipModifiers };
    return modifiers;
  };

  removeTargetElListeners() {
    if (this.targetEl) {
      this.targetElEventHandlers.forEach(([eventName, handlerFn]) => {
        this.targetEl.removeEventListener(eventName, handlerFn);
      });
    }
  }

  setTargetEl(targetEl: Element) {
    if (this.targetEl) {
      this.removeTargetElListeners();
    }

    this.targetEl = targetEl;

    if (this.targetEl) {
      this.targetElEventHandlers.forEach(([eventName, handlerFn]) => {
        this.targetEl.addEventListener(eventName, handlerFn);
      });
    }
  }

  closePopper = () => {
    this.togglePopover(false);
  };

  render() {
    const { children, targetBody, placement } = this.props;

    return (
      <Manager tag={false}>
        <Target innerRef={ref => this.setTargetEl(ref)} tabIndex={0}>
          {({ targetProps: { ref }, restProps }) => (
            <TargetRefManager setTargetRef={ref}>{cloneElement(targetBody || EmptyTarget, restProps)}</TargetRefManager>
          )}
        </Target>
        {this.state.isVisible && (
          <Popper
            placement={placement}
            modifiers={this.getModifiers()}
            innerRef={popperEl => {
              this.popperEl = popperEl;
            }}
            className="popper"
          >
            {popperChildProps => (
              <StyledPopperContainer>
                {children(popperChildProps, this.state.isVisible, this.closePopper)}
              </StyledPopperContainer>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}

export default BasePopover;

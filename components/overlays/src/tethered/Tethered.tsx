import React, { Component } from 'react';
import Popper from 'popper.js';

import { theme } from 'z-frontend-theme';

type ContainerProps = {
  zIndex?: number;
};

export type TetherComponentProps = {
  target: React.RefObject<HTMLDivElement>;
  matchWidth: boolean;
  // TODO This is necessary as positionFixed was added in 1.14, however ts is getting confused by react-popper declaring popper.js as a module. react-popper is using an older version
  options?: Popper.PopperOptions & {
    positionFixed?: boolean;
  };
  disabled?: boolean;
  onPosition?: () => void;
  containerProps?: ContainerProps;
  closeOnScroll?: boolean;
};

type TetherComponentState = {
  closedByScroll: boolean;
  initialScrollTop?: number;
  initialScrollLeft?: number;
};

class Tethered extends Component<TetherComponentProps, TetherComponentState> {
  static SCROLL_POLL_INTERVAL = 50;

  tetheredNode: React.RefObject<HTMLDivElement>;

  tether: any;

  poll: number;

  state: TetherComponentState = {
    closedByScroll: false,
    initialScrollTop: undefined,
    initialScrollLeft: undefined,
  };

  constructor(props: TetherComponentProps) {
    super(props);
    this.tetheredNode = React.createRef<HTMLDivElement>();
  }

  static defaultProps = {
    options: {},
    containerProps: {
      zIndex: theme.zIndex.popover,
    },
  };

  componentDidMount() {
    this.update();
    this.pollForScrollChange();
  }

  getTargetTop = () => this.props.target.current.getBoundingClientRect().top;

  getTargetLeft = () => this.props.target.current.getBoundingClientRect().left;

  initializeScrollState = () => {
    return new Promise(resolve => {
      this.setState(
        {
          initialScrollLeft: this.getTargetLeft(),
          initialScrollTop: this.getTargetTop(),
        },
        resolve,
      );
    });
  };

  pollForScrollChange = async () => {
    if (this.props.closeOnScroll) {
      await this.initializeScrollState();
      this.poll = setInterval(() => {
        if (
          this.getTargetTop() !== this.state.initialScrollTop ||
          this.getTargetLeft() !== this.state.initialScrollLeft
        ) {
          this.tetheredNode.current.style.display = 'none';

          this.setState({
            closedByScroll: true,
          });

          window.document.activeElement && (window.document.activeElement as HTMLElement).blur();

          clearInterval(this.poll);
        }
      }, Tethered.SCROLL_POLL_INTERVAL);
    }
  };

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.destroy();
  }

  update() {
    if (!this.props.target || this.props.disabled || this.state.closedByScroll || __TEST__) return;

    const { modifiers, ...options } = this.props.options;

    if (!this.tether) {
      this.tether = new Popper(this.props.target.current, this.tetheredNode.current, {
        positionFixed: true,
        modifiers: {
          preventOverflow: {
            boundariesElement: 'window',
          },
          ...modifiers,
        },
        ...options,
      });
    }

    this.tether.update();

    if (this.props.matchWidth) {
      this.tetheredNode.current.style.width = `${this.props.target.current.getBoundingClientRect().width}px`;
    }

    this.props.onPosition && this.props.onPosition();
  }

  destroy() {
    if (!(this.props.disabled || __TEST__)) {
      this.tether.destroy();

      if (this.poll) {
        clearInterval(this.poll);
      }
    }
  }

  render() {
    if (this.state.closedByScroll) {
      return null;
    }

    if (this.props.disabled || __TEST__) {
      return this.props.children;
    }

    return (
      <div
        ref={this.tetheredNode}
        style={{
          zIndex: this.props.containerProps.zIndex,
        }}
        className={this.props.closeOnScroll && 'z-dismiss-on-scroll'}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Tethered;

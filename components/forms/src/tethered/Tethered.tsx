import React, { Component } from 'react';
import Popper from 'popper.js';

import { theme } from 'z-frontend-theme';

type ContainerProps = {
  zIndex?: number;
};

type TetherComponentProps = {
  target: React.RefObject<HTMLDivElement>;
  matchWidth: boolean;
  options?: Popper.PopperOptions;
  disabled?: boolean;
  onPosition?: () => void;
  containerProps?: ContainerProps;
};

class Tethered extends Component<TetherComponentProps> {
  tetheredNode: React.RefObject<HTMLDivElement>;
  tether: any;

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
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.destroy();
  }

  update() {
    if (!this.props.target || this.props.disabled || __TEST__) return;

    const { modifiers, ...options } = this.props.options;

    if (!this.tether) {
      this.tether = new Popper(this.props.target.current, this.tetheredNode.current, {
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
    }
  }

  render() {
    if (this.props.disabled || __TEST__) {
      return this.props.children;
    }

    return (
      <div
        ref={this.tetheredNode}
        style={{
          zIndex: this.props.containerProps.zIndex,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Tethered;

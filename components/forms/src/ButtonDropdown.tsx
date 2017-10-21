import React, { Component } from 'react';
import Popover from 'react-popover';
import { Flex } from 'rebass';

import Icon from 'z-frontend-theme/src/Icon';
import Button from './Button';

interface State {
  isVisible: boolean;
}

class ButtonDropdownComponent extends Component<any, State> {
  constructor() {
    super();
    this.state = {
      isVisible: false,
    };
  }
  togglePopover = isVisible => {
    this.setState((prevState: State) => {
      const newValue = isVisible == null ? !prevState.isVisible : isVisible;
      return {
        isVisible: newValue,
      };
    });
  };
  onClick = e => {
    e.preventDefault();
  };
  render() {
    const body = (
      <Flex w={150} column>
        {this.props.children}
      </Flex>
    );

    return (
      <Popover
        isOpen={this.state.isVisible}
        preferPlace="below"
        enterExitTransitionDurationMs={0}
        onOuterAction={() => this.togglePopover(false)}
        body={body}
      >
        <Button {...this.props} onClick={this.togglePopover}>
          <Icon color="white" fontSize={1} iconName="more-vert" />
        </Button>
      </Popover>
    );
  }
}

class ButtonDropdownItem extends Component<any> {
  onClick = e => {
    e.preventDefault();
    this.props.onClick();
  };
  render() {
    return (
      <Button w="100%" onClick={this.onClick}>
        {this.props.children}
      </Button>
    );
  }
}

declare type ButtonDropdown = typeof ButtonDropdownComponent & {
  Item: typeof ButtonDropdownItem;
};

const ButtonDropdown = ButtonDropdownComponent as ButtonDropdown;
ButtonDropdown.Item = ButtonDropdownItem;

export default ButtonDropdown;

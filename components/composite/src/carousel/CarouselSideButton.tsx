import React, { Component } from 'react';

import { Button, ButtonBasicProps } from 'z-frontend-elements';
import { Box, Flex, Icon } from 'zbase';
import { styled, IconNameString } from 'z-frontend-theme';

type CarouselSideButtonProps = ButtonBasicProps & {
  side: 'left' | 'right';
};

const SideButtonContainer = styled(Box)<{ side: string }>`
  position: absolute;
  ${props => props.side === 'left' && 'left: -50px'};
  ${props => props.side === 'right' && 'right: -50px'};
`;

class CarouselSideButton extends Component<CarouselSideButtonProps> {
  render() {
    const { side, onClick, disabled, ...rest } = this.props;
    const iconProps = {
      iconName: (side === 'left' ? 'chevron-left' : 'chevron-right') as IconNameString,
      'aria-label': side === 'left' ? 'Previous' : 'Next',
    };
    return (
      <SideButtonContainer side={side}>
        <Button mode="transparent" disabled={disabled} onClick={onClick} {...rest}>
          <Flex align="center">
            <Icon s="xlarge" color="grayscale.e" {...iconProps} />
          </Flex>
        </Button>
      </SideButtonContainer>
    );
  }
}

export default CarouselSideButton;

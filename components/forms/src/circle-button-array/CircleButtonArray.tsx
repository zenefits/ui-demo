import React, { ButtonHTMLAttributes, Component } from 'react';

import { Flex, FlexProps } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color, fontSizes, px } from 'z-frontend-theme/utils';

interface CircleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  isSelected?: boolean;
  s?: 'small' | 'large';
}

const sizeDiameterMap = {
  small: 40,
  large: 52,
};

export const CircleButton = styled<CircleButtonProps>(({ isSelected, ...rest }: CircleButtonProps) => (
  <button {...rest} />
))`
  width: ${props => px(sizeDiameterMap[props.s])};
  height: ${props => px(sizeDiameterMap[props.s])};
  border-radius: 50%;
  border: 2px solid ${color('tertiary.a')};
  cursor: pointer;
  font-size: ${fontSizes(3)};
  outline: 0;
  background-color: ${props => (props.isSelected ? color('tertiary.a') : 'transparent')};
  color: ${props => (props.isSelected ? color('grayscale.white') : color('tertiary.a'))};

  &:disabled {
    opacity: 1;
    cursor: default;
    box-shadow: none;
  }

  &:focus,
  &:hover:not(:disabled) {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.15);
  }

  &:active {
    color: ${color('tertiary.a')};
    background-color: ${color('tertiary.c')};
    box-shadow: none !important;
  }
`;

CircleButton.defaultProps = {
  s: 'small',
};

type CircleButtonArrayProps = {
  onButtonClick: (weekday: number) => void;
  behavior: 'checkbox' | 'radio';
  selectedValues: boolean[];
  disabled?: boolean;
} & FlexProps;

class CircleButtonArray extends Component<CircleButtonArrayProps> {
  render() {
    const { behavior, selectedValues, onButtonClick, disabled, ...flexProps } = this.props;
    return (
      <Flex role={behavior === 'checkbox' ? 'group' : 'radiogroup'} {...flexProps}>
        {React.Children.map(this.props.children, (child, i) => {
          return (
            <Flex flex="1 0">
              {React.cloneElement(child as any, {
                disabled,
                type: 'button',
                isSelected: selectedValues[i],
                'aria-checked': selectedValues[i],
                role: behavior,
                onClick: () => {
                  onButtonClick(i);
                },
              })}
            </Flex>
          );
        })}
      </Flex>
    );
  }
}

export default CircleButtonArray;

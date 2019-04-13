import React from 'react';
import _ from 'lodash';
import { GetItemPropsOptions } from 'downshift';

import { css, styled } from 'z-frontend-theme';
import { Box, BoxProps, Flex } from 'zbase';
import { LoadingSpinner } from 'z-frontend-elements';
import { color, fontStyles, px, radius, space, zIndex } from 'z-frontend-theme/utils';

import { recursivelyTransformChildren } from './utils';

export type SelectOptionSize = 'small' | 'medium' | 'large';

type OptionFontStyles = 'paragraphs.s' | 'paragraphs.m' | 'paragraphs.l';
export const optionFontStyleMap: { [size in SelectOptionSize]: OptionFontStyles } = {
  small: 'paragraphs.s',
  medium: 'paragraphs.m',
  large: 'paragraphs.l',
};

type OptionHeadingFontStyles = 'headings.xs' | 'headings.m';
export const optionHeadingFontStylesMap: { [size in SelectOptionSize]: OptionHeadingFontStyles } = {
  small: 'headings.xs',
  medium: 'headings.xs',
  large: 'headings.m',
};

export type SelectOptionsProps = BoxProps & {
  maxHeight?: string | number;
  highlightTop?: boolean;
  position?: 'absolute' | 'static';
  s: SelectOptionSize;
};

export const SelectOptions = styled(
  Box.extendProps<{
    maxHeight?: string | number;
    highlightTop?: boolean;
    position?: 'absolute' | 'static';
    s: SelectOptionSize;
  }>(),
)`
  ${props => fontStyles(optionFontStyleMap[props.s])};
  position: ${props => props.position};
  ${props => !props.w && 'width: 100%;'}
  z-index: ${zIndex('dropdown')};
  border-radius: 0 0 ${radius()} ${radius()};
  border: 1px solid ${color('secondary.b')};
  background-color: ${color('grayscale.white')};
  box-shadow: none;
  max-height: ${props => props.maxHeight && px(props.maxHeight)};
  overflow-y: auto;

  :focus {
    border-color: ${color('tertiary.a')};
    box-shadow: 0 0 0 1px ${color('tertiary.a', 0.5)};
    outline: none;
  }
`;

export type SelectOptionDisplayProps = {
  s?: SelectOptionSize;
  highlighted?: boolean;
  selected?: boolean;
  selectable?: boolean;
  disabled?: boolean;
};

const getOptionCursor = (props: SelectOptionDisplayProps) => {
  if (props.disabled) {
    return 'not-allowed';
  } else if (props.selectable) {
    return 'pointer';
  }
  return '';
};

const getOptionColor = (props: SelectOptionDisplayProps) => {
  if (props.disabled) {
    return color('grayscale.e');
  } else if (props.selected) {
    return color('grayscale.b');
  } else {
    return color('grayscale.d');
  }
};

const optionStyles = css<SelectOptionDisplayProps>`
  cursor: ${getOptionCursor};
  color: ${getOptionColor};
  background-color: ${props =>
    props.selected ? color('tertiary.b') : props.highlighted ? color('secondary.c') : undefined};
`;

export type SelectOptionProps = BoxProps & SelectOptionDisplayProps;
export const SelectOptionContainer = styled<SelectOptionProps>(Box)`
  ${optionStyles}
  min-height: ${space(5)};
`;

SelectOptionContainer.defaultProps = {
  px: 3,
  py: 2,
  selectable: true,
  fontStyle: 'paragraphs.m',
};

export const SelectHeader = styled<SelectOptionProps>(Box)`
  ${optionStyles}
  min-height: ${space(5)};
`;
SelectHeader.defaultProps = {
  px: 3,
  py: 2,
  selectable: false,
  fontStyle: 'headings.xs',
};

export const SelectGroup: React.StatelessComponent<{
  label: string;
  headerProps: BoxProps;
}> = props => {
  return (
    <>
      <SelectHeader {...props.headerProps}>{props.label}</SelectHeader>
      {props.children}
    </>
  );
};

export type SelectOptionInterfaceProps<OptionValue> = {
  option: OptionValue;
  disabled?: boolean;
  children?: React.ReactNode;
};

export function createSelectOptionInterface<OptionValue>() {
  class OptionInterface<OptionValue> extends React.Component<SelectOptionInterfaceProps<OptionValue>> {
    render() {
      throw new Error('OptionInterfaces should not be rendered directly');
      return <div> This shouldn't be rendered </div>;
    }
  }
  return OptionInterface;
}

export const GenericSelectOptionInterface = createSelectOptionInterface<any>();

export const NEW_OPTION_DUMMY_VALUE = 'NEW_OPTION_DUMMY_VALUE';

export class SelectOptionFactory<OptionValue> {
  optionIndex: number;
  selectedItems: OptionValue[];
  highlightedIndex: number;
  size: SelectOptionSize;
  getItemProps: (options: GetItemPropsOptions<OptionValue>) => any;
  getOptionText: (option: OptionValue) => string;
  withMatchEmphasis: (text: string) => JSX.Element | string;
  cb?: (element: React.ReactElement<SelectOptionProps>, context: SelectOptionFactory<OptionValue>) => void;

  constructor(params: {
    selectedItem?: OptionValue;
    selectedItems?: OptionValue[];
    highlightedIndex: number;
    size: SelectOptionSize;
    getItemProps: any;
    getOptionText: (option: OptionValue) => string;
    withMatchEmphasis?: (text: string) => JSX.Element | string;
    startingIndex?: number;
    cb?: (element?: React.ReactElement<SelectOptionProps>, context?: SelectOptionFactory<OptionValue>) => void;
  }) {
    this.selectedItems = params.selectedItems ? params.selectedItems : [params.selectedItem];
    this.highlightedIndex = params.highlightedIndex;
    this.size = params.size;
    this.getItemProps = params.getItemProps;
    this.cb = params.cb;
    this.optionIndex = params.startingIndex || 0;
    this.getOptionText = params.getOptionText;
    this.withMatchEmphasis = params.withMatchEmphasis || (str => str);
  }

  isOptionSelected(option: OptionValue) {
    return _.some(this.selectedItems.map(selectedItem => _.isEqual(option, selectedItem)));
  }

  createOption = (option: React.ReactElement<SelectOptionInterfaceProps<OptionValue>>) => {
    const optionContent = option.props.children || this.withMatchEmphasis(this.getOptionText(option.props.option));
    const optionComponent = (
      <SelectOptionContainer
        selected={this.isOptionSelected(option.props.option)}
        highlighted={this.optionIndex === this.highlightedIndex}
        fontStyle={optionFontStyleMap[this.size]}
        disabled={option.props.disabled}
        {...this.getItemProps({
          index: this.optionIndex,
          key: JSON.stringify(option.props.option),
          item: option.props.option,
          disabled: option.props.disabled,
        })}
      >
        {optionContent}
      </SelectOptionContainer>
    );
    this.cb && this.cb(optionComponent, this);
    this.optionIndex += 1;
    return optionComponent;
  };

  createNewOption = (
    option: React.ReactElement<{
      children: React.ReactChild;
      optionName?: string;
    }>,
  ) => {
    const optionComponent = (
      <SelectOptionContainer
        highlighted={this.optionIndex === this.highlightedIndex}
        fontStyle={optionFontStyleMap[this.size]}
        {...this.getItemProps({
          index: this.optionIndex,
          key: NEW_OPTION_DUMMY_VALUE,
          item: NEW_OPTION_DUMMY_VALUE as any,
        })}
      >
        {option.props.children || 'Create New Option'}
      </SelectOptionContainer>
    );
    this.cb && this.cb(optionComponent, this);
    this.optionIndex += 1;
    return optionComponent;
  };
}

export class SelectGroupInterface extends React.Component<{ label: string }> {
  render() {
    throw new Error('OptionInterfaces should not be rendered directly');
    return <div> This shouldn't be rendered </div>;
  }
}

export class NewOptionInterface extends React.Component<{
  optionTypeName?: string;
}> {
  render() {
    throw new Error('AddOptionInterface should not be rendered directly');
    return <div> This shouldn't be rendered </div>;
  }
}

export class SelectGroupFactory {
  groupIndex = 0;
  size: SelectOptionSize;
  cb?: (element: React.ReactElement<any>, context: SelectGroupFactory) => void;

  constructor(params: {
    size: SelectOptionSize;
    cb?: (element: React.ReactElement<any>, context: SelectGroupFactory) => void;
  }) {
    this.size = params.size;
    this.cb = params.cb;
  }

  createGroup = (group: React.ReactElement<any>) => {
    const { children, label } = group.props;
    const groupComponent = (
      <SelectGroup
        label={label}
        headerProps={{
          pt: this.groupIndex === 0 ? 2 : 3,
          fontStyle: optionHeadingFontStylesMap[this.size],
        }}
      >
        {children}
      </SelectGroup>
    );

    this.cb && this.cb(groupComponent, this);
    this.groupIndex += 1;
    return groupComponent;
  };
}

export function transformSelectOptions<OptionValue>(
  children: React.ReactNode,
  {
    OptionInterface,
    optionFactory,
    groupFactory,
  }: {
    OptionInterface: React.ComponentClass<{ option: OptionValue }>;
    optionFactory: SelectOptionFactory<OptionValue>;
    groupFactory: SelectGroupFactory;
  },
) {
  return recursivelyTransformChildren(children, [
    {
      condition: element => element.type === OptionInterface,
      transformation: optionFactory.createOption.bind(optionFactory),
    },
    {
      condition: element => element.type === NewOptionInterface,
      transformation: optionFactory.createNewOption.bind(optionFactory),
    },
    {
      condition: element => element.type === SelectGroupInterface,
      transformation: groupFactory.createGroup.bind(groupFactory),
    },
  ]);
}

export const defaultRenderLoading = () => (
  <SelectOptionContainer>
    <Flex justify="center">
      <LoadingSpinner s="xsmall" />
    </Flex>
  </SelectOptionContainer>
);

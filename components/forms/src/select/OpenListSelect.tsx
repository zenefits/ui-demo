import React, { Component } from 'react';
import _ from 'lodash';
import Downshift from 'downshift';

import { LoadingSpinner } from 'z-frontend-elements';
import { Box, Flex, Label } from 'zbase';

import {
  createSelectOptionInterface,
  transformSelectOptions,
  SelectGroupFactory,
  SelectGroupInterface,
  SelectOptions,
  SelectOptionFactory,
  SelectOptionInterfaceProps,
  SelectOptionProps,
  SelectOptionSize,
} from './SelectOptions';
import { getErrorId, getLabelId } from '../formik/FormFieldWrapper';

type Option<OptionValue> = {
  label: string;
  value: OptionValue;
};

// Available on OpenListSelect and Form.OpenListSelect
export type SharedOpenListSelectProps<OptionValue> = {
  /**
   * The name of the control, which is submitted with the control's
   * value as part of the form data.
   * */
  name: string;
  /**
   * Label for the field
   */
  label: string;
  /**
   * Should set to true when options are loading
   */
  loading?: boolean;
  /**
   * Size of input
   * @default "medium"
   * */
  s?: SelectOptionSize;

  /**
   * Function to get text label for option
   * */
  getOptionText: (option: OptionValue) => string;

  /**
   * Is the input disabled
  disabled?: boolean;
  */
  /**
   * Max height for dropdown
   * @default 240
   */
  maxHeight?: string | number;
  /**
   * Height for dropdown can be specified directly
   */
  height?: string | number;
  /**
   * Placeholder text for input
   */
  placeholder?: string;
  /**
   * Function to specify custom loading display
   */
  renderLoading?: () => JSX.Element;

  children: (
    params: {
      SelectOption: React.ComponentClass<SelectOptionInterfaceProps<OptionValue>>;
      SelectGroup?: React.ComponentClass<{ label: string }>;
    },
  ) => React.ReactNode;
};

type OpenListSelectComponentProps<OptionValue> = {
  error?: string;
  value?: Option<OptionValue>;
  /**
   * Fires when an option is selected
   */
  onChange?: (value: OptionValue) => void;
};

type OpenListSelectProps<OptionValue> = SharedOpenListSelectProps<OptionValue> &
  OpenListSelectComponentProps<OptionValue>;

type OpenListSelectState = {
  hasInitialScrollOccurred: boolean;
};

const DEFAULT_MAX_HEIGHT = 240;

export class OpenListSelect<OptionValue> extends Component<OpenListSelectProps<OptionValue>, OpenListSelectState> {
  element: HTMLDivElement;

  constructor(props: OpenListSelectProps<OptionValue>) {
    super(props);
    this.state = {
      hasInitialScrollOccurred: !props.value,
    };
  }

  static defaultProps = {
    s: 'medium',
    maxHeight: DEFAULT_MAX_HEIGHT,
    renderLoading: () => (
      <Flex justify="center" align="center" direction="column" height="100%">
        <LoadingSpinner s="medium" />
        <Box mt={2}>Loading...</Box>
      </Flex>
    ),
  };

  render() {
    const {
      name,
      error,
      s: size,
      label,
      loading,
      renderLoading,
      height,
      maxHeight,
      onChange,
      value,
      getOptionText,
    } = this.props;
    return (
      <Downshift
        onSelect={onChange}
        selectedItem={value}
        itemToString={selection => ''}
        stateReducer={(state, changes) => {
          if (changes.type === Downshift.stateChangeTypes.keyDownEscape) {
            this.element.blur();
            return changes;
          }

          if (
            changes.hasOwnProperty('isOpen') &&
            changes.type !== Downshift.stateChangeTypes.blurInput &&
            !changes.isOpen
          ) {
            return _.omit(changes, 'isOpen', 'highlightedIndex');
          }

          return changes;
        }}
      >
        {({ getInputProps, getItemProps, openMenu, selectedItem, highlightedIndex, setState: setDownshiftState }) => {
          const OptionInterface = createSelectOptionInterface<OptionValue>();
          const renderedChildren = this.props.children({
            SelectOption: OptionInterface,
            SelectGroup: SelectGroupInterface,
          });

          const performInitialScroll = (
            option: React.ReactElement<SelectOptionProps>,
            context: SelectOptionFactory<OptionValue>,
          ) => {
            if (option.props.selected && !this.state.hasInitialScrollOccurred) {
              setDownshiftState({ highlightedIndex: context.optionIndex }, () => {
                this.setState({ hasInitialScrollOccurred: true });
              });
            }
          };

          const optionFactory = new SelectOptionFactory({
            getItemProps,
            size,
            selectedItem,
            highlightedIndex,
            getOptionText,
            cb: performInitialScroll,
          });

          const groupFactory = new SelectGroupFactory({ size });

          const searchOptions = transformSelectOptions(renderedChildren, {
            OptionInterface,
            optionFactory,
            groupFactory,
          });

          return (
            <div>
              <Label id={getLabelId(name)} pb={2} pl={3} fontStyle="controls.m">
                {label}
              </Label>
              <SelectOptions
                elementRef={element => {
                  this.element = element;
                }}
                s={size}
                tabIndex={0}
                {...getInputProps({
                  onFocus: openMenu as any,
                  onClick: () => {
                    this.element.focus();
                  },
                })}
                role="listbox"
                position="static"
                maxHeight={!height && maxHeight}
                height={height}
                aria-describedby={error ? getErrorId(name) : undefined}
                aria-labelledby={getLabelId(name)}
                aria-loading={loading}
              >
                {loading ? renderLoading() : searchOptions}
              </SelectOptions>
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default OpenListSelect;

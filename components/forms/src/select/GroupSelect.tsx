import React, { Component, Fragment } from 'react';
import Downshift, { ControllerStateAndHelpers, StateChangeOptions } from 'downshift';

import { theme } from 'z-frontend-theme';

import Tethered from '../tethered/Tethered';
import { InputSize } from '../input/Input';
import InputWithIcon from '../input-with-icon/InputWithIcon';
import { SearchContainer, SearchHeader, SearchOption, SearchOptions } from '../search/SearchSelectDeprecated';
import { getErrorId, getLabelId } from '../formik/FormFieldWrapper';

const DownshiftComponent = Downshift as any;

type Option<OptionValue> = {
  label: string;
  value: OptionValue;
};

type OptionGroup<OptionValue> = {
  groupName: string;
  options: Option<OptionValue>[];
};

type FilterOptions<OptionValue> = (option: Option<OptionValue>, inputValue: string, groupName?: string) => boolean;

// Available on GroupSelect and Form.GroupSelect
export type SharedGroupSelectProps<OptionValue> = {
  /**
   * Human-friendly label for the input.
   * */
  groups: OptionGroup<OptionValue>[];
  /**
   * The name of the control, which is submitted with the control's
   * value as part of the form data.
   * */
  name: string;
  /**
   * Function to filter options using current input value
   * */
  filterOptions?: FilterOptions<OptionValue>;
  /**
   * Size of input
   * @default "medium"
   * */
  s?: InputSize;
  /**
   * Is the input disabled
   */
  disabled?: boolean;
  /**
   * Should used fixed position and position itself dynamically with js
   */
  isTethered?: boolean;
  /**
   * Max height for dropdown
   * @default 240
   */
  maxDropdownHeight?: string | number;
  /**
   * Placeholder text for input
   */
  placeholder?: string;
};

type GroupSelectComponentProps<OptionValue> = {
  error?: string;
  defaultValue?: Option<OptionValue>;
  onSelect?: (option: Option<OptionValue>) => void;
};

type GroupSelectProps<OptionValue> = SharedGroupSelectProps<OptionValue> & GroupSelectComponentProps<OptionValue>;

type GroupSelectState = {
  inputValue: string;
  editing: boolean;
};

const DEFAULT_MAX_HEIGHT = 240;

export class GroupSelect<OptionValue = any> extends Component<GroupSelectProps<OptionValue>, GroupSelectState> {
  constructor(props: GroupSelectProps<OptionValue>) {
    super(props);
    this.state = {
      inputValue: this.props.defaultValue ? this.props.defaultValue.label : '',
      editing: false,
    };
    this.tetherTarget = React.createRef<HTMLDivElement>();
  }

  tetherTarget: React.RefObject<HTMLDivElement>;

  static defaultProps = {
    s: 'medium',
    maxDropdownHeight: DEFAULT_MAX_HEIGHT,
    filterOptions(option: Option<any>, inputValue: string) {
      return inputValue ? option.label && option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 : true;
    },
  };

  filterGroups = (inputValue: string) =>
    this.props.groups
      .map((group: OptionGroup<OptionValue>) => ({
        ...group,
        options: group.options.filter(option => this.props.filterOptions(option, inputValue)),
      }))
      .filter((group: OptionGroup<OptionValue>) => group.options.length > 0);

  render() {
    const { name, error, s: size, isTethered, disabled, maxDropdownHeight, placeholder } = this.props;
    const { editing } = this.state;

    const groups = editing ? this.filterGroups(this.state.inputValue) : this.props.groups;

    return (
      <SearchContainer>
        <DownshiftComponent
          inputId={name}
          labelId={getLabelId(name)}
          inputValue={this.state.inputValue}
          itemToString={(item: Option<OptionValue>) => item && item.label}
          onStateChange={(
            changes: StateChangeOptions<Option<OptionValue>>,
            { setState: setDownshiftState }: ControllerStateAndHelpers<any>,
          ) => {
            const newState: Partial<GroupSelectState> = {};
            if (changes.hasOwnProperty('inputValue')) {
              Object.assign(newState, {
                editing: true,
                inputValue: changes.inputValue || '',
              });
            }

            if (changes.hasOwnProperty('isOpen') && !changes.isOpen) {
              newState.editing = false;
            }

            if (Object.keys(newState).length > 0) {
              this.setState(newState as GroupSelectState, () => {
                if (changes.selectedItem && this.props.onSelect) {
                  this.props.onSelect(changes.selectedItem);
                }
                if (changes.inputValue) {
                  setDownshiftState({ highlightedIndex: 0 });
                }
              });
            }
          }}
        >
          {({ getInputProps, getMenuProps, getItemProps, isOpen, openMenu, toggleMenu, highlightedIndex }: any) => {
            let itemIndex = 0;
            return (
              <div>
                <InputWithIcon
                  {...getInputProps({
                    disabled,
                    onMouseDown: toggleMenu,
                    onFocus: openMenu,
                  })}
                  name={name}
                  hasError={error}
                  aria-describedby={error ? getErrorId(name) : undefined}
                  s={size}
                  rightIconName={!disabled && 'chevron-down'}
                  placeholder={placeholder}
                />
                <div ref={this.tetherTarget} style={{ width: '100%' }} />
                {isOpen && (
                  <Tethered
                    containerProps={{ zIndex: theme.zIndex.dropdown }}
                    target={this.tetherTarget}
                    matchWidth
                    disabled={!this.props.isTethered}
                  >
                    <SearchOptions {...getMenuProps()} s={size} isTethered={isTethered} maxHeight={maxDropdownHeight}>
                      <div>
                        {groups.map(({ groupName, options }: OptionGroup<OptionValue>, i: number) => {
                          return (
                            <Fragment key={groupName}>
                              <SearchHeader s={size} mt={i > 0 ? 4 : 0}>
                                {groupName}
                              </SearchHeader>
                              {options.map((option: Option<OptionValue>) => {
                                const optionElement = (
                                  <SearchOption
                                    s="small"
                                    selected={itemIndex === highlightedIndex}
                                    {...getItemProps({
                                      index: itemIndex,
                                      key: JSON.stringify(option.value),
                                      item: option,
                                    })}
                                  >
                                    {option.label}
                                  </SearchOption>
                                );
                                itemIndex += 1;
                                return optionElement;
                              })}
                            </Fragment>
                          );
                        })}
                      </div>
                    </SearchOptions>
                  </Tethered>
                )}
              </div>
            );
          }}
        </DownshiftComponent>
      </SearchContainer>
    );
  }
}

export default GroupSelect;

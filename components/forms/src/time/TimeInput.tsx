import React, { Component } from 'react';
// @ts-ignore
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';
import { padEnd } from 'lodash';
import moment from 'moment';

import { theme } from 'z-frontend-theme';

import { FixedHeightSearchOption, SearchContainer, SearchOptions } from '../search/SearchSelectDeprecated';
import InputWithIcon from '../input-with-icon/InputWithIcon';
import { getErrorId, getLabelId } from '../formik/FormFieldWrapper';
import Tethered from '../tethered/Tethered';

const DAILY_MINUTES = 60 * 24;
const NUM_TIME_OPTIONS = 7;
const ENTER_KEYCODE = 13;

export type Time = {
  hours: number;
  minutes: number;
};

const DownshiftComponent = Downshift as any;

const minutesToTime = (minutes: number): Time => {
  if (minutes < 0 || minutes >= DAILY_MINUTES) {
    throw new Error(`minutesToTime must be greater or equal to than 0 and less than ${DAILY_MINUTES}`);
  }
  return {
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60,
  };
};

const timeToMinutes = (time: Time) => time.hours * 60 + time.minutes;

export const getTimes = (interval: number): Time[] => {
  let currentTime = 0;
  const times = [];
  while (currentTime < DAILY_MINUTES) {
    times.push(minutesToTime(currentTime));
    currentTime += interval;
  }
  return times;
};

export const parseTimeString = (rawTimeString: string): Time | null => {
  if (!rawTimeString) {
    return null;
  }

  let timeString;
  if (
    rawTimeString.indexOf(':') !== -1 &&
    rawTimeString.split(':')[1].length < 2 &&
    Number(rawTimeString.split(':')[1]) !== NaN
  ) {
    const [hours, minutes] = rawTimeString.split(':');
    timeString = `${hours}:${padEnd(minutes, 2, '0')}`;
  } else {
    timeString = rawTimeString;
  }
  const formats = ['LT', 'H', 'ha', 'Hmm', 'hmma', 'H:mm', 'h:mma', 'h:mm a'];
  const parsed = moment(timeString, formats, true);
  if (!parsed.isValid()) {
    return null;
  } else {
    return {
      hours: parsed.get('hours'),
      minutes: parsed.get('minutes'),
    };
  }
};

type ClosestTimeIndex = {
  valid: boolean;
  closestTimeIndex?: number;
  match?: boolean;
};

export const getClosestTimeIndex = (time: Time, interval: number): ClosestTimeIndex => {
  if (time) {
    const minutes = timeToMinutes(time);
    return {
      closestTimeIndex: Math.floor(minutes / interval),
      match: minutes % interval === 0,
      valid: true,
    };
  } else {
    return { valid: false };
  }
};

// These props will be available on public Form Field Component
export type PublicTimeInputProps = {
  /**
   * The name of the control, which is submitted with the control's
   * value as part of the form data.
   * */
  name: string;
  /**
   * How far apart (in min) time options will be
   * @default 30
   *  */
  interval?: number;

  /**
   * Should this field be disabled?
   *  */
  disabled?: boolean;

  /**
   * Should dynamic positioning be disabled (useful for tests)
   *  */
  disableTethering?: boolean;
};

// These field are used internally and not part of public FormTimeInput API
type ComponentTimeInputProps = {
  initialInputValue?: string;
  defaultHighlightTime?: Time;
  error?: string;
  onChange?: (timeString: string, parsedTime?: Time | null) => void;
};

type TimeInputProps = PublicTimeInputProps & ComponentTimeInputProps;

type TimeInputState = {
  scrollIndex: number;
  isTimeValid: boolean;
};

type PartialStateChangeOptions = Partial<StateChangeOptions<string>>;

const OPTION_SIZE = theme.heights['small'];

class TimeInput extends Component<TimeInputProps, TimeInputState> {
  static defaultProps = {
    interval: 30,
  };
  private times: Time[];
  private scrollContainer: React.RefObject<HTMLDivElement>;
  private inputElement: React.RefObject<HTMLInputElement>;
  private tetherTarget: React.RefObject<HTMLDivElement>;

  static scrollContainerStyles: React.CSSProperties = {
    height: OPTION_SIZE * NUM_TIME_OPTIONS,
    overflowY: 'scroll',
  };

  constructor(props: TimeInputProps) {
    super(props);
    this.times = getTimes(props.interval);
    this.state = {
      scrollIndex: -1,
      isTimeValid: true,
    };
    this.scrollContainer = React.createRef<HTMLDivElement>();
    this.inputElement = React.createRef<HTMLInputElement>();
    this.tetherTarget = React.createRef<HTMLDivElement>();
  }

  processInputValue = (changes: PartialStateChangeOptions): PartialStateChangeOptions => {
    const inputTime = parseTimeString(changes.inputValue);
    const timeToHightlight = inputTime || this.props.defaultHighlightTime;
    const closestTime = getClosestTimeIndex(timeToHightlight, this.props.interval);
    if (closestTime.valid) {
      this.setState({
        scrollIndex: closestTime.closestTimeIndex,
      });
    }
    // Case 1: If user inputs 11:53, no highlight
    // Case 2: If user does not provide any input and the current time is 11:53, highlighted time will be 11:30
    // Case 3: If user inputs 11:30 and the current time is 11:53, highlighted time will be 11:30
    if (!inputTime || closestTime.match) {
      return {
        ...changes,
        highlightedIndex: closestTime.closestTimeIndex,
      };
    } else {
      return {
        ...changes,
        highlightedIndex: null,
      };
    }
  };

  componentDidUpdate(prevProps: TimeInputProps, prevState: TimeInputState) {
    const numPrecedingOptions = Math.floor(NUM_TIME_OPTIONS / 2);
    const scrollPixels = Math.max(OPTION_SIZE * (this.state.scrollIndex - numPrecedingOptions), 0);
    if (this.scrollContainer.current) {
      this.scrollContainer.current.scrollTop = scrollPixels;
    }
  }

  timeStateReducer = (
    timeState: DownshiftState<string>,
    changes: StateChangeOptions<string>,
  ): PartialStateChangeOptions => {
    if (changes.selectedItem) {
      const parsedTime = parseTimeString(changes.selectedItem);
      this.props.onChange && this.props.onChange(changes.selectedItem, parsedTime);
    }

    if (changes.type === Downshift.stateChangeTypes.changeInput) {
      return this.processInputValue(changes);
    }

    return changes;
  };

  formatTime = (time: Time) => moment(time).format('LT');

  render() {
    const { name, error, disabled, initialInputValue, disableTethering } = this.props;
    return (
      <SearchContainer>
        <DownshiftComponent
          stateReducer={this.timeStateReducer}
          initialInputValue={initialInputValue}
          initialSelectedItem={initialInputValue}
          inputId={name}
          labelId={getLabelId(name)}
        >
          {({
            setState: setDownshiftState,
            getInputProps,
            getMenuProps,
            isOpen,
            openMenu,
            getItemProps,
            highlightedIndex,
            inputValue,
          }: any) => {
            const submitCustom = () => {
              const parsedTime = parseTimeString(inputValue);
              if (parsedTime) {
                setDownshiftState({
                  inputValue: this.formatTime(parsedTime),
                  selectedItem: this.formatTime(parsedTime),
                  isOpen: false,
                });
              } else {
                setDownshiftState({
                  isOpen: false,
                  selectedItem: inputValue,
                });
              }
            };

            const downshiftInputProps = getInputProps({ disabled });

            return (
              <div>
                <InputWithIcon
                  {...downshiftInputProps}
                  elementRef={this.inputElement}
                  name={name}
                  disabled={disabled}
                  leftIconName="time"
                  rightIconName={isOpen ? 'chevron-up' : 'chevron-down'}
                  onRightIconMouseDown={
                    isOpen
                      ? () => {}
                      : e => {
                          e.preventDefault();
                          if (this.inputElement.current === document.activeElement) {
                            openMenu();
                          } else {
                            this.inputElement.current.focus();
                          }
                        }
                  }
                  hasError={error}
                  onFocus={e => {
                    e.target.select();
                    setDownshiftState({
                      ...this.processInputValue({ inputValue: e.target.value }),
                      isOpen: true,
                    });
                  }}
                  onKeyDown={e => {
                    downshiftInputProps.onKeyDown(e);
                    if (e.keyCode === ENTER_KEYCODE && inputValue && !highlightedIndex) {
                      submitCustom();
                      (e.target as any).blur();
                    }
                  }}
                  onBlur={e => {
                    if (parseTimeString(inputValue)) {
                      submitCustom();
                    } else {
                      downshiftInputProps.onBlur(e);
                    }
                  }}
                  aria-describedby={error ? getErrorId(name) : undefined}
                />
                <div ref={this.tetherTarget} style={{ width: '100%' }} />
                {isOpen && (
                  <Tethered
                    containerProps={{ zIndex: theme.zIndex.dropdown }}
                    target={this.tetherTarget}
                    matchWidth
                    disabled={disableTethering}
                  >
                    <SearchOptions {...getMenuProps()} s="small" isTethered={!disableTethering}>
                      <div style={TimeInput.scrollContainerStyles} ref={this.scrollContainer}>
                        {this.times.map((time: Time, index) => (
                          <FixedHeightSearchOption
                            selected={index === highlightedIndex}
                            {...getItemProps({
                              index,
                              key: index,
                              item: this.formatTime(time),
                            })}
                          >
                            {this.formatTime(time)}
                          </FixedHeightSearchOption>
                        ))}
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

export default TimeInput;

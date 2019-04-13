import React, { Component } from 'react';
import { RangeModifier } from 'react-day-picker/types/common';
import moment from 'moment';

import { Button, ButtonDropdown } from 'z-frontend-elements';
import { styled } from 'z-frontend-theme';
import { space } from 'z-frontend-theme/utils';

import WeekPicker from './WeekPicker';
import { getWeekRange } from './utils';

export type WeekSelectHandler = (dateRange: RangeModifier) => void;

interface WeekPickerDropdownProps {
  /**
   * Event handler when a new week is selected.
   */
  onWeekSelect?: WeekSelectHandler;

  /**
   * The day to use as first day of the week, starting from 0 (Sunday) to 6 (Saturday).
   * @default 0
   */
  firstDayOfWeek?: number;

  /**
   * The week that is selected.
   * @default new Date()
   */
  selectedWeek?: Date;
}

interface WeekPickerDropdownState {
  dropdownOpen: boolean;
}

const StyledButton = styled(Button)`
  min-width: ${space(7)};
`;

/**
 * A controlled button-dropdown component for selecting a week.
 */
class WeekPickerDropdown extends Component<WeekPickerDropdownProps, WeekPickerDropdownState> {
  static defaultProps = {
    onWeekChange: () => {},
    firstDayOfWeek: 0,
    selectedWeek: new Date(),
  };

  constructor(props: WeekPickerDropdownProps) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  getDatesDisplay = ({ from: fromDate, to: toDate }: RangeModifier) => {
    const formatString = 'MMM D';
    const from = moment(fromDate).format(formatString);
    const to = moment(toDate).format(formatString);
    return { from, to };
  };

  onDayClick = (day: Date, week: RangeModifier) => {
    // Close the dropdown
    this.setState({ dropdownOpen: false });

    const selectedWeek = this.props.selectedWeek;
    if (selectedWeek >= week.from && selectedWeek <= week.to) {
      return;
    }

    // Call onWeekSelect
    this.props.onWeekSelect(week);
  };

  toggleDropdown = (open?: boolean) => {
    this.setState((prevState: WeekPickerDropdownState) => {
      if (open === prevState.dropdownOpen) {
        return prevState;
      }
      return { dropdownOpen: open === undefined ? !prevState.dropdownOpen : open };
    });
  };

  handleButtonClick = () => {
    this.toggleDropdown();
  };

  render() {
    const { firstDayOfWeek, selectedWeek } = this.props;
    const { dropdownOpen } = this.state;

    const weekRange: RangeModifier = getWeekRange({ firstDayOfWeek, date: selectedWeek });
    const datesDisplay: { from: string; to: string } = this.getDatesDisplay(weekRange);

    return (
      <ButtonDropdown
        target={
          <StyledButton>
            {datesDisplay.from} - {datesDisplay.to}
          </StyledButton>
        }
        open={dropdownOpen}
        closeOnPopperClick={false}
        onTargetClick={() => this.handleButtonClick()}
        onOuterAction={() => this.toggleDropdown(false)}
        onPressEsc={() => this.toggleDropdown(false)}
      >
        <WeekPicker
          selectedWeek={selectedWeek}
          initialMonth={selectedWeek}
          onDayClick={this.onDayClick}
          firstDayOfWeek={firstDayOfWeek}
        />
      </ButtonDropdown>
    );
  }
}

export default WeekPickerDropdown;

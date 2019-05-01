import React, { Component } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import WeekPickerDropdown, { WeekSelectHandler } from './WeekPickerDropdown';

// Use this for initialMonth so that the snapshots will not change to different months
const dateString = '2018-07-17T03:24:00';
const date = new Date(dateString);

interface DefaultWeekPickerDropdownProps {}

interface DefaultWeekPickerDropdownState {
  selectedWeek: Date;
}

class DefaultWeekPickerDropdown extends Component<DefaultWeekPickerDropdownProps, DefaultWeekPickerDropdownState> {
  constructor(props: DefaultWeekPickerDropdownProps) {
    super(props);
    this.state = {
      selectedWeek: date,
    };
  }

  weekSelectHandler: WeekSelectHandler = dateRange => {
    this.setState({ selectedWeek: dateRange.from });
    action('onWeekSelect')(dateRange);
  };

  render() {
    const { selectedWeek } = this.state;
    return <WeekPickerDropdown selectedWeek={selectedWeek} onWeekSelect={this.weekSelectHandler} />;
  }
}

storiesOf('forms|WeekPickerDropdown', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultWeekPickerDropdown />);

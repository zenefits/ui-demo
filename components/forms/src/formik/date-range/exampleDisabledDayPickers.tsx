import React from 'react';

import { Example } from 'z-frontend-storybook-config';

import { Form, FormDateRange } from '../../..';

type DayPickerOptions = {
  disabled?: boolean;
};

type ExampleConfig = {
  label: string;
  disabled?: boolean;
  startDatePickerOptions?: DayPickerOptions;
  endDatePickerOptions?: DayPickerOptions;
};

const examplesConfigs: ExampleConfig[] = [
  {
    label: 'Fully disabled',
    disabled: true,
  },
  {
    label: 'Start date disabled',
    startDatePickerOptions: { disabled: true },
  },
  {
    label: 'End date disabled',
    endDatePickerOptions: { disabled: true },
  },
];

export default () => (
  <>
    {examplesConfigs.map(config => {
      const { label, ...inputConfig } = config;
      return (
        <Example label={config.label} key={config.label}>
          <Form onSubmit={() => {}} initialValues={{ dateRange: FormDateRange.getEmptyValue() }}>
            <FormDateRange name="dateRange" label="Date Range" {...inputConfig} />
          </Form>
        </Example>
      );
    })}
  </>
);

import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form, FormProps, FormSimpleSelect } from '../../..';
import { SharedSimpleSelectProps } from '../../select/SimpleSelect';

const commonFormProps = {
  onSubmit: () => {},
  validationSchema: {
    entree: Form.Yup.string()
      .nullable(true)
      .required(),
  },
};

const optionListStrings = ['Chicken', 'Beef', 'Fish', 'Tofu'];

type OptionValue = string;

const ExampleWithStringValues = (selectProps?: Partial<SharedSimpleSelectProps<OptionValue>>) => (
  <Form initialValues={{ entree: 'Tofu' }} {...commonFormProps}>
    <FormSimpleSelect<OptionValue> name="entree" label="Entree" getOptionText={o => o} {...selectProps}>
      {({ SelectOption }) => optionListStrings.map(option => <SelectOption key={option} option={option} />)}
    </FormSimpleSelect>
  </Form>
);

type OptionValue2 = { id: number; label: string };

const optionListObjects = [
  { id: 0, label: 'Chicken' },
  { id: 1, label: 'Beef' },
  { id: 2, label: 'Fish' },
  { id: 3, label: 'Tofu' },
];

const ExampleWithObjectValues = (formProps?: Partial<FormProps<any>>) => (
  // @ts-ignore
  <Form {...commonFormProps} {...formProps}>
    <FormSimpleSelect<OptionValue2> name="entree" label="Entree" getOptionText={o => o.label}>
      {({ SelectOption }) => optionListObjects.map(option => <SelectOption key={option.id} option={option} />)}
    </FormSimpleSelect>
  </Form>
);

// see also common tests under FormComponents.test.tsx (eg show label, show required validation)
describe('Form.SimpleSelect', () => {
  afterEach(cleanup);

  describe('shows correct options', () => {
    it('string values', () => {
      const wrapper = renderWithContext(<ExampleWithStringValues />);
      const options = wrapper.container.querySelectorAll('option');
      const opts = Array.from(options);
      expect(opts.map(option => option.getAttribute('value'))).toEqual(['', 'Chicken', 'Beef', 'Fish', 'Tofu']);
      expect(opts.map(option => option.text)).toEqual(['Select Option', 'Chicken', 'Beef', 'Fish', 'Tofu']);
    });

    it('object values without initialValues', () => {
      const wrapper = renderWithContext(<ExampleWithObjectValues />);
      const options = wrapper.container.querySelectorAll('option');
      const opts = Array.from(options);
      expect(opts.map(option => option.getAttribute('value'))).toEqual([
        'null',
        '{"id":0,"label":"Chicken"}',
        '{"id":1,"label":"Beef"}',
        '{"id":2,"label":"Fish"}',
        '{"id":3,"label":"Tofu"}',
      ]);
      expect(opts.map(option => option.text)).toEqual(['Select Option', 'Chicken', 'Beef', 'Fish', 'Tofu']);
    });

    it('object values with initialValues', () => {
      const wrapper = renderWithContext(<ExampleWithObjectValues initialValues={{ entree: 3 }} />);
      const options = wrapper.container.querySelectorAll('option');
      const opts = Array.from(options);
      expect(opts.map(option => option.getAttribute('value'))).toEqual([
        'null',
        '{"id":0,"label":"Chicken"}',
        '{"id":1,"label":"Beef"}',
        '{"id":2,"label":"Fish"}',
        '{"id":3,"label":"Tofu"}',
      ]);
      expect(opts.map(option => option.text)).toEqual(['Select Option', 'Chicken', 'Beef', 'Fish', 'Tofu']);
    });
  });
});

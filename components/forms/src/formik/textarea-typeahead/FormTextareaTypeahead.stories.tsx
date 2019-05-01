import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';

const lotrSuggestions = [
  'Frodo',
  'Gollum',
  'Aragorn',
  'Sam',
  'Legolas',
  'Gimli',
  'Sauron',
  'Gandalf',
  'Merry',
  'Pippin',
  'Radagast',
  'Elrond',
  'Shire',
  'Rohan',
  'Boromir',
  'Gondor',
];

storiesOf('forms|Form.TextareaTypeahead', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <Form onSubmit={() => {}} initialValues={{}}>
      <Form.TextareaTypeahead
        name="story"
        label="Lord of the Rings story"
        onChange={action('input value changed')}
        onSelect={action('option selected')}
      >
        {({ SelectOption, currentWordFilter }) =>
          currentWordFilter(lotrSuggestions, 1).map(option => <SelectOption key={option} option={option} />)
        }
      </Form.TextareaTypeahead>
    </Form>
  ))
  .add(
    'with external reset',
    () => (
      <Form onSubmit={() => {}} initialValues={{ story: 'Once upon a time...' }}>
        {({ setFieldValue }) => (
          <>
            <Form.TextareaTypeahead
              name="story"
              label="Lord of the Rings story"
              onChange={action('input value changed')}
              onSelect={action('option selected')}
            >
              {({ SelectOption, currentWordFilter }) =>
                currentWordFilter(lotrSuggestions, 1).map(option => <SelectOption key={option} option={option} />)
              }
            </Form.TextareaTypeahead>
            <Button
              onClick={() => {
                setFieldValue('story', 'Once upon a time...');
              }}
            >
              Reset
            </Button>
          </>
        )}
      </Form>
    ),
    skipVisualTest,
  );

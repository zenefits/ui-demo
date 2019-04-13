import React, { StatelessComponent } from 'react';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { setViewports } from 'z-frontend-app-bootstrap';
import { Box, Flex, TextBlock } from 'zbase';
import { styled, HideFor } from 'z-frontend-theme';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';

const tileOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'N/A'];
const proteins = ['Chicken', 'Beef', 'Tofu', 'Pork'];

const tileOptionsWithLabels = [
  { value: '1', label: 'Poor performance' },
  { value: '2', label: 'Insufficient performance' },
  { value: '3', label: 'Acceptable performance' },
  { value: '4', label: 'Solid performance' },
  { value: '5', label: 'Outstandingly exceeds job performance always and forever' },
  { value: 'N/A' },
];

const LabelTextBlock = styled(TextBlock)`
  text-align: center;

  @media (max-width: ${(props: any) => props.theme.breakpoints[0]}em) {
    text-align: left;
  }
`;

const LabelledRatingTile: StatelessComponent<{ rating: string; label: string }> = ({ rating, label }) => (
  <Flex
    px={[4, 2]}
    align="center"
    direction={['row', 'column']}
    justify={label ? 'flex-start' : 'center'}
    height="100%"
  >
    <TextBlock fontStyle="controls.s" color="text.light" textAlign="center">
      {rating}
    </TextBlock>
    {label && (
      <LabelTextBlock fontStyle="paragraphs.s" mt={[0, 2]} pl={[4, 0]}>
        {label}
      </LabelTextBlock>
    )}
  </Flex>
);

storiesOf('forms|Form.CustomTileInputGroup', module)
  .addDecorator((getStory: Function) => (
    <Flex p={20} align-items="start">
      <Box w={[1, 1 / 2]} mr={4}>
        {getStory()}
      </Box>
    </Flex>
  ))
  .addDecorator(withViewport())
  .add('Radios', () => (
    <Form onSubmit={() => {}} initialValues={{ radio: '1' }}>
      <Form.CustomTileInputGroup>
        {CustomTileInput =>
          tileOptions.map(option => <CustomTileInput name="radio" value={option} label={option} key={option} />)
        }
      </Form.CustomTileInputGroup>
    </Form>
  ))
  .add('Checkbox', () => (
    <Form onSubmit={() => {}} initialValues={{ Chicken: false, Beef: false, Tofu: false, Pork: true }}>
      <Form.CustomTileInputGroup isCheckbox>
        {CustomTileInput =>
          proteins.map(option => <CustomTileInput name={option} value={option} label={option} key={option} />)
        }
      </Form.CustomTileInputGroup>
    </Form>
  ))
  .add('Custom render - performance rating', () => (
    <Form onSubmit={() => {}} initialValues={{ radio: '1' }}>
      <Form.CustomTileInputGroup stackMobileVertically>
        {CustomTileInput =>
          tileOptionsWithLabels.map(option => (
            <CustomTileInput name="radio" value={option.value} label={option.label} key={option.value}>
              <LabelledRatingTile rating={option.value} label={option.label} />
            </CustomTileInput>
          ))
        }
      </Form.CustomTileInputGroup>
    </Form>
  ))
  .add(
    'Mobile',
    () => (
      <Form onSubmit={() => {}} initialValues={{ horizontal: '1', vertical: '2' }}>
        <Form.CustomTileInputGroup>
          {CustomTileInput =>
            tileOptions.map(option => <CustomTileInput name="horizontal" label={option} value={option} key={option} />)
          }
        </Form.CustomTileInputGroup>
        <Form.CustomTileInputGroup stackMobileVertically>
          {CustomTileInput =>
            tileOptionsWithLabels.map(option => (
              <CustomTileInput name="vertical" value={option.value} label={option.label} key={option.value}>
                <LabelledRatingTile rating={option.value} label={option.label} />
              </CustomTileInput>
            ))
          }
        </Form.CustomTileInputGroup>
      </Form>
    ),
    setViewports([0]),
  )
  .add('With external labels', () => (
    <Form onSubmit={() => {}} initialValues={{ radio: '1' }}>
      <Form.CustomTileInputGroup firstInputLabel="Poor performance" lastInputLabel="Exceptional performance">
        {CustomTileInput =>
          tileOptions.map(option => <CustomTileInput label={option} name="radio" value={option} key={option} />)
        }
      </Form.CustomTileInputGroup>
    </Form>
  ))
  .add(
    'With external labels varying in mobile',
    () => {
      const firstInputLabel = (
        <Box>
          <HideFor breakpoints={[false, true, true, true, true]}>Poor</HideFor>
          <HideFor breakpoints={[true, false, false, false, false]}>Poor performance</HideFor>
        </Box>
      );

      const lastInputLabel = (
        <Box>
          Exceptional <HideFor breakpoints={[true, false, false, false, false]}>performance</HideFor>
        </Box>
      );
      return (
        <Form onSubmit={() => {}} initialValues={{ radio: '1' }}>
          <Form.CustomTileInputGroup firstInputLabel={firstInputLabel} lastInputLabel={lastInputLabel}>
            {CustomTileInput =>
              tileOptions.map(option => <CustomTileInput label={option} name="radio" value={option} key={option} />)
            }
          </Form.CustomTileInputGroup>
        </Form>
      );
    },
    setViewports([0]),
  )
  .add('With sentence label', () => (
    <Form onSubmit={() => {}} initialValues={{ radio: '1' }}>
      <TextBlock color="text.dark" mb={4} fontStyle="paragraphs.l">
        How effective of a leader is this person?
      </TextBlock>
      <Form.CustomTileInputGroup stackMobileVertically>
        {CustomTileInput =>
          tileOptionsWithLabels.map(option => (
            <CustomTileInput name="radio" value={option.value} label={option.label} key={option.value}>
              <LabelledRatingTile rating={option.value} label={option.label} />
            </CustomTileInput>
          ))
        }
      </Form.CustomTileInputGroup>
    </Form>
  ))
  .add('With field label', () => (
    <Form onSubmit={() => {}} initialValues={{ radio: '1', radio2: '2' }}>
      <Form.CustomTileInputGroup label="Rating" stackMobileVertically>
        {CustomTileInput =>
          tileOptions
            .slice(0, 5)
            .map(option => <CustomTileInput name="radio" value={option} label={option} key={option} />)
        }
      </Form.CustomTileInputGroup>
    </Form>
  ));

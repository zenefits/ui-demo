import React, { StatelessComponent } from 'react';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { setViewports } from 'z-frontend-app-bootstrap';
import { Box, Flex, TextBlock } from 'zbase';
import { styled, Hide } from 'z-frontend-theme';
import { Button } from 'z-frontend-elements';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormCustomTileInputGroup } from '../../..';

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

storiesOf('forms|FormCustomTileInputGroup', module)
  .addDecorator((getStory: Function) => (
    <Flex p={20} align-items="start">
      <Box w={[1, 1 / 2]} mr={4}>
        {getStory()}
      </Box>
    </Flex>
  ))
  .addDecorator(withViewport())
  .add('Radio with validation', () => <RadioWithValidation />)
  .add('Checkbox with validation', () => <CheckboxWithValidation />)
  .add('with nested initial value', () => (
    <Form onSubmit={() => {}} initialValues={{ nested: { proteins: ['Beef', 'Tofu'] } }}>
      <FormCustomTileInputGroup isCheckbox name="nested.proteins">
        {CustomTileInput => proteins.map(option => <CustomTileInput name={option} label={option} key={option} />)}
      </FormCustomTileInputGroup>
    </Form>
  ))
  .add('Custom render - performance rating', () => (
    <Form onSubmit={() => {}} initialValues={{ radio: '1' }}>
      <FormCustomTileInputGroup stackMobileVertically name="radio">
        {CustomTileInput =>
          tileOptionsWithLabels.map(option => (
            <CustomTileInput name="radio" value={option.value} label={option.label} key={option.value}>
              <LabelledRatingTile rating={option.value} label={option.label} />
            </CustomTileInput>
          ))
        }
      </FormCustomTileInputGroup>
    </Form>
  ))
  .add(
    'Mobile',
    () => (
      <Form onSubmit={() => {}} initialValues={{ horizontal: '1', vertical: '2' }}>
        <FormCustomTileInputGroup name="horizontal">
          {CustomTileInput =>
            tileOptions.map(option => <CustomTileInput name="horizontal" label={option} value={option} key={option} />)
          }
        </FormCustomTileInputGroup>
        <FormCustomTileInputGroup name="vertical" stackMobileVertically>
          {CustomTileInput =>
            tileOptionsWithLabels.map(option => (
              <CustomTileInput name="vertical" value={option.value} label={option.label} key={option.value}>
                <LabelledRatingTile rating={option.value} label={option.label} />
              </CustomTileInput>
            ))
          }
        </FormCustomTileInputGroup>
      </Form>
    ),
    setViewports([0]),
  )
  .add('With external labels', () => (
    <Form onSubmit={() => {}} initialValues={{ radio: '1' }}>
      <FormCustomTileInputGroup
        name="radio"
        firstInputLabel="Poor performance"
        lastInputLabel="Exceptional performance"
      >
        {CustomTileInput =>
          tileOptions.map(option => <CustomTileInput label={option} name="radio" value={option} key={option} />)
        }
      </FormCustomTileInputGroup>
    </Form>
  ))
  .add(
    'With external labels varying in mobile',
    () => {
      const firstInputLabel = (
        <Box>
          <Hide forBreakpoints={[false, true, true, true, true]}>Poor</Hide>
          <Hide forBreakpoints={[true, false, false, false, false]}>Poor performance</Hide>
        </Box>
      );

      const lastInputLabel = (
        <Box>
          Exceptional <Hide forBreakpoints={[true, false, false, false, false]}>performance</Hide>
        </Box>
      );
      return (
        <Form onSubmit={() => {}} initialValues={{ radio: '1' }}>
          <FormCustomTileInputGroup name="radio" firstInputLabel={firstInputLabel} lastInputLabel={lastInputLabel}>
            {CustomTileInput =>
              tileOptions.map(option => <CustomTileInput label={option} name="radio" value={option} key={option} />)
            }
          </FormCustomTileInputGroup>
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
      <FormCustomTileInputGroup name="radio" stackMobileVertically>
        {CustomTileInput =>
          tileOptionsWithLabels.map(option => (
            <CustomTileInput name="radio" value={option.value} label={option.label} key={option.value}>
              <LabelledRatingTile rating={option.value} label={option.label} />
            </CustomTileInput>
          ))
        }
      </FormCustomTileInputGroup>
    </Form>
  ))
  .add('With field label', () => (
    <Form onSubmit={() => {}} initialValues={{ radio: '1', radio2: '2' }}>
      <FormCustomTileInputGroup name="radio" label="Rating" stackMobileVertically>
        {CustomTileInput =>
          tileOptions
            .slice(0, 5)
            .map(option => <CustomTileInput name="radio" value={option} label={option} key={option} />)
        }
      </FormCustomTileInputGroup>
      <FormCustomTileInputGroup name="radio2" label="Label on Top" stackMobileVertically format="form-row-top-label">
        {CustomTileInput =>
          tileOptions
            .slice(0, 5)
            .map(option => <CustomTileInput name="radio2" value={option} label={option} key={option} />)
        }
      </FormCustomTileInputGroup>
    </Form>
  ));

const RadioWithValidation = () => (
  <Form
    initialValues={{ customer: { rating: '', recommend: '' } }}
    validationSchema={{
      customer: Form.Yup.object().shape({
        rating: Form.Yup.string().required('Required.'),
        recommend: Form.Yup.string().required('Required.'),
      }),
    }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
        console.log('values:', values);
      }, 500);
    }}
  >
    {props => (
      <>
        <FormCustomTileInputGroup label="Rating" format="form-row-top-label" name="customer.rating">
          {CustomTileInput =>
            tileOptions.map(option => (
              <CustomTileInput name="customer.rating" value={option} label={option} key={option} />
            ))
          }
        </FormCustomTileInputGroup>
        <FormCustomTileInputGroup label="Would you recommend?" format="form-row-top-label" name="customer.recommend">
          {CustomTileInput =>
            tileOptions.map(option => (
              <CustomTileInput name="customer.recommend" value={option} label={option} key={option} />
            ))
          }
        </FormCustomTileInputGroup>
        <Flex justify="flex-end" mt={4}>
          <Button type="submit" mode="primary" inProgress={props.isSubmitting}>
            Save
          </Button>
        </Flex>
      </>
    )}
  </Form>
);

const CheckboxWithValidation = () => (
  <Form
    initialValues={{ proteins: [] }}
    validationSchema={{
      proteins: Form.Yup.array().required('Please choose at least one.'),
    }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
        console.log('values:', values);
      }, 500);
    }}
  >
    {props => (
      <>
        <FormCustomTileInputGroup isCheckbox label="Proteins" format="form-row-top-label" name="proteins">
          {CustomTileInput => proteins.map(option => <CustomTileInput name={option} label={option} key={option} />)}
        </FormCustomTileInputGroup>
        <Flex justify="flex-end" mt={4}>
          <Button type="submit" mode="primary" inProgress={props.isSubmitting}>
            Save
          </Button>
        </Flex>
      </>
    )}
  </Form>
);

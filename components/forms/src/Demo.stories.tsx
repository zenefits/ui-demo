import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Radio Button', module)
  .add('default', () => <div />)
  .add('states', () => <div />);
storiesOf('DatePicker', module)
  .add('Date range', () => <div />)
  .add('Select date', () => <div />)
  .add('States', () => <div />);
storiesOf('Select', module)
  .add('Accessibility', () => <div />)
  .add('Typeahead', () => <div />)
  .add('States', () => <div />);
storiesOf('Slider', module)
  .add('Basic', () => <div />)
  .add('Dynamic range', () => <div />);
storiesOf('Toggle Button', module).add('Basic', () => <div />);
storiesOf('TextArea', module).add('Default', () => <div />);
storiesOf('Rating', module).add('Default', () => <div />);

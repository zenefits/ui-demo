import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonLink from './ButtonLink';

storiesOf('Button', module).add('ButtonLink', () => (
  <div>
    <h1>ButtonLink</h1>
    <p>ButtonLink is a link that looks like a button</p>
    <h3>Link to URL</h3>
    <ButtonLink to="/some/url">Go to some URL</ButtonLink>
    <pre>{'<ButtonLink to="/some/url">Go to some URL</ButtonLink>'}</pre>
    <h3>Link to a react-router route</h3>
    <pre>{'<ButtonLink is={Link} to="/some/:id">Go to some route</ButtonLink>'}</pre>
  </div>
));

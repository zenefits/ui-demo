import '@babel/polyfill';
import { Component } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Notification } from 'z-frontend-elements';
import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';
import { withDialog, DialogManager } from 'z-frontend-layout';
import { setEventProperties } from 'z-frontend-app-bootstrap';

import StorybookExample from './examples/StorybookExample';
import FigmaFile from './examples/FigmaFile';
// import images here that are referenced in md files
import './images/Live-agent-chat-example.gif';
import './images/Live-agent-chat-example-not-online.gif';
import './images/Live-agent-timeout-warning-banner.png';
// make common components available in all examples
// see also `context` in styleguide.config (which does not pollute global window)
declare const global: any;
global.Notification = Notification;
global.MemoryRouter = MemoryRouter; // used in various examples
global.Component = Component;
global.styled = styled;
global.color = color;
global.DialogManager = DialogManager;
global.withDialog = withDialog;
global.StorybookExample = StorybookExample;
global.FigmaFile = FigmaFile;

setEventProperties();

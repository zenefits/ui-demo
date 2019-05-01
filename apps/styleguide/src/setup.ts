import '@babel/polyfill';
import { Component, Fragment } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Notification } from 'z-frontend-elements';
import { images, styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';
import { withDialog, DialogManager } from 'z-frontend-layout';
import { setEventProperties } from 'z-frontend-app-bootstrap';

import ComponentStatus from './examples/ComponentStatus';
import ColorGuide from './examples/ColorGuide';
import IconGuide from './examples/IconGuide';
import TypographyGuide from './examples/TypographyGuide';
import ButtonGuide from './examples/ButtonGuide';
import SpacingGuide from './examples/SpacingGuide';
import BreakpointGuide from './examples/BreakpointGuide';
import DepthGuide from './examples/DepthGuide';
import RenderWithTheme from './components/RenderWithTheme';
import StorybookExample from './examples/StorybookExample';
import './images/Live-agent-chat-example.gif';
import './images/Live-agent-chat-example-not-online.gif';
import './images/Live-agent-timeout-warning-banner.png';
import './images/storybook-icon.png';
import './images/storybook-git.png';

// make common components available in all examples
declare const global: any;
global.ComponentStatus = ComponentStatus;
global.ColorGuide = ColorGuide;
global.IconGuide = IconGuide;
global.TypographyGuide = TypographyGuide;
global.SpacingGuide = SpacingGuide;
global.BreakpointGuide = BreakpointGuide;
global.ButtonGuide = ButtonGuide;
global.DepthGuide = DepthGuide;
global.RenderWithTheme = RenderWithTheme;
global.Notification = Notification;
global.MemoryRouter = MemoryRouter;
global.Component = Component;
global.Fragment = Fragment;
global.styled = styled;
global.color = color;
global.images = images;
global.DialogManager = DialogManager;
global.withDialog = withDialog;
global.StorybookExample = StorybookExample;

setEventProperties();

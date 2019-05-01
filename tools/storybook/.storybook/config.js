// @ts-check
import '@babel/polyfill';
import { configure } from '@storybook/react';

import loadStories from './loadStories';

configure(loadStories, module);

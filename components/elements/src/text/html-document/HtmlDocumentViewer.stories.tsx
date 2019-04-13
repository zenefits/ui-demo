import React from 'react';

import { Flex } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import Example from './exampleDefault';
import LoadingExample from './exampleLoading';
import InteractiveExample from './exampleInteractive';
import ExampleSetHeight from './exampleSetHeight';
import HtmlDocumentViewer from './HtmlDocumentViewer';

const html = `
<h1>Lorem Ipsum</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
`;

const DynamicExample = () => <HtmlDocumentViewer html={html} dynamicHeight />;

storiesOf('elements|HtmlDocumentViewer', module)
  .addDecorator((getStory: Function) => <Flex p={20}>{getStory()}</Flex>)
  .add('default', () => <Example />)
  .add('loading', () => <LoadingExample />)
  .add('interactive', () => <InteractiveExample />)
  .add('set height', () => <ExampleSetHeight />)
  .add('dynamic height', () => <DynamicExample />);

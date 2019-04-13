import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import MentionTextarea from './MentionTextarea';

const text = `Hey [@234], can you take a look at this? [@4321] and [@11] will review once you are done.
<p>I know that [@11] had concerns about the final section.
I suggest we review that part thoroughly to avoid issues later on down the road. Please keep me updated.</p>`;

const options = [
  {
    id: '234',
    menuLabel: 'Meghan Markle — marklesparkle@zenefits.com',
    tagLabel: 'Meghan',
  },
  {
    id: '11',
    menuLabel: 'Elizabeth Queen — thequeen@zenefits.com',
    tagLabel: 'Elizabeth',
  },
  {
    id: '237',
    menuLabel: 'Margaret Thoreau — mth@zenefits.com',
    tagLabel: 'Margaret',
  },
  {
    id: '4321',
    menuLabel: 'Juniper Stottle — juniper@zenefits.com',
    tagLabel: 'Juniper',
  },
  {
    id: '4322',
    menuLabel: 'June Stottle — june@zenefits.com',
    tagLabel: 'June',
  },
  {
    id: '4323',
    menuLabel: 'Jane Stottle — jane@zenefits.com',
    tagLabel: 'Jane',
  },
  {
    id: '4324',
    menuLabel: 'Jill Stottle — jill@zenefits.com',
    tagLabel: 'Jill',
  },
  {
    id: '4325',
    menuLabel: 'July Stottle — july@zenefits.com',
    tagLabel: 'July',
  },
];

storiesOf('forms|MentionTextarea', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <MentionTextarea defaultValue="" options={options} />)
  .add('lots of text', () => <MentionTextarea defaultValue={text} options={options} />)
  .add('no options', () => <MentionTextarea defaultValue="Hello world!" options={[]} />)
  .add('autofocus', () => <MentionTextarea autoFocus defaultValue="Hello world!" options={[]} />)
  .add('disabled', () => <MentionTextarea disabled defaultValue="Hello world!" options={[]} />)
  .add('error', () => <MentionTextarea hasError defaultValue={text} options={options} />);

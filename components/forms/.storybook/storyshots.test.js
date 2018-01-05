import initStoryshots from '@storybook/addon-storyshots';
import 'jest-styled-components';

initStoryshots({
  storyKindRegex: /^((?!.*?Inputs with mask).)*$/,
});

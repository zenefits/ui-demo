import React, { useState } from 'react';

import { Box, Flex } from 'zbase';
import { IconButton } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import UrlFilterPanel from './UrlFilterPanel';
import { GraphqlDataManagerWrapper, UrlFilters } from '../url-filters/UrlFilter.stories';

storiesOf('data-manager|UrlFilterPanel', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 900]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <UrlFilterPanelExample />);

const UrlFilterPanelExample: React.FunctionComponent = () => {
  const [isPanelVisible, togglePanel] = useState(true);

  return (
    <GraphqlDataManagerWrapper>
      <>
        <IconButton iconName="filter-list" onClick={() => togglePanel(!isPanelVisible)} mb={2}>
          Filter
        </IconButton>
        {/* NOTE: would typically be used in DataLayout */}
        <Flex direction={['column', 'row']}>
          <UrlFilterPanel
            width={300} // force long label wrap for visual testing
            isVisible={isPanelVisible}
            onClose={() => togglePanel(false)}
            mr={2}
          >
            <UrlFilters />
          </UrlFilterPanel>
        </Flex>
      </>
    </GraphqlDataManagerWrapper>
  );
};

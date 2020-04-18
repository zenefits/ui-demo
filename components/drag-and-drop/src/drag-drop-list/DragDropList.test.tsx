import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { Box } from 'zbase';

import DragDropList from './DragDropList';

const TwoLists = () => (
  <Box>
    <DragDropList.Context onDragEnd={() => {}}>
      <Box>
        <DragDropList.List listId="list1">
          <DragDropList.DraggableBox itemId="item1">Item 1</DragDropList.DraggableBox>
          <DragDropList.DraggableBox itemId="item2">Item 2</DragDropList.DraggableBox>
        </DragDropList.List>
      </Box>
      <Box>
        <DragDropList.List listId="list2">
          <DragDropList.DraggableBox itemId="item3">Item 3</DragDropList.DraggableBox>
          <DragDropList.DraggableBox itemId="item4">Item 4</DragDropList.DraggableBox>
        </DragDropList.List>
      </Box>
    </DragDropList.Context>
  </Box>
);

describe('DragDropList', () => {
  afterEach(cleanup);

  it('should render four items', () => {
    const wrapper = renderWithContext(<TwoLists />);
    wrapper.getByText('Item 1');
    wrapper.getByText('Item 2');
    wrapper.getByText('Item 3');
    wrapper.getByText('Item 4');
  });
});

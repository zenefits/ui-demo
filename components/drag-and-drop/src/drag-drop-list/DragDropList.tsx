import React from 'react';

import { Box, Flex } from 'zbase';

import { styled } from 'z-frontend-theme';

import { DragDropListContext } from './Context';
import { DroppableList } from './List';

interface DraggableProps {
  /**
   * ID of the item
   */
  itemId: string;
  /**
   * Whether drag is disabled. Default is false
   */
  isDragDisabled?: boolean;
  /**
   * Whether a draggable item is being actively dragged, or if it is drop animating
   */
  isDragging?: boolean;
}

// Make it a component so that styleguide can pick up documentation
class DragDropList extends React.Component<{}, {}> {
  static Context = DragDropListContext;

  static List = DroppableList;

  static DraggableBox = styled(Box)<DraggableProps>``;

  static DraggableFlex = styled(Flex)<DraggableProps>``;
}

export default DragDropList;

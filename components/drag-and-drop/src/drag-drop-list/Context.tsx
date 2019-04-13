import React, { Component } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export interface OnDragEndResult {
  sourceList: { id: string; index: number };
  targetList: { id: string; index: number };
  itemId: string;
  type: string;
}

interface DragDropListContextProps {
  /**
   * An event handler to be called when dragging ends
   */
  onDragEnd: (result: OnDragEndResult) => void;
}

export class DragDropListContext extends Component<DragDropListContextProps, {}> {
  onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;
    const args = {
      type,
      sourceList: {
        id: source.droppableId,
        index: source.index,
      },
      targetList: destination && {
        id: destination.droppableId,
        index: destination.index,
      },
      itemId: draggableId,
    };

    this.props.onDragEnd(args);
  };

  render() {
    return <DragDropContext onDragEnd={this.onDragEnd}>{this.props.children}</DragDropContext>;
  }
}

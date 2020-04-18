import React, { Component } from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';

import PortalAwareItem from './PortalAwareItem';

interface DroppableListProps {
  /**
   * ID of the list
   */
  listId: string;
  /**
   * Type of the list. An item can only be dropped into a list with the same type. Default type is 'DEFAULT'
   */
  type?: string;

  /**
   * If we have a `transform: *` on one of the parents of a draggable item, e.g. when you use DragDropList in a modal,
   * then the positioning logic will be incorrect while dragging. In those cases, we need to use portal.
   * More details in:
   * https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/patterns/using-a-portal.md
   */
  shouldUsePortal?: boolean;
}

export class DroppableList extends Component<DroppableListProps, {}> {
  render() {
    const { children, listId, type, shouldUsePortal } = this.props;
    return (
      <Droppable droppableId={listId} type={type}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {React.Children.map(children, (item: React.ReactElement<any>, index) => (
              <Draggable
                key={item.props.itemId}
                draggableId={item.props.itemId}
                index={index}
                isDragDisabled={item.props.isDragDisabled}
              >
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                  const itemElement = React.cloneElement(item, {
                    isDragging: snapshot.isDragging,
                  });
                  return (
                    <PortalAwareItem
                      {...item.props}
                      shouldUsePortal={shouldUsePortal}
                      draggableProvided={provided}
                      draggableSnapshot={snapshot}
                      itemElement={itemElement}
                    />
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

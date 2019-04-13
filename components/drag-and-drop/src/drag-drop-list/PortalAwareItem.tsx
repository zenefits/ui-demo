import React, { Component, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { DraggableProvided, DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

import { space } from 'z-frontend-theme/utils';
import { theme, APP_STYLE_ROOT_CLASS } from 'z-frontend-theme';

type ProvidedStyle = DraggingStyle | NotDraggingStyle;

const getItemStyle = (providedStyle: ProvidedStyle, mb: number) => ({
  margin: `0 0 ${mb ? space(mb)({ theme }) : 0} 0`,
  ...providedStyle,
});

type PortalAwareItemProps = {
  draggableProvided: DraggableProvided;
  draggableSnapshot: DraggableStateSnapshot;
  itemElement: ReactElement<any>;
  mb?: number;
  /**
   * Whether to put an element in a portal when the element is being dragged
   */
  shouldUsePortal?: boolean;
};

export default class PortalAwareItem extends Component<PortalAwareItemProps> {
  render() {
    const { draggableProvided, draggableSnapshot, itemElement, mb, shouldUsePortal } = this.props;

    const usePortal = shouldUsePortal && draggableSnapshot.isDragging;

    const child = (
      <div
        ref={draggableProvided.innerRef}
        {...draggableProvided.draggableProps}
        {...draggableProvided.dragHandleProps}
        style={getItemStyle(draggableProvided.draggableProps.style, mb)}
      >
        {itemElement}
      </div>
    );

    if (!usePortal) {
      return child;
    }

    const portal = __IS_STORYBOOK__ ? document.body : document.getElementsByClassName(APP_STYLE_ROOT_CLASS)[0];

    // if dragging - put the item in a portal
    return ReactDOM.createPortal(child, portal);
  }
}

import React, { Component } from 'react';

import { Box } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

import DragDropList from './DragDropList';
import { OnDragEndResult } from './Context';

const StyledDraggableBox = styled(DragDropList.DraggableBox)`
  background-color: ${props => (props.isDragging ? color('affirmation.b') : color('grayscale.g'))};
`;

interface DragDropListExampleProps {}

interface DragDropListExampleState {
  top: string[];
  bottom: string[];
}

type ListId = 'top' | 'bottom';

class DragDropListExample extends Component<DragDropListExampleProps, DragDropListExampleState> {
  constructor(props: DragDropListExampleProps) {
    super(props);

    this.state = {
      top: ['Item 1', 'Item 2'],
      bottom: ['Item 3', 'Item 4'],
    };
  }

  onDragEnd = (result: OnDragEndResult) => {
    const { sourceList, targetList } = result;

    // Item is dropped outside a list
    if (!targetList) {
      return;
    }

    if (sourceList.id === targetList.id) {
      // Item is dropped in the same list
      // reordering
      const listId = sourceList.id as ListId;
      this.setState((prevState: DragDropListExampleState) => {
        const list = prevState[listId];
        const newList = Array.from(list);
        const [removed] = newList.splice(sourceList.index, 1);
        newList.splice(targetList.index, 0, removed);
        const result = { ...prevState, [listId]: newList };
        return result;
      });
    } else {
      // Item is dropped in a different list
      this.setState((prevState: DragDropListExampleState) => {
        const sourceListContent = prevState[sourceList.id as ListId];
        const sourceListClone = Array.from(sourceListContent);
        const targetListContent = prevState[targetList.id as ListId];
        const targetListClone = Array.from(targetListContent);

        const [removed] = sourceListClone.splice(sourceList.index, 1);
        targetListClone.splice(targetList.index, 0, removed);

        const result = { ...prevState, [sourceList.id]: sourceListClone, [targetList.id]: targetListClone };
        return result;
      });
    }
  };

  render() {
    const { top, bottom } = this.state;

    return (
      <Box>
        <DragDropList.Context onDragEnd={this.onDragEnd}>
          <Box mb={3}>
            <DragDropList.List listId="top">
              {top.map((item, index) => {
                return (
                  <StyledDraggableBox key={index} itemId={item} border borderColor="affirmation.b" p={2}>
                    {item}
                  </StyledDraggableBox>
                );
              })}
            </DragDropList.List>
          </Box>
          <Box>
            <DragDropList.List listId="bottom">
              {bottom.map((item, index) => {
                return (
                  <StyledDraggableBox key={index} itemId={item} border borderColor="affirmation.b" p={2}>
                    {item}
                  </StyledDraggableBox>
                );
              })}
            </DragDropList.List>
          </Box>
        </DragDropList.Context>
      </Box>
    );
  }
}

export default () => <DragDropListExample />;

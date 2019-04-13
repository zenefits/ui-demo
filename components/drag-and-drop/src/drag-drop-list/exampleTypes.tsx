import React, { Component } from 'react';

import { Box } from 'zbase';

import DragDropList from './DragDropList';
import { OnDragEndResult } from './Context';

interface DragDropListExampleProps {}

interface DragDropListExampleState {
  engineerTeam1: string[];
  productTeam1: string[];
  engineerTeam2: string[];
  productTeam2: string[];
}

type ListId = 'engineerTeam1' | 'productTeam1' | 'engineerTeam2' | 'productTeam2';

class DragDropListExample extends Component<DragDropListExampleProps, DragDropListExampleState> {
  constructor(props: DragDropListExampleProps) {
    super(props);

    this.state = {
      engineerTeam1: ['Engineer 1', 'Engineer 2'],
      productTeam1: ['PM 1', 'PM 2'],
      engineerTeam2: ['Engineer 3', 'Engineer 4'],
      productTeam2: ['PM 3', 'PM 4'],
    };
  }

  typeMap = {
    engineerTeam1: 'engineer',
    productTeam1: 'product',
    engineerTeam2: 'engineer',
    productTeam2: 'product',
  };

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
    return (
      <Box>
        <DragDropList.Context onDragEnd={this.onDragEnd}>
          {Object.keys(this.state).map((listId: ListId) => {
            return (
              <Box key={listId} mb={3}>
                <DragDropList.List listId={listId} type={this.typeMap[listId]}>
                  {this.state[listId].map((item, index) => {
                    return (
                      <DragDropList.DraggableBox key={index} itemId={item} border borderColor="affirmation.b" p={2}>
                        {item}
                      </DragDropList.DraggableBox>
                    );
                  })}
                </DragDropList.List>
              </Box>
            );
          })}
        </DragDropList.Context>
      </Box>
    );
  }
}

export default () => <DragDropListExample />;

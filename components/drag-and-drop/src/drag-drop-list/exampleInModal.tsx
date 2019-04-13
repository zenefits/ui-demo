import React, { Component } from 'react';

import { Box, Button } from 'zbase';
import { DialogManager, Modal } from 'z-frontend-overlays';

import DragDropList from './DragDropList';
import { OnDragEndResult } from './Context';

type DragDropListExampleProps = {};

type Item = {
  id: string;
  content: string;
};

type DragDropListExampleState = {
  items: Item[];
};

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result as Item[];
};

// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (v, i) => i).map(i => ({
    id: `item-${i}`,
    content: `item ${i}`,
  }));

class DragDropListExample extends Component<DragDropListExampleProps, DragDropListExampleState> {
  constructor(props: DragDropListExampleProps) {
    super(props);

    this.state = {
      items: getItems(10),
    };
  }

  onDragEnd = (result: OnDragEndResult) => {
    const { sourceList, targetList } = result;

    // dropped outside the list
    if (!targetList) {
      return;
    }

    const items: Item[] = reorder(this.state.items, sourceList.index, targetList.index);

    this.setState({
      items,
    });
  };

  render() {
    return (
      <DialogManager
        render={({ isVisible, open, close }) => {
          const modalProps = { isVisible, title: 'Modal Title', onCancel: close };
          return (
            <>
              <Modal {...modalProps}>
                <Modal.Body>
                  <DragDropList.Context onDragEnd={this.onDragEnd}>
                    <Box mb={3}>
                      <DragDropList.List listId="inModalList" shouldUsePortal>
                        {this.state.items.map((item: Item) => {
                          return (
                            <DragDropList.DraggableBox
                              key={item.id}
                              itemId={item.id}
                              border
                              borderColor="affirmation.b"
                              p={2}
                              mb={2}
                            >
                              {item.content}
                            </DragDropList.DraggableBox>
                          );
                        })}
                      </DragDropList.List>
                    </Box>
                  </DragDropList.Context>
                </Modal.Body>
              </Modal>
              <Box p={3}>
                <Button onClick={() => open()}>Open Modal</Button>
              </Box>
            </>
          );
        }}
      />
    );
  }
}

export default () => <DragDropListExample />;

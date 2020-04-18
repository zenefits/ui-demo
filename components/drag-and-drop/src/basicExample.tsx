import React, { Component } from 'react';

import { Box, Flex } from 'zbase';

import DragAndDrop from './DragAndDrop';

class DragAndDropExample extends Component<
  {},
  {
    data: {
      left: string[];
      right: string[];
    };
  }
> {
  // @ts-ignore
  constructor(props) {
    super(props);

    // In other apps we shouldn't do this.
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      data: {
        left: ['Drag me 1', 'Drag me 2'],
        right: [],
      },
    };
  }

  // @ts-ignore
  onDrop(sourceData, targetData) {
    this.setState(prevState => {
      const { data } = prevState;
      const source = sourceData.id;
      const targetPosition = targetData.id;

      const sourcePrevPosition = data.left.includes(source) ? 'left' : 'right';

      if (targetPosition !== sourcePrevPosition) {
        // Remove the item from sourcePrevPosition
        const index = data[sourcePrevPosition].indexOf(source);
        data[sourcePrevPosition].splice(index, 1);

        // Add the item to targetPosition
        // @ts-ignore
        data[targetPosition].push(source);
        return { data };
      } else {
        return prevState;
      }
    });
  }

  render() {
    const { data } = this.state;

    return (
      <DragAndDrop onDrop={this.onDrop}>
        {() => (
          <Flex w={1}>
            <DragAndDrop.Target data={{ id: 'left' }}>
              <Box border w={1 / 2}>
                {data.left.map(item => (
                  <DragAndDrop.Source key={item} data={{ id: item }}>
                    <Box border>{item}</Box>
                  </DragAndDrop.Source>
                ))}
              </Box>
            </DragAndDrop.Target>

            <DragAndDrop.Target data={{ id: 'right' }}>
              <Box border w={1 / 2}>
                {data.right.map(item => (
                  <DragAndDrop.Source key={item} data={{ id: item }}>
                    <Box border>{item}</Box>
                  </DragAndDrop.Source>
                ))}
              </Box>
            </DragAndDrop.Target>
          </Flex>
        )}
      </DragAndDrop>
    );
  }
}

export default () => <DragAndDropExample />;

import React from 'react';

import { Box } from 'zbase';

import DragDropList from './DragDropList';

const top = ['Engineer 1', 'Engineer 2'];
const bottom = ['PM 1', 'PM 2'];

export default () => (
  <DragDropList.Context onDragEnd={result => console.log(result)}>
    <Box mb={3}>
      <DragDropList.List listId="top">
        {top.map((item, index) => {
          return (
            <DragDropList.DraggableBox key={index} itemId={item} border borderColor="affirmation.b" p={2}>
              {item}
            </DragDropList.DraggableBox>
          );
        })}
      </DragDropList.List>
    </Box>
    <Box>
      <DragDropList.List listId="bottom">
        {bottom.map((item, index) => {
          return (
            <DragDropList.DraggableBox key={index} itemId={item} border borderColor="affirmation.b" p={2}>
              {item}
            </DragDropList.DraggableBox>
          );
        })}
      </DragDropList.List>
    </Box>
  </DragDropList.Context>
);

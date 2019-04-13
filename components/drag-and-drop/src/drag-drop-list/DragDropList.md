DragDropList is a namespace we create on top of the library [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

There are three components under DragDropList namespace.

1.  DragDropList.Context:

    A component to provide context.

    `onDragEnd` is a required function which will be called when dragging ends.

1.  DragDropList.List:

    A component to create a droppable list. The children of this component should be a list of DragDropList.Item.

    `listId` is a required string to identify the list.

    `type` defines a type of the list. Items can only be dropped into a list with the same type. Default type is `DEFAULT`. `type` can be accessed in `onDragEnd`'s argument.

1.  DragDropList.DraggableBox

    This component can be used to create your draggable item.
    This is similar to a regular Box but with extra props listed below.

    `itemId` is a required string to identify the item.

    `isDragDisabled` is an optional boolean to disable the item from dragging, default is false.

    `isDragging` will be set to true when the item is being actively dragged, or if it is drop animating. You can build your own styled component with this prop.

1.  DragDropList.DraggableFlex

    Similar to DragDropList.DraggableBox, but this is a Flex.

#### Examples

```jsx
// loadExample('./exampleStyleguide')
```

#### Usage

- Use these components when you want to build one or more vertical lists of items that can be dragged and dropped.

#### Implementation Notes

- If DragDropList.List is used inside modals, please add `shouldUsePortal`, otherwise the positioning will be incorrect while dragging. However, please avoid adding `shouldUsePortal` as default because it has a performance penalty - especially when dragging nodes with a lot of children. More details: [Using a Portal](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/patterns/using-a-portal.md)

Three components together enable drag-and-drop.

1.  DragAndDrop

    A component to provide context for drag-and-drop.
    `children` needs to be a render prop.
    `onDrop` takes a function which will be called when a drop event happens.

1.  DragAndDrop.Source

    Wrap the component you want to drag with `DragAndDrop.Source` and pass in `data` about the drag source.

1.  DragAndDrop.Target

    Wrap a component with `DragAndDrop.Target` to make it a droppable area. Pass in `data` about the drop target.

#### Examples

Basic usage:

```jsx
// loadExample('./basicExample')
```

See [live stories](http://ui.zenefits.com/app/stories/?selectedKind=drag-and-drop|DragAndDrop&selectedStory=Basic&full=0&addons=1&stories=1&panelRight=0).

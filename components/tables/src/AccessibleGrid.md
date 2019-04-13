A component for laying out interactive elements.
This component follows the [accessibility spec](https://www.w3.org/TR/wai-aria-1.1/#grid)
Please follow the guidelines described below to ensure your page will be fully-operable by
keyboard and screenreader users.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="tables|AccessibleGrid" selectedStory="default" />
```

#### Usage

- USE to layout interactable elements in a table layout
- DO NOT USE for tables that contain no interactive elements

#### Implementation Notes

The child of this component follows the render function as children pattern.
The render function in this case will provide three components as parameters: `Row` and `Grid` and `Cell`.
Use these components to wrap the content of your grid.

##### Cell Types

Grid cell may be one of three types:

- read-only: cells that do not have interactive content should have type read-only
- simple-action: cells that only have one interactive element that DOES NOT consume keyboard arrow events (eg. a checkbox or
  link) should be given the simple-action type. These cells will behave as follows:
  - When the user focuses the grid and navigates to a 'simple-action' cell using the arrow key, the interactive element
    in the cell will receive focus.
  - When the user presses an arrow key while a 'simple-action' cell is the focused cell, the interactive element will lose focus,
    focus will be sent back to the grid, and the next cell in the grid will receive focus
  - When the user clicks anywhere in a 'simple-action' cell, the interable element will receive focus, and the user may subsequently use any of the grid's keyboard interactions
- editable: cells that have multiple interactive elements or an interactive element that consumes keyboard arrow events such as
  a text input should be given the editable type. These cells will behave as follows:
  - When the user focuses the grid and navigates to an 'editable' cell using the arrow key, then presses 'Enter', the first
    cell will enter 'Edit Mode' and the first interactive element of the cell will be focused.
  - Tab navigation when in Edit Mode will be restricted to the contents of the cell
  - When the user presses 'Escape' while in Edit Mode, the grid's normal keyboard interactions will resume. The cell will retain
    focus until the user navigates to a new cell using an arrow key.

##### Header Types

Headers must have a headerType specified. This should either be 'row' or 'column depending on whether it is a row header
or a column header. If a header has any interactive elements, then a contentType should be specified for it as well.
The header's contentType prop is 'read-only' by default. All the same rules as grid cell apply.

By default a header will describe every element in its respective row or column. If the header only applies a subset of cells
in the row or column, please also include the 'describes' prop to list the row or column indices that it describes.

##### Known Limitation

There are a couple known limitations to keep in mind when using this component:

- If this component is going to be used within an iframe, make sure that it is not the last focusable element
  in the iframe or the user won't be able to send focus out of the iframe.
- When using headers, make sure that the header is rendered before the contents it describes. This generally will mean
  the header would be above any cell it describes if it is a column header and to the left of any cell it describes if
  it is a row header.

#### Related

- [Table](#!/Table)

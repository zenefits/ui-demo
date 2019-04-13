Cards consist of 1 or more rows with an optional header and footer. By default, they are 100% width.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="composites|Card" selectedStory="header, rows, footer" />
```

`Card.Header` will properly position actions (typically an [IconButton](#!/IconButton) or
[ButtonDropdown](#!/ButtonDropdown)) for you when supplied via `actionRender`:

```jsx noeditor
<StorybookExample selectedKind="composites|Card" selectedStory="header with ButtonDropdown action" />
```

Row padding can be disabled for situations where the content is already padded:

```jsx noeditor
<StorybookExample selectedKind="composites|Card" selectedStory="unpadded row" />
```

[Forms](#!/Form) are often included inside cards:

```jsx noeditor
<StorybookExample selectedKind="forms|Form" selectedStory="all the things" />
```

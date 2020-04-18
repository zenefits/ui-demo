An error banner that will be shown if either a save operation sent to SaveStateManager fails. This is commonly used
with [EditableTable](#!/EditableTable).

#### Examples

```jsx noeditor
<StorybookExample selectedKind="tables|EditableTable" selectedStory="with server errors" />
```

#### Usage

When records (rows in the case of `EditableTable`) fail to save, this banner will be shown identifying the failed records
(using the callback provided to the getFailureLabel prop). The banner will also have links to reload the page or retry
the failed operations if the onRetry prop is passed.

#### Related

- [EditableTable](#!/EditableTable)

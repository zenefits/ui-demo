A wrapper around [DataFilter](#!/DataFilter) that allows the user to filter data in a standard way.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="data-manager|DataFilterPanel" selectedStory="default" />
```

#### Usage

- Use to filter displayed data, never to take user input.
- Pairs nicely with [DataTable](#!/DataTable).
- Typically triggered from a button in the table header.

#### Implementation Notes

Use DataManager to perform the actual filtering.

#### Related

- [DataFilter](#!/DataFilter)
- [DataTable](#!/DataTable)

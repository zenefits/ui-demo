A component that displays tabular data.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="tables|DataTable" selectedStory="default" />
```

#### Usage

- USE when rendering tabular data with no editable fields
- DO NOT USE if table includes editable fields. Instead use [EditableTable](#!/EditableTable).
- DO NOT USE to position unrelated content.

#### Implementation Notes

##### Columns

Each child of the DataTable component should be a DataTable.Column instance. The following arguments may be passed to each DataTable.Column component.

- `headerLabel` - a label for this header. This must be included even if the header won't be shown to support
  accessibility.
- `fieldKey` - the key of the row object that is associated with the column. If children function is omitted
  the value for this key will be shown
- `disableSort` - If used within a DataManager and a fieldKey is provided, the column will be sortable by default.
  This can be used to disable this for any column.
- `isFixed` - Should column be fixed. Fixing a column will make the column stick to the left if the table content width exceeds the space alloted for the table. Note that is this feature is used, each row must have a fixed height.

A custom render method can be provided as the child of any column. See the [examples](app/stories/index.html?selectedKind=tables%7CDataTable&selectedStory=default) for usage.

#### Related

- [Table](#!/Table)
- [EditableTable](#!/EditableTable)

A component that contains editable fields layed out in a tabular format.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="tables|EditableTable" selectedStory="default" />
```

#### Usage

- USE whenever rendering fields within a table.
- DO NOT USE if your table does not contain any editable fields. Instead use [DataTable](#!/DataTable)

#### Implementation Notes

##### Columns

Each child of the EditableTable component should be one of the following components:

- `EditableTable.Column`: Use this for non-field columns. It is a proxy for DataTable.Column and accepts all the same arguments.
- `EditableTable.InputColumn`: Use this for columns of [inputs](#!/Form.TextInput).
- `EditableTable.NumberColumn`: Use this for columns of [number inputs](#!/FormNumberInput).
- `EditableTable.MoneyColumn`: Use this for columns of [money inputs](#!/Form.MoneyInput).
- `EditableTable.DateColumn`: Use this for columns of [date inputs](#!/Form.DateInput).
- `EditableTable.TimeColumn`: Use this for columns of [time inputs](#!/Form.TimeInput).
- `EditableTable.SelectColumn`: Use this for columns of [selects](#!/Form.SimpleSelect).
- `EditableTable.PercentageColumn`: Use this for columns of [percentage inputs](#!/Form.PercentageInput).
- `EditableTable.PhoneColumn`: Use this for columns of [phone inputs](#!/Form.PhoneInput).
- `EditableTable.RowSelectionColumn`
- `EditableTable.IconColumn`
- `EditableTable.StatusColumn`
- `EditableTable.CountryColumn`
- `EditableTable.StateColumn`
- `EditableTable.PostalCodeColumn`

##### Autosave behavior

The `EditableTable` will fire its `saveHandler` callback after a row has been edited and one of the following events has happened:

- The user navigates away from the row using the keyboard (ESC, TAB) or mouse
- 3 seconds has elapsed without another row edit
- The table is unmounted

Since the save operation happens automatically and is not a conscious user decision, it is important that all user edits
are persisted; that is to say, rows should be saved even if the state might be considered invalid.
This is important to ensure that users don't lose their edits because they didn't realize they weren't saved.

If row records need to be validated before they are published or finalized, then there should be a separate data model for
published records vs draft records. The table's autosave should then only persist to the draft records, and a separate
action external to the table will be needed to convert draft records to published records.

##### Data Update Blocking

When using the EditableTable component, it is important to understand when and why data updates are (or aren't) propagated.

When the `DataManager` updates with new data, the `EditableTable` WILL NOT immediately reflect this change. This is by design.
It was built this way to handle the fact that the row save operation will typically be a asynchronous action that updates
the GraphQL cache.

To illustrate the issue more clearly, suppose a user edits a row, and the row save operation is fired via the autosave timeout.
A mutation will be fired that goes through GraphQL, but this mutation may take a few seconds.
In the time the grapqhl request is pending, suppose the user makes another edit to that row.
Now the table state is AHEAD of the state we originally sent to the server via GraphQL.
When the original GraphQL comes back, we don't want the old data, which will be put in the GraphQL cache
(and subsequently passed to the DataManager) to overwrite the new data that is local to our table component.

We solve this issue with an update blocking component that is internal to the EditableTable component. This component will catch any
new data that comes from the data manager. By default, it will prevent the new data from reaching the cells of the table
until one of following things happens:

- One of the config props (pagination, sort, filter) in the `DataManager` changes
- The number of records in the `DataManager` changes

There are two approaches that can be taken if arbitrary data updates need to make it from the `DataManager` to the table cells:

###### Update using React Context

The first approach is to use React context providers. These will live between the DataManager and EditableTable and receive any
data that needs to immediately propagated to cells. Within the EditableTable column configuration, the context
(which will have the most up-to-date data) can be consumed.

An example use case for this is if we need a column that should only update after each save, for example a summary of the
record that comes from the backend. The implementation would look something like this.

```jsx static
// Create context
const RowSummaryContext = React.createContext(defaultContext);

// JSX
<DataManager
  render={({ data }) => (
    <RowSummaryContext.Provider data={getSummarizedRows(data)}>
      <EditableTable {...tableProps}>
        <EditableTable.Column {...columnProps}>
          {({ row }) => (
            <RowSummaryContext.Consumer>
              {summarizedRows => getRowSummary(summarizedRows, row.id)}
            </RowSummaryContext.Consumer>
          )}
        </EditableTable.Column>
      </EditableTable>
    </RowSummaryContext.Provider>
  )}
/>;
```

###### Update using refreshData callback

A second approach to immediately reflect data updates is to use the refreshData callback provided by the
EditableTable component. An example of this use case is an icon column that fires some action that needs to be
reflected immediately in the table.

```jsx static
<DataManager
  render={({ data }) => (
    <EditableTable {...tableProps}>
      {({ refreshData }) => (
        <EditableTable.IconColumn
          {...columnProps}
          onClick={async () => {
            // This action will update data that DataManager receives
            await onClickAction();
            refreshData();
          }}
        />
      )}
    </EditableTable>
  )}
/>
```

###### Error updates

One more thing to note is that updates to the `errors` key of each data record WILL NOT be blocked
and WILL display immediately in the table.

##### Validation

Data validation can be applied in 3 different ways:

1.  Client side validation schema. Similiar to forms you can provide a [Yup](https://github.com/jquense/yup) schema to your EditableTable via the `validationSchema` prop. Unless your validation case is very complex this is how client side validation should be done.
2.  Client side validation function. Pass a function via the `validateRow` prop. In most cases a validationSchema should be used but if your use case is too complex a function can be used.
3.  Server side validation. Errors returned from the server can be applied in your `onLeaveRowEdit` callback.

##### Error handling

If a row save fails due to an unexpected server error, we should alert the user that the row save was unsuccessful.
In order to do this, we must use the `SaveStateManager` and `SaveFailedErrorBanner` components.
The `SaveFailedErrorBanner` component should be included where we want the error to be displayed, ie at the top of the page.
The `SaveStateManager` should be included in the JSX tree somewhere above the `EditableTable` and `SaveFailedErrorBanner` components

```jsx static
<SaveStateManager>
  <SaveFailedErrorBanner
    getRowKey={row => row.id}
    getFailureLabel={row => row.name}
  >
  <EditableTable
    getRowKey={row => row.id}
    {...tableProps}
  >
    ...
  </EditableTable>
</SaveStateManager>
```

See [SaveFailedErrorBanner](#!/SaveFailedErrorBanner) for more details on the usage for this component.

##### Height and Scrolling

By default EditableTable's height is determined by the content inside.
We can use `maxHeight` prop on EditableTable to set an explicit max height. If the content exceeds the max height of the table, the table body becomes scrollable.

#### Related

- [DataTable](#!/DataTable)
- [SaveFailedErrorBanner](#!/SaveFailedErrorBanner)

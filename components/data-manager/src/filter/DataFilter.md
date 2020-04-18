A component that allows the user to filter data in a standard way.

#### Examples

DataFilter includes a group of components (like Card) used together:

- `DataFilter.Text` - used for free text input
- `DataFilter.CheckboxGroup` - used for most cases when there are predefined options
- `DataFilter.MultiSelect` - used when there are many predefined options (eg US states) and can used instead of a single select too
- `DataFilter.DateRange`
- `DataFilter.Section` - used to logically group filters when there are many in a panel

A typical example:

```jsx noeditor
<StorybookExample selectedKind="data-manager|DataFilter" selectedStory="default" />
```

#### Usage

See [DataFilterPanel](./DataFilterPanel), which is usually what you should be using.

#### Implementation Notes

Use DataManager to perform the actual filtering.

#### Related

- [DataFilterPanel](#!/DataFilterPanel)
- [DataTable](#!/DataTable)
- [Form](#!/Form)

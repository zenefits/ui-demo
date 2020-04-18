A component that takes in a list of data, gets information about filtering/sorting/pagination
from the URL, processes the data and pass it through.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="data-manager|InMemoryDataManager" selectedStory="default" />
```

#### Usage

- Use when all the data is loaded and filtering, sorting, pagination etc. happens in the front end.

- Do not use when filtering, sorting, pagination etc. is done in back end. Use GraphqlDataManager for that.

#### Implementation Notes

- This component takes in an array of `sourceData` and uses `UrlQueryParamsContext` to get information about filtering/sorting/pagination
  configurations, does filtering/sorting/pagination internally, and presents processed data through
  `GenericDataManagerContext` and render prop `children`.

- This component has `UrlQueryParamsManager` built-in, which provides the `UrlQueryParamsContext`.

- This component does filtering, sorting, and pagination according to information in URL query params, so to update
  filtering, sorting, pagination, use `UrlQueryParamsContext` to update the query params. There are some existing components
  that can be used for updating filters, for example: `UrlFilterPanel`, `DataFilter.UrlFilterText`, `DataFilter.UrlFilterSelect`,
  `DataFilter.UrlFilterMultiSelect`, `DataFilter.UrlFilterCheckboxGroup`, `DataFilter.UrlFilterDateRange`.

- Use `UrlPager` for pagination controls.

- This component also maintains a state about data selections. The state and related methods are exposed through
  `RowSelectionContext`. Usage of this is inside `DataTable` and `EditableTable`.

Query params format:

_Filtering_

1. "field contains string": `filter_fieldName=XX`

1. "match any": `filter_fieldName[]=XX&filter_fieldName[]=YY`

1. "custom match": `filter_custom_fieldName=1`

1. "less than": `filter_lessThan_fieldName=987`

1. "greater than": `filter_greaterThan_fieldName=123`

_Sorting (Tastypie style)_

`order_by[]=name` (currently only sorting by one field is supported in InMemoryDataManager)

_Pagination_

`currentPage=1&pageSize=25`

#### Related

- [GraphqlDataManager](#!/GraphqlDataManager)
- [UrlQueryParamsManager](#!/UrlQueryParamsManager)
- [UrlFilterPanel](#!/UrlFilterPanel)
- [DataFilter](#!/DataFilter)

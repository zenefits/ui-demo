A component that takes in an array of data with optional initial configs for filtering, sorting, pagination, etc, and exposes processed data with utility functions for later operations on the data.

#### Examples

Filtering by whether data contains the string input:

```jsx noeditor
<StorybookExample selectedKind="data-manager|DataManager" selectedStory="filtering (stringContains)" />
```

#### Usage

- Use when all the data is loaded and filtering, sorting, pagination etc. happens in the front end.
- Do not use when filtering, sorting, pagination etc. is done in back end.

#### Implementation Notes

- If filtering and sorting is updated, the state of pagination resets to the first page.

#### Related

- [GraphqlDataManager](#!/GraphqlDataManager)

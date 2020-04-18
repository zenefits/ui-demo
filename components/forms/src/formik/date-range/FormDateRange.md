A form component that accepts a start and end date from the user.

#### Examples

Typical usage:

```jsx noeditor
<StorybookExample selectedKind="forms|FormDateRange" selectedStory="default" />
```

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

- By default date format is YYYY-MM-DD. Use prop `shouldPreserveTime` to keep time (as in a date object).

##### Touched state

Touched state for this field is set to true when `onBlur` is triggered on the input for end date.

#### Related

- [FormDateInput](#!/Form.DateInput) for a single date
- [FormTimeRange](#!/Form.TimeRange) for time of day

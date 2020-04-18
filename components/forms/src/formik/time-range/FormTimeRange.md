A form component that accepts a start and end time selection from the user.

#### Examples

Typical usage:

```jsx noeditor
<StorybookExample selectedKind="forms|FormTimeRange" selectedStory="default" />
```

#### Usage

- Use TimeRangeValue type when specifying the type for this form field.
- FormTimeRange.validationSchema with Yup schema validation
- FormTimeRange.getEmptyValue helper method can be used to format empty default value

```js static
<Form<{ timeRange: TimeRangeValue}>
  validationSchema={{timeRange: FormTimeRange.validationSchema}}
  defaultValue={{timeRange: FormTimeRange.getEmptyValue()}}
>
```

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

Wraps the [HTML `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) but also provides styles and layout.

#### Related

- [FormTimeInput](#!/FormTimeInput)

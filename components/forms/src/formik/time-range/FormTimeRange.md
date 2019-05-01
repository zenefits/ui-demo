A form component that accepts a start and end time selection from the user.

#### Examples

Typical usage:

```jsx
// loadExample('./exampleDefault')
```

#### Usage

- Use TimeRangeValue type when specifying the type for this form field.
- Form.TimeRange.validationSchema with Yup schema validation
- Form.TimeRange.getEmptyValue helper method can be used to format empty default value

```js static
<Form<{ timeRange: TimeRangeValue}>
  validationSchema={{timeRange: Form.TimeRange.validationSchema}}
  defaultValue={{timeRange: Form.TimeRange.getEmptyValue()}}
>
```

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

Always import this via `Form`, as in the example.

Wraps the [HTML `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) but also provides styles and layout.

#### Related

- [Form.TimeInput](#!/Form.TimeInput)

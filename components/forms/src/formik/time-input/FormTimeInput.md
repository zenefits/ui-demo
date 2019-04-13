A form component that accepts time selection from the user.

#### Examples

Typical usage:

```jsx
// loadExample('./exampleDefault')
```

#### Usage

- Use TimeInputValue type when specifying the value type for this form field.
- Form.TimeInput.validationSchema with Yup schema validation
- Form.TimeInput.getEmptyValue helper method can be used to format empty default value

```js static
<Form<{ time: TimeInputValue}>
  validationSchema={{time: Form.TimeInput.validationSchema}}
  defaultValue={{time: Form.TimeInput.getEmptyValue()}}
>
```

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

Always import this via `Form`, as in the example.

Wraps the [HTML `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) but also provides styles and layout.

#### Related

- [Form.TimeRange](#!/Form.TimeRange) for a range of times
- [Form.DateInput](#!/Form.DateInput) for a date

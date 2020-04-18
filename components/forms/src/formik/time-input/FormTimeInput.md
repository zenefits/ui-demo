A form component that accepts time selection from the user.

#### Examples

Typical usage:

```jsx noeditor
<StorybookExample selectedKind="forms|TimeInput" selectedStory="default" />
```

#### Usage

- Use TimeInputValue type when specifying the value type for this form field.
- Form.TimeInputvalidationSchema with Yup schema validation
- Form.TimeInput.getEmptyValue helper method can be used to format empty default value

```js static
<Form<{ time: TimeInputValue}>
  validationSchema={{time: FormTimeInput.validationSchema}}
  defaultValue={{time: FormTimeInput.getEmptyValue()}}
>
```

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

Always import this via `Form`, as in the example.

Wraps the [HTML `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) but also provides styles and layout.

#### Related

- [FormTimeRange](#!/FormTimeRange) for a range of times
- [FormDateInput](#!/FormDateInput) for a date

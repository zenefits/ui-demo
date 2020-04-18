A form component that is a derivative of text input that takes as input percentage values with appropriate masks.

#### Examples

Typical usage:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.PercentageInput" selectedStory="default" />
```

#### Usage

Take a look at the props to further understand additional usages.

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

This input always returns a number value, not a string. Example: user sees `12%` but the form value is `12`.

Always import this via `Form`, as in the example.

Wraps the [HTML `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) but also provides styles and layout.

#### Related

- [FormMaskedInput](#!/FormMaskedInput)

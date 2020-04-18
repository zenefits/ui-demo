A form component that is a derivative of text input that takes as input a number with appropriate masks.

#### Examples

Typical usage:

```jsx noeditor
<StorybookExample selectedKind="forms|FormNumberInput" selectedStory="Variations of number input" />
```

#### Usage

Take a look at the props to further understand additional usages.

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

This input always returns a number value, not a string. Example: user sees `1,234.56` but the form value is `1234.56`.

Always import this via `Form`, as in the example.

Wraps the [HTML `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) but also provides styles and layout.

#### Related

- [FormMaskedInput](#!/FormMaskedInput)

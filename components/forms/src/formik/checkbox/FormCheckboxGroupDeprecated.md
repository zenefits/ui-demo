A form component that presents a list of related options of which multiple can be selected.

NOTE: this component is deprecated. Please use [FormCheckboxGroup](#!/FormCheckboxGroup) instead.

#### Examples

Typically, `Form.Checkbox` components are passed as children:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.CheckboxGroupDeprecated" selectedStory="with label" />
```

Note that each checkbox has its own `name` prop.

#### Usage

- Use when there are at least 2 options.
- Interacting with one checkbox should not affect any others.
- For long lists of options, consider using `Form.Select` with `multi` instead.

#### Content Guidelines

For all instances where each checkbox in a group is its own decision, simply follow the [FormCheckbox](#!/FormCheckbox) guidelines.

If your group of checkboxes are conditions on a single decision, simply present the information in its simplist form, presented in alphabetical order.

##### Format

Title Case

#### Implementation Notes

The children are wrappers around [HTML `<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)
with styles and layout.

#### Related

- [FormRadioGroup](#!/FormRadioGroup)
- [FormCheckbox](#!/FormCheckbox)

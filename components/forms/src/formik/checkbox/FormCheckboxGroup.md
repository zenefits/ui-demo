A form component that presents a list of related options, of which multiple can be selected.

If you are not sure whether this is the correct component for your use case, please consult the
[Select guide](#!/Select%20Components).

#### Examples

```jsx noeditor
<StorybookExample selectedKind="forms|Form.CheckboxGroup" selectedStory="array with label" />
```

`Form.CheckboxGroup` supports two main use cases:

- A single value which is a list including all checked options
- Multiple boolean values, each corresponding to an option (true if checked)

If the field in `initialValues` is an array, we assume the first use case. Otherwise, the result is multiple boolean
values as in the second use case.

#### Usage

- Use when there are at least 2 options.
- Interacting with one checkbox should not affect any others.
- With many options, or where space is limited, consider using [Form.MultiSelect](#!/Form.MultiSelect) instead.

#### Content Guidelines

For all instances where each checkbox in a group is its own decision, simply follow the [Form.Checkbox](#!/Form.Checkbox) guidelines.

Consider sorting the options alphabetically.

##### Format

Title Case

#### Implementation Notes

The children are wrappers around [HTML `<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)
with styles and layout.

#### Related

- [Form.RadioGroup](#!/Form.RadioGroup)
- [Form.Checkbox](#!/Form.Checkbox)
- [Form.MultiSelect](#!/Form.MultiSelect)

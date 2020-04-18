A form component that presents a list of related options, of which multiple can be selected.

If you are not sure whether this is the correct component for your use case, please consult the
[Select guide](#!/Select%20Components).

#### Examples

```jsx noeditor
<StorybookExample selectedKind="forms|Form.CheckboxGroup" selectedStory="array with label" />
```

#### Usage

- Consider sorting the options alphabetically.
- Interacting with one checkbox should not affect any others.

```jsx noeditor
<FigmaFile
  height={1455}
  url="https://www.figma.com/file/OKdw775cxzrwQhGNm1SYM8ZD/Zenebits-Figma-Embed?node-id=121%3A229"
/>
```

#### Implementation Notes

`Form.CheckboxGroup` supports two main use cases:

- A single value which is a list including all checked options
- Multiple boolean values, each corresponding to an option (true if checked)

If the field in `initialValues` is an array, we assume the first use case. Otherwise, the result is multiple boolean values as in the second use case.

#### Related

- [FormCheckbox](#!/FormCheckbox)
- [FormRadioGroup](#!/FormRadioGroup)
- [FormMultiSelect](#!/FormMultiSelect)

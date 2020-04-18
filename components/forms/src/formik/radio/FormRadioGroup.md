A form component that presents a list of related options of which one can be selected.

#### Examples

Typically, `FormRadio` components are passed as children:

```jsx noeditor
<StorybookExample selectedKind="forms|FormRadioGroup" selectedStory="basic group" />
```

(Note that children do not need to include a `name` prop; they will inherit that of the `FormRadioGroup`.)

With an initial value:

```jsx noeditor
<StorybookExample selectedKind="forms|FormRadioGroup" selectedStory="with initial value" />
```

#### Usage

- Each option must include an associated label.
- Use when there are at least 2 options.
- For long lists of options, consider using `FormSelect` instead.
- Include an intelligent default selection where it makes sense to do so.
- The only logical validation is that at least one option is selected.

#### Content Guidelines

- The options should be mutually exclusive.
  - Do: Contractor, Full-Time Employee, Part-Time Employee
  - Avoid: Contractor, Employee, Part-Time Employee
- Sort options in a logical order.

See general field label and error guidelines.

#### Implementation Notes

The children are wrappers around [HTML `<input type="radio">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)
with styles and layout.

You should never use `FormRadio` directly.

#### Related -->

- [FormCheckboxGroup](#!/Form.CheckboxGroup)

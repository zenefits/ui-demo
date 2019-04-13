A form component that presents a list of related options of which one can be selected.

#### Examples

Typically, `Form.Radio` components are passed as children:

```jsx
// loadExample('./exampleLabel')
```

(Note that children do not need to include a `name` prop; they will inherit that of the `Form.RadioGroup`.)

With an initial value:

```jsx
// loadExample('./exampleValue')
```

#### Usage

- Each option must include an associated label.
- Use when there are at least 2 options.
- For long lists of options, consider using `Form.Select` instead.
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

You should never use `Form.Radio` directly.

#### Related -->

- [Form.CheckboxGroup](#!/Form.CheckboxGroup)

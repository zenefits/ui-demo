A form component that presents a list of related options in a dropdown menu. One or more can be selected.

#### Examples

Options are passed via the `options` prop:

```jsx
// loadExample('./exampleDeprecatedLabel')
```

Add `multi` to allow multiple to be selected:

```jsx
// loadExample('./exampleDeprecatedMulti')
```

#### Usage

- Use when there are at least 3 options.
- For shorter lists of options, consider using [FormRadioGroup](#!/FormRadioGroup) instead.
- Include an intelligent default selection where it makes sense to do so.
- The most common way to validate this input is that at least one option is selected.

#### Content Guidelines

- Sort options in a logical order.

See general field label and error guidelines.

#### Implementation Notes

Wraps the [HTML `<select>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
with styles and layout.

#### Related

- [FormRadioGroup](#!/FormRadioGroup)

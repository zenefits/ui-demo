A form component that accepts text input from the user.

#### Examples

Typical usage:

```jsx
// loadExample('./exampleLabel')
```

With an initial value:

```jsx
// loadExample('./exampleValue')
```

Numbers only:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.TextInput" selectedStory="with type number" />
```

#### Usage

- Set the `type` attribute when something more specific than `text` is appropriate. Examples: `email`, `password`, `tel`, `url`, `number`, `search`.
- Do not use this when a more specific form field is applicable. Example: `Form.DateInput`.
- For longer text, use `Form.Textarea` instead.

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

Always import this via `Form`, as in the example.

Wraps the [HTML `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) but also provides styles and layout.

#### Related

- [Form.Textarea](#!/Form.Textarea)

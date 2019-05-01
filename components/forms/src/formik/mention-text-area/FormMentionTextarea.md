A form component that accepts text input from the user (similar to FormTextarea) and supports mentions.

#### Examples

New mentions are triggered by typing `@` in a similar way to Slack or GitHub:

```jsx
// loadExample('./exampleValue')
```

#### Usage

- Use this component only when there may be mentions. Otherwise, just use `Form.Textarea`.
- For simply displaying text, use `MentionText`.

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

Always import this via `Form`, as in the example.

Wraps the RichEditor component.

#### Related

- [Form.Textarea](#!/Form.Textarea)
- [MentionText](#!/MentionText)
- RichEditor

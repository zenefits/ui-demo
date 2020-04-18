A form component that accepts text input from the user (similar to FormTextarea) and supports mentions.

#### Examples

New mentions are triggered by typing `@` in a similar way to Slack or GitHub:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.MentionTextarea" selectedStory="with initial value" />
```

#### Usage

- Use this component only when there may be mentions. Otherwise, just use `FormTextarea`.
- For simply displaying text, use `MentionText`.

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

- In `options` prop, only characters in `[A-Za-z0-9_]` are valid in `id`.
- Wraps the RichEditor component.

#### Related

- [FormTextarea](#!/Form.Textarea)
- [MentionText](#!/MentionText)
- RichEditor

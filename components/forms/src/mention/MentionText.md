A component for displaying block text that may have mentions in it.

#### Examples

```jsx
// loadExample('./exampleMentionText')
```

#### Usage

- Use this component only when there may be mentions. Otherwise, just use `TextBlock`.
- To accept input, use `Form.MentionTextarea`.

#### Implementation Notes

- This is a wrapper around `TextBlock` and `Mention`.

#### Related

- [Mention](#!/Mention)
- [TextBlock](#!/TextBlock)
- [Form.MentionTextarea](#!/Form.MentionTextarea)

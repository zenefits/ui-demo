Component to represent a reference to an entity within running text. This is signified with a unique character prefix.
Typically, the mentioned entity is a user but it could be something else (task, review, etc).

#### Examples

```jsx
// loadExample('./exampleDefault')
```

Optionally, more details can be provided that are revealed on hover.

#### Usage

- Use this component for actual mentions in text.
- You shouldn't need to set font size: it will inherit appropriately.

#### Content Guidelines

- The label should be human-friendly and somewhat unique.
- Avoid tooltip text unless it adds value.

#### Related

- [Badge](#!/Badge)
- [MentionText](#!/MentionText)
- [MentionTextarea](#!/MentionTextarea)

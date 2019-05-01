Component for displaying singular or plural based on a dynamic count.

Use `{count}` to embed the count value in the text. Use `{count, number}` to format the count as with
[NumberText](#!/NumberText).

#### Examples

Externalized text:

```jsx
// loadExample('./exampleTextKeys')
```

Inline text:

```jsx
// loadExample('./exampleDefault')
```

#### Usage

- Only use when the count is dynamic.
- Keep the pluralized text in context with surrounding text to make translation easier.
- Keep in mind that the word order may change when translated.

#### Related

- [RelativeText](#!/RelativeText) provides pluralization of days etc relative to now
- [TextInline](#!/TextInline) for cases where you do not need plurals

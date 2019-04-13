A component for displaying [inline](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements) text. By default, this text has no semantic meaning (renders a `<span>`).

#### Examples

```jsx
// loadExample('./example')
```

Use `tag` to render HTML with particular semantics:

```jsx
// loadExample('./exampleTag')
```

In addition to the standard utility props, `TextInline` supports i18n through the `textKey` and `textValues` props:

```jsx
// loadExample('./exampleTextKey')
```

#### Related

- [TextBlock](#!/TextBlock) for blocks of text

Helper components for common use cases:

- [Obscure](#!/Obscure) for sensitive data
- [PluralText](#!/PluralText) for plural/singular text
- [NumberText](#!/NumberText) for number formatting
- Date formatting: [RelativeText](#!/RelativeText), [DateText](#!/DateText), [DateTimeText](#!/DateTimeText), [TimeText](#!/TimeText)

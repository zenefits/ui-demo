A component for displaying [block](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements) text. By default, this text has no semantic meaning.

See [Typography](#!/Typography#paragraphs) for font specifics.

#### Examples

```jsx
// loadExample('./example')
```

The `bold` and `textAlign` props behave as expected:

```jsx
// loadExample('./exampleBoldAlign')
```

Preserve whitespace using the `whiteSpace` prop:

```jsx
// loadExample('./exampleWhiteSpace')
```

Use the `tag` prop to render HTML with defined semantics:

```jsx
// loadExample('./exampleTag')
```

`TextBlock` also supports standard utility props, including i18n through `textKey` and `textValues`:

```jsx
// loadExample('./exampleTextKey')
```

#### Related

- [TextInline](#!/TextInline) for inline text

A component that renders inline text describing a form input.
Wraps HTML's [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label).

#### Examples

```jsx
// loadExample('./exampleDefault')
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=zbase|Label).

#### Usage

- All form fields should have an associated label for accessibility (either via `htmlFor`, being nested inside a
  Label, or using `aria-labelled-by`).
- You should rarely need this component. A Label will be added automatically for any
  [Form](http://ui.zenefits.com/#!/Form) field with the `label` prop specified.

#### Related

- [Form](#!/Form)
- [TextInline](#!/TextInline) for generic inline text

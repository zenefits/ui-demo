A component that allows the user to enter rich text, such as bold.

Status: **Alpha** - this component lacks designs and is not feature complete ([details](https://github.com/zenefits/z-frontend/pull/1695))

#### Examples

```jsx
// loadExample('./exampleDefault')
```

#### Usage

- For plain text input, use `Form.Textarea`.

#### Implementation Notes

- Unlike many components, RichEditor is [uncontrolled](https://reactjs.org/docs/uncontrolled-components.html).
  Instead of a parent controlling its value, it takes a `defaultValue` and a `key`. Only when the key changes (eg
  on a form submit or reset) will the component refresh.
- This is implementing using [Squire](https://github.com/neilj/Squire/), the same library used for an
  earlier Ember component.

#### Related

- [Form.Textarea](#!/Form.Textarea)
- [Form.MentionTextarea](#!/Form.MentionTextarea)

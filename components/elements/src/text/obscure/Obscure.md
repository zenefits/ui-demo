A component that obscures sensitive data that should not be fully displayed by default.

#### Examples

By default, all characters are obscured:

```jsx
// loadExample('./exampleDefault')
```

To leave some characters revealed at the end, for example to help user recognition, specify `visibleCount`:

```jsx
// loadExample('./exampleCustom')
```

#### Related

- [ObscureToggle](#!/ObscureToggle) allows the user to reveal everything
- [TextInline](#!/TextInline) is wrapped by `Obscure`

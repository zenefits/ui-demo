By default, all characters are obscured:

```jsx
// loadExample('./exampleDefault')
```

To leave some characters revealed at the end, for example to help user recognition, specify `visibleCount`:

```jsx
// loadExample('./exampleCustom')
```

To allow the user to reveal everything, use the [`ObscureToggle`](#obscuretoggle) component.

`Obscure` wraps [`Text`](#text) and accepts the same props.

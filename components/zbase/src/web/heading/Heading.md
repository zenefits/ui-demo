A component for describing document structure. Generalizes HTML's `<h1>` - `<h6>`.

See [Typography](#!/Typography) for font specifics.

#### Examples

The required `level` prop is used to properly model document structure:

```jsx
// loadExample('./exampleLevel')
```

Headings are styled by default based on their level. As always, you can also use common utility props like `fontStyle` (to control appearance) and `textKey` (to control text in an i18n friendly way):

```jsx
// loadExample('./exampleUtilProps')
```

#### Usage

- Use `fontStyle` to control appearance, and `level` to represent actual page structure.
- Avoid using more than one `level={1}` per page.
- Do not skip levels. Example: `h2`, then `h4`.

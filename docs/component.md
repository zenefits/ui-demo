# Component best practices

### Types

* must have them

  * with helpful jsdoc descriptions
  * as strict as possible
  * should allow common zbase util props (eg, `BoxProps &`)

### Styles

* everything should come from theme, where possible
  * colors, heights, fontStyles, padding...
  * `util` helpers make this easy

### Props

* only add when needed

  * predicting future needs is hard
  * YAGNI principle
  * extra props adds complexity

* support standard HTML events and attributes

  * `autocomplete`, `autofocus`, `onClick`...

* use defaultProps to set intelligent defaults
  * eg `static defaultProps = { s: 'medium' };`
  * better than default parameters for documentation purposes

### Tests

* need to have 'em (see [testing guide](./testing.md))
* add stories to facilitate development

### Documentation

* Add a `<component>.md` file for our Style Guide
  * include meaningful examples
  * when to use, when not to use

### Misc

* default to using a `class`

  * functional components are nice but it's annoying to refactor when you have state etc.

* for form components, make separate `Field` component available
  * component itself doesn't know anything about `redux-form`
  * eg `Checkbox` and `CheckboxField`

---

### To discuss:

each should have error boundary?
https://reactjs.org/docs/error-boundaries.html

performance best practices?

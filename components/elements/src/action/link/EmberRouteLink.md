Interactive text that references an Ember route that the user can access with a mouse click, keypress, or touch. It typically has a distinct color to distinguish it from static text.

This component wraps HTML's [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) element.

#### Examples

Link to Ember Route

```jsx
// loadExample('./exampleEmber')
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=elements|EmberRouteLink).

#### Usage

- _Do_ EmberRouteLink should be used to navigate to an ember route.
- _Don't_ EmberRouteLink can NOT be used for normal navigation. Use [Link](#!/Link) instead.
- _Don't_ EmberRouteLink can NOT be used for actions or to submit data. Use [Button](#!/Button) instead.
- _States & Variants_ Any text in our typeramp can be used with EmberRoutelink. EmberRouteLink components have normal, hover, focus, active, and disabled states.

#### Content Guidelines

The link text should be descriptive, allowing the user to know ahead of time where they will go or how the page will
update. Avoid generic content such as "click here".

##### Format

Use Title Case or Sentence case, depending on context.

#### Implementation Notes

- [Sketch symbol](https://sketch.cloud/s/8yRwY/all/symbols/typography-link)

#### Related

- [EmberRouteLink](#!/EmberRouteLink) for redirecting to an Ember route
- [Button](#!/Button) for actions

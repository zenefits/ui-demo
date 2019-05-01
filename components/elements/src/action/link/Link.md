Interactive text that references other sections or screens that the user can access with a mouse click, keypress, or touch. It typically has a distinct color to distinguish it from static text. Not all interactive text is necessarily a link, despite sharing link styling.

This component wraps HTML's [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) element.

#### Examples

Standard link:

```jsx
// loadExample('./exampleHref')
```

Route link (using `to` like [react-router](https://reacttraining.com/react-router/web/api/Link)):

```jsx
// loadExample('./exampleRoute')
```

External link:

```jsx
// loadExample('./exampleExternal')
```

Convenience links for emails and phone numbers:

```jsx
// loadExample('./exampleConvenience')
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=elements|Link).

#### Usage

- _Do_ Links should be used to navigate the user to another place or state.
- _Don't_ Links should NOT be used for actions or to submit data. Use [Button](#!/Button) instead.
- _Don't_ Links should NOT be used to navigate to Ember routes. Use [EmberRouteLink](#!/EmberRouteLink) instead.
- _States & Variants_ Any text in our type ramp can be used as a link. Links have normal, hover, focus, active,
  and disabled states.

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
- [NavBar](#!/NavBar) for a navigation menu
- [ReadMore](#!/ReadMore) for revealing more content

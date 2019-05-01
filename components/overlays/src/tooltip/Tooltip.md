A component which displays helper content when a user hovers over or focuses on an element.

#### Examples

Hover over element to see tooltip. The direction is configurable.

```jsx
// loadExample('./exampleHoverTop');
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=overlays|Tooltip).

#### Usage

- Use tooltips to display simple descriptive information for controls such as icons, buttons or labels
- Don't use tooltips if the user needs to interact with the content (ex: no links)
- Don't use for primary information that the user needs to know
- In most cases tooltips should use a hover trigger event

#### Related

- [Popover](#!/Popover)

#### Known issues

If your target body has multiple top level DOM nodes, hover will only work on the first one. For example:

```jsx static
const targetBody = (
  <>
    <span>Text</span>
    <Box w={1} height={1} bg="primary.a" />
  </>
);
```

Hovering will only work on the span. The workaround would be to wrap the content in a DOM element such as a div.

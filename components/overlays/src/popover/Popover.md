A popover is a view which appears above the content on screen when the user clicks on a specific target area.

#### Examples

Click to show popover (top):

```jsx
// loadExample('./exampleClickTop')
```

Click to show popover (right):

```jsx
// loadExample('./exampleClickRight')
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=overlays|Popover).

#### Usage

- If you're showing basic text information use [Information Popover](#!/InformationPopover) instead
- Use popovers to show additional, contextual information without interupting the user's current workflow
- Use popovers when you want to show more complex content than you would in a tooltip
- Interactive content is OK
- In most cases popovers should use a click trigger event

#### Implementation Notes

- [Sketch cloud examples](https://sketch.cloud/s/8yRwY/all/react-library/z-popover)

#### Related

- [Information popover](#!/InformationPopover)
- [Tooltip](#!/Tooltip)

#### Known issues

If your target body has multiple top level DOM nodes, click will only work on the first one. For example:

```jsx static
const targetBody = (
  <>
    <span>Text</span>
    <Box w={1} height={1} bg="primary.a" />
  </>
);
```

Clicking will only work on the span. The workaround would be to wrap the content in a DOM element such as a div.

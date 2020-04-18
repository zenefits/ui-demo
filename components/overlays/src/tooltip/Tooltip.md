A component which displays helper content when a user hovers over or focuses on an element.

#### Examples

Hover to see the tooltip. The direction is configurable.

```jsx noeditor
<StorybookExample selectedKind="overlays|Tooltip" selectedStory="default" />
```

#### Usage

- Use tooltips to display simple descriptive information for controls such as icons, buttons or labels
- Don't use tooltips if the user needs to interact with the content (ex: no links)
- Don't use for primary information that the user needs to know

#### Related

- [Popover](#!/Popover)
- [InfoButton](#!/InfoButton)
- [InformationPopover](#!/InformationPopover)
- [Form `helpText`](#!/Form)

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

Component that truncates a single line of text with ellipsis (...) as necessary. Full text is displayed in a tooltip
on hover/click/touch/focus.

#### Examples

```jsx
// loadExample('./exampleDefault')
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=elements|Ellipsis).

#### Usage

- Use when content is user-entered or otherwise dynamic (difficult to know how much space to allocate).
- Use when the layout would be compromised by the content wrapping to a new line.
- Do not use when the user can see the entire text on a subsequent screen anyway. In that case, just use
  [TextBlock](#!/TextBlock) with the `ellipsis` prop (which avoids the tooltip).

#### Implementation Notes

This component does not rely on the [HTML `title` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title),
which is useless on touch devices (only activates on hover). Instead, a simple tooltip is displayed that approximates
the browser default tooltip.

This approach has a few advantages:

1.  It displays on touch-only devices.
1.  It displays when navigated with a keyboard.
1.  The full text can be copy and pasted.
1.  The "tooltip" can be styled based on our theme.

#### Related

- [ReadMore](#!/ReadMore) for multi-line text that expands inline
- [TextBlock](#!/TextBlock) with `ellipsis` prop

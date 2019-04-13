Utility component that hides content at specified breakpoints. This is provided as a convenience instead of
manually writing [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries).
See [Responsiveness](#!/Responsiveness) for more details.

#### Examples

```jsx
// loadExample('./exampleHide')
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=theme|HideFor).

#### Usage

- Use this to hide content that doesn't work well on smaller viewports, such as table headers.
- Do not hide essential content.
- Do not use this to hide content from screen readers. Instead, use a "visually hidden" style that leaves the content
  in the document.
- Note that many existing components, eg [OverviewLayout](#!/OverviewLayout), already manage their own breakpoints.

#### Related

- [RenderFor](#!/RenderFor)

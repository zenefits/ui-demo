Utility component that hides content based on certain conditions.
This is provided as a convenience instead of manually writing [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) or custom checks.
See [Responsiveness](#!/Responsiveness) for more details.

#### Examples

```jsx
// loadExample('./exampleHide')
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=theme|Hide).

#### Usage

- Use this to hide content based on certain conditions such as breakpoints or platform.
- Do not hide essential content.
- Do not use this to hide content from screen readers. Instead, use a "visually hidden" style that leaves the content in the document.
- Note that many existing components, eg [OverviewLayout](#!/OverviewLayout), already manage their own breakpoints.

#### Related

- [Render](#!/Render)

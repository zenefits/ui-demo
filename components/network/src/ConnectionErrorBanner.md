An error banner that automatically will be shown if either the browser loses connection
or if a network request to /session_test fails

#### Examples

```jsx noeditor
<StorybookExample selectedKind="network|ConnectionErrorBanner" selectedStory="default" height="80px" />
```

#### Implementation Notes

This component depends on context provided by `ConnectionManager`.

Only Chrome and Opera currently fire connection change events, so other browsers will rely solely on fetch requests to `/session_test` for this banner.

Fetch requests to `/session_test` won't fire in development mode.

#### Related

- [Banner](#!/Banner)

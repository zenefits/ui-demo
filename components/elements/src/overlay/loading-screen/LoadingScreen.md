Use a `LoadingScreen` to indicate to the user that content is loading without showing specific progress.
This component will animate continuously.

#### Examples

```jsx
// loadExample('./exampleDefault')
```

The typical way to use `LoadingScreen` is to simply stop rendering it once loading is complete:

```jsx
// loadExample('./exampleRender')
```

#### Usage

- For initial page loads, consider using [Skeleton](#!/Skeleton) instead.
- For indicating that a user-initiated task is loading, use [Button](#!/Button) with `inProgress`.
- Avoid multiple loading spinners on screen at a time.
- Consider adding loading text (prop `loadingText`) for extra context shown below the loading spinner.

#### Implementation Notes

- This component will automatically center itself within the available horizontal and vertical space relative to
  its nearest positioned ancestor (or, if none, the `<body>` of the page).

#### Related

- [LoadingSpinner](#!/LoadingSpinner)
- [Skeleton](#!/Skeleton)
- [Button](#!/Button) with `inProgress`

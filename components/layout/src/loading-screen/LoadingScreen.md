Use a `LoadingScreen` to indicate to the user that content is loading without showing specific progress.
This component will animate continuously.

```jsx
// loadExample('./exampleDefault')
```

The typical way to use `LoadingScreen` is to simply stop rendering it once loading is complete:

```jsx
// loadExample('./exampleRender')
```

Note that this component will automatically center itself within the available horizontal and vertical space relative to
its nearest positioned ancestor (or, if none, the `<body>` of the page).

For indicating that a user-initiated task is loading, see [`<Button inProgress>`](#button).

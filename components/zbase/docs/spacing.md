To promote layout consistency, our theme includes a standardized spacing scale:

```jsx
<SpacingGuide />
```

All Zenefits components support convenient props for margin and padding that are based on this scale,
reducing the need for one-off spacing styles within applications.

* `m` (margin)
* `mt` (margin-top)
* `mr` (margin-right)
* `mb` (margin-bottom)
* `ml` (margin-left)
* `mx` (margin-left and margin-right)
* `my` (margin-top and margin-bottom)

* `p` (padding)
* `pt` (padding-top)
* `pr` (padding-right)
* `pb` (padding-bottom)
* `pl` (padding-left)
* `px` (padding-left and padding-right)
* `py` (padding-top and padding-bottom)

Use an integer value like `p={3}` to reference the spacing scale:

```jsx
// loadExample('spacingInteger')
```

Negative margins work as expected:

```jsx
// loadExample('spacingNegative')
```

String values can also be used:

```jsx
// loadExample('spacingString')
```

Specifying an array gives you responsive spacing at specific breakpoints:

<!-- TODO: link to responsive section with more details on breakpoints -->

```jsx
// loadExample('spacingResponsive')
```

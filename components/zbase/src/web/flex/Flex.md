A block-level container that simplifies layout and alignment using the [CSS Flexible Box Module](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) (commonly known as "flexbox").

The `Flex` component is implicitly a flex container. Flex containers enable flex props for all their immediate children,
which are called "flex items".

Common use cases are handled using grid layouts (see [Grid](#!/Grid)), but Flex is much more versatile. For convenience,
the most common flexbox-related CSS properties are available as `Flex` props. For full details on each property, see [A complete guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

#### Flex containers

Use the `direction` prop to specify the main axis by which items are placed within the container: left to right (`row`, which is the
default) or top to bottom (`column`). There is also a boolean `column` shorthand to make this even easier (equivalent
to `direction="column"`). It is also often useful to vary the direction responsively:

```jsx
// loadExample('./exampleDirection')
```

The `justify` prop defines alignment along that main axis:

```jsx
// loadExample('./exampleJustify')
```

The `align` prop is largely the same as `justify` but for the cross (perpendicular) axis:

```jsx
// loadExample('./exampleAlign')
```

#### Flex items

Flex items (often `<Flex>` or `<Box>`, but can be anything) are usually laid out in source order but this can be
overridden with `order`:

```jsx
// loadExample('./exampleOrder')
```

Similarly, items may specify how they grow and shrink via `flex`:

```jsx
// loadExample('./exampleFlex')
```

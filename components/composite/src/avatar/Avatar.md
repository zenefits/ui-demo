A component that renders an avatar using either a photo (if provided) or name initials.

#### Examples

Different sizes:

```jsx noeditor
<StorybookExample selectedKind="composites|Avatar" selectedStory="sizes" />
```

When representing companies, you should use `isSquare` and `imageFit="contain"`:

```jsx noeditor
<StorybookExample selectedKind="composites|Avatar" selectedStory="square corners, contain (company)" />
```

When representing contractors, you should use `badge` to turn on the badge:

```jsx noeditor
<StorybookExample selectedKind="composites|Avatar" selectedStory="Avatar with Badge" />
```

With tooltips:

```jsx noeditor
<StorybookExample selectedKind="composites|Avatar" selectedStory="Avatar tooltips" />
```

#### Usage

- Only use for employees or companies.
- Do not use for all images.

#### Content Guidelines

- Always provide a name, which will include `alt` text for accessibility.

#### Related

- [Image](#!/Image)

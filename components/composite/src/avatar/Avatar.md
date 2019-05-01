A component that renders an avatar using either a photo (if provided) or name initials.

#### Examples

Using only `firstName` and `lastName` props (no photo available):

```jsx
// loadExample('./exampleDefault')
```

With `photoUrl`:

```jsx
// loadExample('./examplePhoto')
```

When representing companies, you should use `isSquare` and `imageFit="contain"`:

```jsx
// loadExample('./exampleCompany')
```

When representing contractors, you should use `badge` to turn on the badge:

```jsx
// loadExample('./exampleBadge')
```

With tooltips:

```jsx
// loadExample('./exampleTooltips')
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=composites|Avatar&selectedStory=sizes&full=0&addons=1&stories=1&panelRight=0).

#### Usage

- Only use for employees or companies.
- Do not use for all images.

#### Content Guidelines

- Always provide a name, which will include `alt` text for accessibility.

#### Related

- [Image](#!/Image)

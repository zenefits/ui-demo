A simple wrapper around [Button](#!/Button). A label is optional.

#### Examples

With an icon and `onClick`:

```jsx
<IconButton iconName="edit" onClick={() => alert('time to edit')} />
```

With a label:

```jsx
<IconButton iconName="edit" onClick={() => alert('time to edit')}>
  Edit
</IconButton>
```

The `s` and util props work as you would expect:

```jsx
<Box>
  <IconButton iconName="download" s="xsmall" mr={2} />
  <IconButton iconName="download" s="small" mr={2} />
  <IconButton iconName="download" s="medium" mr={2} />
  <IconButton iconName="download" s="large" />
</Box>
```

#### Usage

- The icon used should be consistent with other areas of Zenefits.

#### Content Guidelines

- Copy should follow the same guidelines as [Button](#!/Button).

#### Related

- [Button](#!/Button)
- [Icon](#!/Icon)

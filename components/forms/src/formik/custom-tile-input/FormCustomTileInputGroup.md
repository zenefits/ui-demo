A form component to render a group of CustomTileInputs which are visually grouped.

#### Examples

Use with checkbox inputs:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.CustomTileInputGroup" selectedStory="Checkbox" />
```

Use with radio inputs:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.CustomTileInputGroup" selectedStory="Radio" />
```

Use with tiles containing values and accompanying labels:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.CustomTileInputGroup" selectedStory="With labels" />
```

#### Content Guidelines

See general field label and error guidelines.

#### Usage guidelines

- Use when you want your CustomTileInput's to render as a grouped list
- When tiles have labels use the `stackMobileVertically` prop so tiles stack vertically. When tiles only contain values don't use this prop so that tiles will render horizontally

#### Implementation Notes

- Currently this component will not generate a list of checkbox values in state. When used in checkbox mode you will get values in the form `{checkbox1: true, checkbox2: false}`

#### Related

- [Form.CustomTileInput](#!/Form.CustomTileInput)

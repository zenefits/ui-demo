A form component to render a group of CustomTileInputs which are visually grouped.

#### Examples

Use with checkbox inputs:

```jsx noeditor
<StorybookExample selectedKind="forms|FormCustomTileInputGroup" selectedStory="Checkbox" />
```

Use with radio inputs:

```jsx noeditor
<StorybookExample selectedKind="forms|FormCustomTileInputGroup" selectedStory="Radios" />
```

Use with tiles containing values and accompanying labels:

```jsx noeditor
<StorybookExample selectedKind="forms|FormCustomTileInputGroup" selectedStory="With external labels" />
```

#### Content Guidelines

See general field label and error guidelines.

#### Usage guidelines

- Use when you want your CustomTileInputs to render as a grouped list
- When tiles have labels use the `stackMobileVertically` prop so tiles stack vertically. When tiles only contain values don't use this prop so that tiles will render horizontally

#### Implementation Notes

- In checkbox mode, this component generates a list of checkbox values in state, e.g. `{ proteins: ['Beef', 'Pork', 'Chicken'] }`

#### Related

- [FormCustomTileInput](#!/FormCustomTileInput)
- [FormRadioGroup](#!/FormRadioGroup)
- [FormCheckboxGroup](#!/FormCheckboxGroup)

We use buttons to confirm the path or action a user takes.

The following Button components are closely related to Button:

- [LinkButton](#!/LinkButton) is for de-emphasized or uncommon actions (looks like a link)
- [IconButton](#!/IconButton) includes an icon and a label
- [InfoButton](#!/InfoButton) includes an underline
- Button.RouteLink navigates to a new route
- Button.Link navigates to a new page

#### Examples

```jsx
<Button>Click Me</Button>
```

The `mode` prop controls the style of button (see Usage below) and the `s` prop controls the size:

```jsx
<ButtonGuide />
```

Buttons also support different states:

```jsx
// loadExample('./exampleDisabled')
```

#### Usage

```jsx noeditor
<FigmaFile
  height={1850}
  url="https://www.figma.com/file/OKdw775cxzrwQhGNm1SYM8ZD/Zenebits-Figma-Embed?node-id=24%3A294"
/>
```

#### Related

- [LinkButton](#!/LinkButton)
- [IconButton](#!/IconButton)
- [InfoButton](#!/InfoButton)
- [ButtonDropdown](#!/ButtonDropdown)
- [ButtonGroup](#!/ButtonGroup)
- [Form.Footer](#!/Form.Footer) - Provides default form submit buttons

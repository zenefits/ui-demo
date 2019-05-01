We use buttons to confirm the path or action a user takes.

The following Button components are closely related:

- `Button` triggers an action via `onClick`
- `Button.RouteLink` transitions to a route
- `Button.Link` transitions to a new page
- [`IconButton`](#!/IconButton) includes an icon and has an optional label
- [`InfoButton`](#!/InfoButton) includes an underline

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

- Primary buttons are for the main call to action. There should only ever be one.
- Default buttons are for secondary actions (eg Cancel).
- Transparent buttons should always include an icon. By default, [IconButton](#!/IconButton) uses transparent.
- For providing more info in context, use an [InfoButton](#!/InfoButton).

#### Content Guidelines

Using `Title Case`, our buttons are verb-based with concise direction or affirmation. When we use buttons for validation,
button labels should reflect the task by utilizing the same language as the header or message body.
Try to focus on the idea, rather than the specific task.

```jsx
<Flex column align="flex-start" mb={3}>
  <TextBlock bold>Do:</TextBlock>
  <Button mb={2}>Continue</Button>
  <Button mb={3}>Delete Template</Button>

  <TextBlock bold>Avoid:</TextBlock>
  <Button mb={3}>Next Page</Button>

  <TextBlock bold>Never:</TextBlock>
  <Button>I Want to Delete This Template</Button>
</Flex>
```

#### Related

- [ButtonDropdown](#!/ButtonDropdown)
- [ButtonGroup](#!/ButtonGroup)
- [IconButton](#!/IconButton)
- [InfoButton](#!/InfoButton)
- [Link](#!/Link)
- [Form.Footer](#!/Form.Footer) - Provides default form submit buttons

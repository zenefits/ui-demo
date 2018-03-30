Basic usage:

```jsx
<Button>Click me</Button>
```

The `mode` prop controls the style of button and the `s` prop controls the size:

```jsx
<Table columnWidths={[1 / 4, 1 / 4, 1 / 4, 1 / 4]} w={2 / 3}>
  <Table.Header>
    <div />
    <div>default</div>
    <div>primary</div>
    <div>transparent</div>
  </Table.Header>
  <Table.Row>
    <div>large</div>
    <Button s="large">Click me</Button>
    <Button s="large" mode="primary">
      Click me
    </Button>
    <Button s="large" mode="transparent">
      Click me
    </Button>
  </Table.Row>
  <Table.Row>
    <div>medium</div>
    <Button s="medium">Click me</Button>
    <Button s="medium" mode="primary">
      Click me
    </Button>
    <Button s="medium" mode="transparent">
      Click me
    </Button>
  </Table.Row>
  <Table.Row>
    <div>small</div>
    <Button s="small">Click me</Button>
    <Button s="small" mode="primary">
      Click me
    </Button>
    <Button s="small" mode="transparent">
      Click me
    </Button>
  </Table.Row>
  <Table.Row>
    <div>xsmall</div>
    <Button s="xsmall">Click me</Button>
    <Button s="xsmall" mode="primary">
      Click me
    </Button>
    <Button s="xsmall" mode="transparent">
      Click me
    </Button>
  </Table.Row>
</Table>
```

Buttons also support these props:

* `disabled` - eg, a submit button when form is invalid
* `inProgress` - eg, a form is submitting (implies `disabled`)

```jsx
<div>
  <Button disabled mr={3}>
    Click me - disabled
  </Button>
  <Button inProgress>Click me - inProgress</Button>
</div>
```

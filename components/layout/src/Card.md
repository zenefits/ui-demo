Cards consist of 1 or more rows with an optional header and footer. By default, they are 100% width.

```jsx
<Card>
  <Card.Header>Header</Card.Header>
  <Card.Row>Row 1</Card.Row>
  <Card.Row>Row 2</Card.Row>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

Actions are typically located in the footer and right-aligned:

```jsx
<Card w={1 / 3}>
  <Card.Header>Preferences</Card.Header>
  <Card.Row>
    <Checkbox label="Beef" />
    <Checkbox label="Chicken" />
    <Checkbox label="Pork" />
  </Card.Row>
  <Card.Footer>
    <Flex justify="flex-end">
      <Button mr={2}>Back</Button>
      <Button mode="primary">Save</Button>
    </Flex>
  </Card.Footer>
</Card>
```

Row padding can be disabled for situations where the content is already padded (eg `<FormRow>`).

```jsx
<Card w={1 / 2}>
  <Card.Header>Header</Card.Header>
  <Card.Row padded={false}>No padding</Card.Row>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

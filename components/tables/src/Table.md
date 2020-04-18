A component that displays tabular data in a two-dimensional grid consisting of rows and columns.

#### Examples

A `Table` consists of:

- A `Table.Header` providing labels for each column
- One or more (often dynamic) `Table.Row`s with the data to present for each column
- (Optional) One or more `Table.Footer`s which summarize the data in each column

```jsx
<Table columnWidths={[1 / 4, 1 / 4, 1 / 4, 1 / 4]}>
  <Table.Header>
    <Box>Name</Box>
    <Box>Department</Box>
    <Box>Hire date</Box>
    <Flex justify="flex-end">Months employed</Flex>
  </Table.Header>
  <Table.Row>
    <Box>Farley Adams</Box>
    <Box>Sales</Box>
    <Box>July 23, 2016</Box>
    <Flex justify="flex-end">20</Flex>
  </Table.Row>
  <Table.Row>
    <Box>Amy Sanders</Box>
    <Box>Marketing</Box>
    <Box>June 12, 2017</Box>
    <Flex justify="flex-end">7</Flex>
  </Table.Row>
  <Table.Row>
    <Box>…</Box>
    <Box>…</Box>
    <Box>…</Box>
    <Flex justify="flex-end">…</Flex>
  </Table.Row>
  <Table.Footer>
    <Box>Average</Box>
    <Box />
    <Box />
    <Flex justify="flex-end">13.5</Flex>
  </Table.Footer>
</Table>
```

##### Width

By default, tables have 100% width. Use the `width` prop to override this for tables with limited content.

```jsx
<Table columnWidths={[2 / 4, 1 / 4, 1 / 4]} w={1 / 2}>
  <Table.Header>
    <Box>Name</Box>
    <Box>Department</Box>
  </Table.Header>
  <Table.Row>
    <Box>Farley Adams</Box>
    <Box>Sales</Box>
  </Table.Row>
  <Table.Row>
    <Box>Amy Sanders</Box>
    <Box>Marketing</Box>
  </Table.Row>
</Table>
```

##### Alignment

Columns are left aligned by default. To enhance readability, use right alignment for numeric columns and data.

Buttons should also be right aligned and do not require a column label.

```jsx
<Table columnWidths={[1 / 3, 1 / 3, 1 / 3]} w={2 / 3}>
  <Table.Header>
    <Box>Name</Box>
    <Box>Department</Box>
    <Box />
  </Table.Header>
  <Table.Row>
    <Box>Farley Adams</Box>
    <Box>Sales</Box>
    <Flex justify="flex-end">
      <Button>Contact</Button>
    </Flex>
  </Table.Row>
  <Table.Row>
    <Box>Amy Sanders</Box>
    <Box>Marketing</Box>
    <Flex justify="flex-end">
      <Button>Verify details</Button>
    </Flex>
  </Table.Row>
</Table>
```

#### Usage

- DO NOT USE if row selection is needed. Use DataTable which has row selection built-in.

#### Implementation Notes

##### Sortable tables

Use the `Table.SortableHeaderCell` component to build sortable tables. The current convention is for sort params to be stored in url's query and for the consumer to implement the filtering and sorting but this should be improved upon.

See [example](http://ui.zenefits.com/app/stories/?selectedKind=tables|Table&selectedStory=sorted).

#### Related

- [Table.AvatarCell](#!/Table.AvatarCell) Renders a cell containing an avatar and name.
- [Table.CheckboxCell](#!/Table.CheckboxCell) Renders a cell containing a single checkbox.
- [Table.HeaderCell](#!/Table.HeaderCell) Base styling for a header cell along with options to show a tooltip or icon.
- [Table.SortableHeaderCell](#!/Table.SortableHeaderCell) Header cell used for building sortable tables.
- [DataTable](#!/DataTable)

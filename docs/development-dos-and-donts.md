This guide is a list of commonly seen issues in z-frontend PRs. Please read this document and check to make sure your code follows these guidelines before assigning your PR for review.

### DOs:

#### _Do_ follow our component best practices

See the [component best practices guide](http://ui.zenefits.com/#!/Component%20Best%20Practices)

#### _Do_ use specific types

Please use as specific types as possible.

When a variable may only be a set number of possibilities, use a union type.

```ts static
// Wrong
const myMealSelection: string = form.values.mealSelection;

// Right
type MealSelectionOptions = 'chicken' | 'tofu';
const myMealSelection: MealSelectionOptions = form.values.mealsSelection;
```

Using the `any` keyword should be avoided and only used when necessary.

#### _Do_ follow our code style guide

See the [code style guide](https://github.com/zenefits/javascript).

Note: most of code style-related issues will be enforced by prettier.

#### _Do_ include screenshots in pull requests

If your PR affects some UI, please include screenshots demonstrating the changes.

### DON'Ts:

#### _Don't_ make backwards incompatible changes in our GraphQL schema

Our schema is [versionless](https://graphql.org/learn/best-practices/#versioning), so we need to be careful not to break existing queries when we change the schema in yourPeople3.

If you need to rename a field, please add a new one first, mark the old one as @deprecated and then update the z-frontend queries after:

```gql static
   pageNum: Int
   page_num: Int @deprecated
```

Each app in z-frontend tests its queries against the production (deployed) schema to prevent merging code in z-frontend that is not compatible. However, this doesn't protect us against the other side (yourPeople3) introducing an incompatibility.

#### _Don't_ keep form state in your components

Our [Form](#!/Form) component already keeps the state of your input, so saving it externally is unnecessary.

```jsx static
// Wrong
<Form onSubmit={() => {}}>
  Entered name: {{ this.state.myName }}
  <Form.Input name="myName" onChange={(value) => this.setState({ myName: value })} />
</Form>

// Right
<Form onSubmit={() => {}}>
  {(values) => (
    <>
      Entered name: {{ values.myName }}
      <Form.Input name="myName" />
    </>
  )}
</Form>
```

#### _Don't_ keep modal or dialog state in your components

Modals or dialogs should always pull state from [DialogManager](#!/DialogManager) or
[DialogsManager](#!/DialogsManager) component.

```jsx static
// wrong
<Button onClick={() => this.setState({open: true})}>Show</Button>
{this.state.open && <MyModal />}

// right
<DialogManager
  {(dialog) => (
    <>
      <MyModal {...dialog} />
      <Button onClick={dialog.open} />
    </>
  )}
```

#### _Don't_ use level to control heading size

Level should only be used to specify where a heading exists in the page flow.
To change how a heading appears, use fontStyle prop.

```jsx static
// Wrong (when there is no heading level={2} on the page)
<Heading level={3} />

// Right
<Heading level={2} fontStyle="headings.l" />
```

#### _Don't_ add external dependencies without consulting UIE team

We try hard to keep our bundles small for performance reasons.

A widget that allows selecting one or more options with autocomplete enabled. Each option value may be
a serialized object, object reference, or a string from a set list of options. Supports grouped options.

If you are not sure whether this is the correct component for your use case, please consult the
[Select guide](#!/Select%20Components).

#### Examples

```jsx noeditor
<StorybookExample selectedKind="forms|Form.MultiSelect" selectedStory="default" height="300px" />
```

Custom rendered options:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.MultiSelect" selectedStory="custom rendering" height="300px" />
```

#### Usage

- USE when user will select multiple options from a list of options
- If the number of options is small, consider using [FormCheckboxGroup](#!/FormCheckboxGroup) instead

#### Content Guidelines

- Sort options in a logical order.

See general field label and error guidelines.

#### Implementation Notes

##### Types

A generic type must be passed into specifying the option type.

##### Children

The render function in this case will provide two components as parameters: `SelectOption` and `SelectGroup`.
These components should be used to specify options and groups respectively.

A few more helpers are also provided as render parameters:

- `inputValue` - the current value of the input
- `multiOptionFilter` - function to filter options that have not yet been selected AND either contain a substring matching
  the input value (if the option is a string) or has a property value contains a substring matching the input value
- `withMatchEmphasis` - function that transforms text into JSX with substring matching the current input in bold
- `NewOption` - See below

##### Adding New Option

This select component supports adding options that, instead of selecting an existing value,
will fire a callback to add a new option. To do this, use the `NewOption` component when returning in your render function (see example). Similarly to `SelectOption`, any JSX
may be inserted as children of the `NewOption` component. If using JSX children and not
a render prop function, `Form.NewOption` may be used instead of the render prop paramater.

Additionally, the prop `onCreateNewOption` must be passed to the Select component. This callback will fire when the "add new" option is selected from the dropdown. Because options are passed
to this component externally, the process the actually add or persist the new option must be
handled externally as well.

#### Related

- [FormSelect](#!/FormSelect)
- [FormCheckboxGroup](#!/FormCheckboxGroup)

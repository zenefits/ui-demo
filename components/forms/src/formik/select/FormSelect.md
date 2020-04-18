A widget that allows selecting an option with autocomplete enabled. Field value may be
a serialized object, object reference, or a string from a set list of options. Supports grouped options.

If you are not sure whether this is the correct component for your use case, please consult the
[Select guide](#!/Select%20Components).

#### Examples

```jsx noeditor
<StorybookExample selectedKind="forms|Form.Select" selectedStory="default" height="300px" />
```

Grouped options:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.Select" selectedStory="groups" height="300px" />
```

Adding a new option from the select:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.Select" selectedStory="add new option" height="300px" />
```

Async options loading example:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.Select" selectedStory="async option loading" height="300px" />
```

Custom rendered options:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.Select" selectedStory="custom rendering" height="300px" />
```

#### Usage

- USE when user can only choose an option from set list of options
- DO NOT USE if a text input with free input is needed (eg. entering an arbitrary search term). Instead use [FormSearchSelect](#!/FormSearchSelect)
- [FormRadioGroup](#!/FormRadioGroup) or [FormOpenListSelect](#!/FormOpenListSelect) are alternatives approaches to option selection. Please consult a designer if you are unsure which component to use.

#### Content Guidelines

- Sort options in a logical order.

See general field label and error guidelines.

#### Implementation Notes

##### Types

If values for the field and each option should be objects and NOT strings, then a generic
type must be passed into specifying the option type. See [example](http://ui.zenefits.com/app/stories/?selectedKind=forms|Form.Select&selectedStory=generic%20option%20type).

##### Children

The render function in this case will provide two components as parameters: `SelectOption` and `SelectGroup`.
These components should be used to specify options and groups respectively.

A few more helpers are also provided as render parameters:

- `inputValue` - the current value of the input
- `basicOptionFilter` - function to filter options that either contain a substring matching input value (if the option
  is a string) or have a property value thats string representation contains a substring matching the input value
- `withMatchEmphasis` - function that transforms text into JSX with substring matching the current input in bold
- `NewOption` - See below

##### Adding New Option

This select component supports adding options that, instead of selecting an existing value,
will fire a callback to add a new option. To do this, use the `NewOption` component when returning in your render function (see example). Similarly to `SelectOption`, any JSX may be inserted as children of the `NewOption` component.

Additionally, the prop `onCreateNewOption` must be passed to the Select component. This callback will fire when the "add new" option is selected from the dropdown. Because options are passed
to this component externally, the process the actually add or persist the new option must be
handled externally as well.

#### Related

- [FormSimpleSelect](#!/FormSimpleSelect)
- [FormMultiSelect](#!/FormMultiSelect)
- [FormSearchSelect](#!/FormSearchSelect)
- [FormOpenListSelect](#!/FormOpenListSelect)
- [FormRadioGroup](#!/FormRadioGroup)

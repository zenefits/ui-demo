A text input field with autocomplete enabled. Field value will ALWAYS be a string, not
a serialized object or object reference. Supports grouped options.

If you are not sure whether this is the correct component for your use case, please consult the
[Select guide](#!/Select%20Components).

#### Examples

Basic example:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.SearchSelect" selectedStory="default" />
```

With async option loading:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.SearchSelect" selectedStory="async option loading" />
```

With expanded input and no search icon:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.SearchSelect" selectedStory="expanded, no icon" />
```

#### Usage

- USE when the value that will be submitted with the form should be a string query
- An additional action MAY be registered on option select.
- DO NOT USE if the value of the field will be a selected object.
  Instead use [FormSelect](#!/FormSelect) or [FormOpenListSelect](#!/FormOpenListSelect)

#### Content Guidelines

- Sort options in a logical order.

See general field label and error guidelines.

#### Implementation Notes

The render function in this case will provide two components as parameters: `SelectOption` and `SelectGroup`.
These components should be used to specify options and groups respectively.

A few more helpers are also provided as render parameters:

- `inputValue` - the current value of the input
- `basicOptionFilter` - function to filter options that either contain a substring matching input value (if the option
  is a string) or have a property value thats string representation contains a substring matching the input value
- `withMatchEmphasis` - function that transforms text into JSX with substring matching the current input in bold

#### Related

- [FormSelect](#!/FormSelect)
- [FormOpenListSelect](#!/FormOpenListSelect)

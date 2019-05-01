A widget that allows selecting an option WITHOUT autocomplete enabled. Field value may be
a serialized object, object reference, or a string from a set list of options. Supports grouped options.

If you are not sure whether this is the correct component for your use case, please consult the
[Select guide](#!/Select%20Components).

#### Examples

String options:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.SimpleSelect" selectedStory="default" height="300px" />
```

Object options:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.SimpleSelect" selectedStory="option values as objects" height="300px" />
```

Grouped options:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.SimpleSelect" selectedStory="grouped options" height="300px" />
```

#### Usage

- USE when user the user must choose an small (`<10`) number of fixed options
- Do NOT use if autocomplete is necessary. Instead use [Form.Select](#!/Form.Select)

#### Content Guidelines

- Sort options in a logical order.

See general field label and error guidelines.

#### Implementation Notes

##### Types

A generic type must be passed into specifying the type of the value of each option.

##### Children

The child of this component follows the render function as children pattern.
The render function in this case will provide two components as parameters: `SelectOption` and `SelectGroup`.
These components should be used to specify options and groups respectively.
Because these components will map to native html option and optgroup nodes, no other components should be included
in the JSX returned by this component.

#### Related

- [Form.Select](#!/Form.Select)
- [Form.OpenListSelect](#!/Form.OpenListSelect)
- [Form.RadioGroup](#!/Form.RadioGroup)

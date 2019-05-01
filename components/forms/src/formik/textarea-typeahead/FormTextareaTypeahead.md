A textarea field with autocomplete enabled. Autocomplete will only affect the completion
of the last word (separated by whitespace) of the field

If you are not sure whether this is the correct component for your use case, please consult the
[Select guide](#!/Select%20Components).

#### Examples

Basic example:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.TextareaTypeahead" selectedStory="default" height="300px" />
```

#### Usage

- USE in cases when the contents of a text field may include keywords from a set list, and it is
  beneficial to provide autocomplete support for those keywords.
- DO NOT USE if selecting a keyword needs to have any effect other than updating the text value of the input.
- If the textarea needs to contain data references, use [Form.MentionTextarea](#!/Form.MentionTextarea)

#### Content Guidelines

- Sort options in a logical order.

See general field label and error guidelines.

#### Implementation Notes

#### Providing options

Options and Option Groups may be provided using the render function as children pattern shown in the example.
Options and option groups should be provided using the `SelectOption` and `SelectGroup` components provided to
the render functions.

- `inputValue` - the current value of the input
- `currentWordFilter` - function to filter options that start with the last word of the current field value
- `withMatchEmphasis` - function that transforms text into JSX with substring matching the current input in bold

Unlike other dropdown component, no generic type can be passed to FormTextareaTypeahead to specify option type.
Option values for this component should always be strings.

#### Filtering Options

It's recommended to use the provided currentWordFilter and withMatchEmphasis helpers provided as shown in the example.
However if more complex filtering is necessary, option values may be filtered manually as needed by the
application.

#### Related

- [Form.SearchSelect](#!/Form.SearchSelect)
- [Form.Textarea](#!/Form.Textarea)
- [Form.MentionTextarea](#!/Form.MentionTextarea)

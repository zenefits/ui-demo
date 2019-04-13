We have several components in our codebase that involve making a selection.
The purpose of this guide is to help designers and developers understand which components
should be used for each use case.

We categorize our components that incorporate selection (includes both true selects and other components
with autocomplete support) into three main groups: dedicated inputs, selects, and autocomplete text inputs.

### Dedicated Components

These inputs are dedicated to a specific kind of input. These components should be used if the value
being selected matches the category the input is dedicated to.

- [Form.AddressIntl](#!/Form.AddressIntl)
- [Form.TimeInput](#!/Form.TimeInput)
- [Form.TimeRange](#!/Form.TimeRange)
- [Form.DateInput](#!/Form.DateInput)
- [Form.DateRange](#!/Form.DateRange)
- [Form.WeekPicker](#!/Form.WeekPicker)
- [Form.DaysOfWeekSelect](#!/Form.DaysOfWeekSelect)

### Select Components

Our select components are

- [Form.Select](#!/Form.Select)
- [Form.SimpleSelect](#!/Form.SimpleSelect)
- [Form.MultiSelect](#!/Form.MultiSelect)
- [Form.CheckboxGroup](#!/Form.CheckboxGroup)
- [Form.RadioGroup](#!/Form.RadioGroup)
- [Form.CircleButtonSelect](#!/Form.CircleButtonSelect)
- [Form.OpenListSelect](#!/Form.OpenListSelect)

When using these components, the only valid value of the field is a selection (or selections, in the case of Form.MultiSelect) from a defined list of options.

In cases where there is autocomplete support, text input by the user that does not map to any defined options
is not a valid value for the form.

Use the following guidelines when deciding which component to use.

#### If multiple options needs to be selected:

If there are only a few options and space allows, [Form.CheckboxGroup](#!/Form.CheckboxGroup) should be used.
If each option can unambiguously be expressed as a single character, consider using [Form.CircleButtonSelect](#!/Form.CircleButtonSelect).

If there are a larger number of options, or if space is constrained, [Form.MultiSelect](#!/Form.MultiSelect) should be used instead.

#### If only one option needs to be selected:

If there are only a few options, and space allows, [Form.RadioGroup](#!/Form.RadioGroup) should be used.
If each option can be unambiguously expressed as a single character, consider using [Form.CircleButtonSelect](#!/Form.CircleButtonSelect) instead.

If only a few options are avaiable, and custom option rendering is not needed,
use [Form.SimpleSelect](#!/Form.SimpleSelect). This component uses html select tags and has a
simpler UX than the standard [Form.Select](#!/Form.Select).

In cases when there is a mid-sized (10-30) list of options that needs to be quickly visually parsed,
and space allows, consider using [Form.OpenListSelect](#!/Form.OpenListSelect).

In any other use case, use [Form.Select](#!/Form.Select).

### Text Input Autocomplete Components

These autocomplete components share the distinction that any free text may be entered and will be a
valid value for the inputs. In other words, the value of the input DOES NOT need to match a
provided option. The value of these fields will always be a string.

The two text fields in this category or [Form.SearchSelect](#!/Form.SearchSelect) and [Form.TextareaTypeahead](#!/Form.TextareaTypeahead).

#### Form.SearchSelect

This component integrates autocomplete support with a basic input component. When an option is selected, the contents
of the input will be replaced by the selected option.

#### Form.TextareaArea

This component uses autocomplete to edit a textarea component. When an option is selected, the last word that in
the textarea will be replaced by the selected word.

### Summary

| Component               | Type      | # of Options | Multiple Selections? | Groups? | Additional Notes                                             |
| ----------------------- | --------- | ------------ | -------------------- | ------- | ------------------------------------------------------------ |
| Form.Select             | Select    | `>10`        | No                   | Yes     |                                                              |
| Form.SimpleSelect       | Select    | `<~10`       | Yes                  | Yes     | Cannot custom render options                                 |
| Form.RadioGroup         | Select    | `<~6`        | No                   | Yes     | To-do: add groups example                                    |
| Form.MultiSelect        | Select    | `>~6`        | Yes                  | Yes     |                                                              |
| Form.CheckboxGroup      | Select    | `<~6`        | Yes                  | Yes     | May use with more options if several selections will be made |
| Form.OpenListSelect     | Select    | `~10-30`     | No                   | Yes     | Uses a lot of screen space                                   |
| Form.CircleButtonSelect | Select    | `<~7`        | Yes                  | No      | All options must be one character                            |
| Form.SearchSelect       | Text      | ANY          | No                   | Yes     |                                                              |
| Form.TextareaTypeaheead | Text      | ANY          | No                   | Yes     | Selection only affects last word                             |
| Form.AddressIntl        | Dedicated | N/A          | N/A                  | N/A     | Used to input address                                        |
| Form.AddressUS          | Dedicated | N/A          | N/A                  | N/A     | Used to input US address                                     |
| Form.TimeInput          | Dedicated | N/A          | No                   | N/A     | Used to input time                                           |
| Form.TimeRange          | Dedicated | N/A          | No                   | N/A     | Used to input time range                                     |
| Form.DateInput          | Dedicated | N/A          | No                   | N/A     | Used to input date                                           |
| Form.DateRange          | Dedicated | N/A          | No                   | N/A     | Used to input date range                                     |
| Form.WeekPicker         | Dedicated | N/A          | No                   | N/A     | Used to input week                                           |
| Form.DaysOfWeekSelect   | Dedicated | N/A          | No                   | N/A     | May be replaced with Form.SimpleSelect if space constrained  |

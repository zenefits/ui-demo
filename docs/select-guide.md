We have several components in our codebase that involve making a selection.
The purpose of this guide is to help designers and developers understand which components
should be used for each use case.

We categorize our components that incorporate selection (includes both true selects and other components
with autocomplete support) into three main groups: dedicated inputs, selects, and autocomplete text inputs.

### Dedicated Components

These inputs are dedicated to a specific kind of input. These components should be used if the value
being selected matches the category the input is dedicated to.

- [FormAddressIntl](#!/FormAddressIntl)
- [FormTimeInput](#!/FormTimeInput)
- [FormTimeRange](#!/FormTimeRange)
- [FormDateInput](#!/FormDateInput)
- [FormDateRange](#!/FormDateRange)
- [FormWeekPicker](#!/FormWeekPicker)
- [FormDaysOfWeekSelect](#!/FormDaysOfWeekSelect)

### Select Components

Our select components are

- [FormSelect](#!/FormSelect)
- [FormSimpleSelect](#!/FormSimpleSelect)
- [FormMultiSelect](#!/FormMultiSelect)
- [FormCheckboxGroup](#!/FormCheckboxGroup)
- [FormRadioGroup](#!/FormRadioGroup)
- [FormCircleButtonSelect](#!/FormCircleButtonSelect)
- [FormOpenListSelect](#!/FormOpenListSelect)

When using these components, the only valid value of the field is a selection (or selections, in the case of Form.MultiSelect) from a defined list of options.

In cases where there is autocomplete support, text input by the user that does not map to any defined options
is not a valid value for the form.

Use the following guidelines when deciding which component to use.

#### If multiple options needs to be selected:

If there are only a few options and space allows, [FormCheckboxGroup](#!/FormCheckboxGroup) should be used.
If each option can unambiguously be expressed as a single character, consider using [FormCircleButtonSelect](#!/FormCircleButtonSelect).

If there are a larger number of options, or if space is constrained, [FormMultiSelect](#!/FormMultiSelect) should be used instead.

#### If only one option needs to be selected:

If there are only a few options, and space allows, [FormRadioGroup](#!/FormRadioGroup) should be used.
If each option can be unambiguously expressed as a single character, consider using [FormCircleButtonSelect](#!/FormCircleButtonSelect) instead.

If only a few options are avaiable, and custom option rendering is not needed,
use [FormSimpleSelect](#!/FormSimpleSelect). This component uses html select tags and has a
simpler UX than the standard [FormSelect](#!/FormSelect).

In cases when there is a mid-sized (10-30) list of options that needs to be quickly visually parsed,
and space allows, consider using [FormOpenListSelect](#!/FormOpenListSelect).

In any other use case, use [FormSelect](#!/FormSelect).

### Text Input Autocomplete Components

These autocomplete components share the distinction that any free text may be entered and will be a
valid value for the inputs. In other words, the value of the input DOES NOT need to match a
provided option. The value of these fields will always be a string.

The two text fields in this category or [FormSearchSelect](#!/FormSearchSelect) and [FormTextareaTypeahead](#!/FormTextareaTypeahead).

#### Form.SearchSelect

This component integrates autocomplete support with a basic input component. When an option is selected, the contents
of the input will be replaced by the selected option.

#### Form.TextareaArea

This component uses autocomplete to edit a textarea component. When an option is selected, the last word that in
the textarea will be replaced by the selected word.

### Summary

| Component              | Type      | # of Options | Multiple Selections? | Groups? | Additional Notes                                             |
| ---------------------- | --------- | ------------ | -------------------- | ------- | ------------------------------------------------------------ |
| FormSelect             | Select    | `>10`        | No                   | Yes     |                                                              |
| FormSimpleSelect       | Select    | `<~10`       | No                   | Yes     | Cannot custom render options                                 |
| FormRadioGroup         | Select    | `<~6`        | No                   | Yes     | To-do: add groups example                                    |
| FormMultiSelect        | Select    | `>~6`        | Yes                  | Yes     |                                                              |
| FormCheckboxGroup      | Select    | `<~6`        | Yes                  | Yes     | May use with more options if several selections will be made |
| FormOpenListSelect     | Select    | `~10-30`     | No                   | Yes     | Uses a lot of screen space                                   |
| FormCircleButtonSelect | Select    | `<~7`        | Yes                  | No      | All options must be one character                            |
| FormSearchSelect       | Text      | ANY          | No                   | Yes     |                                                              |
| FormTextareaTypeahead  | Text      | ANY          | No                   | Yes     | Selection only affects last word                             |
| FormAddressIntl        | Dedicated | N/A          | N/A                  | N/A     | Used to input address                                        |
| FormAddressUS          | Dedicated | N/A          | N/A                  | N/A     | Used to input US address                                     |
| FormTimeInput          | Dedicated | N/A          | No                   | N/A     | Used to input time                                           |
| FormTimeRange          | Dedicated | N/A          | No                   | N/A     | Used to input time range                                     |
| FormDateInput          | Dedicated | N/A          | No                   | N/A     | Used to input date                                           |
| FormDateRange          | Dedicated | N/A          | No                   | N/A     | Used to input date range                                     |
| FormWeekPicker         | Dedicated | N/A          | No                   | N/A     | Used to input week                                           |
| FormDaysOfWeekSelect   | Dedicated | N/A          | No                   | N/A     | May be replaced with Form.SimpleSelect if space constrained  |

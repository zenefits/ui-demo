A form component that lets choose from an array of options displayed as buttons.

#### Examples

As checkbox replacement:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.CircleButtonSelect" selectedStory="checkbox" />
```

As radio replacement:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.CircleButtonSelect" selectedStory="radio" />
```

#### Usage

- You may use this component if there is a small fixed number of options that can be represented as single character symbols
- Do not use this component to represent days of the week, instead use [FormDaysOfWeekSelect](#!/FormDaysOfWeekSelect)
- For any other select usage, see Select (#!/Form.Select) guidelines

#### Content Guidelines

Only use this component when the option can be concisely represented as a single character. If this restriction adds any
ambiguity to the selection, use an alternative component instead.

#### Related

- [FormRadioGroup](#!/FormRadioGroup)
- [FormCheckboxGroup](#!/FormCheckboxGroup)
- [FormDaysOfWeekSelect](#!/FormDaysOfWeekSelect)
- [FormSelect](#!/FormSelect)

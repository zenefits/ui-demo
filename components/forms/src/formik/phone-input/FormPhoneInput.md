A form component that is a derivative of text input that takes a phone number and can apply a mask for US/Canada numbers.

#### Examples

US/Canada phone input:

```jsx
<StorybookExample selectedKind="forms|Form.PhoneInput" selectedStory="basic phone input" />
```

International phone input:

```jsx
<StorybookExample
  allowInternational
  selectedKind="forms|Form.PhoneInput"
  selectedStory="allow international phone input"
/>
```

#### Usage

- If you know the phone number will be country code `+1` (US/Canada) don't set `allowInternational`

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

Always import this via `Form`, as in the example.

Wraps the [HTML `<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) but also provides styles and layout.

#### Related

- [FormMaskedInput](#!/FormMaskedInput)

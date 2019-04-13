Component that emulates a signature pad, allowing the user to record their signature using mouse or touch.
Includes a button to clear what has been written so far.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="forms|Form.Signature" selectedStory="default" />
```

#### Implementation Notes

This component relies on canvas via the [signature_pad](https://github.com/szimek/signature_pad) library.

#### Related

- [Image](#!/Image) could be used to display the existing signatures in `src`

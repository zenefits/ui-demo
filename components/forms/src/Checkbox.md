Use checkboxes to allow the user to make binary choices (checked or unchecked).

A label is essential to explaining the nature of the choice. Prefer positive and active wording for labels to avoid
confusion. Checking a box to make something not happen is not as intuitive.

```jsx
<Box>
  Good:
  <Checkbox label="Send weekly email" />
  Bad:
  <Checkbox label="Do not send me weekly emails" />
</Box>
```

A series of checkboxes allows the user to select a number of options (0 to many).
Checking a particular box does not affect the others in the list; each checkbox is independent.

```jsx
<Box>
  <Checkbox label="Beef" />
  <Checkbox label="Chicken" />
  <Checkbox label="Pork" />
  <Checkbox label="Seafood" />
  <Checkbox label="Tofu" />
</Box>
```

A form component that includes all the inputs for a standard mailing address. Some inputs may be shown/hidden as needed:

- Country
- Name
- Address Line 2

This component supports specific validation and labels for specific countries. For example, some countries do not require
a state or province. The postal code field is always shown because [almost all countries have a postal code](https://en.wikipedia.org/wiki/List_of_postal_codes), more are adding them every year, and those that don't yet typically use a single value for the whole country (like Hong Kong = 999077).

#### Examples

Typical usage with validation:

```jsx
// loadExample('./exampleValidation')
```

With autocompleted address:

```jsx
// loadExample('./exampleAutocomplete')
```

#### Usage

- Use a preceding `Form.Section` to provide additional context, eg 'Mailing Address' or 'Legal Address'.

#### Implementation Notes

- `Form.AddressIntl.getValidationSchema(key)` provides useful default validation.
- `Form.AddressIntl.getEmptyValue()` provides an empty default value.
- Use the `AddressValue` type when specifying the type for address values.

#### Related

- [Form.AddressUS](#!/Form.Input)
- [Form.Input](#!/Form.Input)
- [Form.Select](#!/Form.Select)

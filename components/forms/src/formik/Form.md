A wrapper component that handles the submission of forms.

`Form` also acts as a namespace for all form-related components. This means a single import
(`import { Form } from 'z-frontend-forms'`) to gain access to [Form.Ssection](#!/Form.Section),
[Form.TextInput](#!/Form.TextInput), and many more.

#### Examples

Simple form with a single field:

```jsx
// loadExample('./text-input/exampleLabel')
```

Form's children can also be a function, which provides access to [FormikProps](https://github.com/jaredpalmer/formik#render-props-formikpropsvalues--reactnode) such as `values`:

```jsx noeditor
<StorybookExample selectedKind="forms|Form" selectedStory="login form" />
```

##### Validation

Forms will be validated automatically when a `validationSchema` is provided. Following best practices, form fields
are validated only when they are touched and lose focus. If they are already in an error state, fields are validated
on every change. Error messages will show/hide as needed.

The validation schema is built using a library called [Yup](https://github.com/jquense/yup). To validate a particular
field, use its `name` prop as a key. The login example demonstrates some common validations. You should always provide
an error message; the default is not as readable.

If your `validationSchema` needs to be dynamic, try using [`when`](https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema).
As a last resort, [`validate`](https://github.com/jaredpalmer/formik#validate-values-values--formikerrorsvalues--promiseany) is a more manual option.

#### Usage

- Ensure that `initialValues` has a default value for every form field. Otherwise, validation may not work as expected
  and React may throw a warning.
- Include form actions with [Form.Footer](#!/Form.Footer).
- Making `onSubmit` return a Promise will allow Form to handle common things for you, like setting `submitting` to false.
- Add `debug` prop to see internal form state while debugging.

#### Content Guidelines

- Avoid form reset buttons. They're rarely useful and frequently mis-clicked.
- Must have a single primary action that has a specific label.
  - Avoid: "Submit"
  - Do: "Save"
- Group related fields in sections with [Form.Section](#!/Form.Section).

<!-- TODO: labels -->
<!-- TODO: errors -->

#### Implementation Notes

Forms v2 uses [Formik](https://github.com/jaredpalmer/formik) which keeps form state local. Before July 2018,
forms were largely undocumented and used [redux-form](https://github.com/erikras/redux-form/).

Most form components have an underlying input component that should not be used externally. For example, `Form.Textarea`
is built upon `Textarea`.

The onChange prop may be used when every form action should fire a provided callback. This feature supports two
common use cases:

- Form fields are used as a filter for external components.
- Form fields should be autosaved.

Note that if only a single field is used as a filter, the onChange should be added to the input field directly
rather than as the form onChange. Also, filtering generally should use the [DataManager](#!/DataManager) component
to manage the filtered content.

#### Related

- [Form.Error](#!/Form.Error)
- [Form.Section](#!/Form.Section)
- [Form.Footer](#!/Form.Footer)
- [DataManager](#!/DataManager)

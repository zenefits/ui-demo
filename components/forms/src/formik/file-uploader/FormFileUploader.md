A form component that lets the user upload files.
See [here](https://confluence.inside-zen.com/pages/viewpage.action?spaceKey=ENG&title=File+uploader) to read more on the technical design.

#### Examples

Typical usage:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.FileUploader" selectedStory="default" height="300px" />
```

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

Always import this via `Form`, as in the example.

#### Note

Using the File Uploader in a spoof or beta environment will be blocked by CSP issues. Currently, there is a limitation in which a single set of assets are built for all environments, except local. We can’t have the beta settings for prod, so that’s why the host isn’t allowed.

To work around this, you could do testing in Prod or local (recommended). Alternatively, you can switch the host temporarily for beta and then switch it back before activation.

#### Related

- [FileUploader](#!/FileUploader) could be used independent of a form

A form component that lets the user upload files.

#### Examples

Typical usage:

```jsx noeditor
<StorybookExample selectedKind="forms|Form.FileUploader" selectedStory="default" height="250px" />
```

#### Content Guidelines

See general field label and error guidelines.

#### Implementation Notes

See [technical design](https://confluence.inside-zen.com/pages/viewpage.action?spaceKey=ENG&title=File+uploader).

#### Note

Using the File Uploader in a spoof or beta environment will be blocked by CSP issues. Currently, there is a limitation in which a single set of assets are built for all environments, except local. We can’t have the beta settings for prod, so that’s why the host isn’t allowed.

To work around this, you could do testing in Prod or local (recommended). Alternatively, you can switch the host temporarily for beta and then switch it back before activation.

#### Related

- [DocumentSignatureLayout](#!/DocumentSignatureLayout) includes a FileUploader

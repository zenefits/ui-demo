Component that allows uploading file(s). Wraps HTML's `<input type="file">`.

See [here](https://confluence.inside-zen.com/pages/viewpage.action?spaceKey=ENG&title=File+uploader) to read more on the technical design.

#### Examples

```jsx
// loadExample('./exampleDefault')
```

See [live stories](http://ui.zenefits.com/app/stories/?selectedKind=forms|FileUploader) for more examples.

#### Note

Using the File Uploader in a spoof or beta environment will be blocked by CSP issues. Currently, there is a limitation in which a single set of assets are built for all environments, except local. We can’t have the beta settings for prod, so that’s why the host isn’t allowed.

To work around this, you could do testing in Prod or local (recommended). Alternatively, you can switch the host temporarily for beta and then switch it back before activation.

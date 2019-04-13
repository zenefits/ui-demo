A component that embeds an pdf document into a page.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="elements|PdfDocumentViewer" selectedStory="default" height="350px" />
```

#### Implementation Notes

To preview pdf's uploaded via the [FileUploader](#!/Form.FileUploader), you must add the param `?download=false` to the `fullFileUrl` returned in the FileUploader's `onSuccess` callback.

#### Usage

- Use to render PDFs on to the page

#### Content Guidelines

The component uses an `<object>` tag to display the pdf. In case `<object>` is not supported and there is no pdfViewer avialable in the browser, the `fallback` prop will be used.

#### Related

- [HtmlDocumentViewer](#!/HtmlDocumentViewer) for displaying Html documents

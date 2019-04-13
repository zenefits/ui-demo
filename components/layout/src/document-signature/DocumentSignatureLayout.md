A layout for signing PDF documents.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="layout|DocumentSignatureLayout" selectedStory="default" height="1030px" />
```

#### Implementation Details

This component contains a pdf preview via the [PdfDocumentViewer](#!/PdfDocumentViewer), you can pass in the appropriate props via the `pdfDocumentViewerProps` prop.

This component uses [utility functions](https://github.com/zenefits/z-frontend/blob/master/components/elements/src/utils/detectionUtils.tsx) that detect if the browser is IE11 and has Adobe Reader. If it does not have Adobe Reader and is an IE11 browser, the layout will only show the download/upload option.

#### Related

- [PdfDocumentViewer](#!/PdfDocumentViewer) to view Pdfs

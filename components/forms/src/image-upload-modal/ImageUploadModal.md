Modal that supports the user in uploading, cropping and deleting an image, typically for a user or company profile.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="forms|ImageUploadModal" selectedStory="default" />
```

#### Implementation Notes

This component wraps FormFileUploader and ImageCropper. The cropped photo is saved to S3 in the same way as done by FormFileUploader.

#### Related

- [ImageCropper](#!/ImageCropper)
- [FormFileUploader](#!/FormFileUploader)
- [Modal](#!/Modal)

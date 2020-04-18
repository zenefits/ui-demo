/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Dropzone, { DropzoneProps } from 'react-dropzone';

import { IconButton, LinkButton } from 'z-frontend-elements';
import { css, styled } from 'z-frontend-theme';
import { color, radius, space } from 'z-frontend-theme/utils';
import { Box, Flex, Icon, TextBlock } from 'zbase';

import FormError from '../formik/error/FormError';
import FileComponentItem from './FileComponentItem';
import { uploadFileToS3, DICT_ACCEPTED_FILE_TYPES, FileFetch, FileResponse } from './fileUtil';

const DICT_ACCEPTED_FILE_TYPES_ALL = Object.keys(DICT_ACCEPTED_FILE_TYPES)
  .map(type => {
    return DICT_ACCEPTED_FILE_TYPES[type];
  })
  .join(',');

const ERROR_MESSAGE_RESET_DURATION = 5 * 1000;
const ERROR_MESSAGE_RESET_DURATION_LINK = 4 * 1000;
const PROGRESS_OFFSET = 10;
const MIME_TYPE_ERROR_MESSAGE = `You can't upload files of this type`;
const GENERIC_ERROR_MESSAGE = 'We were unable to upload this file.';

const MULTIPLE_FILE_ERROR_MESSAGE = (maxFiles: number) =>
  `You can only upload ${maxFiles} ${maxFiles > 1 ? 'files' : 'file'} at a time.`;
const MAX_FILE_SIZE_ERROR_MESSAGE = (maxSize: number) => `This file exceeds the limit of ${maxSize} MB.`;

const dragStyle = css`
  background-color: ${color('grayscale.g')};
  border-color: ${color('secondary.b')};
`;

class WrapperDropzone extends Component<
  { hasError?: boolean; onDragActive?: boolean; isSquare?: boolean; s?: string } & DropzoneProps
> {
  dropzoneEl: Dropzone;

  render() {
    const { hasError, onDragActive, isSquare, s, ...rest } = this.props;
    return (
      <Box>
        <Dropzone {...rest} ref={dropzoneEl => (this.dropzoneEl = dropzoneEl)} />
      </Box>
    );
  }
}

type WrapperDropzoneProps = DropzoneProps & { onDragActive?: boolean };

const StyledWrapperDropzone = styled(WrapperDropzone)<WrapperDropzoneProps>`
  background-color: ${color('grayscale.white')};
  border: 2px dashed ${color('secondary.b')};
  text-align: center;
  border-radius: ${radius()};
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  padding: ${space(5)} ${space(2)};
  ${props => (props.onDragActive ? dragStyle : '')};
`;

const StyledWrapperDropzoneLink = styled(WrapperDropzone)<DropzoneProps>`
  border: none;
`;

export interface FileUploaderProps {
  /**
   * Max number of files uploaded at a time.
   * @default unlimited
   */
  maxFiles?: number;
  /**
   * Max file size of uploaded file(s) in MB.
   * @default 25
   */
  maxFileSize?: number;
  /**
   * Type(s) of files that may be uploaded.
   * @default all
   */
  // prettier-ignore
  acceptedFileTypes?: 'all' | ('image' | 'spreadsheet' | 'pdf' | 'zip' | 'text' | 'doc')[];
  /**
   * Show basic upload link only instead of dropzone area.
   * @default false
   */
  isLink?: boolean;
  /**
   * If `isLink` is true, text of the link.
   * @default 'Browse Files'
   */
  linkName?: string;
  /**
   * Is the uploader disabled?
   * @default false
   */
  disabled?: boolean;
  /**
   * The name of a FileCategory object, specific to your use case.
   */
  category?: string;
  /**
   *  Success callback.
   */
  onSuccess?: (files: FileResponse | FileResponse[]) => void;
  /**
   * Error callback.
   */
  onError?: (file: File | File[], errorMessage: string) => void;
  /**
   * Remove file callback.
   */
  removeFile?: (file: UploadingFileResponse) => void;
  /**
   * Set to true to mean that the user is not logged in so the file uploader will call the anonymous apis
   */
  anonymous?: boolean;
  /**
   * Employee id to upload to
   */
  employeeId?: string | number;
  /**
   * Company id to upload to (generally in case of console users)
   */
  companyId?: number;
  /**
   * Existing files to show when initializing the component
   */
  initialFiles?: FileResponse[];

  /**
   * This is just used to mock a backend
   * @ignore
   */
  internalFetch?: FileFetch;
}

function getUploadingMessage(maxFiles: number) {
  if (maxFiles === 1) return 'Your file is uploading...';
  return 'Your file(s) are uploading...';
}

export type UploadingFileResponse = File & {
  hasError?: string;
  isUploading?: boolean;
  doneUploading?: boolean;
  progressPercent?: number;
  fileUrl?: string;
  randomKey?: string;
  fileId?: string;
  fullFileUrl?: string;
  fileName?: string;
};

interface State {
  isUploading: boolean;
  progressPercent: number;
  isDragActive: boolean;
  hasFile: boolean;
  fileName: string;
  randomKey: string;
  fileUrl: string;
  fileList: UploadingFileResponse[];
  showMaxFilesError: boolean;
}

class FileUploader extends Component<FileUploaderProps, State> {
  static defaultProps = {
    acceptedFileTypes: 'all',
    maxFileSize: 25,
    linkName: 'Browse Files',
  };

  static generateInitialFileList(initialFiles: FileResponse[]) {
    return initialFiles.map(initialFile => {
      // Clone the file as we can't use the spread operator
      const { file } = initialFile;
      const clonedFile: UploadingFileResponse = new File([file], file.name);

      clonedFile.fileId = initialFile.fileId;
      clonedFile.fileUrl = initialFile.fileUrl;
      clonedFile.fullFileUrl = initialFile.fullFileUrl;
      clonedFile.fileName = initialFile.fileName;

      clonedFile.doneUploading = true;
      clonedFile.progressPercent = 100;

      return clonedFile;
    });
  }

  constructor(props: FileUploaderProps) {
    super(props);

    this.state = {
      isUploading: false,
      progressPercent: 0,
      isDragActive: false,
      hasFile: false,
      fileName: '',
      randomKey: '',
      fileUrl: '',
      fileList: props.initialFiles ? FileUploader.generateInitialFileList(props.initialFiles) : [],
      showMaxFilesError: false,
    };
  }

  wrapperDropzoneEl: WrapperDropzone;

  componentDidMount() {
    // Prevent the browser default of letting the file take over
    // (this is useful in case the user misses, or while the dropzone is disabled)
    window.addEventListener('drop', e => {
      e.preventDefault();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('drop', e => {
      e.preventDefault();
    });
  }

  getDropzoneContent = () => {
    const { isLink, linkName, maxFiles } = this.props;
    if (isLink) {
      return !maxFiles || this.getActiveFileListLength() < maxFiles ? (
        <LinkButton onClick={this.onBrowseClick}>{linkName}</LinkButton>
      ) : null;
    }

    return (
      <Flex align="center" justify="center" my={2}>
        <TextBlock color="text.light" bold fontStyle="controls.m">
          <Box>
            <Icon iconName="cloud-upload" s="xlarge" color="grayscale.f" />
          </Box>
          {this.state.isUploading ? getUploadingMessage(maxFiles) : this.getFilePrompt(maxFiles)}
        </TextBlock>
      </Flex>
    );
  };

  getFileItemComponentList = () => {
    return this.state.fileList.map((file, id) => {
      if (!file) {
        return '';
      }
      const deleteEnabled = file.fileUrl || file.hasError;
      return (
        /* eslint-disable react/no-array-index-key */
        /* file object has no unique identifier until successfully uploaded */
        <Box key={id}>
          <Flex align="center">
            <FileComponentItem
              file={file}
              removeFile={() => this.removeFile(id)}
              isUploading={file.isUploading}
              fileUrl={file.fileUrl}
              isNumberProgress={this.props.isLink}
            />
            <IconButton
              iconName="delete"
              disabled={!deleteEnabled}
              onClick={() => this.removeFile(id)}
              color="grayscale.d"
              ml={2}
            />
          </Flex>
        </Box>
      );
    });
  };

  // this is used to count the active files in the array. Some files are set to undefined to maintain the indexing - see this.removeFile for more explanation
  getActiveFileListLength = () => {
    let count = 0;
    this.state.fileList.forEach(file => {
      if (file) {
        count += 1;
      }
    });
    return count;
  };

  getAcceptedFileTypes = () => {
    if (Array.isArray(this.props.acceptedFileTypes)) {
      return this.props.acceptedFileTypes
        .map(type => {
          return DICT_ACCEPTED_FILE_TYPES[type] || '';
        })
        .join(',');
    }
    return DICT_ACCEPTED_FILE_TYPES_ALL;
  };

  startFileUpload = () => {
    this.state.fileList.forEach((file, id) => {
      if (file && file.hasError) {
        this.onError(file, id);
      } else if (file && !file.isUploading && !file.doneUploading) {
        this.uploadFile(file, id);
      }
    });
  };

  uploadFile = async (file: File, id: any) => {
    const { category, companyId, employeeId } = this.props;
    const fileMetadata = { category, companyId, employeeId };

    const { fileList } = this.state;
    fileList[id].isUploading = true;
    fileList[id].progressPercent = 0;
    this.setState({ fileList });

    const options = {
      internalFetch: this.props.internalFetch,
      anonymous: this.props.anonymous,
      onUploadProgress: this.onUploadProgress,
    };

    try {
      const response = await uploadFileToS3(file, id, fileMetadata, options);

      const { fileList } = this.state;
      fileList[id].isUploading = false;
      fileList[id].doneUploading = true;
      fileList[id].fileUrl = response.fileUrl;
      fileList[id].randomKey = response.randomKey;
      fileList[id].fileId = response.fileId;
      fileList[id].fullFileUrl = response.fullFileUrl;
      this.setState({ fileList });

      this.onSuccess(response);
    } catch (error) {
      const { fileList } = this.state;
      fileList[id].isUploading = false;
      fileList[id].doneUploading = true;
      fileList[id].progressPercent = 0;
      fileList[id].hasError = GENERIC_ERROR_MESSAGE;
      this.setState({ fileList });
      this.onError(file, id);
    }
  };

  removeFile = (id: any) => {
    const { fileList } = this.state;
    const fileToBeRemoved = fileList[id];
    // if a user tries to remove a file, slicing the array messes with the index especially if a file is currently uploading (progress bar)
    // instead just set to undefined
    fileList[id] = undefined;
    this.setState({ fileList });
    if (this.props.removeFile) {
      this.props.removeFile(fileToBeRemoved);
    }
  };

  onBrowseClick = (e: any) => {
    this.wrapperDropzoneEl.dropzoneEl.open();
  };

  onDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
    if (this.state.isUploading) {
      return;
    }

    const { maxFileSize, maxFiles, isLink } = this.props;
    let { fileList } = this.state;
    if (isLink && (acceptedFiles.length > 1 || rejectedFiles.length > 1)) {
      this.setState({ isDragActive: false, showMaxFilesError: true });
      setTimeout(() => this.onResetMaxFilesError(), ERROR_MESSAGE_RESET_DURATION_LINK);
      return;
    }
    if (
      acceptedFiles.length > maxFiles ||
      this.getActiveFileListLength() + acceptedFiles.length + rejectedFiles.length > maxFiles
    ) {
      this.setState({ isDragActive: false, showMaxFilesError: true });
      setTimeout(() => this.onResetMaxFilesError(), ERROR_MESSAGE_RESET_DURATION);
      return;
    }
    // acceptedFiles first, rejected files last
    if (acceptedFiles.length > 0) {
      fileList = [...fileList, ...acceptedFiles];
    }
    if (rejectedFiles.length > 0) {
      const rejectedFileList = rejectedFiles.map(val => {
        (val as any).hasError =
          val.size > maxFileSize * (1024 * 1024) ? MAX_FILE_SIZE_ERROR_MESSAGE(maxFileSize) : MIME_TYPE_ERROR_MESSAGE;
        return val;
      });
      fileList = [...fileList, ...rejectedFileList];
    }
    this.setState({ fileList, isUploading: true, isDragActive: false, showMaxFilesError: false }, this.startFileUpload);
  };

  onUploadProgress = (id: any, progressEvent: any) => {
    let perceivedProgress = (Math.ceil(progressEvent.loaded + PROGRESS_OFFSET) * 80) / 100;
    perceivedProgress = perceivedProgress > 100 ? 100 : perceivedProgress;
    const { fileList } = this.state;
    fileList[id].progressPercent = perceivedProgress;
    this.setState({ fileList });
  };

  onDragEnter = () => {
    if (!this.state.isDragActive && !this.state.isUploading) {
      this.setState({ isDragActive: true });
    }
  };

  onDragLeave = () => {
    if (this.state.isDragActive && !this.state.isUploading) {
      this.setState({ isDragActive: false });
    }
  };

  onSuccess = (fileResponse: FileResponse) => {
    const stillUploading = this.state.fileList.filter(file => file && file.isUploading).length > 0;
    if (!stillUploading) {
      this.setState({ isUploading: false });
    }
    if (this.props.onSuccess) {
      this.props.onSuccess(fileResponse);
    }
  };

  onError = (file: File | File[], id: any) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const stillUploading = this.state.fileList.filter(file => file && file.isUploading).length > 0;
    if (this.props.onError) {
      this.props.onError(file, (file as any).hasError);
    }
    this.setState({
      isDragActive: false,
      isUploading: stillUploading,
    });
  };

  onResetMaxFilesError = () => {
    this.setState({
      showMaxFilesError: false,
    });
  };

  getFilePrompt = (maxFiles: number) => {
    return maxFiles === 1 ? (
      <>
        Drag your file or <LinkButton onClick={this.onBrowseClick}>select file</LinkButton>
      </>
    ) : (
      <>
        Drag your file(s) or <LinkButton onClick={this.onBrowseClick}>select file(s)</LinkButton>
      </>
    );
  };

  render() {
    const { disabled, maxFileSize } = this.props;
    const { isDragActive } = this.state;
    const acceptedFileTypes = this.getAcceptedFileTypes();
    if (this.props.isLink) {
      return (
        <Box>
          <StyledWrapperDropzoneLink
            onDrop={this.onDrop}
            disableClick
            ref={(wrapperDropzoneEl: WrapperDropzone) => (this.wrapperDropzoneEl = wrapperDropzoneEl)}
            accept={acceptedFileTypes}
            maxSize={maxFileSize * (1024 * 1024)}
            disabled={disabled}
            multiple={false}
          >
            {this.getDropzoneContent}
          </StyledWrapperDropzoneLink>
          {this.state.showMaxFilesError && <FormError textDefault={MULTIPLE_FILE_ERROR_MESSAGE(this.props.maxFiles)} />}
          {this.getActiveFileListLength() > 0 && this.getFileItemComponentList()}
        </Box>
      );
    } else {
      return (
        <Box>
          <StyledWrapperDropzone
            onDrop={this.onDrop}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            disableClick
            ref={(wrapperDropzoneEl: WrapperDropzone) => (this.wrapperDropzoneEl = wrapperDropzoneEl)}
            accept={acceptedFileTypes}
            maxSize={maxFileSize * (1024 * 1024)}
            onDragActive={isDragActive}
            disabled={disabled || this.state.isUploading}
          >
            {this.getDropzoneContent}
          </StyledWrapperDropzone>
          {this.state.showMaxFilesError && <FormError textDefault={MULTIPLE_FILE_ERROR_MESSAGE(this.props.maxFiles)} />}
          {this.getActiveFileListLength() > 0 && this.getFileItemComponentList()}
        </Box>
      );
    }
  }
}

export default FileUploader;

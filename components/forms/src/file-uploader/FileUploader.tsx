import React, { Component } from 'react';
import Dropzone, { DropzoneProps } from 'react-dropzone';
// @ts-ignore
import SparkMD5 from 'spark-md5';

import { IconButton, Link } from 'z-frontend-elements';
import { css, styled } from 'z-frontend-theme';
import { color, radius, space } from 'z-frontend-theme/utils';
import { Box, Flex, Icon, TextBlock } from 'zbase';
import { getDefaultHeaders } from 'z-frontend-app-bootstrap';

import FormError from '../formik/error/FormError';
import FileComponentItem from './FileComponentItem';

// Please modify mimetypes as needed.
// Spreadsheet - includes .csv, and .xls and .xlsx
// (ms excel and openxml spreasheet, and also google docs)
const DICT_ACCEPTED_FILE_TYPES: { [mimeType: string]: string } = {
  image: 'image/*',
  spreadsheet:
    'application/vnd.ms-excel,application/vnd.' +
    'openxmlformats-officedocument.spreadsheetml.' +
    'sheet,application/vnd.google-apps.spreadsheet,text/csv,' +
    '.xls,.xlsx,',
  pdf: 'application/pdf',
  zip: 'application/zip,application/x-zip-compressed',
  text: 'text/plain,application/qbooks,application/qbookspro,text/iif,.iif',
  doc: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const DICT_ACCEPTED_FILE_TYPES_ALL = Object.keys(DICT_ACCEPTED_FILE_TYPES)
  .map(type => {
    return DICT_ACCEPTED_FILE_TYPES[type];
  })
  .join(',');

const FILE_UPLOAD_INITIATE_URL = '/custom_api/fileupload_initiate';
const FILE_UPLOAD_DONE_URL = '/custom_api/fileupload_done';
const FILE_UPLOAD_ANONYMOUS_INITIATE_URL = '/custom_api/fileupload_initiate_anonymous';
const FILE_UPLOAD_ANONYMOUS_DONE_URL = '/custom_api/fileupload_done_anonymous';
const TWO_MEGABYTES = 2097152;
const ERROR_MESSAGE_RESET_DURATION = 6000;
const ERROR_MESSAGE_RESET_DURATION_LINK = 4000;
const PROGRESS_OFFSET = 10;
const MIME_TYPE_ERROR_MESSAGE = `You can't upload files of this type`;
const GENERIC_ERROR_MESSAGE = 'We were unable to upload this file.';
// adjust copy
const MULTIPLE_FILE_ERROR_MESSAGE = (maxFiles: number) =>
  `You can only upload ${maxFiles} ${maxFiles > 1 ? 'files' : 'file'} at a time.`;
const MAX_FILE_SIZE_ERROR_MESSAGE = (maxSize: number) => `This file exceeds the limit of ${maxSize} MB.`;

interface componentOptsInit extends RequestInit {
  headers: { [key: string]: string };
}

// this is used rather than fetch to get the OnProgress for the progress bar
function componentFetch(
  url: string,
  opts: componentOptsInit,
  onProgress: (this: XMLHttpRequest, ev: ProgressEvent) => any,
) {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    let headers: { [key: string]: string } = opts.headers || {};
    const defaultHeaders = getDefaultHeaders();
    headers = { ...headers, ...defaultHeaders };
    for (const k in headers) {
      xhr.setRequestHeader(k, headers[k]);
    }
    xhr.onload = (e: any) => {
      if (e.target.status >= 400) {
        rej();
      } else {
        res(e.target.responseText);
      }
    };
    xhr.onerror = rej;

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress;
    }
    xhr.send(opts.body);
  });
}

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

const StyledWrapperDropzone = styled<DropzoneProps & { onDragActive?: boolean }>(WrapperDropzone)`
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

const StyledWrapperDropzoneLink = styled<DropzoneProps>(WrapperDropzone)`
  border: none;
`;

export type FileResponse = {
  file: File;
  fileId: string;
  fileName: string;
  fileUrl: string;
  randomKey: string;
  uploadUrl: string;
  fullFileUrl: string;
};

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
  // The name of a FileCategory object, specific to your use case.
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
  removeFile?: (file: FileResponse) => void;
  /**
   * Set to true to mean that the user is not logged in so the file uploader will cal the anonymous apis
   */
  anonymous?: boolean;
  /**
   * Employee id to upload to
   */
  employeeId?: any;
  /**
   * This is just used to mock a backend
   * @ignore
   */
  internalFetch?: typeof componentFetch;
}

interface State {
  isUploading: boolean;
  progressPercent: number;
  isDragActive: boolean;
  hasFile: boolean;
  fileName: string;
  randomKey: string;
  fileUrl: string;
  fileList: any[];
  showMaxFilesError: boolean;
}

class FileUploader extends Component<FileUploaderProps, State> {
  static defaultProps = {
    acceptedFileTypes: 'all',
    maxFileSize: 25,
    linkName: 'Browse Files',
  };

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
      fileList: [],
      showMaxFilesError: false,
    };

    this.internalFetch = props.internalFetch || componentFetch;
  }
  internalFetch: any;
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
    const { isLink, linkName } = this.props;
    if (isLink) {
      if (this.state.showMaxFilesError) {
        return <FormError textDefault={MULTIPLE_FILE_ERROR_MESSAGE(1)} />;
      }
      if (this.getActiveFileListLength() > 0) {
        return this.getFileItemComponentList();
      }
      return <Link onClick={this.onBrowseClick}> {linkName} </Link>;
    }

    return (
      <Flex align="center" justify="center" my={2}>
        <TextBlock color="grayscale.e" bold fontStyle="controls.m">
          <Box>
            <Icon iconName="cloud-upload" s="xlarge" color="grayscale.f" />
          </Box>
          {this.state.isUploading ? (
            'Your file(s) are uploading...'
          ) : (
            <>
              Drag your file(s) or <Link onClick={this.onBrowseClick}> select file(s) </Link>
            </>
          )}
        </TextBlock>
      </Flex>
    );
  };

  getFileItemComponentList = () => {
    return this.state.fileList.map((file, id) => {
      return file ? (
        <Box key={id} mx={4}>
          <Flex align="center">
            <FileComponentItem
              file={file}
              removeFile={() => this.removeFile(id)}
              isUploading={file.isUploading}
              fileUrl={file.fileUrl}
              isNumberProgress={this.props.isLink}
            />
            {file.fileUrl && (
              <IconButton iconName="delete" onClick={() => this.removeFile(id)} color="secondary.a" ml={2} />
            )}
          </Flex>
        </Box>
      ) : (
        ''
      );
    });
  };

  // this is used to count the active files in the array. Some files are set to undefined to maintain the indexing - see this.removeFile for more explanation
  getActiveFileListLength = () => {
    let count = 0;
    this.state.fileList.forEach(file => {
      if (file) {
        count = count + 1;
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

  calculateMD5 = (file: File) => {
    const deferred: any = {
      resolve: null,
      reject: null,
    };
    const promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });
    const chunkSize = TWO_MEGABYTES;
    const blobSlice = File.prototype.slice;
    const chunks = Math.ceil(file.size / chunkSize);
    const fileReader = new FileReader();
    const spark = new SparkMD5.ArrayBuffer();
    let currentChunk = 0;

    function loadNext() {
      const start = currentChunk * chunkSize;
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    fileReader.onload = e => {
      spark.append(fileReader.result);
      currentChunk += 1;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        const digest = btoa(spark.end(true));
        deferred.resolve(digest);
      }
    };

    fileReader.onerror = error => {
      deferred.reject(error);
    };
    loadNext();

    return promise;
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

  getFileContentType = (file: File) => {
    const fileType = file.type;
    if (fileType === DICT_ACCEPTED_FILE_TYPES['pdf']) {
      // This allows pdfs to have the correct content-type from s3 which is needed for the the PdfDocumentViewer
      return fileType;
    }
    return 'application/octet-stream';
  };

  getFullFileUrl = (fileUrl: string) => {
    const domain = window.location.origin;
    return `${domain}${fileUrl}`;
  };

  uploadFile = async (file: File, id: any) => {
    let initiateURL = FILE_UPLOAD_INITIATE_URL;
    let doneURL = FILE_UPLOAD_DONE_URL;
    if (this.props.anonymous) {
      initiateURL = FILE_UPLOAD_ANONYMOUS_INITIATE_URL;
      doneURL = FILE_UPLOAD_ANONYMOUS_DONE_URL;
    }
    const { category, employeeId } = this.props;
    const fileList = this.state.fileList;
    fileList[id].isUploading = true;
    fileList[id].progressPercent = 0;
    this.setState({ fileList });

    try {
      const fileContentType = this.getFileContentType(file);
      const md5Hash = await this.calculateMD5(file);

      const initiateUrlData: { [key: string]: string | {} } = {
        fileContentType,
        category,
        // uploadAcl: this.props.uploadAcl,
        employeeId,
        filename: file.name,
        size: file.size,
        contentMD5: md5Hash,
      };
      if (fileContentType === 'application/pdf') {
        initiateUrlData.contentDisposition = 'attachment';
      }

      const response = await this.internalFetch(
        initiateURL,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(initiateUrlData),
        },
        (evt: any) => this.onUploadProgress(id, evt),
      );
      const initiateResponse = JSON.parse(response.toString());
      const fullFileUrl = this.getFullFileUrl(initiateResponse.file_url);

      // call s3
      const s3Headers: { [key: string]: string | {} } = {
        'Content-MD5': md5Hash,
        'Content-Type': fileContentType,
      };

      if (fileContentType === 'application/pdf') {
        s3Headers['Content-Disposition'] = 'attachment';
      }

      await this.internalFetch(
        initiateResponse.upload_url,
        {
          method: 'PUT',
          headers: s3Headers,
          body: file,
        },
        null,
      );

      await this.internalFetch(
        doneURL,
        {
          method: 'POST',
          body: JSON.stringify({
            key: initiateResponse.random_key,
            uploaded: true,
          }),
        },
        null,
      );

      const fileList = this.state.fileList;
      fileList[id].isUploading = false;
      fileList[id].doneUploading = true;
      fileList[id].fileUrl = initiateResponse.file_url;
      fileList[id].randomKey = initiateResponse.random_key;
      fileList[id].fileId = initiateResponse.file_id;
      fileList[id].fullFileUrl = fullFileUrl;

      this.setState({ fileList });

      const fileResponse: FileResponse = {
        file,
        fullFileUrl,
        fileId: initiateResponse.file_id,
        fileName: file.name,
        fileUrl: initiateResponse.file_url,
        randomKey: initiateResponse.random_key,
        uploadUrl: initiateResponse.upload_url,
      };
      this.onSuccess(fileResponse);
    } catch (error) {
      const fileList = this.state.fileList;
      fileList[id].isUploading = false;
      fileList[id].doneUploading = true;
      fileList[id].progressPercent = 0;
      fileList[id].hasError = GENERIC_ERROR_MESSAGE;
      this.setState({ fileList });
      this.onError(file, id);
    }
  };

  removeFile = (id: any) => {
    const fileList = this.state.fileList;
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
    let fileList = this.state.fileList;
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
    const fileList = this.state.fileList;
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
    const stillUploading = this.state.fileList.filter(file => file && file.isUploading).length > 0;
    if (this.props.onError) {
      this.props.onError(file, (file as any).hasError);
    }
    this.setState({
      isDragActive: false,
      isUploading: stillUploading,
    });
    setTimeout(() => this.removeFile(id), ERROR_MESSAGE_RESET_DURATION);
  };

  onResetMaxFilesError = () => {
    this.setState({
      showMaxFilesError: false,
    });
  };

  render() {
    const { disabled, maxFileSize } = this.props;
    const { isDragActive } = this.state;
    const acceptedFileTypes = this.getAcceptedFileTypes();
    if (this.props.isLink) {
      return (
        <StyledWrapperDropzoneLink
          onDrop={this.onDrop}
          disableClick
          innerRef={wrapperDropzoneEl => (this.wrapperDropzoneEl = wrapperDropzoneEl)}
          accept={acceptedFileTypes}
          maxSize={maxFileSize * (1024 * 1024)}
          disabled={disabled}
          multiple={false}
        >
          {this.getDropzoneContent}
        </StyledWrapperDropzoneLink>
      );
    } else {
      return (
        <Box>
          <StyledWrapperDropzone
            onDrop={this.onDrop}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            disableClick
            innerRef={wrapperDropzoneEl => (this.wrapperDropzoneEl = wrapperDropzoneEl)}
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

// @ts-ignore
import SparkMD5 from 'spark-md5';

import { getDefaultHeaders } from 'z-frontend-app-bootstrap';

// Please modify mimetypes as needed.
export const DICT_ACCEPTED_FILE_TYPES: { [mimeType: string]: string } = {
  image: 'image/*',
  // includes .csv, and .xls and .xlsx (ms excel and openxml spreadsheet, and also google docs)
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

export type FileResponse = {
  file: File;
  fileId: string;
  fileName: string;
  fileUrl: string;
  randomKey: string;
  uploadUrl: string;
  fullFileUrl: string;
};

const TWO_MEGABYTES = 2 * 1024 * 1024;

export function calculateMD5(file: File) {
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
}

const FILE_UPLOAD_INITIATE_URL = '/custom_api/fileupload_initiate';
const FILE_UPLOAD_DONE_URL = '/custom_api/fileupload_done';
const FILE_UPLOAD_ANONYMOUS_INITIATE_URL = '/custom_api/fileupload_initiate_anonymous';
const FILE_UPLOAD_ANONYMOUS_DONE_URL = '/custom_api/fileupload_done_anonymous';

function getFileContentType(file: File) {
  const fileType = file.type;
  if (fileType === DICT_ACCEPTED_FILE_TYPES['pdf']) {
    // This allows pdfs to have the correct content-type from s3 which is needed for the the PdfDocumentViewer
    return fileType;
  }
  return 'application/octet-stream';
}

function getFullFileUrl(fileUrl: string) {
  const domain = window.location.origin;
  return `${domain}${fileUrl}`;
}

type UploadOptions = {
  internalFetch?: any;
  anonymous?: boolean;
  onUploadProgress?: (id: any, progressEvent: any) => void;
};

export type FileUploadMetadata = {
  /** The name of a FileCategory object, specific to your use case. */
  category?: string;

  /** Company id to upload to (generally in case of console users) */
  companyId?: number;

  /** Employee id to upload to */
  employeeId?: string | number;
};

export async function uploadFileToS3(file: File, id: any, metadata: FileUploadMetadata, options: UploadOptions) {
  const anonymous = options.anonymous ?? false;
  const initiateURL = anonymous ? FILE_UPLOAD_ANONYMOUS_INITIATE_URL : FILE_UPLOAD_INITIATE_URL;
  const doneURL = anonymous ? FILE_UPLOAD_ANONYMOUS_DONE_URL : FILE_UPLOAD_DONE_URL;

  const fileContentType = getFileContentType(file);
  const md5Hash = await calculateMD5(file);

  const { category, companyId, employeeId } = metadata;
  const initiateUrlData: { [key: string]: string | {} } = {
    fileContentType,
    category,
    companyId,
    employeeId,
    filename: file.name,
    size: file.size,
    contentMD5: md5Hash,
  };
  if (fileContentType === 'application/pdf') {
    initiateUrlData.contentDisposition = 'attachment';
  }

  const { onUploadProgress } = options;
  const internalFetch = options.internalFetch ?? componentFetchWithProgress;
  const response = await internalFetch(
    initiateURL,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initiateUrlData),
    },
    onUploadProgress ? (evt: any) => onUploadProgress(id, evt) : null,
  );
  const initiateResponse = JSON.parse(response.toString());
  const fullFileUrl = getFullFileUrl(initiateResponse.file_url);

  // call s3
  const s3Headers: { [key: string]: string | {} } = {
    'Content-MD5': md5Hash,
    'Content-Type': fileContentType,
  };

  if (fileContentType === 'application/pdf') {
    s3Headers['Content-Disposition'] = 'attachment';
  }

  await internalFetch(
    initiateResponse.upload_url,
    {
      method: 'PUT',
      headers: s3Headers,
      body: file,
    },
    null,
  );

  await internalFetch(
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

  const fileResponse: FileResponse = {
    file,
    fullFileUrl,
    fileId: initiateResponse.file_id,
    fileName: file.name,
    fileUrl: initiateResponse.file_url,
    randomKey: initiateResponse.random_key,
    uploadUrl: initiateResponse.upload_url,
  };
  return fileResponse;
}

interface componentOptsInit extends RequestInit {
  headers: { [key: string]: string };
}

export type FileFetch = typeof componentFetchWithProgress;

export function componentFetchWithProgress(
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

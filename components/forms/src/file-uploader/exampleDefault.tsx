import React from 'react';

import FileUploader from './FileUploader';

// @ts-ignore
function fakeFetch(url, opts, onProgress) {
  let i = 0;
  return new Promise((resolve, reject) => {
    if (onProgress) {
      const timer = setInterval(() => {
        i += 1;
        onProgress({ loaded: i * 10, total: 100 });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        resolve(
          JSON.stringify({
            file_url: 'fakeFileURL',
            upload_url: 'fakeUploadURL',
            random_key: 'fakeRandomKey',
            file_id: 'fakeFileId',
          }),
        );
      }, 10000);
    } else {
      setTimeout(resolve, 1000);
    }
  });
}
// This example uses a fake fetch to mock a backend.
export default () => <FileUploader category="uncategorized" internalFetch={fakeFetch} />;

function makeFakeRandomId() {
  return Math.random()
    .toString(36)
    .substring(7);
}

export function fakeFetch(url: string, opts: RequestInit, onProgress: any) {
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
            random_key: makeFakeRandomId(),
            file_id: makeFakeRandomId(),
          }),
        );
      }, 10000);
    } else {
      setTimeout(resolve, 1000);
    }
  });
}

export function fakeFetchThatErrors(url: string, opts: RequestInit, onProgress: any) {
  return new Promise((resolve, reject) => {
    return reject();
  });
}

import { images } from 'z-frontend-theme';

function makeFakeRandomId() {
  return Math.random()
    .toString(36)
    .substring(7);
}

function makeFakeFetchResponse() {
  return JSON.stringify({
    file_url: images.pug, // fake with actual image to allow eg cropper to work
    upload_url: 'fakeUploadURL',
    random_key: makeFakeRandomId(),
    file_id: makeFakeRandomId(),
  });
}

export function fakeFetch(url: string, opts: RequestInit, onProgress: any) {
  let i = 0;
  return new Promise((resolve, reject) => {
    if (onProgress) {
      const timer = setInterval(() => {
        i += 1;
        onProgress({ loaded: i * 25, total: 100 });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        resolve(makeFakeFetchResponse());
      }, 5000);
    } else {
      setTimeout(() => {
        resolve(makeFakeFetchResponse());
      }, 1000);
    }
  });
}

export function fakeFetchThatErrors(url: string, opts: RequestInit, onProgress: any) {
  return new Promise((resolve, reject) => {
    return reject();
  });
}

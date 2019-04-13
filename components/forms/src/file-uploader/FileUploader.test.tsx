import React from 'react';
import 'jest-styled-components';
import Dropzone from 'react-dropzone';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import { mountWithThemeIntl } from 'z-frontend-theme/test-utils/intl';
import { getColor } from 'z-frontend-theme';

import FileUploader from './FileUploader';
import FileComponentItem from './FileComponentItem';

function createFile(fileSize?: number) {
  if (fileSize) {
    const blobContents = new Blob([{ size: 100000000000000000000000 } as any]);
    return new File([blobContents], 'hi.txt', { type: 'text/plain' });
  }
  return new File(['file contents'], 'hi.txt', { type: 'text/plain' });
}

function getFetchMock() {
  let fetchDoneFn: () => void;
  const fetchDonePromise = new Promise(resolve => {
    fetchDoneFn = resolve;
  });
  const fetch = jest.fn(() => {
    setTimeout(fetchDoneFn, 100);
    return '{ "sdfsd": "dsfsd" }';
  });
  return { fetch, fetchDonePromise };
}

describe('FileUploader', () => {
  const file = createFile();

  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<FileUploader />)).toHaveLength(1);
  });

  it('should render a link if prop isLink is passed in', () => {
    const rendered = renderWithTheme(<FileUploader isLink />).find('a');
    expect(rendered).toHaveLength(1);
    expect(rendered.text().trim()).toBe('Browse Files');
  });

  it('should ultimately render an input with type=file', () => {
    const rendered = renderWithTheme(<FileUploader />).find('input');
    expect(rendered).toHaveLength(1);
    expect(rendered.attr('type')).toBe('file');
  });

  it('should accept only the type of files given through the acceptedFileTypes prop', () => {
    const rendered = renderWithTheme(<FileUploader acceptedFileTypes={['image', 'pdf']} />).find('input');
    expect(rendered.attr('accept')).toBe('image/*,application/pdf');
  });

  it('should apply the dragStyle if isDragActive', () => {
    const wrapper = mountWithTheme(<FileUploader />);
    wrapper.setState({ isDragActive: true });

    expect(wrapper.find(Dropzone)).toHaveStyleRule('background-color', `${getColor('grayscale.g')}`);
    expect(wrapper.find(Dropzone)).toHaveStyleRule('border-color', `${getColor('secondary.b')}`);
  });

  it('should acceptFiles on Drop', done => {
    const { fetch, fetchDonePromise } = getFetchMock();

    const wrapper = mountWithTheme(<FileUploader internalFetch={fetch} />);
    wrapper.find(Dropzone).simulate('drop', { dataTransfer: { files: [file] } });
    expect(wrapper.state().fileList.length).toBe(1);

    fetchDonePromise.then(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch.mock.calls.length).toBe(3);
      done();
    });
  });

  it('should reject files that exceed the maximum file size', () => {
    const { fetch } = getFetchMock();
    const onError = jest.fn();

    const fileWithSize = createFile(100000000000000000000000);
    const wrapper = mountWithTheme(<FileUploader onError={onError} maxFileSize={0} internalFetch={fetch} />);
    wrapper.find(Dropzone).simulate('drop', { dataTransfer: { files: [fileWithSize] } });

    expect(onError).toHaveBeenCalled();
    expect(wrapper.state().fileList.length).toBe(1);
  });

  it('should show an error if the number of files dropped is more than maxFiles', () => {
    const { fetch } = getFetchMock();

    const wrapper = mountWithThemeIntl(<FileUploader maxFiles={2} internalFetch={fetch} />);
    wrapper.find(Dropzone).simulate('drop', { dataTransfer: { files: [file, file, file, file] } });

    expect(wrapper.state().fileList.length).toBe(0);
    expect(wrapper.state().showMaxFilesError).toBe(true);
  });

  it('should append to the fileList if more items are dropped', () => {
    const { fetch } = getFetchMock();

    const wrapper = mountWithThemeIntl(<FileUploader internalFetch={fetch} />);
    wrapper.find(Dropzone).simulate('drop', { dataTransfer: { files: [file] } });
    expect(wrapper.state().fileList.length).toBe(1);
    wrapper.setState({ isUploading: false });
    wrapper.find(Dropzone).simulate('drop', { dataTransfer: { files: [file, file] } });
    expect(wrapper.state().fileList.length).toBe(3);
  });
});

describe('FileComponentItem', () => {
  const fakeFile = {
    name: 'my_file_test.png',
    size: 150000,
  };

  const fakeFileWithProgress = {
    ...fakeFile,
    progressPercent: 50,
  };

  const removeFile = jest.fn();

  it('should render the name of the file and format it correctly', () => {
    const rendered = renderWithTheme(<FileComponentItem file={fakeFile} removeFile={removeFile} />);
    expect(
      rendered
        .text()
        .trim()
        .includes('my_file...est.png'),
    ).toBe(true);
  });

  it('should render a progress bar if prop isUploading is passed in', () => {
    const rendered = renderWithTheme(
      <FileComponentItem file={fakeFileWithProgress} removeFile={removeFile} isUploading />,
    );
    expect(rendered.find('progress')).toHaveLength(1);
    expect(rendered.find('progress').attr('value')).toBe('50');
    expect(
      rendered
        .text()
        .trim()
        .includes('50%'),
    ).toBe(true);
  });

  it('should format the size display correctly', () => {
    const rendered = renderWithTheme(
      <FileComponentItem file={fakeFile} removeFile={removeFile} isUploading isNumberProgress />,
    );

    expect(
      rendered
        .text()
        .trim()
        .includes('146 KB'),
    ).toBe(true);
  });

  it('shouldshow the right error state if there is an error', () => {
    const fakeFileWithProgressAndError = {
      ...fakeFileWithProgress,
      hasError: 'THERE IS AN ERROR',
    };
    const wrapper = mountWithThemeIntl(
      <FileComponentItem file={fakeFileWithProgressAndError} removeFile={removeFile} isUploading isNumberProgress />,
    );
    expect(wrapper.find('ProgressBar')).toHaveStyleRule('color', `${getColor('negation.b')}`);
    expect(
      wrapper
        .text()
        .trim()
        .includes('THERE IS AN ERROR'),
    ).toBe(true);
  });
});

import React, { StatelessComponent } from 'react';

import { ProgressBar } from 'z-frontend-elements';
import { Box, Flex, TextBlock } from 'zbase';

interface FileComponentItemProps {
  file: any;
  removeFile: (id: string) => void;
  isUploading?: boolean;
  fileUrl?: string;
  isNumberProgress?: boolean;
}

const formatFileName = (message: string) => {
  const msgArray = message.split(/[. ]+/);
  const extension = msgArray.pop();
  const fileName = msgArray.join('');

  if (fileName.length >= 10) {
    return `${fileName.slice(0, 7)}...${fileName.slice(-3)}.${extension} `;
  }

  return message;
};

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size}B`;
  } else if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${Math.round(size / (1024 * 1024))} MB`;
  } else {
    return `${Math.round(size / (1024 * 1024 * 1024))} GB`;
  }
};

const FileComponentItem: StatelessComponent<FileComponentItemProps> = props => {
  const { fileUrl, file } = props;
  const fileName = formatFileName(file.name);
  const progressBarColor = file.hasError ? 'negation.b' : 'affirmation.b';
  const fileSize = formatFileSize(file.size);

  let progressPercent;
  if (fileUrl) {
    // upload is complete;
    progressPercent = 100;
  } else {
    if (file.progressPercent >= 100) {
      progressPercent = 99;
    } else {
      progressPercent = file.progressPercent;
    }
  }
  return (
    <Box w={1}>
      <Flex justify="space-between">
        <TextBlock my={1}>{fileName}</TextBlock>
        <TextBlock my={1}>{fileSize}</TextBlock>
      </Flex>
      <Flex align="center">
        <ProgressBar value={progressPercent} max="100" color={progressBarColor} />
      </Flex>
      <Flex justify="flex-end">
        {file.hasError ? (
          <TextBlock my={1} color="negation.b">
            {file.hasError}
          </TextBlock>
        ) : (
          <TextBlock my={1}>{progressPercent}%</TextBlock>
        )}
      </Flex>
    </Box>
  );
};

export default FileComponentItem;

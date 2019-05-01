const fs = require('fs');

function replaceInFile(filePath, replaceFn) {
  const str = fs.readFileSync(filePath).toString();
  fs.writeFileSync(filePath, replaceFn(str));
}

// replaceInFile('./node_modules/react-native/Libraries/WebSocket/RCTReconnectingWebSocket.m', str =>
//   str.replace('#import <fishhook/fishhook.h>', '#import <React/fishhook.h>'),
// );

// apply https://github.com/zenefits/iOS/commit/a55fb6ebb87f28fae8eb35a7bf158dcd0bddd944
// replaceInFile('./node_modules/react-native/React.podspec', str =>
//   str.replace(`"Libraries/Text/*.{h,m}"`, `"Libraries/Text/**/*.{h,m}"`),
// );

replaceInFile('./node_modules/react-native/react.gradle', str =>
  str.replace(/ \?:\s+targetName\.toLowerCase\(\)\.contains\("release"\)/, ''),
);

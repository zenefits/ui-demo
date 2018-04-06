const fs = require('fs');

function replaceInFile(filePath, replaceFn) {
  const str = fs.readFileSync(filePath).toString();
  fs.writeFileSync(filePath, replaceFn(str));
}

replaceInFile('./node_modules/react-native/Libraries/WebSocket/RCTReconnectingWebSocket.m', str =>
  str.replace('#import <fishhook/fishhook.h>', '#import <React/fishhook.h>'),
);

replaceInFile('./node_modules/react-native/React.podspec', str =>
  str.replace(`"Libraries/Text/*.{h,m}"`, `"Libraries/Text/**/*.{h,m}"`),
);

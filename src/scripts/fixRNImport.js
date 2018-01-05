const fs = require('fs');

const filePath = './node_modules/react-native/Libraries/WebSocket/RCTReconnectingWebSocket.m';
const str = fs.readFileSync(filePath).toString();

fs.writeFileSync(filePath, str.replace('#import <fishhook/fishhook.h>', '#import <React/fishhook.h>'));

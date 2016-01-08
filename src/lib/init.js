const http = require('http');

import {Proxsy} from './Proxsy';
const proxsyInstance = new Proxsy();

// Create the Proxy Server
http.createServer((req, res) => {
  return proxsyInstance.handleRequest(req, res);
}).listen(8991);

// Create the UI

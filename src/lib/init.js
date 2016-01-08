const http = require('http');

import {Proxsy} from './Proxsy';
import {ProxsyUI} from './ProxsyUI';

const proxsyInstance = new Proxsy();
const proxsyUIInstance = new ProxsyUI();

const debug = require('debug')('proxsy:init');

// Create the Proxy Server
http.createServer((req, res) => {
  return proxsyInstance.handleRequest(req, res);
}).listen(8991);

// Create the UI
proxsyUIInstance.listen(() => {
  debug('UI listening');
});
 

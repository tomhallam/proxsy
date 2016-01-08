'use strict';

var _Proxsy = require('./Proxsy');

var http = require('http');

var proxsyInstance = new _Proxsy.Proxsy();

// Create the Proxy Server
http.createServer(function (req, res) {
  return proxsyInstance.handleRequest(req, res);
}).listen(8991);

// Create the UI
//# sourceMappingURL=init.js.map

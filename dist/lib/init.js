'use strict';

var _Proxsy = require('./Proxsy');

var _ProxsyUI = require('./ProxsyUI');

var http = require('http');

var proxsyInstance = new _Proxsy.Proxsy();
var proxsyUIInstance = new _ProxsyUI.ProxsyUI();

var debug = require('debug')('proxsy:init');

// Create the Proxy Server
http.createServer(function (req, res) {
  return proxsyInstance.handleRequest(req, res);
}).listen(8991);

// Create the UI
proxsyUIInstance.listen(function () {
  debug('UI listening');
});
//# sourceMappingURL=init.js.map

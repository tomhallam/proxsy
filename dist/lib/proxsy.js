'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Proxsy = undefined;

var _Utils = require('./Utils');

var _Request = require('./Request');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');
var url = require('url');
var debug = require('debug')('proxsy:main');
var uuid = require('node-uuid');
var StringDecoder = require('string_decoder').StringDecoder;
var Table = require('cli-table');

var Proxsy = exports.Proxsy = function () {
  function Proxsy() {
    _classCallCheck(this, Proxsy);

    this.requests = [];
  }

  _createClass(Proxsy, [{
    key: 'formatResult',
    value: function formatResult(request) {

      var table = new Table({
        head: ['Url', 'Content-Type', 'Content-Length', 'Response Time'],
        colWidths: [100, 100, 50, 50]
      });

      table.push([request.url, request.response.headers['content-type'], request.response.length.toString(), request.timings.timeToCompletedRequest.toString()]);
      //console.log([request.url, request.response['content-type'], request.response.length.toString(), request.timings.timeToCompletedRequest.toString()]);

      console.log(table.toString());
    }
  }, {
    key: 'handleRequest',
    value: function handleRequest(req, res) {
      var _this = this;

      // Create the request initialisation timer
      var requestInitTimer = new _Utils.GenericTimer('requestInit');
      requestInitTimer.start();

      // Ascertain the components of the url
      var urlParts = url.parse(req.url);
      debug('Requested URI Components: %o', urlParts);
      debug('Headers: %o', req.headers);

      var proxyParams = {
        host: urlParts.hostname,
        method: req.method,
        path: urlParts.path,
        headers: req.headers,
        port: urlParts.port ? urlParts.port : 80
      };

      debug('Connecting to %s with params: %o', urlParts.hostname, proxyParams);

      // Create the request id
      var requestId = uuid.v4();

      // Create the request in the registry
      this.requests[requestId] = new _Request.Request(requestId);
      var thisRequest = this.requests[requestId];

      // Assign the request Url
      thisRequest.setRequestUrl(req.url);

      // Assign the request headers
      thisRequest.setRequestHeaders(req.headers);

      // Create the request timer
      var requestTimer = new _Utils.GenericTimer('request');
      requestTimer.start();

      // Set the request's init time
      thisRequest.setInitTime(requestInitTimer.getValue());

      var proxy = http.request(proxyParams, function (proxyResult) {

        // Get TTFB
        var ttfbTime = requestTimer.getValue();

        // Set the returned headers to the Request object
        thisRequest.setResponseHeaders(proxyResult.headers);

        // Add the vanity header in, if it isn't going to overwrite an existing header
        if (!proxyResult['X-Proxied-By']) {
          proxyResult.headers['X-Proxied-By'] = 'Proxsy ' + require('../../package.json').version;
        }

        // Repeat the code and headers from the server
        res.writeHead(proxyResult.statusCode, proxyResult.headers);

        // For every chunk of data
        proxyResult.on('data', function (chunk) {
          thisRequest.addBodyChunk(chunk);
          res.write(chunk);
        });

        // When all data has been downloaded
        proxyResult.on('end', function () {

          // Return the result to the calling socket
          res.end();

          //
          var requestCompleteTime = requestTimer.getValue();
          debug('Request completed in %dms', requestCompleteTime);
          debug('Response body length: %db', thisRequest.response.length);
          debug('Response headers: %o', proxyResult.headers);

          thisRequest.setResponseTimes(ttfbTime, requestCompleteTime);
          debug('Request Object: %o', thisRequest);

          _this.formatResult(thisRequest);
        });
      });

      req.on('data', function (chunk) {
        proxy.write(chunk);
      });

      req.on('end', function () {
        proxy.end();
      });
    }
  }]);

  return Proxsy;
}();
//# sourceMappingURL=Proxsy.js.map
